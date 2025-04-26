import { users, type User, type InsertUser, userSessions, visitorStats, feedback, 
  type InsertUserSession, type UserSession, type InsertVisitorStat, type VisitorStat, 
  type InsertFeedback, type Feedback } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface with all CRUD methods needed for the application
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Session methods
  createSession(session: InsertUserSession): Promise<UserSession>;
  getSessionByToken(token: string): Promise<UserSession | undefined>;
  deleteSession(id: number): Promise<void>;
  
  // Visitor stats methods
  recordVisit(visit: InsertVisitorStat): Promise<VisitorStat>;
  getVisitStats(limit?: number): Promise<VisitorStat[]>;
  
  // Feedback methods
  submitFeedback(feedbackData: InsertFeedback): Promise<Feedback>;
  getAllFeedback(limit?: number): Promise<Feedback[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }
  
  // Session methods
  async createSession(session: InsertUserSession): Promise<UserSession> {
    const result = await db.insert(userSessions).values(session).returning();
    return result[0];
  }
  
  async getSessionByToken(token: string): Promise<UserSession | undefined> {
    const result = await db.select().from(userSessions).where(eq(userSessions.sessionToken, token));
    return result[0];
  }
  
  async deleteSession(id: number): Promise<void> {
    await db.delete(userSessions).where(eq(userSessions.id, id));
  }
  
  // Visitor stats methods
  async recordVisit(visit: InsertVisitorStat): Promise<VisitorStat> {
    const result = await db.insert(visitorStats).values(visit).returning();
    return result[0];
  }
  
  async getVisitStats(limit: number = 100): Promise<VisitorStat[]> {
    return db.select().from(visitorStats).limit(limit);
  }
  
  // Feedback methods
  async submitFeedback(feedbackData: InsertFeedback): Promise<Feedback> {
    const result = await db.insert(feedback).values(feedbackData).returning();
    return result[0];
  }
  
  async getAllFeedback(limit: number = 100): Promise<Feedback[]> {
    return db.select().from(feedback).limit(limit);
  }
}

export const storage = new DatabaseStorage();
