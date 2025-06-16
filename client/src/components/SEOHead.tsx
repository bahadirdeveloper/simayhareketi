import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object;
}

const SEOHead = ({
  title,
  description,
  keywords = "halk sistemi, mazlum milletler, dayanışma, 100 görev, Atatürk, medeniyet, türkiye, halk defteri, mali şeffaflık, dijital kimlik",
  canonicalUrl,
  ogType = 'website',
  ogImage = '/icons/icon-512x512.png',
  author = 'Halk Sistemi Platformu',
  publishedTime,
  modifiedTime,
  structuredData
}: SEOHeadProps) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };
    
    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'Turkish');
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:locale', 'tr_TR', true);
    updateMetaTag('og:site_name', 'Halk Sistemi', true);
    
    if (canonicalUrl) {
      updateMetaTag('og:url', canonicalUrl, true);
      
      // Update canonical link
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    }
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:site', '@halksistemi');
    
    // Article specific tags
    if (ogType === 'article') {
      updateMetaTag('article:author', author, true);
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, true);
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, true);
      }
    }
    
    // Structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]#page-structured-data') as HTMLScriptElement;
      
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'page-structured-data';
        document.head.appendChild(script);
      }
      
      script.textContent = JSON.stringify(structuredData);
    }
    
    // Cleanup function
    return () => {
      // Reset to default values when component unmounts
      document.title = 'Halk Sistemi - Mazlum Halkların Dayanışma Platformu';
    };
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, author, publishedTime, modifiedTime, structuredData]);

  return null; // This component doesn't render anything
};

export default SEOHead;