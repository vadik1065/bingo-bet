import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN from "./locales/en/translation.json";
import RUS from "./locales/ru/translation.json";
import FR from "./locales/fr/translation.json";
import DE from "./locales/de/translation.json";
import ES from "./locales/es/translation.json";
import ZH from "./locales/zh/translation.json";

// the translations
const resources = {
  GB: {
    translation: EN,
  },
  RU: {
    translation: RUS,
  },
  FR: {
    translation: FR,
  },
  DE: {
    translation: DE,
  },
  ES: {
    translation: ES,
  },
  ZH: {
    translation: ZH,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lan"),
  fallbackLng: "GB",
  debug: false,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
