import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

// Uygulamayı başlat
const app = express();

// Güvenlik önlemleri
// Helmet ile temel güvenlik başlıkları ekle
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'blob:'],
        connectSrc: ["'self'", 'ws:', 'wss:'],
        mediaSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
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

// Hassas API'ler için sıkı rate limiter'ı uygula
app.use("/api/users", authLimiter);
app.use("/api/login", authLimiter);
app.use("/api/register", authLimiter);

// Body parser ayarları
app.use(express.json({ limit: "1mb" })); // JSON body boyutunu sınırla
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(cookieParser()); // Cookie işlemleri için

// SPA yönlendirmesi için (react router yönlendirmesini desteklemek için)
// API olmayan GET istekleri için HTML dosyasını sun
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.includes('.')) {
    // Vite development modunda bu işlemi zaten yapıyor. Sadece API dışı istekleri işle
    next();
  } else {
    next();
  }
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
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
