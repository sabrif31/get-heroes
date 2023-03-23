import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      currentUserProfileUpdated: 'The profile has been updated !',
    },
  },
  fr: {
    translation: {
      currentUserProfileUpdated: 'Le profile a été mis à jour !',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18n
