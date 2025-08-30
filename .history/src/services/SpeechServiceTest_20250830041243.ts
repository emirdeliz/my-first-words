import { Platform } from 'react-native';
import TTSService from './TTSService';
import HybridSpeechService from './HybridSpeechService';
import SpeechServiceInitializer from './SpeechServiceInitializer';

/**
 * Testes para os serviços de fala
 * 
 * Este arquivo contém testes para verificar se os novos serviços
 * estão funcionando corretamente após a migração do expo-speech
 */
export class SpeechServiceTest {
  
  /**
   * Executa todos os testes
   */
  static async runAllTests(): Promise<void> {
    console.log('🧪 Running all speech service tests...\n');
    
    try {
      // Teste 1: Inicialização
      await this.testInitialization();
      
      // Teste 2: TTS Service
      await this.testTTSService();
      
      // Teste 3: Hybrid Service
      await this.testHybridService();
      
      // Teste 4: Mudança de idioma
      await this.testLanguageChange();
      
      // Teste 5: Vozes disponíveis
      await this.testAvailableVoices();
      
      // Teste 6: Performance
      await this.testPerformance();
      
      console.log('\n🎉 All tests completed successfully!');
      
    } catch (error) {
      console.error('\n❌ Test suite failed:', error);
    }
  }

  /**
   * Teste de inicialização
   */
  private static async testInitialization(): Promise<void> {
    console.log('🔧 Test 1: Service Initialization');
    
    try {
      // Verificar se já está inicializado
      const isInitialized = SpeechServiceInitializer.getInitializationStatus();
      console.log(`   Status: ${isInitialized ? '✅ Initialized' : '❌ Not initialized'}`);
      
      if (!isInitialized) {
        console.log('   Initializing services...');
        await SpeechServiceInitializer.initialize();
        console.log('   ✅ Services initialized');
      }
      
      // Testar os serviços
      const testResult = await SpeechServiceInitializer.testServices();
      console.log(`   Test result: ${testResult ? '✅ Passed' : '❌ Failed'}`);
      
    } catch (error) {
      console.error('   ❌ Initialization test failed:', error);
      throw error;
    }
  }

  /**
   * Teste do TTS Service
   */
  private static async testTTSService(): Promise<void> {
    console.log('🎤 Test 2: TTS Service');
    
    try {
      // Testar fala básica
      console.log('   Testing basic speech...');
      await TTSService.speak('Teste do serviço TTS', {
        language: 'pt-BR',
        rate: 0.8,
        pitch: 1.0,
        onStart: () => console.log('   ✅ TTS started'),
        onFinish: () => console.log('   ✅ TTS finished'),
        onError: (error) => console.error('   ❌ TTS error:', error),
      });
      
      // Aguardar para o teste completar
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Testar parada
      await TTSService.stop();
      console.log('   ✅ TTS stop test passed');
      
      // Verificar status
      const isSpeaking = TTSService.isCurrentlySpeaking();
      console.log(`   Speaking status: ${isSpeaking ? '❌ Still speaking' : '✅ Stopped'}`);
      
    } catch (error) {
      console.error('   ❌ TTS Service test failed:', error);
      throw error;
    }
  }

  /**
   * Teste do Hybrid Service
   */
  private static async testHybridService(): Promise<void> {
    console.log('🔄 Test 3: Hybrid Service');
    
    try {
      // Verificar motor atual
      const currentEngine = HybridSpeechService.getCurrentEngine();
      console.log(`   Current engine: ${currentEngine}`);
      
      // Testar fala
      console.log('   Testing hybrid speech...');
      await HybridSpeechService.speak('Teste do serviço híbrido', {
        language: 'pt-BR',
        rate: 0.8,
        pitch: 1.0,
        onStart: () => console.log('   ✅ Hybrid started'),
        onEnd: () => console.log('   ✅ Hybrid finished'),
        onError: (error) => console.error('   ❌ Hybrid error:', error),
      });
      
      // Aguardar para o teste completar
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Verificar status
      const isSpeaking = HybridSpeechService.isCurrentlySpeaking();
      console.log(`   Speaking status: ${isSpeaking ? '❌ Still speaking' : '✅ Finished'}`);
      
    } catch (error) {
      console.error('   ❌ Hybrid Service test failed:', error);
      throw error;
    }
  }

  /**
   * Teste de mudança de idioma
   */
  private static async testLanguageChange(): Promise<void> {
    console.log('🌍 Test 4: Language Change');
    
    try {
      const languages = ['pt-BR', 'en-US', 'es-ES'];
      
      for (const language of languages) {
        console.log(`   Testing language: ${language}`);
        
        // Configurar idioma
        TTSService.setLanguage(language);
        HybridSpeechService.setLanguage(language);
        
        // Falar no idioma
        const testText = this.getTestTextForLanguage(language);
        await TTSService.speak(testText, {
          language: language,
          rate: 0.7,
          pitch: 1.0,
        });
        
        // Aguardar entre idiomas
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      console.log('   ✅ Language change test passed');
      
    } catch (error) {
      console.error('   ❌ Language change test failed:', error);
      throw error;
    }
  }

  /**
   * Teste de vozes disponíveis
   */
  private static async testAvailableVoices(): Promise<void> {
    console.log('🎵 Test 5: Available Voices');
    
    try {
      // Obter vozes do TTS
      const ttsVoices = await TTSService.getAvailableVoices();
      console.log(`   TTS voices: ${ttsVoices.length}`);
      
      // Obter vozes do Hybrid
      const hybridVoices = await HybridSpeechService.getAvailableVoices();
      console.log(`   Hybrid voices: ${hybridVoices.length}`);
      
      // Testar seleção de voz
      if (ttsVoices.length > 0) {
        const bestVoice = await TTSService.getBestVoiceForLanguage('pt-BR');
        console.log(`   Best voice for pt-BR: ${bestVoice ? bestVoice.name : 'None'}`);
      }
      
      console.log('   ✅ Available voices test passed');
      
    } catch (error) {
      console.error('   ❌ Available voices test failed:', error);
      throw error;
    }
  }

  /**
   * Teste de performance
   */
  private static async testPerformance(): Promise<void> {
    console.log('⚡ Test 6: Performance');
    
    try {
      const startTime = Date.now();
      
      // Testar múltiplas falas em sequência
      const words = ['casa', 'carro', 'árvore', 'sol', 'lua'];
      
      for (const word of words) {
        const wordStartTime = Date.now();
        
        await TTSService.speak(word, {
          language: 'pt-BR',
          rate: 0.8,
          pitch: 1.0,
        });
        
        const wordEndTime = Date.now();
        console.log(`   ${word}: ${wordEndTime - wordStartTime}ms`);
        
        // Aguardar entre palavras
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      
      console.log(`   Total time: ${totalTime}ms`);
      console.log(`   Average per word: ${totalTime / words.length}ms`);
      
      console.log('   ✅ Performance test passed');
      
    } catch (error) {
      console.error('   ❌ Performance test failed:', error);
      throw error;
    }
  }

  /**
   * Obtém texto de teste para cada idioma
   */
  private static getTestTextForLanguage(language: string): string {
    switch (language) {
      case 'pt-BR':
        return 'Olá, como você está?';
      case 'en-US':
        return 'Hello, how are you?';
      case 'es-ES':
        return 'Hola, ¿cómo estás?';
      default:
        return 'Hello';
    }
  }

  /**
   * Teste específico para Android
   */
  static async testAndroidSpecific(): Promise<void> {
    if (Platform.OS !== 'android') {
      console.log('⚠️ Android-specific test skipped (not on Android)');
      return;
    }

    console.log('🤖 Android-specific tests...');
    
    try {
      // Testar inicialização específica para Android
      await TTSService.initializeForAndroid();
      console.log('   ✅ Android TTS initialization passed');
      
      // Testar fala com configurações otimizadas para Android
      await TTSService.speak('Teste específico para Android', {
        language: 'pt-BR',
        rate: 0.7, // Mais lento para melhor clareza
        pitch: 1.1, // Tom ligeiramente mais alto
      });
      
      console.log('   ✅ Android-specific tests passed');
      
    } catch (error) {
      console.error('   ❌ Android-specific tests failed:', error);
      throw error;
    }
  }

  /**
   * Teste específico para iOS
   */
  static async testIOSSpecific(): Promise<void> {
    if (Platform.OS !== 'ios') {
      console.log('⚠️ iOS-specific test skipped (not on iOS)');
      return;
    }

    console.log('🍎 iOS-specific tests...');
    
    try {
      // Testar inicialização específica para iOS
      await TTSService.initializeForIOS();
      console.log('   ✅ iOS TTS initialization passed');
      
      // Testar fala com configurações otimizadas para iOS
      await TTSService.speak('iOS specific test', {
        language: 'en-US',
        rate: 0.8,
        pitch: 1.0,
      });
      
      console.log('   ✅ iOS-specific tests passed');
      
    } catch (error) {
      console.error('   ❌ iOS-specific tests failed:', error);
      throw error;
    }
  }
}

export default SpeechServiceTest;
