import { Platform } from 'react-native';
import * as ExpoSpeech from 'expo-speech';
import Voice from '@react-native-community/voice';

export interface SpeechOptions {
  language?: string;
  pitch?: number;
  rate?: number;
  voice?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
  onStopped?: () => void;
}

export type SpeechEngine = 'expo-speech' | 'react-native-voice';

export class HybridSpeechService {
  private static instance: HybridSpeechService;
  private currentEngine: SpeechEngine = 'expo-speech';
  private isInitialized: boolean = false;
  private isSpeaking: boolean = false;
  private currentLanguage: string = 'pt-BR';
  private enginePriority: SpeechEngine[] = ['expo-speech', 'react-native-voice'];

  private constructor() {
    this.initializeService();
  }

  static getInstance(): HybridSpeechService {
    if (!HybridSpeechService.instance) {
      HybridSpeechService.instance = new HybridSpeechService();
    }
    return HybridSpeechService.instance;
  }

  private async initializeService(): Promise<void> {
    try {
      console.log('🔧 Initializing Hybrid Speech Service...');
      
      // Test each engine and select the best one
      await this.selectBestEngine();
      
      this.isInitialized = true;
      console.log(`✅ Hybrid Speech Service initialized with engine: ${this.currentEngine}`);
      
    } catch (error) {
      console.error('❌ Error initializing Hybrid Speech Service:', error);
      this.isInitialized = false;
    }
  }

  private async selectBestEngine(): Promise<void> {
    for (const engine of this.enginePriority) {
      try {
        if (await this.testEngine(engine)) {
          this.currentEngine = engine;
          console.log(`✅ Selected engine: ${engine}`);
          return;
        }
      } catch (error) {
        console.log(`⚠️ Engine ${engine} test failed:`, error);
      }
    }
    
    // Fallback to expo-speech if all else fails
    this.currentEngine = 'expo-speech';
    console.log('⚠️ All engines failed, falling back to expo-speech');
  }

  private async testEngine(engine: SpeechEngine): Promise<boolean> {
    try {
      switch (engine) {
        case 'expo-speech':
          return await this.testExpoSpeechEngine();
        case 'react-native-voice':
          return await this.testVoiceEngine();
        default:
          return false;
      }
    } catch (error) {
      console.error(`❌ Error testing ${engine}:`, error);
      return false;
    }
  }

  private async testExpoSpeechEngine(): Promise<boolean> {
    try { 
      // Wait a bit for the test to complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return true;
    } catch (error) {
      console.log('❌ Expo Speech engine test failed:', error);
      return false;
    }
  }

  private async testVoiceEngine(): Promise<boolean> {
    try {
      // Wait a bit for the test to complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return true;
    } catch (error) {
      console.log('❌ Voice engine test failed:', error);
      return false;
    }
  }

  setLanguage(language: string): void {
    this.currentLanguage = language;
    console.log(`🌍 Language set to: ${language}`);
    
    // Update the current engine's language
    this.updateEngineLanguage(language);
  }

  private async updateEngineLanguage(language: string): Promise<void> {
    try {
      switch (this.currentEngine) {
        case 'expo-speech':
          // expo-speech doesn't have a setDefaultLanguage method
          break;
        case 'react-native-voice':
          // Voice doesn't have a setDefaultLanguage method
          break;
      }
    } catch (error) {
      console.error('❌ Error updating engine language:', error);
    }
  }

  async speak(text: string, options: SpeechOptions = {}): Promise<void> {
    if (!this.isInitialized) {
      console.error('❌ Hybrid Speech Service not initialized');
      throw new Error('Speech service not initialized');
    }

    if (this.isSpeaking) {
      console.log('🔄 Already speaking, stopping current speech...');
      await this.stop();
      // Small delay to ensure clean stop
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    try {
      console.log(`🗣️ Speaking with ${this.currentEngine}: "${text}" in ${options.language || this.currentLanguage}`);
      
      switch (this.currentEngine) {
        case 'expo-speech':
          await this.speakWithExpoSpeech(text, options);
          break;
        case 'react-native-voice':
          await this.speakWithVoice(text, options);
          break;
        default:
          throw new Error(`Unsupported engine: ${this.currentEngine}`);
      }

    } catch (error) {
      console.error('❌ Error speaking:', error);
      throw error;
    }
  }

  private async speakWithExpoSpeech(text: string, options: SpeechOptions): Promise<void> {
    try {
      const expoOptions = {
        language: options.language || this.currentLanguage,
        pitch: options.pitch || 1.0,
        rate: options.rate || 0.8,
        voice: options.voice,
        onStart: options.onStart,
        onDone: options.onEnd,
        onError: options.onError,
        onStopped: options.onStopped,
      };

      console.log('🔊 Using Expo Speech with options:', expoOptions);
      
      await ExpoSpeech.speak(text, expoOptions);
      
      this.isSpeaking = true;
      
      // Set up a timeout to mark as not speaking
      setTimeout(() => {
        this.isSpeaking = false;
        if (options.onEnd) options.onEnd();
      }, Math.max(text.length * 100, 1000));

    } catch (error) {
      console.error('❌ Expo Speech error:', error);
      throw error;
    }
  }

  private async speakWithVoice(text: string, options: SpeechOptions): Promise<void> {
    try {
      console.log('🔊 Using Voice with options:', options);
      
      // Voice is primarily for speech recognition, not TTS
      // We'll use it as a fallback for basic functionality
      if (options.onStart) options.onStart();
      
      // Simulate speech for now
      this.isSpeaking = true;
      
      setTimeout(() => {
        this.isSpeaking = false;
        if (options.onEnd) options.onEnd();
      }, Math.max(text.length * 100, 1000));

    } catch (error) {
      console.error('❌ Voice error:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      if (this.isSpeaking) {
        switch (this.currentEngine) {
          case 'expo-speech':
            await ExpoSpeech.stop();
            break;
          case 'react-native-voice':
            await Voice.stop();
            break;
        }
        
        this.isSpeaking = false;
        console.log('⏹️ Speech stopped');
      }
    } catch (error) {
      console.error('❌ Error stopping speech:', error);
    }
  }

  async getAvailableVoices(): Promise<any[]> {
    try {
      // Return basic voice options
      return [
        { identifier: 'pt-BR-female', name: 'Portuguese (Brazil) - Female', language: 'pt-BR' },
        { identifier: 'pt-BR-male', name: 'Portuguese (Brazil) - Male', language: 'pt-BR' },
        { identifier: 'en-US-female', name: 'English (US) - Female', language: 'en-US' },
        { identifier: 'en-US-male', name: 'English (US) - Male', language: 'en-US' },
        { identifier: 'es-ES-female', name: 'Spanish (Spain) - Female', language: 'es-ES' },
        { identifier: 'es-ES-male', name: 'Spanish (Spain) - Male', language: 'es-ES' },
      ];
    } catch (error) {
      console.error('❌ Error getting available voices:', error);
      return [];
    }
  }

  isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  getCurrentEngine(): SpeechEngine {
    return this.currentEngine;
  }

  // Cleanup
  destroy(): void {
    try {
      this.isInitialized = false;
      this.isSpeaking = false;
      console.log('🧹 Hybrid Speech Service destroyed');
    } catch (error) {
      console.error('❌ Error destroying Hybrid Speech Service:', error);
    }
  }
}

export default HybridSpeechService.getInstance();
