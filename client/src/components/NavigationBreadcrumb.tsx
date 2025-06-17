import { useLocation } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';
import { navigateWithScrollReset } from '@/lib/navigation';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const NavigationBreadcrumb = () => {
  const [location, navigate] = useLocation();

  // Define page hierarchy and breadcrumb structure
  const getBreadcrumbPath = (pathname: string): BreadcrumbItem[] => {
    const basePath = [{ label: 'Ana Sayfa', path: '/home' }];
    
    const pathMappings: Record<string, BreadcrumbItem[]> = {
      '/': [{ label: 'Dil Seçimi', path: '/' }],
      '/dil-secimi': [{ label: 'Dil Seçimi', path: '/' }],
      '/home': [{ label: 'Ana Sayfa', path: '/home' }],
      '/turkiye': [...basePath, { label: 'Türkiye', path: '/turkiye' }],
      '/turknedir': [...basePath, { label: 'Türkiye', path: '/turkiye' }, { label: 'Türk Nedir?', path: '/turknedir' }],
      '/turkdetay': [...basePath, { label: 'Türkiye', path: '/turkiye' }, { label: 'Türk Nedir?', path: '/turknedir' }, { label: 'Detay', path: '/turkdetay' }],
      '/anayasa': [...basePath, { label: 'Türkiye', path: '/turkiye' }, { label: 'Anayasa', path: '/anayasa' }],
      '/anayasalar': [...basePath, { label: 'Türkiye', path: '/turkiye' }, { label: 'Anayasalarımız', path: '/anayasalar' }],
      '/manifesto': [...basePath, { label: 'Manifesto', path: '/manifesto' }],
      '/birlesik-manifesto': [...basePath, { label: 'Manifesto', path: '/manifesto' }],
      '/gorevler': [...basePath, { label: '100 Görev', path: '/gorevler' }],
      '/kurucu-eksikleri': [...basePath, { label: '100 Görev', path: '/gorevler' }, { label: 'Kurucu Eksikleri', path: '/kurucu-eksikleri' }],
      '/entegrasyon-sureci': [...basePath, { label: 'Entegrasyon Süreci', path: '/entegrasyon-sureci' }],
      '/dijital-kimlik': [...basePath, { label: 'Dijital Kimlik', path: '/dijital-kimlik' }],
      '/halk-defteri': [...basePath, { label: 'Halk Defteri', path: '/halk-defteri' }],
      '/canli-gelir-gider': [...basePath, { label: 'Mali Şeffaflık', path: '/canli-gelir-gider' }],
      '/katil': [...basePath, { label: 'Platforma Katıl', path: '/katil' }],
      '/cagri': [...basePath, { label: 'Türkiye', path: '/turkiye' }, { label: 'Çağrı', path: '/cagri' }],
      '/amac-savas': [...basePath, { label: 'Türkiye', path: '/turkiye' }, { label: 'Amaçlar & Savaşlar', path: '/amac-savas' }],
      '/premium-login': [...basePath, { label: 'Premium Giriş', path: '/premium-login' }],
      '/premium-dashboard': [...basePath, { label: 'Premium Giriş', path: '/premium-login' }, { label: 'Premium Panel', path: '/premium-dashboard' }],
      '/ulke-ekle': [...basePath, { label: 'Ülke Ekle', path: '/ulke-ekle' }]
    };

    return pathMappings[pathname] || basePath;
  };

  const breadcrumbs = getBreadcrumbPath(location);

  // Don't show breadcrumb on home page or single-level pages
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="mb-6" aria-label="Sayfa navigasyonu">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.path} className="flex items-center">
              {index === 0 && (
                <Home className="h-4 w-4 text-gray-400 mr-2" />
              )}
              
              {index < breadcrumbs.length - 1 ? (
                <>
                  <button
                    onClick={() => navigateWithScrollReset(navigate, item.path)}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 hover:underline"
                  >
                    {item.label}
                  </button>
                  <ChevronRight className="h-4 w-4 text-gray-500 mx-2" />
                </>
              ) : (
                <span className="text-white font-medium">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default NavigationBreadcrumb;