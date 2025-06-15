import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastLogin: timestamp("last_login"),
  preferredLanguage: varchar("preferred_language", { length: 10 }).default("tr"),
});

// User sessions
export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  sessionToken: text("session_token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Visitor stats to track welcome screen usage
export const visitorStats = pgTable("visitor_stats", {
  id: serial("id").primaryKey(),
  visitorIp: text("visitor_ip"),
  userAgent: text("user_agent"),
  language: varchar("language", { length: 10 }).notNull(),
  referrer: text("referrer"),
  visitDate: timestamp("visit_date").defaultNow().notNull(),
  userId: integer("user_id").references(() => users.id),
  hasInteracted: boolean("has_interacted").default(false),
});

// Feedback from users about the welcome screen
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  content: text("content").notNull(),
  rating: integer("rating"),
  language: varchar("language", { length: 10 }).notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

// Financial transactions for transparency
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 10 }).notNull(), // 'income' or 'expense'
  category: varchar("category", { length: 50 }).notNull(), // 'sunucu', 'domain', 'eğitim', 'entegrasyon', 'bağış', etc.
  description: text("description").notNull(),
  amount: integer("amount").notNull(), // Amount in kuruş (1 TL = 100 kuruş)
  currency: varchar("currency", { length: 3 }).default("TRY").notNull(),
  transactionDate: timestamp("transaction_date").defaultNow().notNull(),
  isPublic: boolean("is_public").default(true).notNull(), // Whether to show in public transparency table
  createdBy: integer("created_by").references(() => users.id),
  reference: text("reference"), // Reference number or external ID
});

// Relations between tables
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(userSessions),
  visits: many(visitorStats),
  feedbacks: many(feedback),
  transactions: many(transactions),
}));

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id],
  }),
}));

export const visitorStatsRelations = relations(visitorStats, ({ one }) => ({
  user: one(users, {
    fields: [visitorStats.userId],
    references: [users.id],
  }),
}));

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(users, {
    fields: [feedback.userId],
    references: [users.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  createdBy: one(users, {
    fields: [transactions.createdBy],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLogin: true,
});

export const insertUserSessionSchema = createInsertSchema(userSessions).omit({
  id: true,
  createdAt: true,
});

export const insertVisitorStatSchema = createInsertSchema(visitorStats)
  .omit({
    id: true,
    visitDate: true,
  })
  .extend({
    page: z.string().optional(),
    language: z.string().min(2).max(10).default("tr"),
    hasInteracted: z.boolean().default(false),
    visitorIp: z.string().optional(),
    userAgent: z.string().optional(),
    referrer: z.string().optional(),
    userId: z.number().optional(),
  });

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  submittedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  transactionDate: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertUserSession = z.infer<typeof insertUserSessionSchema>;
export type UserSession = typeof userSessions.$inferSelect;

export type InsertVisitorStat = z.infer<typeof insertVisitorStatSchema>;
export type VisitorStat = typeof visitorStats.$inferSelect;

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedback.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
