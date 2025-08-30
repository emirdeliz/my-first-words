import { Platform } from 'react-native';
import HybridSpeechService from './HybridSpeechService';
import TTSService from './TTSService';

/**
 * Exemplo de uso dos novos serviços de fala
 * 
 * Este arquivo demonstra como usar os diferentes serviços de fala
 * que criamos para resolver os problemas com expo-speech no Android
 */

export class SpeechServiceExample {
  
  /**
   * Exemplo básico usando o serviço híbrido
   */
  static async basicExample(): Promise<void> {
    try {
      console.log('🎯 Iniciando exemplo básico de fala...');
      
      // Inicializar o serviço para a plataforma atual
      await HybridSpeechService.initializeForPlatform();
      
      // Falar um texto simples
      await HybridSpeechService.speak('Olá, como você está?', {
        language: 'pt-BR',
        rate: 0.8,
        pitch: 1.0,
        onStart: () => console.log('🔊 Fala iniciada'),
        onEnd: () => console.log('🔇 Fala finalizada'),
        onError: (error) => console.error('❌ Erro na fala:', error),
      });
      
      console.log('✅ Exemplo básico concluído');
      
    } catch (error) {
      console.error('❌ Erro no exemplo básico:', error);
    }
  }

  /**
   * Exemplo usando TTS específico para Android
   */
  static async androidTTSExample(): Promise<void> {
    if (Platform.OS !== 'android') {
      console.log('⚠️ Este exemplo é específico para Android');
      return;
    }

    try {
      console.log('🤖 Iniciando exemplo TTS para Android...');
      
      // Inicializar TTS para Android
      await TTSService.initializeForAndroid();
      
      // Configurar idioma
      TTSService.setLanguage('pt-BR');
      
      // Falar com configurações otimizadas para Android
      await TTSService.speak('Este é um teste de fala no Android', {
        language: 'pt-BR',
        rate: 0.7, // Mais lento para melhor clareza
        pitch: 1.1, // Tom ligeiramente mais alto
        onStart: () => console.log('🔊 TTS Android iniciado'),
        onFinish: () => console.log('🔇 TTS Android finalizado'),
        onError: (error) => console.error('❌ Erro TTS Android:', error),
      });
      
      console.log('✅ Exemplo TTS Android concluído');
      
    } catch (error) {
      console.error('❌ Erro no exemplo TTS Android:', error);
    }
  }

  /**
   * Exemplo de mudança de voz
   */
  static async voiceChangeExample(): Promise<void> {
    try {
      console.log('🎤 Iniciando exemplo de mudança de voz...');
      
      // Obter vozes disponíveis
      const voices = await HybridSpeechService.getAvailableVoices();
      console.log(`🎤 Vozes disponíveis: ${voices.length}`);
      
      if (voices.length > 0) {
        // Usar a primeira voz disponível
        const firstVoice = voices[0];
        console.log(`🎤 Usando voz: ${firstVoice.name}`);
        
        await HybridSpeechService.speak('Teste com voz específica', {
          language: 'pt-BR',
          voice: firstVoice.identifier || firstVoice.id,
          rate: 0.8,
          pitch: 1.0,
        });
      }
      
      console.log('✅ Exemplo de mudança de voz concluído');
      
    } catch (error) {
      console.error('❌ Erro no exemplo de mudança de voz:', error);
    }
  }

  /**
   * Exemplo de sequência de fala
   */
  static async speechSequenceExample(): Promise<void> {
    try {
      console.log('🎵 Iniciando exemplo de sequência de fala...');
      
      const words = ['casa', 'carro', 'árvore', 'sol'];
      
      for (const word of words) {
        console.log(`🗣️ Falando: ${word}`);
        
        await HybridSpeechService.speak(word, {
          language: 'pt-BR',
          rate: 0.6, // Mais lento para crianças
          pitch: 1.2, // Tom mais alto e amigável
          onStart: () => console.log(`🔊 Iniciou: ${word}`),
          onEnd: () => console.log(`🔇 Finalizou: ${word}`),
        });
        
        // Aguardar um pouco entre as palavras
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      console.log('✅ Exemplo de sequência de fala concluído');
      
    } catch (error) {
      console.error('❌ Erro no exemplo de sequência de fala:', error);
    }
  }

  /**
   * Exemplo de tratamento de erros e fallback
   */
  static async errorHandlingExample(): Promise<void> {
    try {
      console.log('🔄 Iniciando exemplo de tratamento de erros...');
      
      // Tentar falar com configurações que podem falhar
      await HybridSpeechService.speak('Teste de resiliência', {
        language: 'invalid-language',
        rate: 2.0, // Taxa muito alta
        pitch: 3.0, // Tom muito alto
        onError: (error) => {
          console.log('⚠️ Erro capturado, tentando fallback...');
          // O serviço híbrido tentará automaticamente outros motores
        },
      });
      
      console.log('✅ Exemplo de tratamento de erros concluído');
      
    } catch (error) {
      console.error('❌ Erro no exemplo de tratamento de erros:', error);
    }
  }

  /**
   * Exemplo de configuração de idiomas
   */
  static async languageConfigurationExample(): Promise<void> {
    try {
      console.log('🌍 Iniciando exemplo de configuração de idiomas...');
      
      const languages = ['pt-BR', 'en-US', 'es-ES'];
      
      for (const language of languages) {
        console.log(`🌍 Configurando idioma: ${language}`);
        
        HybridSpeechService.setLanguage(language);
        
        await HybridSpeechService.speak(`Olá em ${language}`, {
          language: language,
          rate: 0.8,
          pitch: 1.0,
        });
        
        // Aguardar entre idiomas
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      console.log('✅ Exemplo de configuração de idiomas concluído');
      
    } catch (error) {
      console.error('❌ Erro no exemplo de configuração de idiomas:', error);
    }
  }

  /**
   * Exemplo de limpeza e destruição
   */
  static async cleanupExample(): Promise<void> {
    try {
      console.log('🧹 Iniciando exemplo de limpeza...');
      
      // Parar qualquer fala em andamento
      await HybridSpeechService.stop();
      
      // Verificar se está falando
      const isSpeaking = HybridSpeechService.isCurrentlySpeaking();
      console.log(`🔊 Está falando: ${isSpeaking}`);
      
      // Obter o motor atual
      const currentEngine = HybridSpeechService.getCurrentEngine();
      console.log(`🔧 Motor atual: ${currentEngine}`);
      
      // Limpar recursos (chamar apenas quando necessário)
      // HybridSpeechService.destroy();
      
      console.log('✅ Exemplo de limpeza concluído');
      
    } catch (error) {
      console.error('❌ Erro no exemplo de limpeza:', error);
    }
  }

  /**
   * Executar todos os exemplos
   */
  static async runAllExamples(): Promise<void> {
    console.log('🚀 Iniciando todos os exemplos de fala...\n');
    
    try {
      await this.basicExample();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await this.androidTTSExample();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await this.voiceChangeExample();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await this.speechSequenceExample();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await this.errorHandlingExample();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await this.languageConfigurationExample();
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await this.cleanupExample();
      
      console.log('\n🎉 Todos os exemplos concluídos com sucesso!');
      
    } catch (error) {
      console.error('\n❌ Erro ao executar exemplos:', error);
    }
  }
}

export default SpeechServiceExample;
