import { useLocation } from 'wouter';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'wouter';

const pageMap: Record<string, { title: string; parent?: string }> = {
  '/': { title: 'Ana Sayfa' },
  '/halk-defteri': { title: 'Halk Defteri', parent: '/' },
  '/gorevler': { title: '100 Görev', parent: '/' },
  '/canli-gelir-gider': { title: 'Mali Şeffaflık', parent: '/' },
  '/halk-koordinasyon': { title: 'Halk Koordinasyon', parent: '/' },
  '/anayasa': { title: 'Anayasa', parent: '/' },
  '/language': { title: 'Diller', parent: '/' },
  '/turkiye': { title: 'Türkiye', parent: '/' },
  '/oppressed-nations': { title: 'Mazlum Milletler', parent: '/' },
  '/halk-manifestolar': { title: 'Halk Manifestoları', parent: '/' },
  '/kurucunun-eksikleri': { title: 'Kurucunun Eksikleri', parent: '/gorevler' },
  '/dijital-kimlik': { title: 'Dijital Kimlik', parent: '/' },
};

export function NavigationBreadcrumb() {
  const [location] = useLocation();
  
  const currentPage = pageMap[location];
  if (!currentPage) return null;

  const breadcrumbs = [];
  let current = location;
  
  while (current && pageMap[current]) {
    breadcrumbs.unshift({
      path: current,
      title: pageMap[current].title,
      isActive: current === location
    });
    current = pageMap[current].parent;
  }

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-4 px-4 py-2 bg-black/20 rounded-lg border border-red-600/20 backdrop-blur-sm">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center space-x-2">
          {index === 0 && <Home className="h-4 w-4" />}
          {crumb.isActive ? (
            <span className="text-red-400 font-medium">{crumb.title}</span>
          ) : (
            <Link href={crumb.path}>
              <span className="hover:text-white transition-colors cursor-pointer">
                {crumb.title}
              </span>
            </Link>
          )}
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          )}
        </div>
      ))}
    </nav>
  );
}