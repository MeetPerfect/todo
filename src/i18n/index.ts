import { Language } from '../contexts/LanguageContext';
import { zhTranslations } from './translations/zh';
import { enTranslations } from './translations/en';

export const translations = {
  zh: zhTranslations,
  en: enTranslations,
};

export const t = (key: keyof typeof zhTranslations, language: Language): string => {
  const langTranslations = translations[language];
  return langTranslations[key] || key;
};