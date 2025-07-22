import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import bn from './bn.json';

const getDefaultLanguage = () => {
  const storedLang = localStorage.getItem('i18nextLng');
  if (storedLang && ['en', 'bn'].includes(storedLang)) return storedLang;
  
  const browserLang = navigator.language;
  if (browserLang.startsWith('bn')) return 'bn';
  return 'en';
};

const defaultLang = getDefaultLanguage();

async function initI18n() {
  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        bn: { translation: bn },
      },
      lng: defaultLang,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      react: {
        useSuspense: true
      },
      returnNull: false,
      returnObjects: true,
      joinArrays: false,
      keySeparator: '.',
      nsSeparator: false,
      load: 'languageOnly',
      parseMissingKeyHandler: (key) => {
        console.warn(`Missing translation key: ${key}`);
        return key;
      }
    });
}

// Initialize i18n
initI18n().catch(err => {
  console.error('Error initializing i18n:', err);
});

// Update language attribute when language changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
  document.documentElement.lang = lng;
});

// Set initial language attribute
document.documentElement.lang = defaultLang;

export default i18n;
