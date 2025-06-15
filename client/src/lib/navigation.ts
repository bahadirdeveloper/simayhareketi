// Global navigation helper with scroll reset functionality

export const scrollToTop = () => {
  // Multiple scroll reset methods for compatibility
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  // Also scroll the main content container
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.scrollTop = 0;
  }
  
  // Force immediate scroll for mobile devices
  setTimeout(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, 0);
};

export const navigateWithScrollReset = (navigate: (path: string) => void, path: string) => {
  scrollToTop();
  navigate(path);
  
  // Additional scroll reset after navigation
  setTimeout(() => {
    scrollToTop();
  }, 100);
};