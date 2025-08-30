export default ({ config }) => ({
  ...config,
  name: 'my-first-words',
  slug: 'my-first-words',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/logo.png',
  scheme: 'myfirstwordsapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  
  // EAS Build configuration
  extra: {
    eas: {
      projectId: 'e1d2016d-bb04-49bf-aac6-70733787c97f'
    }
  },
  
  // Multi-language support
  locales: {
    'pt-BR': './assets/locales/pt-BR.json',
    'pt-PT': './assets/locales/pt-PT.json',
    'en': './assets/locales/en.json',
    'es': './assets/locales/es.json',
    'de': './assets/locales/de.json',
  },
  
  // Default locale
  defaultLocale: 'pt-BR',
  
  ios: {
    supportsTablet: true,
    icon: './assets/images/logo.png',
    infoPlist: {
      NSMicrophoneUsageDescription: 'O app precisa de acesso ao microfone para reproduzir áudio.',
      NSSpeechRecognitionUsageDescription: 'O app usa reconhecimento de fala para melhorar a experiência do usuário.',
      UIBackgroundModes: ['audio'],
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true
      },
      // Localization keys for iOS
      CFBundleLocalizations: ['pt-BR', 'pt-PT', 'en', 'es', 'de'],
      CFBundleDevelopmentRegion: 'pt-BR',
      // App Store localization
      CFBundleDisplayName: {
        'pt-BR': 'Minhas Primeiras Palavras',
        'pt-PT': 'As Minhas Primeiras Palavras',
        'en': 'My First Words',
        'es': 'Mis Primeras Palabras',
        'de': 'Meine Ersten Wörter'
      },
      CFBundleName: {
        'pt-BR': 'Minhas Primeiras Palavras',
        'pt-PT': 'As Minhas Primeiras Palavras',
        'en': 'My First Words',
        'es': 'Mis Primeras Palabras',
        'de': 'Meine Ersten Wörter'
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
      foregroundImage: './assets/images/logo.png',
      backgroundColor: '#ffffff'
    },
    icon: './assets/images/logo.png',
    edgeToEdgeEnabled: true,
    permissions: [
      'android.permission.RECORD_AUDIO',
      'android.permission.MODIFY_AUDIO_SETTINGS'
    ],
    package: 'com.emirdeliz.myfirstwords',
    // Multi-language support for Android
    locales: {
      'pt-BR': {
        label: 'Português (Brasil)',
        strings: {
          app_name: 'Minhas Primeiras Palavras'
        }
      },
      'pt-PT': {
        label: 'Português (Portugal)',
        strings: {
          app_name: 'As Minhas Primeiras Palavras'
        }
      },
      'en': {
        label: 'English',
        strings: {
          app_name: 'My First Words'
        }
      },
      'es': {
        label: 'Español',
        strings: {
          app_name: 'Mis Primeras Palabras'
        }
      },
      'de': {
        label: 'Deutsch',
        strings: {
          app_name: 'Meine Ersten Wörter'
        }
      }
    }
  },
  
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/logo.png'
  },
  
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/logo.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
        dark: {
          image: './assets/images/logo.png',
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
