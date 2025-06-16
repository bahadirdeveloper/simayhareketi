import { storage } from "./storage";
import type { InsertTransaction } from "@shared/schema";

// Sample financial data for transparency demonstration
export async function seedFinancialData() {
  try {
    console.log("Seeding financial transparency data...");

    const sampleTransactions: InsertTransaction[] = [
      // Income transactions (donations)
      {
        type: "income",
        amount: 5000,
        description: "Platform geliştirme bağışı",
        category: "Bağış",
        userId: null,
        referenceId: null
      },
      {
        type: "income", 
        amount: 2500,
        description: "Eğitim materyali desteği",
        category: "Bağış",
        userId: null,
        referenceId: null
      },
      {
        type: "income",
        amount: 1200,
        description: "Sunucu maliyeti bağışı",
        category: "Bağış", 
        userId: null,
        referenceId: null
      },
      {
        type: "income",
        amount: 800,
        description: "Topluluk desteği",
        category: "Bağış",
        userId: null,
        referenceId: null
      },
      {
        type: "income",
        amount: 3000,
        description: "Kültürel içerik geliştirme bağışı",
        category: "Bağış",
        userId: null,
        referenceId: null
      },

      // Expense transactions
      {
        type: "expense",
        amount: -2850,
        description: "Replit hosting aylık ücreti",
        category: "Sunucu",
        userId: null,
        referenceId: null
      },
      {
        type: "expense",
        amount: -450,
        description: "Domain yenileme (turkiye.com.tr)",
        category: "Sunucu",
        userId: null,
        referenceId: null
      },
      {
        type: "expense",
        amount: -320,
        description: "SSL sertifikası",
        category: "Sunucu",
        userId: null,
        referenceId: null
      },
      {
        type: "expense",
        amount: -1200,
        description: "Görsel tasarım hizmetleri",
        category: "Eğitim",
        userId: null,
        referenceId: null
      },
      {
        type: "expense",
        amount: -800,
        description: "Ses düzenleme ve prodüksiyon",
        category: "Eğitim",
        userId: null,
        referenceId: null
      },
      {
        type: "expense",
        amount: -600,
        description: "Veri yedekleme hizmeti",
        category: "Güvenlik",
        userId: null,
        referenceId: null
      },
      {
        type: "expense",
        amount: -250,
        description: "Güvenlik araçları lisansı",
        category: "Güvenlik",
        userId: null,
        referenceId: null
      },
      {
        type: "expense",
        amount: -180,
        description: "CDN hizmeti (hızlandırma)",
        category: "Sunucu",
        userId: null,
        referenceId: null
      }
    ];

    // Add transactions with different dates to show variety
    for (let i = 0; i < sampleTransactions.length; i++) {
      const transaction = sampleTransactions[i];
      
      // Create transactions over the past 2 months for realistic timeline
      const daysAgo = Math.floor(Math.random() * 60); // Random day within 2 months
      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - daysAgo);
      
      // Add the transaction
      await storage.createTransaction({
        ...transaction,
        createdAt: createdDate.toISOString()
      } as InsertTransaction);
      
      // Small delay to avoid overwhelming the database
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    console.log(`✅ Successfully seeded ${sampleTransactions.length} financial transactions`);
    console.log("Financial transparency data is now available");
    
  } catch (error) {
    console.error("❌ Error seeding financial data:", error);
  }
}

// Run this function if called directly
if (require.main === module) {
  seedFinancialData().then(() => {
    console.log("Financial seeding completed");
    process.exit(0);
  }).catch((error) => {
    console.error("Financial seeding failed:", error);
    process.exit(1);
  });
}