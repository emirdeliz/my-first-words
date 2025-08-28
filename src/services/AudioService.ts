import { LearningLevel } from '../contexts/LearningLevelContext';

export interface AudioOptions {
  level: LearningLevel;
  speed: number;
  includePhrases: boolean;
  includeComplexSentences: boolean;
}

export class AudioService {
  private static instance: AudioService;
  private currentLevel: LearningLevel = 1;

  private constructor() {}

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  setLevel(level: LearningLevel) {
    this.currentLevel = level;
  }

  getAudioOptions(): AudioOptions {
    switch (this.currentLevel) {
      case 1:
        return {
          level: 1,
          speed: 0.8, // Mais lento para nível básico
          includePhrases: false,
          includeComplexSentences: false,
        };
      case 2:
        return {
          level: 2,
          speed: 1.0, // Velocidade normal
          includePhrases: true,
          includeComplexSentences: false,
        };
      case 3:
        return {
          level: 3,
          speed: 1.2, // Mais rápido para nível avançado
          includePhrases: true,
          includeComplexSentences: true,
        };
      default:
        return {
          level: 1,
          speed: 0.8,
          includePhrases: false,
          includeComplexSentences: false,
        };
    }
  }

  async playWord(word: string): Promise<void> {
    const options = this.getAudioOptions();
    
    try {
      // Simulação de reprodução de áudio
      console.log(`🎵 Reproduzindo palavra: "${word}"`);
      console.log(`📊 Nível: ${options.level}, Velocidade: ${options.speed}x`);
      
      // Aqui você implementaria a lógica real de reprodução de áudio
      // Por exemplo, usando expo-av ou react-native-sound
      
      // Simular delay de reprodução
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`✅ Áudio reproduzido com sucesso para: "${word}"`);
    } catch (error) {
      console.error('❌ Erro ao reproduzir áudio:', error);
      throw error;
    }
  }

  async playPhrase(phrase: string): Promise<void> {
    const options = this.getAudioOptions();
    
    if (!options.includePhrases) {
      console.log('⚠️ Frases não disponíveis no nível atual');
      return;
    }

    try {
      console.log(`🎵 Reproduzindo frase: "${phrase}"`);
      console.log(`📊 Nível: ${options.level}, Velocidade: ${options.speed}x`);
      
      // Simular delay de reprodução
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log(`✅ Frase reproduzida com sucesso: "${phrase}"`);
    } catch (error) {
      console.error('❌ Erro ao reproduzir frase:', error);
      throw error;
    }
  }

  async playComplexSentence(sentence: string): Promise<void> {
    const options = this.getAudioOptions();
    
    if (!options.includeComplexSentences) {
      console.log('⚠️ Frases complexas não disponíveis no nível atual');
      return;
    }

    try {
      console.log(`🎵 Reproduzindo frase complexa: "${sentence}"`);
      console.log(`📊 Nível: ${options.level}, Velocidade: ${options.speed}x`);
      
      // Simular delay de reprodução
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`✅ Frase complexa reproduzida com sucesso: "${sentence}"`);
    } catch (error) {
      console.error('❌ Erro ao reproduzir frase complexa:', error);
      throw error;
    }
  }

  isPhraseEnabled(): boolean {
    return this.currentLevel >= 2;
  }

  isComplexSentenceEnabled(): boolean {
    return this.currentLevel >= 3;
  }
}

export default AudioService.getInstance();
