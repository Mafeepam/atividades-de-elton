import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);
const DEFAULT_LANGUAGE = 'pt-BR';
const STORAGE_KEY = 'idioma';


function lookup(language, key) {
  return key.split('.').reduce((obj, part) => obj?.[part], translations[language]);
}


function getSavedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && translations[saved] ? saved : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getSavedLanguage);


  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {

    }
  }, [language]);

  const t = useCallback(
    (key, vars = {}, lang = language) => {
      const value = lookup(lang, key) ?? lookup(DEFAULT_LANGUAGE, key) ?? key;
      if (typeof value !== 'string') return value; // ex.: listas, como as perguntas do FAQ
      return value.replace(/\{(\w+)\}/g, (match, name) => (name in vars ? vars[name] : match));
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de <LanguageProvider>');
  }
  return context;
}
