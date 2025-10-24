
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import zu from './locales/zu/translation.json';
import af from './locales/af/translation.json';
import st from './locales/st/translation.json';


const saved =
  typeof window !== 'undefined' && localStorage.getItem('lang')
    ? localStorage.getItem('lang')
    : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zu: { translation: zu },
      af: { translation: af },
      st: { translation: st },
    },
    lng: saved,            
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
