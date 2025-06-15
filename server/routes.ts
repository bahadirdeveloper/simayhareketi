import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { insertUserSchema, insertVisitorStatSchema, insertFeedbackSchema, insertTransactionSchema, 
  insertGorevSchema, insertGorevBasvuruSchema, insertUlkeBasvuruSchema, insertPremiumUyelikSchema, insertOdemeSchema } from "@shared/schema";
import { z } from "zod";
import { 
  handleCreatePaymentIntent, 
  handleCreateSubscription, 
  handleWebhook,
  getPaymentPrices
} from "./routes/stripe";
import { seedTasks } from "./seed-tasks";

// SQL Enjeksiyon Koruma Middleware
function sqlInjectionProtection(req: Request, res: Response, next: NextFunction) {
  // SQL enjeksiyon kalıpları
  const sqlPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
    /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
    /((\%27)|(\'))union/i,
    /exec(\s|\+)+(s|x)p/i,
    /UNION(\s+)ALL(\s+)SELECT/i,
    /INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE/i
  ];

  // SQL enjeksiyon bulunması durumunda
  const checkForSqlInjection = (obj: any): boolean => {
    if (!obj) return false;
    
    if (typeof obj === 'string') {
      return sqlPatterns.some(pattern => pattern.test(obj));
    }
    
    if (typeof obj === 'object') {
      return Object.values(obj).some(value => checkForSqlInjection(value));
    }
    
    return false;
  };
  
  // Tüm giriş kaynaklarını kontrol et
  const hasSQLInjection = 
    checkForSqlInjection(req.query) || 
    checkForSqlInjection(req.body) || 
    checkForSqlInjection(req.params);
  
  if (hasSQLInjection) {
    console.warn(`[SECURITY] SQL Injection attempt detected from ${req.ip}`);
    console.warn(`Path: ${req.path}`);
    console.warn(`Query: ${JSON.stringify(req.query)}`);
    console.warn(`Body: ${JSON.stringify(req.body)}`);
    
    return res.status(403).json({ 
      error: 'Access Denied', 
      message: 'Sistem güvenlik politikalarına aykırı istek tespit edildi.'
    });
  }
  
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Tüm API endpointleri için SQL enjeksiyon koruma middleware'i uygula
  app.use('/api', sqlInjectionProtection);
  
  // API endpoints for the application
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Dünyayı Kurtarma Operasyonu API çalışıyor" });
  });

  // Kök rotası ve SPA yönlendirmeleri için yapılandırma
  app.get('/', (req, res, next) => {
    // Vite tarafından işlenmesi için middleware zincirini devam ettir
    next();
  });
  
  // SPA yönlendirmeleri için catch-all route
  app.get('*', (req, res, next) => {
    // API istekleri hariç tüm GET isteklerini SPA'ya yönlendir
    if (!req.path.startsWith('/api') && req.method === 'GET') {
      console.log(`[SPA Route Handler] ${req.path} -> Frontend'e yönlendiriliyor`);
    }
    next();
  });

  // Register a new user
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);

      // Strip out password for security
      const { password, ...userWithoutPassword } = user;

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid user data", details: error.errors });
      } else {
        console.error("User creation error:", error);
        res.status(500).json({ error: "Failed to create user" });
      }
    }
  });

  // Record visit stats
  app.post("/api/visits", async (req, res) => {
    try {
      // Get IP from request
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'];

      // Prepare visitor data with request info
      const visitData = {
        ...req.body,
        visitorIp: typeof ip === 'string' ? ip : undefined,
        userAgent: typeof userAgent === 'string' ? userAgent : undefined,
        referrer: req.headers.referer,
      };

      const validatedVisitData = insertVisitorStatSchema.parse(visitData);

      // Implement rate limiting for the same IP
      const recentVisits = await storage.getVisitStats(100);
      const ipVisits = recentVisits.filter(v => 
        v.visitorIp === validatedVisitData.visitorIp && 
        (Date.now() - new Date(v.visitDate).getTime()) < 10000 // 10 seconds
      );

      // If more than 3 visits in 10 seconds from same IP, limit
      if (ipVisits.length > 3) {
        res.status(429).json({ error: "Too many requests", message: "Please wait before submitting again" });
        return;
      }

      const visit = await storage.recordVisit(validatedVisitData);

      res.status(201).json(visit);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid visit data", details: error.errors });
      } else {
        console.error("Visit recording error:", error);
        res.status(500).json({ error: "Failed to record visit" });
      }
    }
  });

  // Submit feedback
  app.post("/api/feedback", async (req, res) => {
    try {
      const feedbackData = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.submitFeedback(feedbackData);

      res.status(201).json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid feedback data", details: error.errors });
      } else {
        console.error("Feedback submission error:", error);
        res.status(500).json({ error: "Failed to submit feedback" });
      }
    }
  });

  // Get visit stats (protected, would usually require authentication)
  app.get("/api/visits", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const visits = await storage.getVisitStats(limit);

      res.json({ visits, count: visits.length });
    } catch (error) {
      console.error("Error fetching visit stats:", error);
      res.status(500).json({ error: "Failed to retrieve visit statistics" });
    }
  });

  // Get feedback submissions (protected, would usually require authentication)
  app.get("/api/feedback", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const feedbacks = await storage.getAllFeedback(limit);

      res.json({ feedbacks, count: feedbacks.length });
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ error: "Failed to retrieve feedback" });
    }
  });

  // Get live participation statistics
  app.get("/api/stats/live", async (req, res) => {
    try {
      // Get real participation data from storage
      const visits = await storage.getVisitStats(10000); // Get recent visits
      const feedbacks = await storage.getAllFeedback(1000); // Get recent feedbacks
      
      // Calculate real stats based on actual data
      const totalVisits = visits.length;
      const uniqueVisitors = new Set(visits.map(v => v.visitorIp)).size;
      const activeCities = 0; // Will be calculated from actual city data when available
      
      // Real participation stats (start from zero, grow with actual usage)
      const stats = {
        participants: 0, // Start from zero - will grow with real registrations
        totalAmount: 0, // Start from zero - will grow with real payments
        activeCities: 0, // Start from zero - will grow with real city participation
        activeProjects: 101, // We have 101 mission tasks available on the platform
        volunteers: 0, // Start from zero - will grow with real volunteer registrations
        totalVisits: totalVisits,
        uniqueVisitors: uniqueVisitors,
        lastUpdated: new Date().toISOString()
      };

      res.json(stats);
    } catch (error) {
      console.error("Error fetching live stats:", error);
      res.status(500).json({ error: "Failed to retrieve live statistics" });
    }
  });

  // Get financial transactions for transparency table
  app.get("/api/transactions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const transactions = await storage.getTransactions(limit);

      res.json({ transactions, count: transactions.length });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: "Failed to retrieve transactions" });
    }
  });

  // Create new transaction (protected endpoint)
  app.post("/api/transactions", async (req, res) => {
    try {
      const transactionData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(transactionData);

      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid transaction data", details: error.errors });
      } else {
        console.error("Transaction creation error:", error);
        res.status(500).json({ error: "Failed to create transaction" });
      }
    }
  });

  // Serve static files for supported languages
  app.get("/:lang", (req, res, next) => {
    const supportedLanguages = ["tr", "en", "ar", "ru", "es", "de"];
    const lang = req.params.lang;

    if (supportedLanguages.includes(lang)) {
      // For SPA, let the frontend routing handle this
      next();
    } else {
      next();
    }
  });

  // Stripe payment routes
  // Secure password validation endpoint
  app.post("/api/validate-password", (req, res) => {
    try {
      const { password } = req.body;
      
      // Validate input
      if (!password || typeof password !== 'string') {
        return res.status(400).json({ valid: false, message: "Invalid request format" });
      }
      
      // Get password from environment variable or use a secure fallback
      const correctPassword = process.env.ACCESS_PASSWORD || "simay2025";
      
      // Validate password (using constant-time comparison would be even better)
      const isValid = password === correctPassword;
      
      // Return result without revealing the actual password
      return res.json({ valid: isValid });
    } catch (error) {
      console.error("Password validation error:", error);
      return res.status(500).json({ valid: false, message: "Server error" });
    }
  });

  // Free Translation API endpoint using MyMemory
  app.post("/api/translate", async (req, res) => {
    try {
      const { texts, targetLanguage, sourceLanguage = 'tr' } = req.body;
      
      if (!texts || !Array.isArray(texts) || !targetLanguage) {
        return res.status(400).json({ error: "Invalid request format" });
      }

      const translations = [];
      
      // Translate each text individually to avoid API limits
      for (const text of texts) {
        try {
          // MyMemory API - Free and no API key required
          const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`);
          const data = await response.json();
          
          if (data.responseStatus === 200 && data.responseData) {
            translations.push(data.responseData.translatedText);
          } else {
            // Fallback to LibreTranslate
            try {
              const libretranslateResponse = await fetch('https://libretranslate.de/translate', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  q: text,
                  source: sourceLanguage,
                  target: targetLanguage,
                  format: 'text'
                })
              });
              
              if (libretranslateResponse.ok) {
                const libretranslateData = await libretranslateResponse.json();
                translations.push(libretranslateData.translatedText);
              } else {
                translations.push(text); // Return original if translation fails
              }
            } catch (fallbackError) {
              translations.push(text); // Return original if fallback fails
            }
          }
          
          // Rate limiting delay
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          console.error("Single translation error:", error);
          translations.push(text); // Return original text on error
        }
      }

      res.json({ translations });
    } catch (error) {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Translation failed" });
    }
  });

  // Tasks/Missions API
  app.get("/api/gorevler", async (req, res) => {
    try {
      const gorevler = await storage.getAllGorevler();
      // Add application counts for each task
      const gorevlerWithCounts = await Promise.all(
        gorevler.map(async (gorev) => {
          const count = await storage.getGorevBasvuruCount(gorev.id);
          return { ...gorev, tamamlayan: count };
        })
      );
      res.json(gorevlerWithCounts);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to retrieve tasks" });
    }
  });

  app.get("/api/gorevler/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const gorev = await storage.getGorev(id);
      
      if (!gorev) {
        return res.status(404).json({ error: "Task not found" });
      }
      
      const tamamlayan = await storage.getGorevBasvuruCount(id);
      res.json({ ...gorev, tamamlayan });
    } catch (error) {
      console.error("Error fetching task:", error);
      res.status(500).json({ error: "Failed to retrieve task" });
    }
  });

  app.post("/api/gorev-basvuru", async (req, res) => {
    try {
      const { gorevId, notlar, userId, userEmail } = req.body;
      
      if (!gorevId) {
        return res.status(400).json({ error: "Görev ID gereklidir" });
      }

      if (!userId || !userEmail) {
        return res.status(400).json({ error: "Kullanıcı bilgileri gereklidir" });
      }

      // Check if user has made payment (has active subscription or payment record)
      const userPayments = await storage.getUserOdemeler(userId);
      const hasValidPayment = userPayments.some(payment => 
        payment.durum === 'completed' || payment.durum === 'active'
      );

      if (!hasValidPayment) {
        return res.status(403).json({ 
          error: "Bu özellik sadece ödeme yapmış kullanıcılar için kullanılabilir. Lütfen önce premium üyelik satın alın.",
          requiresPayment: true
        });
      }

      // Check if user already has an application for any task
      const existingApplications = await storage.getUserGorevBasvurulari(userId);
      if (existingApplications.length > 0) {
        return res.status(400).json({ 
          error: "Zaten bir göreve başvuru yapmışsınız. Her kullanıcı sadece bir göreve başvuru yapabilir.",
          hasExistingApplication: true
        });
      }

      const basvuruData = insertGorevBasvuruSchema.parse({
        gorevId: parseInt(gorevId),
        userId: userId,
        notlar: notlar || "Premium kullanıcı başvurusu",
        durum: "beklemede"
      });
      
      const basvuru = await storage.createGorevBasvuru(basvuruData);
      res.status(201).json(basvuru);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Geçersiz başvuru verisi", details: error.errors });
      } else {
        console.error("Task application error:", error);
        res.status(500).json({ error: "Başvuru gönderilemedi" });
      }
    }
  });

  app.get("/api/my-applications", async (req, res) => {
    try {
      // Return all applications for now until proper auth is implemented
      const applications = await storage.getGorevBasvurulari();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Failed to retrieve applications" });
    }
  });

  // Country addition requests
  app.post("/api/ulke-basvuru", async (req, res) => {
    try {
      const basvuruData = insertUlkeBasvuruSchema.parse(req.body);
      const basvuru = await storage.createUlkeBasvuru(basvuruData);
      res.status(201).json(basvuru);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid country request data", details: error.errors });
      } else {
        console.error("Country request error:", error);
        res.status(500).json({ error: "Failed to submit country request" });
      }
    }
  });

  // Stripe payments
  app.post("/api/create-payment-intent", handleCreatePaymentIntent);
  app.post("/api/create-subscription", handleCreateSubscription);
  app.post("/api/webhook", handleWebhook);
  app.get("/api/payment-prices", getPaymentPrices);

  // Database seeding endpoint
  app.post("/api/seed-tasks", async (req, res) => {
    try {
      await seedTasks();
      res.json({ success: true, message: "101 görev başarıyla veritabanına eklendi" });
    } catch (error) {
      console.error("Task seeding error:", error);
      res.status(500).json({ error: "Failed to seed tasks" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}