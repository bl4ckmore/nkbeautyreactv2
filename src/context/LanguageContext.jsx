import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // 1. Determine initial language (checks URL first, then LocalStorage)
  const [lang, setLangState] = useState(() => {
    const path = window.location.pathname;
    if (path.startsWith('/ka')) return 'ge'; // Map /ka URL to 'ge' internal state
    if (path.startsWith('/en')) return 'en';
    
    return localStorage.getItem('site_lang') || 'ge';
  });

  const setLang = (newLang) => {
    // 2. Update state and storage
    setLangState(newLang);
    localStorage.setItem('site_lang', newLang);
    
    // 3. Magically update the URL without refreshing the page
    const urlLang = newLang === 'ge' ? 'ka' : 'en';
    const currentPath = window.location.pathname;
    let newPath = `/${urlLang}`;
    
    // Replace existing language prefix if it's already there
    if (currentPath.startsWith('/en') || currentPath.startsWith('/ka')) {
      newPath = currentPath.replace(/^\/(en|ka)/, `/${urlLang}`);
    } else {
      // Otherwise, add the language prefix to the current path
      newPath = currentPath === '/' ? `/${urlLang}` : `/${urlLang}${currentPath}`;
    }
    
    // Push the new URL to the browser
    window.history.replaceState(null, '', newPath + window.location.search + window.location.hash);
  };

  // Update the HTML lang tag for CSS font loading
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}