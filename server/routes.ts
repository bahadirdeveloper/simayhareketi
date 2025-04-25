import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for the application
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Dünyayı Kurtarma Operasyonu API çalışıyor" });
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

  const httpServer = createServer(app);

  return httpServer;
}
