export default ({ config }) => ({
  ...config,
  name: 'my-first-words',
  slug: 'my-first-words',
  version: '1.0.0',
  orientation: 'portrait',
  scheme: 'myfirstwordsapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  
  // Multi-language support (basic)
  locales: {
    'pt-BR': './assets/locales/pt-BR.json',
    'pt-PT': './assets/locales/pt-PT.json',
    en: './assets/locales/en.json',
    es: './assets/locales/es.json',
    de: './assets/locales/de.json',
  },
  
  // Default locale
  defaultLocale: 'pt-BR',
  
  // Basic plugins (without native configs)
  plugins: [
    'expo-router',
    'expo-font'
  ],
  
  experiments: {
    typedRoutes: true
  }
});
