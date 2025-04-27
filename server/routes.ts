import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { insertUserSchema, insertVisitorStatSchema, insertFeedbackSchema } from "@shared/schema";
import { z } from "zod";
import { 
  handleCreatePaymentIntent, 
  handleCreateSubscription, 
  handleWebhook,
  getPaymentPrices
} from "./routes/stripe";

export async function registerRoutes(app: Express): Promise<Server> {
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
  app.get('/:path*', (req, res, next) => {
    const path = req.params.path;
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
  app.post("/api/create-payment-intent", handleCreatePaymentIntent);
  app.post("/api/create-subscription", handleCreateSubscription);
  app.post("/api/webhook", handleWebhook);
  app.get("/api/payment-prices", getPaymentPrices);

  const httpServer = createServer(app);

  return httpServer;
}