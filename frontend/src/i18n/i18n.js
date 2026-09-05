import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// In a real application, you'd use i18next-http-backend to load translations
// from /public/locales/en/translation.json etc. For now, we inline a few.
const resources = {
  en: {
    translation: {
      "app_name": "AgroSmart",
      "login_title": "Sign in to your account",
      "dashboard_title": "Farmer Dashboard",
      "welcome": "Welcome back, {{name}}",
      "logout": "Logout",
      "my_lands": "My Lands",
      "my_crops": "My Crops",
      "market_prices": "Market Prices",
    }
  },
  hi: {
    translation: {
      "app_name": "एग्रोस्मार्ट",
      "login_title": "अपने खाते में साइन इन करें",
      "dashboard_title": "किसान डैशबोर्ड",
      "welcome": "वापसी पर स्वागत है, {{name}}",
      "logout": "लॉग आउट",
      "my_lands": "मेरी भूमि",
      "my_crops": "मेरी फसलें",
      "market_prices": "बाजार भाव",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
