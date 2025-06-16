// Navigation utility functions for smooth transitions and scroll management

export const navigateWithScrollReset = (navigate: (path: string) => void, path: string) => {
  // Smooth scroll to top before navigation
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Small delay to allow scroll animation
  setTimeout(() => {
    navigate(path);
  }, 100);
};

export const scrollToSection = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const getPageTitle = (pathname: string): string => {
  const titles: Record<string, string> = {
    '/': 'Ana Sayfa',
    '/home': 'Ana Sayfa',
    '/turkiye': 'Türkiye',
    '/turknedir': 'Türk Nedir?',
    '/turkdetay': 'Türk Detay',
    '/anayasa': 'Anayasa',
    '/anayasalar': 'Anayasalarımız',
    '/manifesto': 'Manifesto',
    '/birlesik-manifesto': 'Birleşik Manifesto',
    '/gorevler': '100 Görev',
    '/kurucu-eksikleri': 'Kurucu Eksikleri',
    '/entegrasyon-sureci': 'Entegrasyon Süreci',
    '/dijital-kimlik': 'Dijital Kimlik',
    '/halk-defteri': 'Halk Defteri',
    '/canli-gelir-gider': 'Mali Şeffaflık',
    '/katil': 'Platforma Katıl',
    '/cagri': 'Çağrı',
    '/amac-savas': 'Amaçlar & Savaşlar',
    '/premium-login': 'Premium Giriş',
    '/premium-dashboard': 'Premium Panel',
    '/dil-secimi': 'Dil Seçimi',
    '/ulke-ekle': 'Ülke Ekle'
  };
  
  return titles[pathname] || 'Halk Sistemi';
};

export const getPageDescription = (pathname: string): string => {
  const descriptions: Record<string, string> = {
    '/': 'Atatürk\'ün Medeniyet Işığında - Türk Halkının Diriliş Platformu',
    '/home': 'Atatürk\'ün Medeniyet Işığında - Türk Halkının Diriliş Platformu',
    '/turkiye': 'Türkiye\'nin tarihsel kimliği ve kültürel değerleri',
    '/turknedir': 'Türk kimliğinin tanımı ve temel özellikleri',
    '/anayasa': 'Türkiye Cumhuriyeti Anayasası ve temel haklar',
    '/manifesto': 'Halk Sistemi Manifestosu - Diriliş için birleşik vizyon',
    '/gorevler': 'Atatürk\'ün Medeniyet Işığında kitabından 100 stratejik görev',
    '/entegrasyon-sureci': 'Platforma katılım ve entegrasyon süreci',
    '/dijital-kimlik': 'Dijital Türk kimlik belgesi sistemi',
    '/halk-defteri': 'Şeffaf halk yönetimi ve katılımcı demokrasi',
    '/canli-gelir-gider': 'Mali şeffaflık ve canlı gelir-gider takibi'
  };
  
  return descriptions[pathname] || 'Halk Sistemi - Atatürk\'ün Medeniyet Işığında';
};