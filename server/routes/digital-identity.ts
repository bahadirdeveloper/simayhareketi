import type { Express } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { dijitalKimlikler, users, odemeler } from "@shared/schema";
import { generateDigitalIdentityFromUserData } from "../lib/tc-generator";
import { z } from "zod";

// Dijital kimlik indirme için form şeması
const downloadRequestSchema = z.object({
  userId: z.number(),
  tcNo: z.string().optional(),
});

export function registerDigitalIdentityRoutes(app: Express) {
  
  // Kullanıcının dijital kimliğini getir
  app.get("/api/digital-identity/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Geçersiz kullanıcı ID" });
      }

      const identity = await db
        .select()
        .from(dijitalKimlikler)
        .where(eq(dijitalKimlikler.userId, userId))
        .limit(1);

      if (identity.length === 0) {
        return res.status(404).json({ error: "Dijital kimlik bulunamadı" });
      }

      res.json(identity[0]);
    } catch (error) {
      console.error("Dijital kimlik getirme hatası:", error);
      res.status(500).json({ error: "Sunucu hatası" });
    }
  });

  // Yeni dijital kimlik oluştur (ödeme sonrası otomatik)
  app.post("/api/digital-identity/generate", async (req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "Kullanıcı ID gerekli" });
      }

      // Kullanıcının ödeme yaptığını kontrol et
      const payment = await db
        .select()
        .from(odemeler)
        .where(eq(odemeler.userId, userId))
        .limit(1);

      if (payment.length === 0) {
        return res.status(403).json({ error: "Önce ödeme yapmanız gerekli" });
      }

      // Zaten dijital kimlik var mı kontrol et
      const existingIdentity = await db
        .select()
        .from(dijitalKimlikler)
        .where(eq(dijitalKimlikler.userId, userId))
        .limit(1);

      if (existingIdentity.length > 0) {
        return res.status(409).json({ error: "Bu kullanıcı için zaten dijital kimlik mevcut" });
      }

      // Bu endpoint artık kullanılmıyor - kimlikler premium paket alımında otomatik oluşturuluyor
      return res.status(400).json({ 
        error: "Dijital kimlik oluşturmak için premium paket satın alın",
        redirect: "/premium-paketler" 
      });
    } catch (error) {
      console.error("Dijital kimlik oluşturma hatası:", error);
      res.status(500).json({ error: "Dijital kimlik oluşturulamadı" });
    }
  });

  // Dijital kimliği PDF olarak indir
  app.post("/api/digital-identity/download", async (req, res) => {
    try {
      const validatedData = downloadRequestSchema.parse(req.body);
      const { userId, tcNo } = validatedData;

      let identity;
      
      if (tcNo) {
        // TC numarası ile ara
        identity = await db
          .select()
          .from(dijitalKimlikler)
          .where(eq(dijitalKimlikler.tcNo, tcNo))
          .limit(1);
      } else {
        // Kullanıcı ID ile ara
        identity = await db
          .select()
          .from(dijitalKimlikler)
          .where(eq(dijitalKimlikler.userId, userId))
          .limit(1);
      }

      if (identity.length === 0) {
        return res.status(404).json({ error: "Dijital kimlik bulunamadı" });
      }

      const identityData = identity[0];

      // PDF oluştur (HTML template kullanarak)
      const htmlContent = generateIdentityHTML(identityData);
      
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Disposition', `attachment; filename="tc-kimlik-${identityData.tcNo}.html"`);
      res.send(htmlContent);
      
    } catch (error) {
      console.error("Dijital kimlik indirme hatası:", error);
      res.status(500).json({ error: "İndirme işlemi başarısız" });
    }
  });

  // Tüm dijital kimlikleri listele (admin)
  app.get("/api/digital-identity/list", async (req, res) => {
    try {
      const identities = await db
        .select({
          id: dijitalKimlikler.id,
          tcNo: dijitalKimlikler.tcNo,
          ad: dijitalKimlikler.ad,
          soyad: dijitalKimlikler.soyad,
          dogumTarihi: dijitalKimlikler.dogumTarihi,
          aktif: dijitalKimlikler.aktif,
          olusturulmaTarihi: dijitalKimlikler.olusturulmaTarihi,
          userId: dijitalKimlikler.userId
        })
        .from(dijitalKimlikler)
        .orderBy(dijitalKimlikler.olusturulmaTarihi);

      res.json(identities);
    } catch (error) {
      console.error("Dijital kimlik listeleme hatası:", error);
      res.status(500).json({ error: "Sunucu hatası" });
    }
  });

  // Dijital kimlik doğrulama
  app.post("/api/digital-identity/verify", async (req, res) => {
    try {
      const { tcNo, qrCode } = req.body;

      if (!tcNo && !qrCode) {
        return res.status(400).json({ error: "TC numarası veya QR kod gerekli" });
      }

      let identity;
      
      if (qrCode) {
        identity = await db
          .select()
          .from(dijitalKimlikler)
          .where(eq(dijitalKimlikler.qrKod, qrCode))
          .limit(1);
      } else {
        identity = await db
          .select()
          .from(dijitalKimlikler)
          .where(eq(dijitalKimlikler.tcNo, tcNo))
          .limit(1);
      }

      if (identity.length === 0) {
        return res.json({ valid: false, message: "Kimlik bulunamadı" });
      }

      const identityData = identity[0];
      
      if (!identityData.aktif) {
        return res.json({ valid: false, message: "Kimlik aktif değil" });
      }

      const now = new Date();
      const expiryDate = new Date(identityData.gecerlilikTarihi);
      
      if (now > expiryDate) {
        return res.json({ valid: false, message: "Kimlik süresi dolmuş" });
      }

      res.json({
        valid: true,
        identity: {
          tcNo: identityData.tcNo,
          ad: identityData.ad,
          soyad: identityData.soyad,
          dogumTarihi: identityData.dogumTarihi,
          gecerlilikTarihi: identityData.gecerlilikTarihi
        }
      });
    } catch (error) {
      console.error("Dijital kimlik doğrulama hatası:", error);
      res.status(500).json({ error: "Doğrulama işlemi başarısız" });
    }
  });
}

// HTML kimlik kartı template
function generateIdentityHTML(identity: any): string {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>T.C. Kimlik Belgesi - ${identity.ad} ${identity.soyad}</title>
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .kimlik-karti {
            background: white;
            width: 85.6mm;
            height: 54mm;
            margin: 40px auto;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            overflow: hidden;
            position: relative;
            border: 2px solid #e30a17;
        }
        
        .baslik {
            background: linear-gradient(135deg, #e30a17, #b8080f);
            color: white;
            padding: 4px 8px;
            font-size: 8px;
            font-weight: bold;
            text-align: center;
            letter-spacing: 0.5px;
        }
        
        .icerik {
            padding: 6px 8px;
            font-size: 6px;
            line-height: 1.2;
        }
        
        .satir {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
        }
        
        .etiket {
            font-weight: bold;
            color: #333;
            width: 35%;
        }
        
        .deger {
            color: #000;
            width: 65%;
            text-align: right;
        }
        
        .tc-no {
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            margin: 4px 0;
            color: #e30a17;
            letter-spacing: 1px;
        }
        
        .ad-soyad {
            font-size: 8px;
            font-weight: bold;
            text-align: center;
            margin: 2px 0;
            color: #000;
        }
        
        .seri-belge {
            position: absolute;
            top: 20px;
            right: 8px;
            font-size: 5px;
            color: #666;
        }
        
        .qr-kod {
            position: absolute;
            bottom: 4px;
            right: 4px;
            width: 12mm;
            height: 12mm;
            background: #f0f0f0;
            border: 1px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4px;
            color: #666;
        }
        
        .guvenlik {
            position: absolute;
            bottom: 4px;
            left: 4px;
            font-size: 4px;
            color: #999;
            max-width: 50%;
        }
        
        .download-container {
            text-align: center;
            margin-top: 40px;
        }
        
        .download-btn {
            background: #e30a17;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: background 0.3s;
        }
        
        .download-btn:hover {
            background: #b8080f;
        }
        
        @media print {
            body {
                background: white;
            }
            .download-container {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="kimlik-karti">
        <div class="baslik">
            TÜRKİYE CUMHURİYETİ KIMLIK BELGESİ
        </div>
        
        <div class="seri-belge">
            Seri: ${identity.seriNo}<br>
            No: ${identity.belgeNo}
        </div>
        
        <div class="icerik">
            <div class="tc-no">${identity.tcNo}</div>
            <div class="ad-soyad">${identity.ad} ${identity.soyad}</div>
            
            <div class="satir">
                <span class="etiket">Doğum:</span>
                <span class="deger">${identity.dogumTarihi}</span>
            </div>
            
            <div class="satir">
                <span class="etiket">Yer:</span>
                <span class="deger">${identity.dogumYeri}</span>
            </div>
            
            <div class="satir">
                <span class="etiket">Baba:</span>
                <span class="deger">${identity.babaAdi}</span>
            </div>
            
            <div class="satir">
                <span class="etiket">Ana:</span>
                <span class="deger">${identity.anaAdi}</span>
            </div>
            
            <div class="satir">
                <span class="etiket">Cinsiyet:</span>
                <span class="deger">${identity.cinsiyet === 'E' ? 'ERKEK' : 'KADIN'}</span>
            </div>
            
            <div class="satir">
                <span class="etiket">Kan Grubu:</span>
                <span class="deger">${identity.kanGrubu}</span>
            </div>
        </div>
        
        <div class="qr-kod">
            QR
        </div>
        
        <div class="guvenlik">
            Dijital İmza: ${identity.dijitalImza.substring(0, 16)}...
        </div>
    </div>
    
    <div class="download-container">
        <button class="download-btn" onclick="window.print()">
            📄 Yazdır / PDF İndir
        </button>
    </div>
</body>
</html>`;
}