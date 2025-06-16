import crypto from 'crypto';

/**
 * Türkiye Cumhuriyeti TC Kimlik Numarası Üretici
 * Gerçek TC algoritmasına uygun 11 haneli numara üretir
 */

// TC Kimlik numarası algoritması kontrolü
export function validateTCNumber(tcNumber: string): boolean {
  if (!/^\d{11}$/.test(tcNumber)) return false;
  if (tcNumber[0] === '0') return false;
  
  const digits = tcNumber.split('').map(Number);
  
  // İlk 10 hanenin toplamının son hanesi, 11. hane olmalı
  const sum = digits.slice(0, 10).reduce((a, b) => a + b, 0);
  if (sum % 10 !== digits[10]) return false;
  
  // 1,3,5,7,9. hanelerin toplamının 7 katından 2,4,6,8. hanelerin toplamı çıkarıldığında
  // çıkan sonucun 10'a bölümünden kalan, 10. haneye eşit olmalı
  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
  const check = ((oddSum * 7) - evenSum) % 10;
  
  return check === digits[9];
}

// Yeni TC kimlik numarası üret
export function generateTCNumber(): string {
  let tcNumber: string;
  let attempts = 0;
  const maxAttempts = 1000;
  
  do {
    // İlk hane 1-9 arası olmalı
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    
    // 2-9. haneler rastgele
    const middleDigits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
    
    // 10. haneyi hesapla
    const oddSum = firstDigit + middleDigits[1] + middleDigits[3] + middleDigits[5] + middleDigits[7];
    const evenSum = middleDigits[0] + middleDigits[2] + middleDigits[4] + middleDigits[6];
    const tenthDigit = ((oddSum * 7) - evenSum) % 10;
    
    // 11. haneyi hesapla
    const firstTenSum = firstDigit + middleDigits.reduce((a, b) => a + b, 0) + tenthDigit;
    const eleventhDigit = firstTenSum % 10;
    
    tcNumber = `${firstDigit}${middleDigits.join('')}${tenthDigit}${eleventhDigit}`;
    attempts++;
    
    if (attempts > maxAttempts) {
      throw new Error('TC numarası üretilemedi');
    }
  } while (!validateTCNumber(tcNumber));
  
  return tcNumber;
}

// Seri numarası üret (A1B formatında)
export function generateSerialNumber(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  const firstLetter = letters[Math.floor(Math.random() * letters.length)];
  const number = numbers[Math.floor(Math.random() * numbers.length)];
  const secondLetter = letters[Math.floor(Math.random() * letters.length)];
  
  return `${firstLetter}${number}${secondLetter}`;
}

// Belge numarası üret (9 haneli)
export function generateDocumentNumber(): string {
  return Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
}

// Kayıt numarası üret
export function generateRegistrationNumber(): string {
  const year = new Date().getFullYear();
  const randomPart = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
  return `${year}${randomPart}`;
}

// Dijital imza üret
export function generateDigitalSignature(data: string): string {
  return crypto.createHash('sha256').update(data + Date.now().toString()).digest('hex');
}

// QR kod verisi üret
export function generateQRCodeData(tcNumber: string, name: string, surname: string): string {
  const data = {
    tc: tcNumber,
    ad: name,
    soyad: surname,
    tarih: new Date().toISOString(),
    tip: 'DIJITAL_KIMLIK_V1'
  };
  
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

// Türk isimleri havuzu
const turkishNames = {
  erkek: [
    'Ahmet', 'Mehmet', 'Mustafa', 'Ali', 'Hasan', 'Hüseyin', 'İbrahim', 'İsmail', 
    'Ömer', 'Osman', 'Süleyman', 'Yusuf', 'Kemal', 'Murat', 'Fatih', 'Emre',
    'Burak', 'Cem', 'Deniz', 'Enes', 'Furkan', 'Gökhan', 'Halil', 'Kaan',
    'Onur', 'Serkan', 'Tolga', 'Umut', 'Volkan', 'Yakup'
  ],
  kadin: [
    'Fatma', 'Ayşe', 'Emine', 'Hatice', 'Zeynep', 'Özlem', 'Serpil', 'Gül',
    'Hacer', 'Meryem', 'Sevgi', 'Elif', 'Derya', 'Sibel', 'Pınar', 'Burcu',
    'Ebru', 'Gamze', 'Hülya', 'İlknur', 'Kübra', 'Leyla', 'Melike', 'Nazlı',
    'Özge', 'Pelin', 'Seda', 'Tuba', 'Ülkü', 'Yasemin'
  ]
};

const turkishSurnames = [
  'Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Özkan', 'Aydın', 'Özdemir',
  'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Kara', 'Koç', 'Kurt',
  'Özgen', 'Erdoğan', 'Güneş', 'Korkmaz', 'Öztürk', 'Keskin', 'Tunç', 'Polat',
  'Karaca', 'Güler', 'Bulut', 'Akın', 'Ateş', 'Kaplan'
];

const turkishCities = [
  'İSTANBUL', 'ANKARA', 'İZMİR', 'BURSA', 'ANTALYA', 'ADANA', 'KONYA', 'GAZİANTEP',
  'ŞANLIURFA', 'KOCAELİ', 'MERSİN', 'DİYARBAKIR', 'HATAY', 'MANİSA', 'KAYSERI',
  'SAMSUN', 'BALIKESİR', 'KAHRAMANMARAŞ', 'VAN', 'AYDIN', 'DENIZLI', 'SAKARYA',
  'ŞIRNAK', 'MUĞLA', 'TEKİRDAĞ', 'TRABZON', 'ELÂZIĞ', 'ERZURUM', 'SİVAS', 'ZONGULDAK'
];

// Rastgele Türk ismi üret
export function generateTurkishName(gender: 'E' | 'K'): { ad: string; soyad: string } {
  const names = gender === 'E' ? turkishNames.erkek : turkishNames.kadin;
  const ad = names[Math.floor(Math.random() * names.length)];
  const soyad = turkishSurnames[Math.floor(Math.random() * turkishSurnames.length)];
  
  return { ad, soyad };
}

// Rastgele doğum tarihi üret (18-80 yaş arası)
export function generateBirthDate(): string {
  const today = new Date();
  const minAge = 18;
  const maxAge = 80;
  
  const birthYear = today.getFullYear() - Math.floor(Math.random() * (maxAge - minAge + 1)) - minAge;
  const birthMonth = Math.floor(Math.random() * 12) + 1;
  const birthDay = Math.floor(Math.random() * 28) + 1; // 28 günü güvenli
  
  return `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;
}

// Rastgele şehir üret
export function generateBirthPlace(): string {
  return turkishCities[Math.floor(Math.random() * turkishCities.length)];
}

// Kan grubu üret
export function generateBloodType(): string {
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', '0+', '0-'];
  return bloodTypes[Math.floor(Math.random() * bloodTypes.length)];
}

// Tam dijital kimlik verisi üret
export function generateFullDigitalIdentity(userId: number): any {
  const gender = Math.random() > 0.5 ? 'E' : 'K';
  const { ad, soyad } = generateTurkishName(gender);
  const tcNumber = generateTCNumber();
  const birthDate = generateBirthDate();
  const birthPlace = generateBirthPlace();
  const serialNumber = generateSerialNumber();
  const documentNumber = generateDocumentNumber();
  const registrationNumber = generateRegistrationNumber();
  const bloodType = generateBloodType();
  
  // Geçerlilik tarihi (10 yıl sonra)
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 10);
  
  const signatureData = `${tcNumber}${ad}${soyad}${birthDate}${userId}`;
  const digitalSignature = generateDigitalSignature(signatureData);
  const qrCode = generateQRCodeData(tcNumber, ad, soyad);
  
  return {
    userId,
    tcNo: tcNumber,
    ad,
    soyad,
    dogumTarihi: birthDate,
    dogumYeri: birthPlace,
    seriNo: serialNumber,
    belgeNo: documentNumber,
    gecerlilikTarihi: expiryDate.toISOString(),
    babaAdi: generateTurkishName('E').ad,
    anaAdi: generateTurkishName('K').ad,
    uyruk: 'TÜRKİYE CUMHURİYETİ',
    cinsiyet: gender,
    medeniHal: Math.random() > 0.5 ? 'B' : 'E', // B: Bekar, E: Evli
    din: 'İSLAM',
    kanGrubu: bloodType,
    kayitNo: registrationNumber,
    dijitalImza: digitalSignature,
    qrKod: qrCode,
    aktif: true
  };
}