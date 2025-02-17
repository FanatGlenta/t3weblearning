import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../public/locales/en/en.json";
import ruTranslation from "../public/locales/ru/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    ru: { translation: ruTranslation },
  },
  lng: "ru",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
