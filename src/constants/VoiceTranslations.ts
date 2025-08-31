export interface VoiceTranslations {
  // Voice selection
  selectVoice: string;
  selectVoiceOffline: string;
  
  // Voice properties
  systemDefaultVoice: string;
  female: string;
  male: string;
  child: string;
  adult: string;
  feminine: string;
  masculine: string;
  
  // Voice quality
  premium: string;
  highQuality: string;
  offline: string;
  standard: string;
  quality: string;
  
  // Voice descriptions
  code: string;
  offlineIndicator: string;
  
  // Error messages
  unableToTestVoice: string;
  tryAgainOrSelectAnother: string;
  
  // No voices available
  noOfflineVoicesAvailable: string;
  languageNoOfflineVoices: string;
  checkInstalledVoices: string;
  tipChildVoices: string;
  tipAdultVoices: string;
  
  // Additional UI elements
  offlineOnly: string;
  onlineAndOffline: string;
  includesMaleFemale: string;
  close: string;
  connectedToInternet: string;
  noInternetConnection: string;
  
  // Test text for different languages
  testText: {
    'pt-BR': string;
    'pt': string;
    'en': string;
    'es': string;
    'de': string;
  };
}

export const VOICE_TRANSLATIONS: Record<string, VoiceTranslations> = {
  'pt-BR': {
    selectVoice: 'Selecionar Voz',
    selectVoiceOffline: 'Selecionar Voz (Offline)',
    
    systemDefaultVoice: 'Voz Padrão do Sistema',
    female: 'Feminina',
    male: 'Masculina',
    child: 'Infantil',
    adult: 'Adulto',
    feminine: 'Feminina',
    masculine: 'Masculina',
    
    premium: 'Premium',
    highQuality: 'Alta Qualidade',
    offline: 'Offline',
    standard: 'Padrão',
    quality: 'Qualidade',
    
    code: 'Código',
    offlineIndicator: 'Offline',
    
    unableToTestVoice: 'Não foi possível testar esta voz.',
    tryAgainOrSelectAnother: 'Tente novamente ou selecione outra voz.',
    
    noOfflineVoicesAvailable: 'Nenhuma voz offline disponível',
    languageNoOfflineVoices: 'Este idioma não possui vozes offline.',
    checkInstalledVoices: 'Verifique se há vozes instaladas no seu dispositivo.',
    tipChildVoices: 'Dica: Vozes infantis são ideais para crianças,',
    tipAdultVoices: 'enquanto vozes de homem ou mulher são melhores para aprendizado avançado.',
    
    // Additional translations
    offlineOnly: 'Apenas vozes offline disponíveis',
    onlineAndOffline: 'Vozes online e offline disponíveis',
    includesMaleFemale: 'Inclui opções masculinas e femininas',
    close: 'Fechar',
    connectedToInternet: 'Conectado à internet',
    noInternetConnection: 'Sem conexão com internet',
    
    testText: {
      'pt-BR': 'Olá',
      'pt': 'Olá',
      'en': 'Hello',
      'es': 'Hola',
      'de': 'Hallo'
    }
  },
  
  'en': {
    selectVoice: 'Select Voice',
    selectVoiceOffline: 'Select Voice (Offline)',
    
    systemDefaultVoice: 'System Default Voice',
    female: 'Female',
    male: 'Male',
    child: 'Child',
    adult: 'Adult',
    feminine: 'Feminine',
    masculine: 'Masculine',
    
    premium: 'Premium',
    highQuality: 'High Quality',
    offline: 'Offline',
    standard: 'Standard',
    quality: 'Quality',
    
    code: 'Code',
    offlineIndicator: 'Offline',
    
    unableToTestVoice: 'Unable to test this voice.',
    tryAgainOrSelectAnother: 'Try again or select another voice.',
    
    noOfflineVoicesAvailable: 'No offline voices available',
    languageNoOfflineVoices: 'This language has no offline voices.',
    checkInstalledVoices: 'Check if there are voices installed on your device.',
    tipChildVoices: 'Tip: Child voices are ideal for children,',
    tipAdultVoices: 'while male or female voices are better for advanced learning.',
    
    // Additional translations
    offlineOnly: 'Offline voices only available',
    onlineAndOffline: 'Online and offline voices available',
    includesMaleFemale: 'Includes male and female options',
    close: 'Close',
    connectedToInternet: 'Connected to internet',
    noInternetConnection: 'No internet connection',
    
    testText: {
      'pt-BR': 'Olá',
      'pt': 'Olá',
      'en': 'Hello',
      'es': 'Hola',
      'de': 'Hallo'
    }
  },
  
  'es': {
    selectVoice: 'Seleccionar Voz',
    selectVoiceOffline: 'Seleccionar Voz (Sin Conexión)',
    
    systemDefaultVoice: 'Voz Predeterminada del Sistema',
    female: 'Femenina',
    male: 'Masculina',
    child: 'Infantil',
    adult: 'Adulto',
    feminine: 'Femenina',
    masculine: 'Masculina',
    
    premium: 'Premium',
    highQuality: 'Alta Calidad',
    offline: 'Sin Conexión',
    standard: 'Estándar',
    quality: 'Calidad',
    
    code: 'Código',
    offlineIndicator: 'Sin Conexión',
    
    unableToTestVoice: 'No se pudo probar esta voz.',
    tryAgainOrSelectAnother: 'Inténtalo de nuevo o selecciona otra voz.',
    
    noOfflineVoicesAvailable: 'No hay voces sin conexión disponibles',
    languageNoOfflineVoices: 'Este idioma no tiene voces sin conexión.',
    checkInstalledVoices: 'Verifica si hay voces instaladas en tu dispositivo.',
    tipChildVoices: 'Consejo: Las voces infantiles son ideales para niños,',
    tipAdultVoices: 'mientras que las voces masculinas o femeninas son mejores para el aprendizaje avanzado.',
    
    // Additional translations
    offlineOnly: 'Solo voces sin conexión disponibles',
    onlineAndOffline: 'Voces online y sin conexión disponibles',
    includesMaleFemale: 'Incluye opciones masculinas y femeninas',
    close: 'Cerrar',
    connectedToInternet: 'Conectado a internet',
    noInternetConnection: 'Sin conexión a internet',
    
    testText: {
      'pt-BR': 'Olá',
      'pt': 'Olá',
      'en': 'Hello',
      'es': 'Hola',
      'de': 'Hallo'
    }
  },
  
  'de': {
    selectVoice: 'Stimme Auswählen',
    selectVoiceOffline: 'Stimme Auswählen (Offline)',
    
    systemDefaultVoice: 'System-Standardstimme',
    female: 'Weiblich',
    male: 'Männlich',
    child: 'Kind',
    adult: 'Erwachsen',
    feminine: 'Weiblich',
    masculine: 'Männlich',
    
    premium: 'Premium',
    highQuality: 'Hohe Qualität',
    offline: 'Offline',
    standard: 'Standard',
    quality: 'Qualität',
    
    code: 'Code',
    offlineIndicator: 'Offline',
    
    unableToTestVoice: 'Diese Stimme konnte nicht getestet werden.',
    tryAgainOrSelectAnother: 'Versuchen Sie es erneut oder wählen Sie eine andere Stimme.',
    
    noOfflineVoicesAvailable: 'Keine Offline-Stimmen verfügbar',
    languageNoOfflineVoices: 'Diese Sprache hat keine Offline-Stimmen.',
    checkInstalledVoices: 'Überprüfen Sie, ob Stimmen auf Ihrem Gerät installiert sind.',
    tipChildVoices: 'Tipp: Kinderstimmen sind ideal für Kinder,',
    tipAdultVoices: 'während männliche oder weibliche Stimmen besser für fortgeschrittenes Lernen sind.',
    
    // Additional translations
    offlineOnly: 'Nur Offline-Stimmen verfügbar',
    onlineAndOffline: 'Online- und Offline-Stimmen verfügbar',
    includesMaleFemale: 'Enthält männliche und weibliche Optionen',
    close: 'Schließen',
    connectedToInternet: 'Mit Internet verbunden',
    noInternetConnection: 'Keine Internetverbindung',
    
    testText: {
      'pt-BR': 'Olá',
      'pt': 'Olá',
      'en': 'Hello',
      'es': 'Hola',
      'de': 'Hallo'
    }
  }
};
