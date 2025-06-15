import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

// Uygulamayı başlat
const app = express();

// Trust proxy - express-rate-limit hatasını çözmek için
app.set('trust proxy', 1);

// Kara listeye alınmış IP'ler için koruma (güvenlik ihlali durumunda dinamik olarak güncellenebilir)
const blockedIPs: Set<string> = new Set();
const suspiciousActivityCounts: Record<string, number> = {};

// IP'lerin kara listeye alınması için middleware
app.use((req, res, next) => {
  const clientIP = req.ip || req.socket.remoteAddress || '';
  
  // Kara listedeki IP'leri engelle
  if (blockedIPs.has(clientIP)) {
    return res.status(403).json({
      error: 'Access Denied',
      message: 'IP adresiniz güvenlik nedeniyle engellendi.'
    });
  }
  
  // Şüpheli aktiviteleri izle
  if (!suspiciousActivityCounts[clientIP]) {
    suspiciousActivityCounts[clientIP] = 0;
  }
  
  // Şüpheli API istekleri için kontrol
  const isSuspiciousPath = 
    req.path.includes('admin') || 
    req.path.includes('shell') || 
    req.path.includes('config') ||
    req.path.includes('wp-') ||
    req.path.includes('eval');
  
  // Şüpheli sorgu parametreleri veya istekler için skor artır
  if (isSuspiciousPath || req.path.includes('.php')) {
    suspiciousActivityCounts[clientIP] += 1;
    
    // Eğer 5 veya daha fazla şüpheli istek varsa IP'yi kara listeye al
    if (suspiciousActivityCounts[clientIP] >= 5) {
      console.warn(`[SECURITY] Blocking IP address ${clientIP} due to suspicious activity`);
      blockedIPs.add(clientIP);
      
      return res.status(403).json({
        error: 'Access Denied',
        message: 'Şüpheli aktivite tespit edildi. IP adresiniz engellendi.'
      });
    }
  }
  
  // IP'nin şüpheli aktivite skorunu her saat temizle
  setTimeout(() => {
    if (suspiciousActivityCounts[clientIP]) {
      suspiciousActivityCounts[clientIP] = 0;
    }
  }, 60 * 60 * 1000); // 1 saat
  
  next();
});

// GELİŞMİŞ GÜVENLİK ÖNLEMLERİ
// Helmet ile kapsamlı güvenlik başlıkları ekle
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://js.stripe.com"], // Stripe API için gerekli
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https://*.stripe.com'], // Stripe için gerekliyse
        connectSrc: ["'self'", 'ws:', 'wss:', 'https://api.stripe.com'], // Stripe API bağlantıları için
        mediaSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameSrc: ["'self'", "https://js.stripe.com", "https://hooks.stripe.com"], // Stripe için iframe'ler
        childSrc: ["'self'", "https://js.stripe.com"],
        workerSrc: ["'self'", "blob:"],
        manifestSrc: ["'self'"],
        formAction: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    // XSS korumasını aktif et
    xssFilter: true,
    // Clickjacking koruması
    frameguard: { 
      action: 'deny' 
    },
    // HTTP Strict Transport Security
    hsts: {
      maxAge: 63072000, // 2 yıl (saniye cinsinden)
      includeSubDomains: true,
      preload: true,
    },
    // IE için X-Content-Type-Options başlığı
    xContentTypeOptions: true,
    // Cross origin kaynak erişimi
    crossOriginResourcePolicy: { policy: "same-site" },
    crossOriginOpenerPolicy: { policy: "same-origin" },
    // Referrer politikası
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },

  })
);

// Rate limiter - genel API istekleri için
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 1000, // IP başına izin verilen istek sayısı
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Çok fazla istek gönderildi, lütfen 15 dakika sonra tekrar deneyin.",
  },
  skip: (req) => {
    // Statik içerik ve SSR isteklerini limitlemeye dahil etme
    return req.method === "GET" && !req.path.startsWith("/api");
  }
});

// API istekleri için rate limiter uygula
app.use("/api/", apiLimiter);

// Daha sıkı rate limiter - hassas API'ler için (örn. kullanıcı kaydı, giriş)
const authLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 dakika
  max: 20, // IP başına izin verilen istek sayısı
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Çok fazla kimlik doğrulama isteği, lütfen 30 dakika sonra tekrar deneyin.",
  },
});

// En sıkı rate limiter - kritik işlemler için
const criticalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 saat
  max: 5, // IP başına izin verilen istek sayısı
  standardHeaders: true, 
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Kritik işlemlerde çok fazla istek, lütfen daha sonra tekrar deneyin.",
  },
});

// Hassas API'ler için sıkı rate limiter'ı uygula
app.use("/api/users", authLimiter);
app.use("/api/login", authLimiter);
app.use("/api/register", authLimiter);
app.use("/api/feedback", authLimiter);

// Kritik API'ler için en sıkı rate limiter'ı uygula
app.use("/api/create-payment-intent", criticalLimiter);
app.use("/api/create-subscription", criticalLimiter);

// Güvenlik middleware'i - istek doğrulama ve temizleme
app.use((req, res, next) => {
  // HTTP metodunu kontrol et
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  // İstek içeriğinde tehlikeli karakterler içeriyorsa temizle/reddet
  if (req.body && typeof req.body === 'object') {
    // Nesne içinde tehlikeli JS kodları aranabilir
    const bodyStr = JSON.stringify(req.body);
    const suspiciousPatterns = [
      /<script>/i, 
      /javascript:/i, 
      /onerror=/i, 
      /onload=/i,
      /eval\(/i,
      /document\.cookie/i
    ];
    
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(bodyStr)) {
        console.warn(`[SECURITY] Suspicious pattern detected in request from ${req.ip}`);
        return res.status(400).json({ error: 'Invalid request content' });
      }
    }
  }
  
  next();
});

// Body parser ayarları
app.use(express.json({ limit: "1mb" })); // JSON body boyutunu sınırla
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

// Güvenli cookie yapılandırması
// Güvenli rastgele anahtar oluştur
const COOKIE_SECRET = process.env.COOKIE_SECRET || "guclu_guvenli_simay_hareketi_secret_" + Math.random().toString(36).substring(2);
app.use(cookieParser(COOKIE_SECRET)); // Cookie işlemleri için

// CSRF koruma - kritik operasyonlar için referrer ve origin kontrolü
app.use((req, res, next) => {
  // Sadece POST, PUT, PATCH veya DELETE istekleri için kontrol et
  const dangerousMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  
  if (dangerousMethods.includes(req.method)) {
    // Certain endpoints are exempt from CSRF protection
    const exemptPaths = [
      '/api/webhook',
      '/api/gorev-basvuru',
      '/api/visits',
      '/api/feedback',
      '/api/seed-tasks'
    ];
    
    if (exemptPaths.includes(req.path)) {
      return next();
    }
    
    const referrer = req.headers.referer || '';
    const origin = req.headers.origin || '';
    const host = req.headers.host || '';
    
    // API istekleri için CSRF koruması
    if (req.path.startsWith('/api')) {
      // Development ve Replit ortamı için esnek kontrol
      const isDevelopment = process.env.NODE_ENV !== 'production';
      const isReplit = host.includes('replit.app') || host.includes('replit.dev') || host.includes('repl.co');
      
      // Development ortamında veya Replit'te daha esnek kontrol
      if (isDevelopment || isReplit) {
        // Sadece açıkça kötüye kullanım gösteren istekleri reddet
        if (referrer && referrer.includes('malicious') || referrer.includes('phishing')) {
          console.warn(`[SECURITY] Blocking malicious referrer: ${referrer}`);
          return res.status(403).json({ 
            error: 'Access Denied', 
            message: 'CSRF koruması: İzin verilmeyen kaynaktan istek.'
          });
        }
      } else {
        // Production'da sıkı kontrol
        if (!referrer && !origin) {
          console.warn(`[SECURITY] Potential CSRF attempt: Missing referrer and origin headers`);
          return res.status(403).json({ 
            error: 'Access Denied', 
            message: 'CSRF koruması: Geçersiz kaynak.'
          });
        }
        
        if (referrer && !referrer.includes(host) && !referrer.includes('localhost') && !referrer.includes('simayhareketi.com')) {
          console.warn(`[SECURITY] Potential CSRF attempt from referrer: ${referrer}`);
          return res.status(403).json({ 
            error: 'Access Denied', 
            message: 'CSRF koruması: İzin verilmeyen kaynaktan istek.'
          });
        }
      }
    }
  }
  
  next();
});

// Cookie güvenlik ayarları 
app.use((req, res, next) => {
  // Tüm çerezler için güvenli ayarları yap
  const originalCookie = res.cookie;
  
  // Tip güvenli cookie fonksiyonu
  res.cookie = function(
    name: string, 
    value: string, 
    options: any = {}
  ) {
    // Varsayılan güvenlik ayarlarını ekle
    const secureOptions = {
      httpOnly: true, // JavaScript erişimini engelle
      secure: process.env.NODE_ENV === 'production', // Sadece HTTPS üzerinden
      sameSite: 'strict' as const, // CSRF koruması
      maxAge: 7200000, // 2 saat (ms)
    };
    
    // Seçenekleri birleştir
    const mergedOptions = Object.assign({}, secureOptions, options || {});
    
    // Orijinal cookie metodunu güvenli ayarlarla çağır
    return originalCookie.call(res, name, value, mergedOptions);
  };
  
  next();
});

// SPA yönlendirmesi için (react router yönlendirmesini desteklemek için)
// API olmayan GET istekleri için HTML dosyasını sun
app.use((req, res, next) => {
  // İstekleri logla - sorun gidermek için
  if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.includes('.')) {
    console.log(`[SPA Route] ${req.path} -> Forwarding to frontend router`);
  }
  next();
});

// Güvenlik izleme ve loglama middleware'i
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  // Şüpheli istek analizi
  const userAgent = req.headers['user-agent'] || 'unknown';
  const referrer = req.headers['referer'] || 'direct';
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  
  // Bot ve saldırı kalıplarını tanımla
  const suspiciousAgents = [
    /sqlmap/i, /nikto/i, /nessus/i, /nmap/i, /burpcollaborator/i, 
    /zap/i, /dirbuster/i, /masscan/i, /w3af/i, /metasploit/i
  ];
  
  // Şüpheli kullanıcı ajanlarını kontrol et
  const isSuspiciousAgent = suspiciousAgents.some(pattern => pattern.test(userAgent));
  
  // Şüpheli path kontrolü (SQL injection, XSS, Path traversal vb.)
  const suspiciousPaths = [
    /\.\.\//i, /\/etc\/passwd/i, /\/etc\/shadow/i, /\/proc\//i, /\/bin\//i,
    /\/wp-admin/i, /\/wp-content/i, /\/admin\//i, /\/phpMyAdmin/i, 
    /'--/i, /\bOR\s+1=1/i, /\bAND\s+1=1/i, /select\s+.*from/i,
    /union\s+select/i, /convert\(.*char/i, /script>/i
  ];
  
  const isSuspiciousPath = suspiciousPaths.some(pattern => pattern.test(path));
  
  // Şüpheli istek parametreleri kontrolü
  const hasQueryParams = Object.keys(req.query).length > 0;
  const suspiciousQueryParams = hasQueryParams && Object.entries(req.query).some(([key, value]) => {
    if (typeof value !== 'string') return false;
    return suspiciousPaths.some(pattern => pattern.test(value));
  });
  
  // Şüpheli istek tespit edildiğinde loglama ve uyarı
  if (isSuspiciousAgent || isSuspiciousPath || suspiciousQueryParams) {
    const warningId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    console.warn(`[SECURITY WARNING ${warningId}] Suspicious request detected from ${ip}:`);
    console.warn(` - User Agent: ${userAgent}`);
    console.warn(` - Path: ${path}`);
    console.warn(` - Referrer: ${referrer}`);
    console.warn(` - Query Params: ${JSON.stringify(req.query)}`);
    console.warn(` - Suspicious Flags: ${isSuspiciousAgent ? 'agent ' : ''}${isSuspiciousPath ? 'path ' : ''}${suspiciousQueryParams ? 'query' : ''}`);
    
    // Şüpheli istek istatistikleri burada tutulabilir
    
    // Blokla veya ileride analiz için devam et
    if (isSuspiciousPath || suspiciousQueryParams) {
      return res.status(403).json({ 
        error: "Access Denied", 
        message: "İsteğiniz güvenlik politikalarımıza uymuyor."
      });
    }
  }

  // Normal API loglama - type-safe monkeypatching
  const originalResJson = res.json;
  res.json = function (bodyJson: any) {
    capturedJsonResponse = bodyJson;
    return originalResJson.call(res, bodyJson);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      // Standart log formatı
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      
      // Kritik API'ler için daha ayrıntılı loglama
      const isCriticalAPI = path.includes('/payment') || 
                           path.includes('/subscription') || 
                           path.includes('/user');
      
      if (isCriticalAPI || res.statusCode >= 400) {
        const safeIp = typeof ip === 'string' ? ip.substr(0, 15) : 'unknown';
        const safeUA = typeof userAgent === 'string' ? userAgent.substr(0, 20) : 'unknown';
        logLine += ` || IP: ${safeIp}... | UA: ${safeUA}...`;
      }
      
      if (capturedJsonResponse) {
        // Hassas veri filtreleme
        let sanitizedResponse: any = null;
        
        try {
          // Güvenli obje kopyalama
          if (typeof capturedJsonResponse === 'object' && capturedJsonResponse !== null) {
            sanitizedResponse = JSON.parse(JSON.stringify(capturedJsonResponse));
            
            // Hassas alanları maske
            const sensitiveFields = ['password', 'token', 'secret', 'key', 'credit', 'card', 'cvv', 'pin'];
            
            // Recursive masking function
            const maskSensitiveData = (obj: any) => {
              if (typeof obj !== 'object' || obj === null) return;
              
              Object.keys(obj).forEach(key => {
                // Hassas alan adlarını maske 
                if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
                  obj[key] = '*****';
                } 
                // Nesne içinde gezinmeye devam et
                else if (typeof obj[key] === 'object' && obj[key] !== null) {
                  maskSensitiveData(obj[key]);
                }
              });
            };
            
            maskSensitiveData(sanitizedResponse);
          } else {
            sanitizedResponse = capturedJsonResponse;
          }
          
          logLine += ` :: ${JSON.stringify(sanitizedResponse)}`;
        } catch (e) {
          logLine += ' :: [Response logging failed]';
        }
      }

      // Log boyutu sınırla
      if (logLine.length > 120) {
        logLine = logLine.slice(0, 119) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Gelişmiş hata işleme
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    // Hata bilgilerini yapılandır
    const status = err.status || err.statusCode || 500;
    const errorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    // Güvenlik kaygıları için production ortamında detayları gizle
    const isProd = process.env.NODE_ENV === 'production';
    
    const errorResponse = {
      status,
      message: err.message || "İşleminiz sırasında bir hata oluştu.",
      error: isProd ? 'Sunucu hatası' : err.name,
      errorId,
      path: req.path,
      timestamp: new Date().toISOString()
    };
    
    // Hatayı loglama
    console.error(`[ERROR ${errorId}] ${req.method} ${req.path} - ${status}:`, {
      error: err.stack || err,
      body: req.body,
      query: req.query,
      ip: req.ip,
      user_agent: req.headers['user-agent'],
    });
    
    // Yanıt gönderme
    res.status(status).json(errorResponse);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = process.env.PORT || 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    console.log(`Server is running on port ${port}`);
    log(`serving on port ${port}`);
  });
})();
