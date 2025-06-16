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
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionStatus: varchar("subscription_status", { length: 20 }).default("none"), // none, active, canceled, past_due
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

// Görevler (Tasks/Missions)
export const gorevler = pgTable("gorevler", {
  id: serial("id").primaryKey(),
  baslik: text("baslik").notNull(),
  aciklama: text("aciklama").notNull(),
  cagri: text("cagri"),
  kategori: varchar("kategori", { length: 50 }).notNull(),
  kontenjan: integer("kontenjan").notNull().default(25),
  aktif: boolean("aktif").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Görev başvuruları
export const gorevBasvurulari = pgTable("gorev_basvurulari", {
  id: serial("id").primaryKey(),
  gorevId: integer("gorev_id").notNull().references(() => gorevler.id, { onDelete: "cascade" }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  durum: varchar("durum", { length: 20 }).default("beklemede").notNull(), // beklemede, onaylandi, reddedildi, tamamlandi
  basvuruTarihi: timestamp("basvuru_tarihi").defaultNow().notNull(),
  onayTarihi: timestamp("onay_tarihi"),
  tamamlanmaTarihi: timestamp("tamamlanma_tarihi"),
  notlar: text("notlar"),
});

// Ülke ekleme başvuruları
export const ulkeBasvurulari = pgTable("ulke_basvurulari", {
  id: serial("id").primaryKey(),
  ulkeAdi: text("ulke_adi").notNull(),
  basvuranAdi: text("basvuran_adi").notNull(),
  email: text("email").notNull(),
  telefon: text("telefon"),
  aciklama: text("aciklama").notNull(),
  durum: varchar("durum", { length: 20 }).default("beklemede").notNull(), // beklemede, inceleniyor, onaylandi, reddedildi
  basvuruTarihi: timestamp("basvuru_tarihi").defaultNow().notNull(),
  inceleyenId: integer("inceleyen_id").references(() => users.id),
  incelemeTarihi: timestamp("inceleme_tarihi"),
  notlar: text("notlar"),
});

// Premium üyelikler ve ödemeler
export const premiumUyelikler = pgTable("premium_uyelikler", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  planTipi: varchar("plan_tipi", { length: 20 }).notNull(), // basic, premium, enterprise
  fiyat: integer("fiyat").notNull(), // Amount in kuruş
  para_birimi: varchar("para_birimi", { length: 3 }).default("TRY").notNull(),
  baslangicTarihi: timestamp("baslangic_tarihi").defaultNow().notNull(),
  bitisTarihi: timestamp("bitis_tarihi").notNull(),
  otomatikYenileme: boolean("otomatik_yenileme").default(true).notNull(),
  durum: varchar("durum", { length: 20 }).default("aktif").notNull(), // aktif, iptal, suresi_dolmus
  stripeSubscriptionId: text("stripe_subscription_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Ödeme geçmişi
export const odemeler = pgTable("odemeler", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  uyelikId: integer("uyelik_id").references(() => premiumUyelikler.id),
  miktar: integer("miktar").notNull(), // Amount in kuruş
  para_birimi: varchar("para_birimi", { length: 3 }).default("TRY").notNull(),
  durum: varchar("durum", { length: 20 }).notNull(), // basarili, basarisiz, beklemede, iade
  odemeYontemi: varchar("odeme_yontemi", { length: 20 }).notNull(), // stripe, banka_havalesi, kripto
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  aciklama: text("aciklama"),
  odemeTarihi: timestamp("odeme_tarihi").defaultNow().notNull(),
});

// Relations between tables
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(userSessions),
  visits: many(visitorStats),
  feedbacks: many(feedback),
  transactions: many(transactions),
  gorevBasvurulari: many(gorevBasvurulari),
  premiumUyelikler: many(premiumUyelikler),
  odemeler: many(odemeler),
  dijitalKimlikler: many(dijitalKimlikler),
}));

export const gorevlerRelations = relations(gorevler, ({ many }) => ({
  basvurular: many(gorevBasvurulari),
}));

export const gorevBasvurulariRelations = relations(gorevBasvurulari, ({ one }) => ({
  gorev: one(gorevler, {
    fields: [gorevBasvurulari.gorevId],
    references: [gorevler.id],
  }),
  user: one(users, {
    fields: [gorevBasvurulari.userId],
    references: [users.id],
  }),
}));

export const ulkeBasvurulariRelations = relations(ulkeBasvurulari, ({ one }) => ({
  inceleyen: one(users, {
    fields: [ulkeBasvurulari.inceleyenId],
    references: [users.id],
  }),
}));

export const premiumUyeliklerRelations = relations(premiumUyelikler, ({ one, many }) => ({
  user: one(users, {
    fields: [premiumUyelikler.userId],
    references: [users.id],
  }),
  odemeler: many(odemeler),
}));

export const odemelerRelations = relations(odemeler, ({ one }) => ({
  user: one(users, {
    fields: [odemeler.userId],
    references: [users.id],
  }),
  uyelik: one(premiumUyelikler, {
    fields: [odemeler.uyelikId],
    references: [premiumUyelikler.id],
  }),
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

export const insertGorevSchema = createInsertSchema(gorevler).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGorevBasvuruSchema = createInsertSchema(gorevBasvurulari).omit({
  id: true,
  basvuruTarihi: true,
  onayTarihi: true,
  tamamlanmaTarihi: true,
});

export const insertUlkeBasvuruSchema = createInsertSchema(ulkeBasvurulari).omit({
  id: true,
  basvuruTarihi: true,
  incelemeTarihi: true,
});

export const insertPremiumUyelikSchema = createInsertSchema(premiumUyelikler).omit({
  id: true,
  createdAt: true,
});

export const insertOdemeSchema = createInsertSchema(odemeler).omit({
  id: true,
  odemeTarihi: true,
});

// Dijital kimlik tablosu
export const dijitalKimlikler = pgTable("dijital_kimlikler", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tcNo: varchar("tc_no", { length: 11 }).notNull().unique(),
  ad: text("ad").notNull(),
  soyad: text("soyad").notNull(),
  dogumTarihi: text("dogum_tarihi").notNull(), // YYYY-MM-DD
  dogumYeri: text("dogum_yeri").notNull(),
  seriNo: varchar("seri_no", { length: 3 }).notNull(), // A1B gibi
  belgeNo: varchar("belge_no", { length: 9 }).notNull(),
  verilisTarihi: timestamp("verilis_tarihi").defaultNow().notNull(),
  gecerlilikTarihi: timestamp("gecerlilik_tarihi").notNull(),
  babaAdi: text("baba_adi"),
  anaAdi: text("ana_adi"),
  uyruk: text("uyruk").default("TÜRKİYE CUMHURİYETİ").notNull(),
  cinsiyet: varchar("cinsiyet", { length: 1 }).notNull(), // E/K
  medeniHal: varchar("medeni_hal", { length: 1 }), // B/E/D/O
  din: text("din").default("İSLAM"),
  kanGrubu: varchar("kan_grubu", { length: 3 }), // A+, B- gibi
  kayitNo: text("kayit_no").notNull(),
  dijitalImza: text("dijital_imza").notNull(),
  qrKod: text("qr_kod").notNull(),
  aktif: boolean("aktif").default(true).notNull(),
  olusturulmaTarihi: timestamp("olusturulma_tarihi").defaultNow().notNull(),
});

export const insertDijitalKimlikSchema = createInsertSchema(dijitalKimlikler).omit({
  id: true,
  olusturulmaTarihi: true,
});

// Dijital kimlik relations
export const dijitalKimliklerRelations = relations(dijitalKimlikler, ({ one }) => ({
  user: one(users, {
    fields: [dijitalKimlikler.userId],
    references: [users.id],
  }),
}));

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDijitalKimlik = z.infer<typeof insertDijitalKimlikSchema>;
export type DijitalKimlik = typeof dijitalKimlikler.$inferSelect;

export type InsertUserSession = z.infer<typeof insertUserSessionSchema>;
export type UserSession = typeof userSessions.$inferSelect;

export type InsertVisitorStat = z.infer<typeof insertVisitorStatSchema>;
export type VisitorStat = typeof visitorStats.$inferSelect;

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedback.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type InsertGorev = z.infer<typeof insertGorevSchema>;
export type Gorev = typeof gorevler.$inferSelect;

export type InsertGorevBasvuru = z.infer<typeof insertGorevBasvuruSchema>;
export type GorevBasvuru = typeof gorevBasvurulari.$inferSelect;

export type InsertUlkeBasvuru = z.infer<typeof insertUlkeBasvuruSchema>;
export type UlkeBasvuru = typeof ulkeBasvurulari.$inferSelect;

export type InsertPremiumUyelik = z.infer<typeof insertPremiumUyelikSchema>;
export type PremiumUyelik = typeof premiumUyelikler.$inferSelect;

export type InsertOdeme = z.infer<typeof insertOdemeSchema>;
export type Odeme = typeof odemeler.$inferSelect;
