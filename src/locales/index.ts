import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationVI from './vi/translation';

export const defaultNS = 'translation';

export const resources = {
  en: {},
  vi: {
    translation: translationVI,
  },
} as const;

export const initI18n = () => {
  return i18n.use(initReactI18next).init({
    lng: 'vi',
    fallbackLng: 'vi',
    defaultNS,
    resources,
    compatibilityJSON: 'v3',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
  });
};
