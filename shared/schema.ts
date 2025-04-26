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

// Relations between tables
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(userSessions),
  visits: many(visitorStats),
  feedbacks: many(feedback),
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

export const insertVisitorStatSchema = createInsertSchema(visitorStats).omit({
  id: true,
  visitDate: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  submittedAt: true,
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
