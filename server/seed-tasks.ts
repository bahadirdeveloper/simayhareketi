import { storage } from "./storage";
import fs from "fs";
import path from "path";

// Load tasks from JSON file
let tasks: any[] = [];

// Generate 100 comprehensive Turkish cultural tasks
const generateComprehensiveTasks = () => {
  const categories = ["eğitim", "kültür", "teknoloji", "çevre", "sosyal", "sağlık", "spor", "tarım"];
  const generatedTasks = [];
  
  for (let i = 1; i <= 100; i++) {
    const category = categories[(i - 1) % categories.length];
    generatedTasks.push({
      baslik: `🧩 ${i}. Görev: Kültürel Misyon ${i}`,
      cagri: `Toplumsal değerleri güçlendiren ${i}. göreviniz`,
      aciklama: `Bu görev, Türk kültürel değerlerini yaşatmak ve toplumsal dayanışmayı güçlendirmek amacıyla tasarlanmıştır. Görev ${i} ile ${category} alanında pozitif etki yaratacaksınız.`,
      kategori: category,
      kontenjan: Math.floor(Math.random() * 30) + 10,
      tamamlayan: 0,
      dosya: `pdf/gorev-${i}.pdf`,
      arkaplan: `gorev-${i}.webp`
    });
  }
  
  return generatedTasks;
};

tasks = generateComprehensiveTasks();
console.log(`Generated ${tasks.length} comprehensive cultural tasks`);

export async function seedTasks() {
  console.log("Starting task seeding process...");
  
  try {
    // Clear existing tasks
    const existingTasks = await storage.getAllGorevler();
    console.log(`Found ${existingTasks.length} existing tasks`);
    
    // Limit to exactly 100 tasks
    const limitedTasks = tasks.slice(0, 100);
    
    // Add exactly 100 tasks
    for (const task of limitedTasks) {
      await storage.createGorev({
        baslik: task.baslik,
        aciklama: task.aciklama,
        kategori: task.kategori
      });
    }
    
    console.log(`Successfully seeded exactly ${limitedTasks.length} tasks`);
    return { success: true, count: limitedTasks.length };
  } catch (error) {
    console.error("Error seeding tasks:", error);
    throw error;
  }
}