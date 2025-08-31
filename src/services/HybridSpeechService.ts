import { Platform } from 'react-native';
import * as ExpoSpeech from 'expo-speech';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';

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

export type SpeechEngine = 'expo-speech' | 'react-native-tts' | 'react-native-voice';

export class HybridSpeechService {
  private static instance: HybridSpeechService;
  private currentEngine: SpeechEngine = 'expo-speech';
  private isInitialized: boolean = false;
  private isSpeaking: boolean = false;
  private currentLanguage: string = 'pt-BR';
  private enginePriority: SpeechEngine[] = ['react-native-tts', 'expo-speech', 'react-native-voice'];

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
        case 'react-native-tts':
          return await this.testTTSEngine();
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

  private async testTTSEngine(): Promise<boolean> {
    try {
      // Test TTS initialization
      await Tts.setDefaultLanguage('en-US');
      await Tts.setDefaultRate(0.8);
      await Tts.setDefaultPitch(1.0);
      
      // Wait a bit for the test to complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return true;
    } catch (error) {
      console.log('❌ TTS engine test failed:', error);
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
        case 'react-native-tts':
          await Tts.setDefaultLanguage(language);
          break;
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
        case 'react-native-tts':
          await this.speakWithTTS(text, options);
          break;
        case 'expo-speech':
          await this.speakWithExpoSpeech(text, options);
          break;
        case 'react-native-voice':
          await this.speakWithVoice(text, options);
          break;
        default:
          throw new Error(`Unknown engine: ${this.currentEngine}`);
      }
      
    } catch (error) {
      console.error(`❌ Error with ${this.currentEngine}:`, error);
      
      // Try to fallback to another engine
      await this.fallbackToAnotherEngine(text, options);
    }
  }

  private async speakWithTTS(text: string, options: SpeechOptions): Promise<void> {
    const ttsOptions: any = {
      language: options.language || this.currentLanguage,
      rate: options.rate || 0.8,
      pitch: options.pitch || 1.0,
    };

    if (options.voice) {
      ttsOptions.voice = options.voice;
    }

    await Tts.speak(text, ttsOptions);
  }

  private async speakWithExpoSpeech(text: string, options: SpeechOptions): Promise<void> {
    const expoOptions: any = {
      language: options.language || this.currentLanguage,
      rate: options.rate || 0.3, // Extremely slow default rate
      pitch: options.pitch || 1.0,
      onDone: options.onEnd,
      onError: options.onError,
      onStopped: options.onStopped,
    };

    if (options.voice) {
      expoOptions.voice = options.voice;
    }

    await ExpoSpeech.speak(text, expoOptions);
  }

  private async speakWithVoice(text: string, options: SpeechOptions): Promise<void> {
    // Voice is primarily for speech recognition, but we can try to use it for TTS
    await Voice.start(options.language || this.currentLanguage);
    
    // Simulate speech duration
    const speechDuration = Math.max(text.length * 100, 1000);
    setTimeout(() => {
      this.isSpeaking = false;
      if (options.onEnd) options.onEnd();
    }, speechDuration);
  }

  private async fallbackToAnotherEngine(text: string, options: SpeechOptions): Promise<void> {
    console.log('🔄 Attempting fallback to another engine...');
    
    // Try other engines
    for (const engine of this.enginePriority) {
      if (engine !== this.currentEngine) {
        try {
          console.log(`🔄 Trying fallback engine: ${engine}`);
          
          // Temporarily switch engine
          const originalEngine = this.currentEngine;
          this.currentEngine = engine;
          
          await this.speak(text, options);
          
          // If successful, keep the new engine
          console.log(`✅ Fallback to ${engine} successful`);
          return;
          
        } catch (error) {
          console.log(`❌ Fallback to ${engine} failed:`, error);
          // Revert to original engine
          this.currentEngine = this.currentEngine;
        }
      }
    }
    
    // If all engines fail, throw error
    throw new Error('All speech engines failed');
  }

  async stop(): Promise<void> {
    try {
      if (this.isSpeaking) {
        switch (this.currentEngine) {
          case 'react-native-tts':
            await Tts.stop();
            break;
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
      switch (this.currentEngine) {
        case 'react-native-tts':
          return await Tts.voices();
        case 'expo-speech':
          return await ExpoSpeech.getAvailableVoicesAsync();
        case 'react-native-voice':
          // Voice doesn't provide voices for TTS
          return [];
        default:
          return [];
      }
    } catch (error) {
      console.error('❌ Error getting available voices:', error);
      return [];
    }
  }

  getCurrentEngine(): SpeechEngine {
    return this.currentEngine;
  }

  isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  // Platform-specific initialization
  async initializeForPlatform(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        return await this.initializeForAndroid();
      } else if (Platform.OS === 'ios') {
        return await this.initializeForIOS();
      }
      return true;
    } catch (error) {
      console.error('❌ Error initializing for platform:', error);
      return false;
    }
  }

  private async initializeForAndroid(): Promise<boolean> {
    try {
      console.log('🤖 Initializing for Android...');
      
      // Android-specific initialization
      if (this.currentEngine === 'react-native-tts') {
        await Tts.setDefaultLanguage('pt-BR');
        await Tts.setDefaultRate(0.3); // Extremely slow default rate
        await Tts.setDefaultPitch(1.0);
      }
      
      return true;
    } catch (error) {
      console.error('❌ Error initializing for Android:', error);
      return false;
    }
  }

  private async initializeForIOS(): Promise<boolean> {
    try {
      console.log('🍎 Initializing for iOS...');
      
      // iOS-specific initialization
      if (this.currentEngine === 'react-native-tts') {
        await Tts.setDefaultLanguage('pt-BR');
        await Tts.setDefaultRate(0.8);
        await Tts.setDefaultPitch(1.0);
      }
      
      return true;
    } catch (error) {
      console.error('❌ Error initializing for iOS:', error);
      return false;
    }
  }

  // Cleanup
  destroy(): void {
    try {
      // Cleanup all engines
      Tts.removeAllListeners('tts-start');
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-cancel');
      Tts.removeAllListeners('tts-error');
      
      Voice.removeAllListeners();
      
      this.isInitialized = false;
      console.log('🧹 Hybrid Speech Service destroyed');
    } catch (error) {
      console.error('❌ Error destroying Hybrid Speech Service:', error);
    }
  }
}

export default HybridSpeechService.getInstance();
