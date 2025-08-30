import { Platform } from 'react-native';
import Constants from 'expo-constants';

/**
 * Serviço de fala que detecta o ambiente e usa o serviço apropriado
 * 
 * - Expo Go: usa expo-speech (compatível)
 * - Build nativo: usa react-native-tts (mais estável)
 */
export class PlatformAwareSpeechService {
  private static instance: PlatformAwareSpeechService;
  private isExpoGo: boolean;
  private isInitialized: boolean = false;

  private constructor() {
    // Detectar se estamos no Expo Go
    this.isExpoGo = Constants.appOwnership === 'expo';
    console.log(`🔍 Environment detected: ${this.isExpoGo ? 'Expo Go' : 'Native Build'}`);
  }

  static getInstance(): PlatformAwareSpeechService {
    if (!PlatformAwareSpeechService.instance) {
      PlatformAwareSpeechService.instance = new PlatformAwareSpeechService();
    }
    return PlatformAwareSpeechService.instance;
  }

  /**
   * Inicializa o serviço apropriado para a plataforma
   */
  async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      return true;
    }

    try {
      if (this.isExpoGo) {
        // No Expo Go, usar expo-speech
        await this.initializeExpoSpeech();
      } else {
        // Em build nativo, usar TTS
        await this.initializeNativeTTS();
      }
      
      this.isInitialized = true;
      console.log('✅ Platform-aware speech service initialized');
      return true;
    } catch (error) {
      console.error('❌ Error initializing speech service:', error);
      return false;
    }
  }

  /**
   * Inicializa expo-speech para Expo Go
   */
  private async initializeExpoSpeech(): Promise<void> {
    try {
      console.log('🔧 Initializing expo-speech for Expo Go...');
      
      // Usar o serviço específico para Expo Go
      const { default: ExpoGoSpeechService } = await import('./ExpoGoSpeechService');
      await ExpoGoSpeechService.initialize();
      
      console.log('✅ Speech initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing Expo Speech:', error);
      throw error;
    }
  }

  /**
   * Inicializa TTS nativo para builds nativos
   */
  private async initializeNativeTTS(): Promise<void> {
    try {
      console.log('🔧 Initializing native TTS...');
      
      // Importar TTS dinamicamente
      const { default: TTSService } = await import('./TTSService');
      
      // Inicializar TTS
      if (Platform.OS === 'android') {
        await TTSService.initializeForAndroid();
      } else if (Platform.OS === 'ios') {
        await TTSService.initializeForIOS();
      }
      
      console.log('✅ Native TTS initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing native TTS:', error);
      throw error;
    }
  }

  /**
   * Fala texto usando o serviço apropriado
   */
  async speak(text: string, options: any = {}): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      if (this.isExpoGo) {
        await this.speakWithExpoSpeech(text, options);
      } else {
        await this.speakWithNativeTTS(text, options);
      }
    } catch (error) {
      console.error('❌ Error speaking text:', error);
      throw error;
    }
  }

  /**
   * Fala usando expo-speech
   */
  private async speakWithExpoSpeech(text: string, options: any): Promise<void> {
    try {
      const { default: ExpoGoSpeechService } = await import('./ExpoGoSpeechService');
      
      console.log(`🗣️ Speaking with expo-speech: "${text}"`);
      await ExpoGoSpeechService.speak(text, options);
      
    } catch (error) {
      console.error('❌ Error with expo-speech:', error);
      throw error;
    }
  }

  /**
   * Fala usando TTS nativo
   */
  private async speakWithNativeTTS(text: string, options: any): Promise<void> {
    try {
      const { default: TTSService } = await import('./TTSService');
      
      console.log(`🗣️ Speaking with native TTS: "${text}"`);
      await TTSService.speak(text, options);
      
    } catch (error) {
      console.error('❌ Error with native TTS:', error);
      throw error;
    }
  }

  /**
   * Para a fala atual
   */
  async stop(): Promise<void> {
    try {
      if (this.isExpoGo) {
        const { default: ExpoGoSpeechService } = await import('./ExpoGoSpeechService');
        await ExpoGoSpeechService.stop();
      } else {
        const { default: TTSService } = await import('./TTSService');
        await TTSService.stop();
      }
      
      console.log('⏹️ Speech stopped');
    } catch (error) {
      console.error('❌ Error stopping speech:', error);
    }
  }

  /**
   * Obtém vozes disponíveis
   */
  async getAvailableVoices(): Promise<any[]> {
    try {
      if (this.isExpoGo) {
        const { default: ExpoGoSpeechService } = await import('./ExpoGoSpeechService');
        return await ExpoGoSpeechService.getAvailableVoices();
      } else {
        const { default: TTSService } = await import('./TTSService');
        return await TTSService.getAvailableVoices();
      }
    } catch (error) {
      console.error('❌ Error getting available voices:', error);
      return [];
    }
  }

  /**
   * Verifica se está falando
   */
  async isSpeaking(): Promise<boolean> {
    try {
      if (this.isExpoGo) {
        const { default: ExpoGoSpeechService } = await import('./ExpoGoSpeechService');
        return await ExpoGoSpeechService.isSpeaking();
      } else {
        const { default: TTSService } = await import('./TTSService');
        return TTSService.isCurrentlySpeaking();
      }
    } catch (error) {
      console.error('❌ Error checking speaking status:', error);
      return false;
    }
  }

  /**
   * Configura idioma
   */
  async setLanguage(language: string): Promise<void> {
    try {
      if (!this.isExpoGo) {
        const { default: TTSService } = await import('./TTSService');
        TTSService.setLanguage(language);
      }
      
      console.log(`🌍 Language set to: ${language}`);
    } catch (error) {
      console.error('❌ Error setting language:', error);
    }
  }

  /**
   * Obtém informações do ambiente
   */
  getEnvironmentInfo(): { isExpoGo: boolean; platform: string; isInitialized: boolean } {
    return {
      isExpoGo: this.isExpoGo,
      platform: Platform.OS,
      isInitialized: this.isInitialized,
    };
  }
}

export default PlatformAwareSpeechService.getInstance();
