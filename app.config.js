export default ({ config }) => ({
  ...config,
  name: 'my-first-words',
  slug: 'my-first-words',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/app-icon-fun.png',
  scheme: 'myfirstwordsapp',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,

  // Multi-language support
  locales: {
    'pt-BR': './assets/locales/pt-BR.json',
    'pt-PT': './assets/locales/pt-PT.json',
    en: './assets/locales/en.json',
    es: './assets/locales/es.json',
    de: './assets/locales/de.json',
  },

  // Default locale
  defaultLocale: 'pt-BR',

  ios: {
    supportsTablet: true,
    // Multi-language support for iOS
    infoPlist: {
      NSMicrophoneUsageDescription:
        'O app precisa de acesso ao microfone para reproduzir áudio.',
      NSSpeechRecognitionUsageDescription:
        'O app usa reconhecimento de fala para melhorar a experiência do usuário.',
      UIBackgroundModes: ['audio'],
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
      // Localization keys for iOS
      CFBundleLocalizations: ['pt-BR', 'pt-PT', 'en', 'es', 'de'],
      CFBundleDevelopmentRegion: 'pt-BR',
      // App Store localization
      CFBundleDisplayName: {
        'pt-BR': 'Minhas Primeiras Palavras',
        'pt-PT': 'As Minhas Primeiras Palavras',
        en: 'My First Words',
        es: 'Mis Primeras Palabras',
        de: 'Meine Ersten Wörter',
      },
      CFBundleName: {
        'pt-BR': 'Minhas Primeiras Palavras',
        'pt-PT': 'As Minhas Primeiras Palavras',
        en: 'My First Words',
        es: 'Mis Primeras Palabras',
        de: 'Meine Ersten Wörter',
      },
    },
    entitlements: {
      'com.apple.developer.associated-domains': [],
      'com.apple.developer.ubiquity-kvstore-identifier': [],
    },
    bundleIdentifier: 'com.emirdeliz.myfirstwords',
  },

  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/app-icon-fun.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    permissions: [
      'android.permission.RECORD_AUDIO',
      'android.permission.MODIFY_AUDIO_SETTINGS',
    ],
    package: 'com.emirdeliz.myfirstwords',
    
    // Build configuration to resolve conflicts
    buildConfigFields: {
      VERSION_NAME: '1.0.0',
      VERSION_CODE: '1',
    },
    
    // Gradle configuration
    gradleCommand: 'assembleDebug',
    
    // Multi-language support for Android
    locales: {
      'pt-BR': {
        label: 'Português (Brasil)',
        strings: {
          app_name: 'Minhas Primeiras Palavras',
        },
      },
      'pt-PT': {
        label: 'Português (Portugal)',
        strings: {
          app_name: 'As Minhas Primeiras Palavras',
        },
      },
      en: {
        label: 'English',
        strings: {
          app_name: 'My First Words',
        },
      },
      es: {
        label: 'Español',
        strings: {
          app_name: 'Mis Primeras Palabras',
        },
      },
      de: {
        label: 'Deutsch',
        strings: {
          app_name: 'Meine Ersten Wörter',
        },
      },
    },
  },

  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/app-icon-fun.svg',
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
          backgroundColor: '#1f2937',
        },
      },
    ],
    'expo-font',
    [
      'expo-build-properties',
      {
        android: {
          // Force specific AndroidX versions to resolve conflicts
          compileSdkVersion: 34,
          targetSdkVersion: 34,
          buildToolsVersion: '34.0.0',
          // Exclude problematic support libraries
          exclude: [
            'com.android.support',
            'androidx.versionedparcelable'
          ],
          // Force specific dependency versions
          dependencies: {
            'androidx.core:core': '1.13.1',
            'androidx.window:window': '1.2.0',
            'androidx.activity:activity': '1.8.2',
            'androidx.fragment:fragment': '1.6.2',
            'com.google.android.material:material': '1.12.0'
          }
        }
      }
    ]
  ],

  experiments: {
    typedRoutes: true,
  },
});
