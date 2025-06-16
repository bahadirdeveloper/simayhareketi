// Premium package definitions
export const PREMIUM_PACKAGES = {
  BASIC: {
    id: 'basic',
    name: 'Temel Paket',
    price: 49.99,
    currency: 'USD',
    duration: 12, // months
    features: [
      'Dijital TC Kimlik Belgesi',
      'Temel görev erişimi',
      'Community desteği',
      'Mobil erişim'
    ],
    description: 'Temel ihtiyaçlarınız için uygun giriş paketi'
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium Paket',
    price: 99.99,
    currency: 'USD',
    duration: 12, // months
    features: [
      'Dijital TC Kimlik Belgesi',
      'Tüm görevlere erişim',
      'Öncelikli görev başvurusu',
      'Premium community erişimi',
      'Gelişmiş analitik',
      'Özel mentörlük'
    ],
    description: 'Aktif katılım ve gelişim için ideal paket'
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Kurumsal Paket',
    price: 199.99,
    currency: 'USD',
    duration: 12, // months
    features: [
      'Dijital TC Kimlik Belgesi',
      'Sınırsız görev erişimi',
      'Kurumsal koordinasyon araçları',
      'API erişimi',
      'Özel entegrasyon',
      'Dedicated support',
      'Özel eğitim programları',
      'Liderlik sertifikaları'
    ],
    description: 'Kurumlara ve liderlik gelişimi için profesyonel paket'
  }
} as const;

export type PackageType = keyof typeof PREMIUM_PACKAGES;