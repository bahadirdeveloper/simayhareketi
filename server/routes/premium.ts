import type { Express } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { premiumUyelikler, odemeler, dijitalKimlikler, users } from "@shared/schema";
import { generateDigitalIdentityFromUserData } from "../lib/tc-generator";
import { PREMIUM_PACKAGES } from "@shared/packages";
import { z } from "zod";

// Premium package purchase schema
const purchaseSchema = z.object({
  packageId: z.enum(['basic', 'premium', 'enterprise']),
  userProfile: z.object({
    ad: z.string().min(1),
    soyad: z.string().min(1),
    dogumTarihi: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    dogumYeri: z.string().min(1),
    babaAdi: z.string().optional(),
    anaAdi: z.string().optional(),
    cinsiyet: z.enum(['E', 'K']),
    kanGrubu: z.string().optional(),
  }),
});

export function registerPremiumRoutes(app: Express) {
  
  // Purchase premium package and auto-generate digital identity
  app.post("/api/premium/purchase", async (req, res) => {
    try {
      const { packageId, userProfile } = purchaseSchema.parse(req.body);
      const packageInfo = PREMIUM_PACKAGES[packageId.toUpperCase() as keyof typeof PREMIUM_PACKAGES];
      
      if (!packageInfo) {
        return res.status(400).json({ error: "Geçersiz paket" });
      }

      // Create user if doesn't exist (simplified for demo)
      let userId = 1;
      
      try {
        const existingUser = await db.select().from(users).where(eq(users.id, userId)).limit(1);
        if (existingUser.length === 0) {
          const [newUser] = await db.insert(users).values({
            username: `${userProfile.ad.toLowerCase()}_${userProfile.soyad.toLowerCase()}`,
            password: 'temp_password',
            email: `${userProfile.ad.toLowerCase()}@example.com`,
            name: `${userProfile.ad} ${userProfile.soyad}`,
          }).returning();
          userId = newUser.id;
        }
      } catch (error) {
        // User might already exist, continue with userId = 1
      }

      // Create premium membership
      const membershipEndDate = new Date();
      membershipEndDate.setFullYear(membershipEndDate.getFullYear() + 1);

      const [membership] = await db.insert(premiumUyelikler).values({
        userId,
        planTipi: packageId,
        fiyat: Math.round(packageInfo.price * 100), // Convert to kuruş
        para_birimi: 'USD',
        bitisTarihi: membershipEndDate,
        durum: 'aktif',
      }).returning();

      // Create payment record
      await db.insert(odemeler).values({
        userId,
        uyelikId: membership.id,
        miktar: Math.round(packageInfo.price * 100),
        para_birimi: 'USD',
        durum: 'basarili',
        odemeYontemi: 'stripe',
        aciklama: `${packageInfo.name} satın alımı`,
      });

      // Auto-generate digital identity with real user data
      const identityData = generateDigitalIdentityFromUserData({
        userId,
        uyelikId: membership.id,
        ad: userProfile.ad,
        soyad: userProfile.soyad,
        dogumTarihi: userProfile.dogumTarihi,
        dogumYeri: userProfile.dogumYeri,
        babaAdi: userProfile.babaAdi,
        anaAdi: userProfile.anaAdi,
        cinsiyet: userProfile.cinsiyet,
        kanGrubu: userProfile.kanGrubu,
      });

      const [digitalIdentity] = await db.insert(dijitalKimlikler).values(identityData).returning();

      res.status(201).json({
        message: "Premium paket başarıyla satın alındı ve dijital kimlik oluşturuldu",
        membership,
        digitalIdentity: {
          id: digitalIdentity.id,
          tcNo: digitalIdentity.tcNo,
          ad: digitalIdentity.ad,
          soyad: digitalIdentity.soyad,
        }
      });

    } catch (error) {
      console.error("Premium package purchase error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Geçersiz veri", details: error.errors });
      }
      res.status(500).json({ error: "Paket satın alımı başarısız" });
    }
  });

  // Get user's premium membership status
  app.get("/api/premium/status/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Geçersiz kullanıcı ID" });
      }

      const membership = await db
        .select()
        .from(premiumUyelikler)
        .where(eq(premiumUyelikler.userId, userId))
        .limit(1);

      if (membership.length === 0) {
        return res.status(404).json({ error: "Premium üyelik bulunamadı" });
      }

      const digitalIdentity = await db
        .select()
        .from(dijitalKimlikler)
        .where(eq(dijitalKimlikler.userId, userId))
        .limit(1);

      res.json({
        membership: membership[0],
        hasDigitalIdentity: digitalIdentity.length > 0,
        digitalIdentity: digitalIdentity[0] || null
      });

    } catch (error) {
      console.error("Premium status check error:", error);
      res.status(500).json({ error: "Sunucu hatası" });
    }
  });

  // Get all available packages
  app.get("/api/premium/packages", async (req, res) => {
    try {
      res.json({
        packages: Object.values(PREMIUM_PACKAGES)
      });
    } catch (error) {
      console.error("Package listing error:", error);
      res.status(500).json({ error: "Sunucu hatası" });
    }
  });

  // Cancel premium membership
  app.post("/api/premium/cancel/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Geçersiz kullanıcı ID" });
      }

      const [updatedMembership] = await db
        .update(premiumUyelikler)
        .set({ 
          durum: 'iptal',
          otomatikYenileme: false 
        })
        .where(eq(premiumUyelikler.userId, userId))
        .returning();

      if (!updatedMembership) {
        return res.status(404).json({ error: "Premium üyelik bulunamadı" });
      }

      res.json({
        message: "Premium üyelik başarıyla iptal edildi",
        membership: updatedMembership
      });

    } catch (error) {
      console.error("Premium cancellation error:", error);
      res.status(500).json({ error: "İptal işlemi başarısız" });
    }
  });
}