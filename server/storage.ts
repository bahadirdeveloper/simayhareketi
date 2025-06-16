import { users, type User, type InsertUser, userSessions, visitorStats, feedback, transactions,
  type InsertUserSession, type UserSession, type InsertVisitorStat, type VisitorStat, 
  type InsertFeedback, type Feedback, type InsertTransaction, type Transaction,
  gorevler, gorevBasvurulari, ulkeBasvurulari, premiumUyelikler, odemeler, dijitalKimlikler,
  type Gorev, type InsertGorev, type GorevBasvuru, type InsertGorevBasvuru,
  type UlkeBasvuru, type InsertUlkeBasvuru, type PremiumUyelik, type InsertPremiumUyelik,
  type Odeme, type InsertOdeme, type DijitalKimlik, type InsertDijitalKimlik } from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

// Interface with all CRUD methods needed for the application
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
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
  
  // Transaction methods
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getTransactions(limit?: number): Promise<Transaction[]>;
  getTransactionsByType(type: 'income' | 'expense', limit?: number): Promise<Transaction[]>;
  
  // Task/Mission methods
  getAllGorevler(): Promise<Gorev[]>;
  getGorev(id: number): Promise<Gorev | undefined>;
  createGorev(gorev: InsertGorev): Promise<Gorev>;
  updateGorev(id: number, gorev: Partial<InsertGorev>): Promise<Gorev>;
  
  // Task application methods
  createGorevBasvuru(basvuru: InsertGorevBasvuru): Promise<GorevBasvuru>;
  getGorevBasvurulari(gorevId?: number, userId?: number): Promise<GorevBasvuru[]>;
  getUserGorevBasvurulari(userId: number): Promise<GorevBasvuru[]>;
  updateGorevBasvuruDurum(id: number, durum: string): Promise<GorevBasvuru>;
  getGorevBasvuruCount(gorevId: number): Promise<number>;
  
  // Country application methods
  createUlkeBasvuru(basvuru: InsertUlkeBasvuru): Promise<UlkeBasvuru>;
  getUlkeBasvurulari(durum?: string): Promise<UlkeBasvuru[]>;
  updateUlkeBasvuruDurum(id: number, durum: string, inceleyenId?: number): Promise<UlkeBasvuru>;
  
  // Premium membership methods
  createPremiumUyelik(uyelik: InsertPremiumUyelik): Promise<PremiumUyelik>;
  getUserPremiumUyelik(userId: number): Promise<PremiumUyelik | undefined>;
  updatePremiumUyelikDurum(id: number, durum: string): Promise<PremiumUyelik>;
  
  // Payment methods
  createOdeme(odeme: InsertOdeme): Promise<Odeme>;
  getUserOdemeler(userId: number): Promise<Odeme[]>;
  updateOdemeDurum(id: number, durum: string): Promise<Odeme>;
  
  // User Stripe info update
  updateUserStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User>;
  
  // Digital identity methods
  createDijitalKimlik(kimlik: InsertDijitalKimlik): Promise<DijitalKimlik>;
  getDijitalKimlik(userId: number): Promise<DijitalKimlik | undefined>;
  getDijitalKimlikByTcNo(tcNo: string): Promise<DijitalKimlik | undefined>;
  updateDijitalKimlikDurum(id: number, aktif: boolean): Promise<DijitalKimlik>;
  getAllDijitalKimlikler(): Promise<DijitalKimlik[]>;
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

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
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
  
  // Transaction methods
  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const result = await db.insert(transactions).values(transaction).returning();
    return result[0];
  }
  
  async getTransactions(limit: number = 100): Promise<Transaction[]> {
    return db.select().from(transactions)
      .where(eq(transactions.isPublic, true))
      .orderBy(desc(transactions.transactionDate))
      .limit(limit);
  }
  
  async getTransactionsByType(type: 'income' | 'expense', limit: number = 100): Promise<Transaction[]> {
    return db.select().from(transactions)
      .where(eq(transactions.type, type))
      .orderBy(desc(transactions.transactionDate))
      .limit(limit);
  }
  
  // Task/Mission methods
  async getAllGorevler(): Promise<Gorev[]> {
    return db.select().from(gorevler)
      .where(eq(gorevler.aktif, true))
      .orderBy(asc(gorevler.id))
      .limit(100);
  }
  
  async getGorev(id: number): Promise<Gorev | undefined> {
    const result = await db.select().from(gorevler).where(eq(gorevler.id, id));
    return result[0];
  }
  
  async createGorev(gorev: InsertGorev): Promise<Gorev> {
    const result = await db.insert(gorevler).values(gorev).returning();
    return result[0];
  }
  
  async updateGorev(id: number, gorev: Partial<InsertGorev>): Promise<Gorev> {
    const result = await db.update(gorevler)
      .set({ ...gorev, updatedAt: new Date() })
      .where(eq(gorevler.id, id))
      .returning();
    return result[0];
  }
  
  // Task application methods
  async createGorevBasvuru(basvuru: InsertGorevBasvuru): Promise<GorevBasvuru> {
    const result = await db.insert(gorevBasvurulari).values(basvuru).returning();
    return result[0];
  }
  
  async getGorevBasvurulari(gorevId?: number, userId?: number): Promise<GorevBasvuru[]> {
    if (gorevId) {
      return db.select().from(gorevBasvurulari)
        .where(eq(gorevBasvurulari.gorevId, gorevId))
        .orderBy(desc(gorevBasvurulari.basvuruTarihi));
    } else if (userId) {
      return db.select().from(gorevBasvurulari)
        .where(eq(gorevBasvurulari.userId, userId))
        .orderBy(desc(gorevBasvurulari.basvuruTarihi));
    }
    
    return db.select().from(gorevBasvurulari)
      .orderBy(desc(gorevBasvurulari.basvuruTarihi));
  }

  async getUserGorevBasvurulari(userId: number): Promise<GorevBasvuru[]> {
    return db.select().from(gorevBasvurulari)
      .where(eq(gorevBasvurulari.userId, userId))
      .orderBy(desc(gorevBasvurulari.basvuruTarihi));
  }
  
  async updateGorevBasvuruDurum(id: number, durum: string): Promise<GorevBasvuru> {
    const updateData: any = { durum };
    
    if (durum === 'onaylandi') {
      updateData.onayTarihi = new Date();
    } else if (durum === 'tamamlandi') {
      updateData.tamamlanmaTarihi = new Date();
    }
    
    const result = await db.update(gorevBasvurulari)
      .set(updateData)
      .where(eq(gorevBasvurulari.id, id))
      .returning();
    return result[0];
  }
  
  async getGorevBasvuruCount(gorevId: number): Promise<number> {
    const result = await db.select().from(gorevBasvurulari)
      .where(eq(gorevBasvurulari.gorevId, gorevId));
    return result.length;
  }
  
  // Country application methods
  async createUlkeBasvuru(basvuru: InsertUlkeBasvuru): Promise<UlkeBasvuru> {
    const result = await db.insert(ulkeBasvurulari).values(basvuru).returning();
    return result[0];
  }
  
  async getUlkeBasvurulari(durum?: string): Promise<UlkeBasvuru[]> {
    if (durum) {
      return db.select().from(ulkeBasvurulari)
        .where(eq(ulkeBasvurulari.durum, durum))
        .orderBy(desc(ulkeBasvurulari.basvuruTarihi));
    }
    
    return db.select().from(ulkeBasvurulari)
      .orderBy(desc(ulkeBasvurulari.basvuruTarihi));
  }
  
  async updateUlkeBasvuruDurum(id: number, durum: string, inceleyenId?: number): Promise<UlkeBasvuru> {
    const updateData: any = { durum };
    
    if (inceleyenId) {
      updateData.inceleyenId = inceleyenId;
      updateData.incelemeTarihi = new Date();
    }
    
    const result = await db.update(ulkeBasvurulari)
      .set(updateData)
      .where(eq(ulkeBasvurulari.id, id))
      .returning();
    return result[0];
  }
  
  // Premium membership methods
  async createPremiumUyelik(uyelik: InsertPremiumUyelik): Promise<PremiumUyelik> {
    const result = await db.insert(premiumUyelikler).values(uyelik).returning();
    return result[0];
  }
  
  async getUserPremiumUyelik(userId: number): Promise<PremiumUyelik | undefined> {
    const result = await db.select().from(premiumUyelikler)
      .where(eq(premiumUyelikler.userId, userId))
      .orderBy(desc(premiumUyelikler.createdAt));
    return result[0];
  }
  
  async updatePremiumUyelikDurum(id: number, durum: string): Promise<PremiumUyelik> {
    const result = await db.update(premiumUyelikler)
      .set({ durum })
      .where(eq(premiumUyelikler.id, id))
      .returning();
    return result[0];
  }
  
  // Payment methods
  async createOdeme(odeme: InsertOdeme): Promise<Odeme> {
    const result = await db.insert(odemeler).values(odeme).returning();
    return result[0];
  }
  
  async getUserOdemeler(userId: number): Promise<Odeme[]> {
    return db.select().from(odemeler)
      .where(eq(odemeler.userId, userId))
      .orderBy(desc(odemeler.odemeTarihi));
  }
  
  async updateOdemeDurum(id: number, durum: string): Promise<Odeme> {
    const result = await db.update(odemeler)
      .set({ durum })
      .where(eq(odemeler.id, id))
      .returning();
    return result[0];
  }
  
  // User Stripe info update
  async updateUserStripeInfo(userId: number, stripeCustomerId: string, stripeSubscriptionId?: string): Promise<User> {
    const updateData: any = { stripeCustomerId };
    
    if (stripeSubscriptionId) {
      updateData.stripeSubscriptionId = stripeSubscriptionId;
      updateData.subscriptionStatus = 'active';
    }
    
    const result = await db.update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning();
    return result[0];
  }

  // Digital identity methods
  async createDijitalKimlik(kimlik: InsertDijitalKimlik): Promise<DijitalKimlik> {
    const result = await db.insert(dijitalKimlikler).values(kimlik).returning();
    return result[0];
  }

  async getDijitalKimlik(userId: number): Promise<DijitalKimlik | undefined> {
    const result = await db.select().from(dijitalKimlikler).where(eq(dijitalKimlikler.userId, userId));
    return result[0];
  }

  async getDijitalKimlikByTcNo(tcNo: string): Promise<DijitalKimlik | undefined> {
    const result = await db.select().from(dijitalKimlikler).where(eq(dijitalKimlikler.tcNo, tcNo));
    return result[0];
  }

  async updateDijitalKimlikDurum(id: number, aktif: boolean): Promise<DijitalKimlik> {
    const result = await db.update(dijitalKimlikler)
      .set({ aktif })
      .where(eq(dijitalKimlikler.id, id))
      .returning();
    return result[0];
  }

  async getAllDijitalKimlikler(): Promise<DijitalKimlik[]> {
    return await db.select().from(dijitalKimlikler).orderBy(desc(dijitalKimlikler.olusturulmaTarihi));
  }
}

export const storage = new DatabaseStorage();
