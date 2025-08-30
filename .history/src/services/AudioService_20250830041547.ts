import { LearningLevel } from '../contexts/LearningLevelContext';
import { Platform, PermissionsAndroid } from 'react-native';
import PlatformAwareSpeechService from './PlatformAwareSpeechService';

export interface AudioOptions {
  level: LearningLevel;
  speed: number;
  includePhrases: boolean;
  includeComplexSentences: boolean;
  voice?: string;
  pitch?: number;
  rate?: number;
}

export class AudioService {
  private static instance: AudioService;
  private currentLevel: LearningLevel = 1;
  private currentLanguage: string = 'pt-BR';
  private isPlaying: boolean = false;
  private audioQueue: Array<{ text: string; type: 'word' | 'phrase' | 'sentence' }> = [];
  private isInitialized: boolean = false;

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

  setLanguage(language: string) {
    this.currentLanguage = language;
  }

  // Initialize audio system for iOS
  async initializeForIOS(): Promise<boolean> {
    try {
      if (Platform.OS !== 'ios') return true;
      
      console.log('🔧 Initializing audio system for iOS...');
      
      // Test with a simple speech to initialize the system
      await TTSService.speak('test', {
        language: 'en-US',
        rate: 1.0,
        pitch: 1.0,
        onStart: () => {
          console.log('✅ iOS audio system initialized successfully');
          this.isInitialized = true;
        },
        onError: (error) => {
          console.error('❌ iOS audio system initialization failed:', error);
          this.isInitialized = false;
        },
        onStopped: () => {
          console.log('⏹️ iOS audio system initialization stopped');
        },
      });
      
      // Wait a bit for initialization
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return this.isInitialized;
    } catch (error) {
      console.error('❌ Error initializing iOS audio system:', error);
      return false;
    }
  }

  // Check and request audio permissions
  async checkAudioPermissions(): Promise<boolean> {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissão de Áudio',
            message: 'O app precisa de permissão para reproduzir áudio.',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      // iOS doesn't require explicit audio permissions for speech synthesis
      return true;
    } catch (error) {
      console.error('Error checking audio permissions:', error);
      return false;
    }
  }

  // Get available voices with better quality
  async getAvailableVoices(): Promise<any[]> {
    try {
      const voices = await TTSService.getAvailableVoices();
      return voices;
    } catch (error) {
      console.error('Error getting voices:', error);
      return [];
    }
  }

  // Select the best voice for the language
  private getBestVoiceForLanguage(language: string): string | undefined {
    // High quality voices for different languages
    const highQualityVoices: Record<string, string[]> = {
      'pt-BR': [
        'pt-BR-female-1', // Premium Brazilian female voice
        'pt-BR-male-1',   // Premium Brazilian male voice
        'pt-BR-female-2', // Alternative Brazilian female voice
        'pt-BR-male-2',   // Alternative Brazilian male voice
      ],
      'pt': [
        'pt-female-1',    // Premium Portuguese female voice
        'pt-male-1',      // Premium Portuguese male voice
      ],
      'en': [
        'en-US-female-1', // Premium American female voice
        'en-US-male-1',   // Premium American male voice
        'en-GB-female-1', // Premium British female voice
        'en-GB-male-1',   // Premium British male voice
      ],
      'es': [
        'es-ES-female-1', // Premium Spanish female voice
        'es-ES-male-1',   // Premium Spanish male voice
        'es-MX-female-1', // Premium Mexican female voice
        'es-MX-male-1',   // Premium Mexican male voice
      ],
      'de': [
        'de-DE-female-1', // Premium German female voice
        'de-DE-male-1',   // Premium German male voice
      ]
    };

    return highQualityVoices[language]?.[0];
  }

  // Optimized settings for each language
  private getLanguageOptimizedSettings(language: string) {
    const settings: Record<string, { pitch: number; rate: number; voice?: string }> = {
      'pt-BR': {
        pitch: 1.1,        // Slightly higher pitch to sound more natural
        rate: 0.85,        // Slightly slower speed for clarity
        voice: this.getBestVoiceForLanguage(language)
      },
      'pt': {
        pitch: 1.05,       // Natural pitch for European Portuguese
        rate: 0.9,         // Moderate speed
        voice: this.getBestVoiceForLanguage(language)
      },
      'en': {
        pitch: 1.0,        // Natural pitch for English
        rate: 0.95,        // Natural speed
        voice: this.getBestVoiceForLanguage(language)
      },
      'es': {
        pitch: 1.05,       // Slightly higher pitch for Spanish
        rate: 0.9,         // Moderate speed
        voice: this.getBestVoiceForLanguage(language)
      },
      'de': {
        pitch: 1.0,        // Natural pitch for German
        rate: 0.9,         // Moderate speed
        voice: this.getBestVoiceForLanguage(language)
      }
    };

    return settings[language] || { pitch: 1.0, rate: 0.9 };
  }

  getAudioOptions(): AudioOptions {
    const languageSettings = this.getLanguageOptimizedSettings(this.currentLanguage);
    
    switch (this.currentLevel) {
      case 1:
        return {
          level: 1,
          speed: 0.8, // Slower for basic level
          includePhrases: false,
          includeComplexSentences: false,
          voice: languageSettings.voice,
          pitch: languageSettings.pitch,
          rate: languageSettings.rate * 0.8, // Even slower for level 1
        };
      case 2:
        return {
          level: 2,
          speed: 1.0, // Normal speed
          includePhrases: true,
          includeComplexSentences: false,
          voice: languageSettings.voice,
          pitch: languageSettings.pitch,
          rate: languageSettings.rate,
        };
      case 3:
        return {
          level: 3,
          speed: 1.2, // Faster for advanced level
          includePhrases: true,
          includeComplexSentences: true,
          voice: languageSettings.voice,
          pitch: languageSettings.pitch,
          rate: languageSettings.rate * 1.1, // A bit faster for level 3
        };
      default:
        return {
          level: 1,
          speed: 0.8,
          includePhrases: false,
          includeComplexSentences: false,
          voice: languageSettings.voice,
          pitch: languageSettings.pitch,
          rate: languageSettings.rate * 0.8,
        };
    }
  }

  // Play audio with proper sequencing
  async playAudioSequence(text: string): Promise<void> {
    // If already playing, stop and clear current audio
    if (this.isPlaying) {
      console.log('🔄 Audio already playing, stopping current audio...');
      this.stop();
      // Small delay to ensure clean stop
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const options = this.getAudioOptions();
    
    try {
      // Clear any existing queue
      this.audioQueue = [];
      
      // Build audio sequence based on level
      if (this.currentLevel === 1) {
        // Level 1: Only word
        this.audioQueue.push({ text, type: 'word' });
      } else if (this.currentLevel === 2) {
        // Level 2: Word + phrase
        this.audioQueue.push({ text, type: 'word' });
        if (options.includePhrases) {
          this.audioQueue.push({ 
            text: `This is the word: ${text}`, 
            type: 'phrase' 
          });
        }
      } else if (this.currentLevel === 3) {
        // Level 3: Word + phrase + complex sentence
        this.audioQueue.push({ text, type: 'word' });
        if (options.includePhrases) {
          this.audioQueue.push({ 
            text: `This is the word: ${text}`, 
            type: 'phrase' 
          });
        }
        if (options.includeComplexSentences) {
          this.audioQueue.push({ 
            text: `The word "${text}" is very important for communication. Let's practice together!`, 
            type: 'sentence' 
          });
        }
      }
      
      console.log(`🎵 Starting audio sequence for level ${this.currentLevel} with ${this.audioQueue.length} items`);
      
      // Play the sequence
      await this.playNextInQueue();
      
    } catch (error) {
      console.error('❌ Error playing audio sequence:', error);
      throw error;
    }
  }

  // Play next item in the audio queue
  private async playNextInQueue(): Promise<void> {
    if (this.audioQueue.length === 0 || this.isPlaying) {
      return;
    }

    this.isPlaying = true;
    const audioItem = this.audioQueue.shift()!;
    const options = this.getLanguageOptimizedSettings(this.currentLanguage);
    
    try {
      console.log(`🎵 Playing ${audioItem.type}: "${audioItem.text}" on ${Platform.OS}`);
      
      // Android-specific fallback for tablets
      if (Platform.OS === 'android') {
        await this.playAudioAndroid(audioItem, options);
      } else {
        await this.playAudioStandard(audioItem, options);
      }
      
    } catch (error) {
      console.error(`❌ Error playing ${audioItem.type}:`, error);
      this.isPlaying = false;
      // Continue with next item even if there's an error
      setTimeout(() => {
        this.playNextInQueue();
      }, 500);
    }
  }

  // Standard audio playback for iOS and web
  private async playAudioStandard(audioItem: { text: string; type: string }, options: any): Promise<void> {
    try {
      // Check permissions first
      const hasPermission = await this.checkAudioPermissions();
      if (!hasPermission) {
        console.error('❌ Audio permission denied');
        this.isPlaying = false;
        setTimeout(() => {
          this.playNextInQueue();
        }, 500);
        return;
      }

      // Initialize iOS audio system if needed
      if (Platform.OS === 'ios' && !this.isInitialized) {
        console.log('🔧 iOS audio not initialized, initializing now...');
        const initialized = await this.initializeForIOS();
        if (!initialized) {
          console.error('❌ Failed to initialize iOS audio system');
          this.isPlaying = false;
          setTimeout(() => {
            this.playNextInQueue();
          }, 500);
          return;
        }
      }

      // iOS-specific optimizations
      const iosOptions = Platform.OS === 'ios' ? {
        language: this.currentLanguage,
        pitch: 1.0, // Use natural pitch for iOS
        rate: 0.8,  // Slightly slower for better clarity on iOS
        // iOS works better with these settings
        voice: undefined, // Let iOS choose the best voice
      } : {
        language: this.currentLanguage,
        voice: options.voice,
        pitch: options.pitch,
        rate: options.rate,
      };

      await TTSService.speak(audioItem.text, {
        ...iosOptions,
        onStart: () => {
          console.log(`✅ ${audioItem.type} played: "${audioItem.text}" on ${Platform.OS}`);
        },
        onFinish: () => {
          console.log(`✅ ${audioItem.type} played: "${audioItem.text}" on ${Platform.OS}`);
          this.isPlaying = false;
          // Play next item after a short delay
          setTimeout(() => {
            this.playNextInQueue();
          }, 500);
        },
        onError: (error) => {
          console.error(`❌ Error playing ${audioItem.type} on ${Platform.OS}:`, error);
          this.isPlaying = false;
          // Try iOS fallback if on iOS
          if (Platform.OS === 'ios') {
            this.tryIOSFallback(audioItem);
          } else {
            // Continue with next item even if there's an error
            setTimeout(() => {
              this.playNextInQueue();
            }, 500);
          }
        },
        onStopped: () => {
          console.log(`⏹️ ${audioItem.type} stopped: "${audioItem.text}" on ${Platform.OS}`);
          this.isPlaying = false;
        },
      });
    } catch (error) {
      console.error(`❌ Error in playAudioStandard on ${Platform.OS}:`, error);
      this.isPlaying = false;
      if (Platform.OS === 'ios') {
        this.tryIOSFallback(audioItem);
      } else {
        setTimeout(() => {
          this.playNextInQueue();
        }, 500);
      }
    }
  }

  // Android-specific audio playback with fallbacks
  private async playAudioAndroid(audioItem: { text: string; type: string }, options: any): Promise<void> {
    try {
      // First attempt: Standard speech
      await TTSService.speak(audioItem.text, {
        language: this.currentLanguage,
        voice: options.voice,
        pitch: options.pitch,
        rate: options.rate,
        onStart: () => {
          console.log(`✅ Android: ${audioItem.type} started: "${audioItem.text}"`);
        },
        onFinish: () => {
          console.log(`✅ Android: ${audioItem.type} played: "${audioItem.text}"`);
          this.isPlaying = false;
          setTimeout(() => {
            this.playNextInQueue();
          }, 500);
        },
        onError: (error) => {
          console.log(`⚠️ Android speech failed, trying fallback: ${error}`);
          this.tryAndroidFallback(audioItem, options);
        },
        onStopped: () => {
          console.log(`⏹️ Android: ${audioItem.type} stopped: "${audioItem.text}"`);
          this.isPlaying = false;
        },
      });
    } catch (error) {
      console.log(`⚠️ Android speech error, trying fallback: ${error}`);
      this.tryAndroidFallback(audioItem, options);
    }
  }

  // iOS fallback method
  private async tryIOSFallback(audioItem: { text: string; type: string }): Promise<void> {
    try {
      console.log(`🔄 iOS fallback: Trying minimal options`);
      
      // iOS fallback: Try with minimal options and English
      await TTSService.speak(audioItem.text, {
        language: 'en-US', // Fallback to English
        pitch: 1.0,
        rate: 0.8,
        onStart: () => {
          console.log(`✅ iOS fallback started: "${audioItem.text}"`);
        },
        onFinish: () => {
          console.log(`✅ iOS fallback succeeded: "${audioItem.text}"`);
          this.isPlaying = false;
          setTimeout(() => {
            this.playNextInQueue();
          }, 500);
        },
        onError: (error) => {
          console.error(`❌ iOS fallback failed: ${error}`);
          this.isPlaying = false;
          // Try second fallback
          this.tryIOSFallback2(audioItem);
        },
        onStopped: () => {
          this.isPlaying = false;
        },
      });
    } catch (error) {
      console.error(`❌ iOS fallback error: ${error}`);
      this.isPlaying = false;
      // Try second fallback
      this.tryIOSFallback2(audioItem);
    }
  }

  // iOS second fallback method
  private async tryIOSFallback2(audioItem: { text: string; type: string }): Promise<void> {
    try {
      console.log(`🔄 iOS fallback 2: Trying with no options`);
      
      // iOS fallback 2: Try with absolutely no options
      await TTSService.speak(audioItem.text, {
        onStart: () => {
          console.log(`✅ iOS fallback 2 started: "${audioItem.text}"`);
        },
        onFinish: () => {
          console.log(`✅ iOS fallback 2 succeeded: "${audioItem.text}"`);
          this.isPlaying = false;
          setTimeout(() => {
            this.playNextInQueue();
          }, 500);
        },
        onError: (error) => {
          console.error(`❌ iOS fallback 2 failed: ${error}`);
          this.isPlaying = false;
          // Continue with next item even if all fallbacks fail
          setTimeout(() => {
            this.playNextInQueue();
          }, 500);
        },
        onStopped: () => {
          this.isPlaying = false;
        },
      });
    } catch (error) {
      console.error(`❌ iOS fallback 2 error: ${error}`);
      this.isPlaying = false;
      setTimeout(() => {
        this.playNextInQueue();
      }, 500);
    }
  }

  // Android fallback methods
  private async tryAndroidFallback(audioItem: { text: string; type: string }, options: any): Promise<void> {
    try {
      // Fallback 1: Try with default language
      console.log(`🔄 Android fallback 1: Trying default language`);
      await TTSService.speak(audioItem.text, {
        language: 'en-US', // Fallback to English
        pitch: 1.0,
        rate: 0.9,
        onStart: () => {
          console.log(`✅ Android fallback 1 started: "${audioItem.text}"`);
        },
        onFinish: () => {
          console.log(`✅ Android fallback 1 succeeded: "${audioItem.text}"`);
          this.isPlaying = false;
          setTimeout(() => {
            this.playNextInQueue();
          }, 500);
        },
        onError: (error) => {
          console.log(`⚠️ Android fallback 1 failed: ${error}`);
          this.tryAndroidFallback2(audioItem);
        },
        onStopped: () => {
          this.isPlaying = false;
        },
      });
    } catch (error) {
      console.log(`⚠️ Android fallback 1 error: ${error}`);
      this.tryAndroidFallback2(audioItem);
    }
  }

  private async tryAndroidFallback2(audioItem: { text: string; type: string }): Promise<void> {
    try {
      // Fallback 2: Try with minimal options
      console.log(`🔄 Android fallback 2: Trying minimal options`);
      await TTSService.speak(audioItem.text, {
        onStart: () => {
          console.log(`✅ Android fallback 2 started: "${audioItem.text}"`);
        },
        onFinish: () => {
          console.log(`✅ Android fallback 2 succeeded: "${audioItem.text}"`);
          this.isPlaying = false;
          setTimeout(() => {
            this.playNextInQueue();
          }, 500);
        },
        onError: (error) => {
          console.error(`❌ All Android fallbacks failed: ${error}`);
          this.isPlaying = false;
          // Continue with next item even if all fallbacks fail
          setTimeout(() => {
            this.playNextInQueue();
          }, 500);
        },
        onStopped: () => {
          this.isPlaying = false;
        },
      });
    } catch (error) {
      console.error(`❌ Android fallback 2 error: ${error}`);
      this.isPlaying = false;
      setTimeout(() => {
        this.playNextInQueue();
      }, 500);
    }
  }

  // Legacy methods for backward compatibility
  async playWord(word: string): Promise<void> {
    await this.playAudioSequence(word);
  }

  async playPhrase(phrase: string): Promise<void> {
    const options = this.getAudioOptions();
    
    if (!options.includePhrases) {
      console.log('⚠️ Phrases not available at current level');
      return;
    }

    try {
      console.log(`🎵 Playing phrase: "${phrase}"`);
      
      // Stop any previous audio
      this.stop();
      
      await TTSService.speak(phrase, {
        language: this.currentLanguage,
        voice: options.voice,
        pitch: options.pitch,
        rate: options.rate,
        onStart: () => console.log(`✅ Phrase started: "${phrase}"`),
        onFinish: () => console.log(`✅ Phrase played: "${phrase}"`),
        onError: (error) => console.error(`❌ Error playing phrase:`, error),
        onStopped: () => console.log(`⏹️ Playback stopped: "${phrase}"`),
      });
      
    } catch (error) {
      console.error('❌ Error playing phrase:', error);
      throw error;
    }
  }

  async playComplexSentence(sentence: string): Promise<void> {
    const options = this.getAudioOptions();
    
    if (!options.includeComplexSentences) {
      console.log('⚠️ Complex sentences not available at current level');
      return;
    }

    try {
      console.log(`🎵 Playing complex sentence: "${sentence}"`);
      
      // Stop any previous audio
      this.stop();
      
      await TTSService.speak(sentence, {
        language: this.currentLanguage,
        voice: options.voice,
        pitch: options.pitch,
        rate: options.rate,
        onStart: () => console.log(`✅ Complex sentence started: "${sentence}"`),
        onFinish: () => console.log(`✅ Complex sentence played: "${sentence}"`),
        onError: (error) => console.error(`❌ Error playing complex sentence:`, error),
        onStopped: () => console.log(`⏹️ Playback stopped: "${sentence}"`),
      });
      
    } catch (error) {
      console.error('❌ Error playing complex sentence:', error);
      throw error;
    }
  }

  // Stop current playback and clear queue
  stop(): void {
    TTSService.stop();
    this.isPlaying = false;
    this.audioQueue = [];
  }

  // Check if currently speaking
  async isSpeaking(): Promise<boolean> {
    return this.isPlaying || TTSService.isCurrentlySpeaking();
  }

  // Test audio on iOS
  async testAudioOnIOS(): Promise<boolean> {
    try {
      if (Platform.OS !== 'ios') return true;
      
      console.log('🧪 Testing audio on iOS...');
      
      // Test with a simple word
      await TTSService.speak('test', {
        language: 'en-US',
        rate: 1.0,
        pitch: 1.0,
        onStart: () => {
          console.log('✅ iOS audio test started');
        },
        onFinish: () => {
          console.log('✅ iOS audio test successful');
        },
        onError: (error) => {
          console.error('❌ iOS audio test failed:', error);
        },
        onStopped: () => {
          console.log('⏹️ iOS audio test stopped');
        },
      });
      
      // Wait a bit for the test to complete
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return true;
    } catch (error) {
      console.error('❌ Error testing iOS audio:', error);
      return false;
    }
  }

  // Check if currently speaking (synchronous)
  isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }

  isPhraseEnabled(): boolean {
    return this.currentLevel >= 2;
  }

  isComplexSentenceEnabled(): boolean {
    return this.currentLevel >= 3;
  }
}

export default AudioService.getInstance();
