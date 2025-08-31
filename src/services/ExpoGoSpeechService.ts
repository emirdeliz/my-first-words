import { Platform } from 'react-native';

/**
 * Serviço de fala específico para Expo Go
 * 
 * Este serviço usa expo-speech de forma direta e funciona
 * corretamente no ambiente Expo Go
 */
export class ExpoGoSpeechService {
  private static instance: ExpoGoSpeechService;
  private isInitialized: boolean = false;
  private Speech: any = null;

  private constructor() {}

  static getInstance(): ExpoGoSpeechService {
    if (!ExpoGoSpeechService.instance) {
      ExpoGoSpeechService.instance = new ExpoGoSpeechService();
    }
    return ExpoGoSpeechService.instance;
  }

  /**
   * Inicializa o serviço
   */
  async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      return true;
    }

    try {
      console.log('🔧 Initializing Expo Go Speech Service...');
      
      // Importar expo-speech de forma síncrona
      const ExpoSpeech = require('expo-speech');
      this.Speech = ExpoSpeech;
      this.isInitialized = true;
      console.log('✅ Expo Go Speech Service initialized successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Error initializing Expo Go Speech Service:', error);
      return false;
    }
  }

  /**
   * Fala texto
   */
  async speak(text: string, options: any = {}): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      if (!this.Speech) {
        throw new Error('Speech service not available');
      }

      // Converter opções para formato do expo-speech
      const expoOptions = {
        language: options.language || 'pt-BR',
        rate: options.rate || 0.3, // Extremely slow default rate
        pitch: options.pitch || 1.0,
        voice: options.voice,
        onDone: options.onFinish || options.onEnd,
        onError: options.onError,
        onStopped: options.onStopped,
      };
      
      console.log(`🗣️ Speaking: "${text}"`);
      await this.Speech.speak(text, expoOptions);
      
    } catch (error) {
      console.error('❌ Error with expo-speech:', error);
      throw error;
    }
  }

  /**
   * Para a fala atual
   */
  async stop(): Promise<void> {
    try {
      if (this.Speech) {
        await this.Speech.stop();
        console.log('⏹️ Speech stopped');
      }
    } catch (error) {
      console.error('❌ Error stopping speech:', error);
    }
  }

  /**
   * Obtém vozes disponíveis
   */
  async getAvailableVoices(): Promise<any[]> {
    try {
      if (this.Speech && this.Speech.getAvailableVoicesAsync) {
        return await this.Speech.getAvailableVoicesAsync();
      }
      return [];
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
      if (this.Speech && this.Speech.isSpeakingAsync) {
        return await this.Speech.isSpeakingAsync();
      }
      return false;
    } catch (error) {
      console.error('❌ Error checking speaking status:', error);
      return false;
    }
  }

  /**
   * Obtém status de inicialização
   */
  getInitializationStatus(): boolean {
    return this.isInitialized;
  }
}

export default ExpoGoSpeechService.getInstance();
