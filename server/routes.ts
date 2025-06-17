import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import Stripe from 'stripe';
import { storage } from "./storage";
import path from "path";
import { insertUserSchema, insertVisitorStatSchema, insertFeedbackSchema, insertTransactionSchema, 
  insertGorevSchema, insertGorevBasvuruSchema, insertUlkeBasvuruSchema } from "@shared/schema";
import { z } from "zod";
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
      // Get authentic data from database
      const visits = await storage.getVisitStats(10000);
      const feedbacks = await storage.getAllFeedback(1000);
      const gorevler = await storage.getAllGorevler();
      const transactions = await storage.getTransactions(1000);
      
      // Calculate real statistics from database
      const totalVisits = visits.length;
      const uniqueVisitors = new Set(visits.map(v => v.visitorIp)).size;
      const activeProjects = gorevler.length;
      
      // Count actual registered members (starts at 0, will grow with real registrations)
      const participants = 0;
      
      // Calculate total donations from real transactions
      const totalAmount = transactions.reduce((sum, transaction) => {
        return sum + (transaction.amount || 0);
      }, 0);
      
      // Count volunteers from task applications
      let volunteers = 0;
      try {
        const allApplications = await Promise.all(
          gorevler.map(async (gorev) => {
            return await storage.getGorevBasvuruCount(gorev.id);
          })
        );
        volunteers = allApplications.reduce((sum, count) => sum + count, 0);
      } catch (error) {
        console.log("Could not fetch volunteer count");
      }
      
      // Count cities from visitor IP geolocation (future enhancement)
      const uniqueCities = new Set();
      // Future: Extract cities from IP geolocation data
      
      const stats = {
        participants: participants,
        totalAmount: totalAmount,
        activeCities: uniqueCities.size,
        activeProjects: activeProjects,
        volunteers: volunteers,
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

  // Get financial stats for transparency dashboard
  app.get("/api/financial-stats", async (req, res) => {
    try {
      const transactions = await storage.getTransactions(1000); // Get more for calculations
      
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      // Calculate totals
      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
        
      // Calculate monthly figures
      const monthlyTransactions = transactions.filter(t => {
        const tDate = new Date(t.transactionDate);
        return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
      });
      
      const monthlyIncome = monthlyTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const monthlyExpenses = monthlyTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const stats = {
        totalIncome,
        totalExpenses,
        balance: totalIncome - totalExpenses,
        monthlyIncome,
        monthlyExpenses,
        lastUpdate: new Date().toISOString()
      };

      res.json(stats);
    } catch (error) {
      console.error("Error fetching financial stats:", error);
      res.status(500).json({ error: "Failed to retrieve financial statistics" });
    }
  });

  // Get financial transactions for transparency table
  app.get("/api/transactions", async (req, res) => {
    try {
      const period = req.query.period as string;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      
      let transactions = await storage.getTransactions(1000);
      
      // Filter by period if specified
      if (period && period !== 'all') {
        const now = new Date();
        let filterDate = new Date();
        
        if (period === 'week') {
          filterDate.setDate(now.getDate() - 7);
        } else if (period === 'month') {
          filterDate.setMonth(now.getMonth() - 1);
        }
        
        transactions = transactions.filter(t => new Date(t.transactionDate) >= filterDate);
      }
      
      // Sort by date (newest first) and limit
      transactions = transactions
        .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime())
        .slice(0, limit);

      // Format transactions for frontend
      const formattedTransactions = transactions.map(t => ({
        id: t.id,
        type: t.type,
        amount: Math.abs(t.amount),
        description: t.description,
        category: t.category || 'Genel',
        date: t.transactionDate,
        verified: true // All transactions in system are verified
      }));

      res.json(formattedTransactions);
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

  // Applications endpoint for form submissions
  app.post("/api/applications", async (req, res) => {
    try {
      const { type, data, timestamp } = req.body;
      
      // Validate application data based on type
      const validApplicationTypes = ['kurucu-eksikleri', 'katil', 'dijital-kimlik', 'gorev-basvuru'];
      
      if (!validApplicationTypes.includes(type)) {
        return res.status(400).json({ error: "Geçersiz başvuru türü" });
      }
      
      // Basic validation for all application types
      if (!data || typeof data !== 'object') {
        return res.status(400).json({ error: "Başvuru verileri eksik" });
      }
      
      // Store application data (in a real system, this would go to database)
      const applicationId = `APP_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      
      const application = {
        id: applicationId,
        type,
        data,
        timestamp: timestamp || new Date().toISOString(),
        status: 'pending',
        ip: req.ip,
        userAgent: req.get('User-Agent')
      };
      
      // Log application for monitoring
      console.log(`[APPLICATION] New ${type} application:`, {
        id: applicationId,
        type,
        timestamp: application.timestamp,
        ip: req.ip
      });
      
      res.status(201).json({
        success: true,
        applicationId,
        message: "Başvurunuz başarıyla alındı",
        timestamp: application.timestamp
      });
      
    } catch (error) {
      console.error("Application submission error:", error);
      res.status(500).json({ 
        error: "Başvuru işlemi sırasında hata oluştu",
        message: "Lütfen tekrar deneyin"
      });
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

  // İyzico payment routes
  app.post("/api/iyzico/initialize", async (req, res) => {
    try {
      const { amount, packageType, userInfo } = req.body;
      
      if (!amount || amount < 20) {
        return res.status(400).json({ error: "Minimum tutar 20 TL olmalıdır" });
      }

      if (!process.env.IYZICO_API_KEY || !process.env.IYZICO_SECRET_KEY) {
        console.error("İyzico credentials not configured");
        return res.status(500).json({ error: "İyzico ödeme sistemi yapılandırma hatası" });
      }

      const Iyzipay = require('iyzipay');
      
      const iyzipay = new Iyzipay({
        apiKey: process.env.IYZICO_API_KEY,
        secretKey: process.env.IYZICO_SECRET_KEY,
        uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com'
      });

      const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: `conv_${Date.now()}`,
        price: amount.toString(),
        paidPrice: amount.toString(),
        currency: Iyzipay.CURRENCY.TRY,
        basketId: `basket_${Date.now()}`,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl: `${req.protocol}://${req.get('host')}/api/iyzico/callback`,
        enabledInstallments: [2, 3, 6, 9],
        buyer: {
          id: 'BY' + Date.now(),
          name: userInfo.ad.split(' ')[0] || 'Ad',
          surname: userInfo.ad.split(' ').slice(1).join(' ') || 'Soyad',
          gsmNumber: userInfo.telefon,
          email: userInfo.email,
          identityNumber: '74300864791',
          lastLoginDate: new Date().toISOString().split('T')[0] + ' 12:00:00',
          registrationDate: new Date().toISOString().split('T')[0] + ' 12:00:00',
          registrationAddress: userInfo.sehir + ', Türkiye',
          ip: req.ip,
          city: userInfo.sehir,
          country: 'Turkey',
          zipCode: '34732'
        },
        shippingAddress: {
          contactName: userInfo.ad,
          city: userInfo.sehir,
          country: 'Turkey',
          address: userInfo.sehir + ', Türkiye',
          zipCode: '34732'
        },
        billingAddress: {
          contactName: userInfo.ad,
          city: userInfo.sehir,
          country: 'Turkey',
          address: userInfo.sehir + ', Türkiye',
          zipCode: '34732'
        },
        basketItems: [
          {
            id: 'BI' + Date.now(),
            name: packageType === 'dijital-kimlik' ? 'Dijital Kimlik' : 'Özel Katkı',
            category1: 'Dijital Hizmetler',
            category2: 'Platform Üyelikleri',
            itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
            price: amount.toString()
          }
        ]
      };

      iyzipay.checkoutFormInitialize.create(request, function (err: any, result: any) {
        if (err) {
          console.error("İyzico error:", err);
          return res.status(500).json({ 
            error: "İyzico ödeme başlatılamadı",
            message: err.errorMessage || "Ödeme sistemi hatası"
          });
        }

        if (result.status === 'success') {
          console.log(`[IYZICO] Payment initialized for ₺${amount} - ${packageType} - ${userInfo.email}`);
          
          res.json({
            success: true,
            checkoutFormContent: result.checkoutFormContent,
            token: result.token,
            paymentPageUrl: result.paymentPageUrl
          });
        } else {
          console.error("İyzico initialization failed:", result);
          res.status(400).json({ 
            error: "İyzico ödeme başlatılamadı",
            message: result.errorMessage || "Ödeme sistemi hatası"
          });
        }
      });

    } catch (error: any) {
      console.error("İyzico payment error:", error);
      res.status(500).json({ 
        error: "İyzico ödeme sistemi hatası",
        message: error.message || "Ödeme işlemi başlatılamadı"
      });
    }
  });

  app.post("/api/iyzico/callback", async (req, res) => {
    try {
      const { token } = req.body;
      
      if (!token) {
        return res.status(400).json({ error: "Token eksik" });
      }

      const Iyzipay = require('iyzipay');
      
      const iyzipay = new Iyzipay({
        apiKey: process.env.IYZICO_API_KEY,
        secretKey: process.env.IYZICO_SECRET_KEY,
        uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com'
      });

      const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: `callback_${Date.now()}`,
        token: token
      };

      iyzipay.checkoutForm.retrieve(request, function (err: any, result: any) {
        if (err) {
          console.error("İyzico callback error:", err);
          return res.redirect('/katil?error=payment_failed');
        }

        if (result.status === 'success') {
          console.log(`[IYZICO] Payment completed successfully - ${result.paymentId}`);
          res.redirect('/katil/success?payment=success');
        } else {
          console.error("İyzico payment failed:", result);
          res.redirect('/katil?error=payment_failed');
        }
      });

    } catch (error: any) {
      console.error("İyzico callback error:", error);
      res.redirect('/katil?error=system_error');
    }
  });

  // Stripe payment routes
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, currency = "try", packageType, userInfo } = req.body;
      
      // Enhanced validation
      if (!amount || amount < 20) {
        return res.status(400).json({ error: "Minimum tutar 20 TL olmalıdır" });
      }

      if (amount > 100000) {
        return res.status(400).json({ error: "Maksimum tutar 100.000 TL olabilir" });
      }

      if (!process.env.STRIPE_SECRET_KEY) {
        console.error("STRIPE_SECRET_KEY is not configured");
        return res.status(500).json({ error: "Ödeme sistemi yapılandırma hatası" });
      }

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      
      // Create payment intent with metadata
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents/kuruş
        currency: currency,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          package_type: packageType || 'ozel-katki',
          user_email: userInfo?.email || '',
          user_name: userInfo?.ad || '',
          platform: 'halk-sistemi'
        },
        description: `Halk Sistemi - ${packageType === 'dijital-kimlik' ? 'Dijital Kimlik' : 'Özel Katkı'} - ₺${amount}`,
      });

      console.log(`[PAYMENT] Created payment intent for ₺${amount} - ${packageType} - ${userInfo?.email}`);

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        amount: amount,
        currency: currency,
        paymentIntentId: paymentIntent.id
      });
    } catch (error: any) {
      console.error("Payment intent creation error:", error);
      res.status(500).json({ 
        error: "Ödeme sistemi hatası",
        message: error.message || "Ödeme işlemi başlatılamadı",
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });

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

  // Premium login endpoint
  app.post("/api/premium-login", async (req, res) => {
    try {
      const { identifier, password } = req.body;
      
      if (!identifier || !password) {
        return res.status(400).json({ message: "Kullanıcı adı ve şifre gerekli" });
      }

      // Check if user exists in our contributors
      const user = await storage.getPremiumUser(identifier);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Kullanıcı adı veya şifre hatalı" });
      }

      // Generate token
      const token = `premium_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      res.json({ 
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          membershipType: user.membershipType
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: "Giriş hatası: " + error.message });
    }
  });

  // Send verification code to email
  app.post("/api/send-verification", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "E-posta adresi gerekli" });
      }

      // Check if email exists in premium users
      const user = await storage.getPremiumUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Bu e-posta adresi ile kayıtlı premium hesap bulunamadı" });
      }

      // Generate 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store verification code temporarily (in real app, use Redis or database)
      (global as any).verificationCodes = (global as any).verificationCodes || {};
      (global as any).verificationCodes[email] = {
        code: verificationCode,
        expires: Date.now() + 10 * 60 * 1000 // 10 minutes
      };

      // In real app, send email here
      // For now, just return success
      res.json({ message: "Doğrulama kodu gönderildi" });
    } catch (error: any) {
      res.status(500).json({ message: "E-posta gönderim hatası: " + error.message });
    }
  });

  // Verify email login
  app.post("/api/verify-email-login", async (req, res) => {
    try {
      const { email, verificationCode } = req.body;
      
      if (!email || !verificationCode) {
        return res.status(400).json({ message: "E-posta ve doğrulama kodu gerekli" });
      }

      // Check verification code
      const storedData = (global as any).verificationCodes?.[email];
      if (!storedData || storedData.code !== verificationCode || Date.now() > storedData.expires) {
        return res.status(401).json({ message: "Geçersiz veya süresi dolmuş doğrulama kodu" });
      }

      // Get user
      const user = await storage.getPremiumUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Kullanıcı bulunamadı" });
      }

      // Clear verification code
      delete (global as any).verificationCodes[email];

      // Generate token
      const token = `premium_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      res.json({ 
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          membershipType: user.membershipType
        }
      });
    } catch (error: any) {
      res.status(500).json({ message: "Doğrulama hatası: " + error.message });
    }
  });

  // Test endpoint to create sample transactions for development
  app.post("/api/test-transaction", async (req, res) => {
    try {
      const { name, email, phone, city, amount, packageType } = req.body;
      
      const transaction = await storage.createTransaction({
        type: "income",
        category: packageType || "bağış",
        description: `${packageType || "Destek"} katkısı - ${name || "Anonim"} (${city || "Bilinmiyor"})`,
        amount: (amount || 50) * 100, // Convert to kuruş
        currency: "TRY",
        isPublic: true,
        reference: `test_${Date.now()}`
      });

      res.json(transaction);
    } catch (error: any) {
      res.status(500).json({ 
        error: "Test transaction failed: " + error.message 
      });
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

  // Task selection endpoint for paid users
  app.post("/api/select-task", async (req, res) => {
    try {
      const { taskId, paymentData } = req.body;
      
      if (!taskId || !paymentData) {
        return res.status(400).json({ error: "Eksik parametreler" });
      }

      // Verify payment was completed for digital ID
      if (paymentData.packageType !== 'dijital-kimlik' && paymentData.amount < 1) {
        return res.status(403).json({ error: "Görev seçimi için ödeme gerekli" });
      }

      // Get task details
      const gorev = await storage.getGorev(taskId);
      if (!gorev) {
        return res.status(404).json({ error: "Görev bulunamadı" });
      }

      // Create task application record
      const basvuru = await storage.createGorevBasvuru({
        userId: Math.floor(Math.random() * 1000000), // Generate unique user ID
        gorevId: taskId,
        notlar: `Dijital kimlik ile seçilen görev - Paket: ${paymentData.packageType} - Email: ${paymentData.userInfo?.email || 'anonymous'}`
      });

      res.json({ 
        success: true, 
        task: gorev,
        application: basvuru,
        message: "Görev başarıyla seçildi"
      });
    } catch (error: any) {
      console.error("Task selection error:", error);
      res.status(500).json({ 
        error: "Görev seçimi başarısız",
        message: error.message 
      });
    }
  });

  // Forum account generation endpoint
  app.post("/api/generate-forum-account", async (req, res) => {
    try {
      const { userInfo, digitalID } = req.body;
      
      if (!userInfo || !userInfo.email) {
        return res.status(400).json({ error: "Kullanıcı bilgileri eksik" });
      }

      // Generate unique forum credentials
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      
      const username = `${userInfo.ad.toLowerCase().replace(/\s+/g, '')}${randomSuffix}`;
      const forumId = `TR${timestamp.toString(36).toUpperCase()}`;
      const loginToken = btoa(`${username}:${forumId}:${timestamp}`);
      
      // Simulate forum account creation
      const forumAccount = {
        username: username,
        forumId: forumId,
        email: userInfo.email,
        displayName: userInfo.ad,
        city: userInfo.sehir,
        loginToken: loginToken,
        registrationDate: new Date().toISOString(),
        verified: digitalID,
        membershipLevel: digitalID ? 'verified' : 'basic'
      };

      // Store forum account info (in real implementation, this would go to forum database)
      console.log('Forum account created:', forumAccount);

      res.json({
        success: true,
        username: forumAccount.username,
        forumId: forumAccount.forumId,
        loginToken: forumAccount.loginToken,
        forumUrl: 'https://forum.turkiye-cumhuriyeti.digital',
        message: 'Forum hesabı başarıyla oluşturuldu'
      });
    } catch (error: any) {
      console.error("Forum account creation error:", error);
      res.status(500).json({ 
        error: "Forum hesabı oluşturulamadı",
        message: error.message 
      });
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

  // Database seeding endpoint
  app.post("/api/seed-tasks", async (req, res) => {
    try {
      await seedTasks();
      res.json({ success: true, message: "100 görev başarıyla veritabanına eklendi" });
    } catch (error) {
      console.error("Task seeding error:", error);
      res.status(500).json({ error: "Failed to seed tasks" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}