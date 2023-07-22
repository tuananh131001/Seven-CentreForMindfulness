import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'

import vi from '../../src/locales/vi.json'
import en from '../../src/locales/en.json'

import 'intl-pluralrules'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
  lng: Localization.locale.split('-')[0],
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
