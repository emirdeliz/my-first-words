import { Platform } from 'react-native';
import TTSService from './TTSService';
import HybridSpeechService from './HybridSpeechService';

/**
 * Inicializador dos serviços de fala
 * 
 * Este serviço é responsável por inicializar e configurar
 * todos os serviços de fala no início do aplicativo
 */
export class SpeechServiceInitializer {
  private static instance: SpeechServiceInitializer;
  private isInitialized: boolean = false;

  private constructor() {}

  static getInstance(): SpeechServiceInitializer {
    if (!SpeechServiceInitializer.instance) {
      SpeechServiceInitializer.instance = new SpeechServiceInitializer();
    }
    return SpeechServiceInitializer.instance;
  }

  /**
   * Inicializa todos os serviços de fala
   */
  async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      console.log('✅ Speech services already initialized');
      return true;
    }

    try {
      console.log('🔧 Initializing speech services...');

      // Inicializar TTS Service
      await this.initializeTTSService();

      // Inicializar Hybrid Service
      await this.initializeHybridService();

      // Configurar idioma padrão
      await this.setDefaultLanguage();

      this.isInitialized = true;
      console.log('✅ All speech services initialized successfully');
      return true;

    } catch (error) {
      console.error('❌ Error initializing speech services:', error);
      return false;
    }
  }

  /**
   * Inicializa o serviço TTS
   */
  private async initializeTTSService(): Promise<void> {
    try {
      console.log('🔧 Initializing TTS Service...');

      if (Platform.OS === 'android') {
        await TTSService.initializeForAndroid();
      } else if (Platform.OS === 'ios') {
        await TTSService.initializeForIOS();
      }

      console.log('✅ TTS Service initialized');
    } catch (error) {
      console.error('❌ Error initializing TTS Service:', error);
      throw error;
    }
  }

  /**
   * Inicializa o serviço híbrido
   */
  private async initializeHybridService(): Promise<void> {
    try {
      console.log('🔧 Initializing Hybrid Speech Service...');

      await HybridSpeechService.initializeForPlatform();

      console.log('✅ Hybrid Speech Service initialized');
    } catch (error) {
      console.error('❌ Error initializing Hybrid Speech Service:', error);
      throw error;
    }
  }

  /**
   * Configura o idioma padrão
   */
  private async setDefaultLanguage(): Promise<void> {
    try {
      console.log('🌍 Setting default language...');

      // Configurar idioma padrão para português brasileiro
      TTSService.setLanguage('pt-BR');
      HybridSpeechService.setLanguage('pt-BR');

      console.log('✅ Default language set to pt-BR');
    } catch (error) {
      console.error('❌ Error setting default language:', error);
      throw error;
    }
  }

  /**
   * Testa se os serviços estão funcionando
   */
  async testServices(): Promise<boolean> {
    try {
      console.log('🧪 Testing speech services...');

      // Testar TTS Service
      await TTSService.speak('Teste de inicialização', {
        language: 'pt-BR',
        rate: 0.8,
        pitch: 1.0,
        onStart: () => console.log('✅ TTS test started'),
        onFinish: () => console.log('✅ TTS test completed'),
        onError: (error) => console.error('❌ TTS test error:', error),
      });

      // Aguardar um pouco para o teste completar
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('✅ Speech services test completed successfully');
      return true;

    } catch (error) {
      console.error('❌ Speech services test failed:', error);
      return false;
    }
  }

  /**
   * Obtém o status de inicialização
   */
  getInitializationStatus(): boolean {
    return this.isInitialized;
  }

  /**
   * Reinicializa os serviços (útil para debugging)
   */
  async reinitialize(): Promise<boolean> {
    console.log('🔄 Reinitializing speech services...');
    this.isInitialized = false;
    return await this.initialize();
  }

  /**
   * Limpa os recursos dos serviços
   */
  cleanup(): void {
    try {
      console.log('🧹 Cleaning up speech services...');

      TTSService.destroy();
      HybridSpeechService.destroy();

      this.isInitialized = false;
      console.log('✅ Speech services cleaned up');
    } catch (error) {
      console.error('❌ Error cleaning up speech services:', error);
    }
  }
}

export default SpeechServiceInitializer.getInstance();
