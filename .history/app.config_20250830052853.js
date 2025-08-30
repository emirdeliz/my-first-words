export default ({ config }) => ({
  ...config,
  name: 'my-first-words',
  slug: 'my-first-words',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/app-icon-fun.svg',
  scheme: 'myfirstwordsapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  
  // Multi-language support
  locales: {
    'pt-BR': './assets/locales/pt-BR.json',
    'en': './assets/locales/en.json',
    'es': './assets/locales/es.json',
    'de': './assets/locales/de.json',
  },
  
  // Default locale
  defaultLocale: 'pt-BR',
  
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSMicrophoneUsageDescription: 'O app precisa de acesso ao microfone para reproduzir áudio.',
      NSSpeechRecognitionUsageDescription: 'O app usa reconhecimento de fala para melhorar a experiência do usuário.',
      UIBackgroundModes: ['audio'],
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true
      }
    },
    entitlements: {
      'com.apple.developer.associated-domains': [],
      'com.apple.developer.ubiquity-kvstore-identifier': []
    },
    bundleIdentifier: 'com.emirdeliz.myfirstwords'
  },
  
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/app-icon-fun.svg',
      backgroundColor: '#ffffff'
    },
    edgeToEdgeEnabled: true,
    permissions: [
      'android.permission.RECORD_AUDIO',
      'android.permission.MODIFY_AUDIO_SETTINGS'
    ],
    package: 'com.emirdeliz.myfirstwords'
  },
  
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/app-icon-fun.svg'
  },
  
  plugins: [
    'expo-router',
          [
        'expo-splash-screen',
        {
          image: './assets/images/app-icon-fun.svg',
          imageWidth: 120,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            image: './assets/images/app-icon-fun.svg',
            backgroundColor: '#1f2937'
          }
        }
      ],
    'expo-font'
  ],
  
  experiments: {
    typedRoutes: true
  }
});
