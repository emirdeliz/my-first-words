import { Platform } from 'react-native';
import Tts from 'react-native-tts';

export interface TTSSpeechOptions {
  language?: string;
  pitch?: number;
  rate?: number;
  voice?: string;
  onStart?: () => void;
  onFinish?: () => void;
  onError?: (error: any) => void;
  onStopped?: () => void;
}

export class TTSService {
  private static instance: TTSService;
  private isInitialized: boolean = false;
  private isSpeaking: boolean = false;
  private currentLanguage: string = 'pt-BR';
  private availableVoices: any[] = [];

  private constructor() {
    this.initializeTTS();
  }

  static getInstance(): TTSService {
    if (!TTSService.instance) {
      TTSService.instance = new TTSService();
    }
    return TTSService.instance;
  }

  private async initializeTTS(): Promise<void> {
    try {
      console.log('🔧 Initializing TTS Service...');
      console.log('🔧 Platform:', Platform.OS);
      console.log('🔧 Current language:', this.currentLanguage);

      // Set up TTS event listeners
      Tts.addEventListener('tts-start', this.handleTTSStart.bind(this));
      Tts.addEventListener('tts-finish', this.handleTTSFinish.bind(this));
      Tts.addEventListener('tts-cancel', this.handleTTSCancel.bind(this));
      Tts.addEventListener('tts-error', this.handleTTSError.bind(this));

      console.log('🔧 TTS event listeners set up');

      // Initialize TTS with error handling for each step
      try {
        await Tts.setDefaultLanguage(this.currentLanguage);
        console.log('✅ Default language set to:', this.currentLanguage);
      } catch (langError) {
        console.error('❌ Error setting default language:', langError);
        // Try with base language
        const baseLang = this.currentLanguage.split('-')[0];
        try {
          await Tts.setDefaultLanguage(baseLang);
          console.log('✅ Fallback language set to:', baseLang);
        } catch (fallbackError) {
          console.error('❌ Error setting fallback language:', fallbackError);
        }
      }

      try {
        await Tts.setDefaultRate(0.3); // Extremely slow default rate
        console.log('✅ Default rate set to 0.3');
      } catch (rateError) {
        console.error('❌ Error setting default rate:', rateError);
      }

      try {
        await Tts.setDefaultPitch(1.0);
        console.log('✅ Default pitch set to 1.0');
      } catch (pitchError) {
        console.error('❌ Error setting default pitch:', pitchError);
      }

      // Get available voices
      try {
        if (Platform.OS === 'android') {
          this.availableVoices = await Tts.voices();
          console.log(`🎤 Available Android voices: ${this.availableVoices.length}`);
          if (this.availableVoices.length > 0) {
            console.log('🎤 Sample Android voices:', this.availableVoices.slice(0, 3).map(v => ({
              id: v.id,
              name: v.name,
              language: v.language
            })));
          }
        } else {
          // iOS voices are handled differently
          this.availableVoices = await Tts.voices();
          console.log(`🎤 Available iOS voices: ${this.availableVoices.length}`);
        }
      } catch (voicesError) {
        console.error('❌ Error getting available voices:', voicesError);
        this.availableVoices = [];
      }

      this.isInitialized = true;
      console.log('✅ TTS Service initialized successfully');

      // Test TTS with a simple sound
      try {
        console.log('🔊 Testing TTS with simple sound...');
        await Tts.speak('Teste');
        console.log('✅ TTS test sound played successfully');
      } catch (testError) {
        console.error('❌ TTS test sound failed:', testError);
      }

    } catch (error) {
      console.error('❌ Error initializing TTS Service:', error);
      this.isInitialized = false;
    }
  }

  setLanguage(language: string): void {
    this.currentLanguage = language;
    console.log(`🌍 Language set to: ${language}`);
    
    // Update TTS language
    if (this.isInitialized) {
      Tts.setDefaultLanguage(language).catch(error => {
        console.error('❌ Error setting TTS language:', error);
      });
    }
  }

  async speak(text: string, options: TTSSpeechOptions = {}): Promise<void> {
    if (!this.isInitialized) {
      console.error('❌ TTS Service not initialized');
      throw new Error('TTS service not initialized');
    }

    if (this.isSpeaking) {
      console.log('🔄 Already speaking, stopping current speech...');
      await this.stop();
      // Small delay to ensure clean stop
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    try {
      console.log(`🗣️ Speaking: "${text}" in ${options.language || this.currentLanguage}`);
      
      // Set up event handlers for this specific speech
      if (options.onStart) {
        Tts.addEventListener('tts-start', options.onStart);
      }
      if (options.onFinish) {
        Tts.addEventListener('tts-finish', options.onFinish);
      }
      if (options.onError) {
        Tts.addEventListener('tts-error', options.onError);
      }
      if (options.onStopped) {
        Tts.addEventListener('tts-cancel', options.onStopped);
      }

      // Configure TTS options
      const ttsOptions: any = {};
      
      if (options.language) {
        ttsOptions.language = options.language;
      }
      
      if (options.rate !== undefined) {
        ttsOptions.rate = options.rate;
      }
      
      if (options.pitch !== undefined) {
        ttsOptions.pitch = options.pitch;
      }

      // Set specific voice if provided and it exists in available voices
      if (options.voice) {
        try {
          // Check if the voice actually exists in our available voices
          const voiceExists = this.availableVoices.some(voice => 
            voice.id === options.voice || voice.identifier === options.voice
          );
          
          if (voiceExists) {
            await Tts.setDefaultVoice(options.voice);
            console.log(`🎤 Voice set to: ${options.voice}`);
          } else {
            console.warn(`⚠️ Voice ${options.voice} not found in available voices, using default`);
          }
        } catch (voiceError) {
          console.warn(`⚠️ Could not set voice ${options.voice}, using default:`, voiceError);
        }
      }

      // Start speaking
      Tts.speak(text, ttsOptions);
      
    } catch (error) {
      console.error('❌ Error starting TTS speech:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      if (this.isSpeaking) {
        await Tts.stop();
        this.isSpeaking = false;
        console.log('⏹️ TTS speech stopped');
      }
    } catch (error) {
      console.error('❌ Error stopping TTS speech:', error);
    }
  }

  async getAvailableVoices(): Promise<any[]> {
    if (!this.isInitialized) {
      await this.initializeTTS();
    }
    return this.availableVoices;
  }

  async getBestVoiceForLanguage(language: string): Promise<any | null> {
    try {
      const voices = await this.getAvailableVoices();
      
      if (voices.length === 0) {
        console.log('⚠️ No voices available');
        return null;
      }

      // Filter voices by language
      const languageVoices = voices.filter(voice => {
        const voiceLang = voice.language || voice.lang;
        return voiceLang && (
          voiceLang === language || 
          voiceLang.startsWith(language.split('-')[0])
        );
      });

      if (languageVoices.length === 0) {
        console.log(`⚠️ No voices found for language: ${language}`);
        return null;
      }

      // Prefer female voices for better clarity
      const femaleVoice = languageVoices.find(voice => 
        voice.name && voice.name.toLowerCase().includes('female')
      );

      if (femaleVoice) {
        console.log(`🎯 Found female voice for ${language}: ${femaleVoice.name}`);
        return femaleVoice;
      }

      // Return first available voice for the language
      console.log(`🎯 Using voice for ${language}: ${languageVoices[0].name}`);
      return languageVoices[0];

    } catch (error) {
      console.error('❌ Error getting best voice for language:', error);
      return null;
    }
  }

  async setVoice(voice: any): Promise<void> {
    try {
      if (voice && voice.id) {
        await Tts.setDefaultVoice(voice.id);
        console.log(`🎤 Voice set to: ${voice.name}`);
      }
    } catch (error) {
      console.error('❌ Error setting voice:', error);
    }
  }

  async setRate(rate: number): Promise<void> {
    try {
      await Tts.setDefaultRate(rate);
      console.log(`⚡ Rate set to: ${rate}`);
    } catch (error) {
      console.error('❌ Error setting rate:', error);
    }
  }

  async setPitch(pitch: number): Promise<void> {
    try {
      await Tts.setDefaultPitch(pitch);
      console.log(`🎵 Pitch set to: ${pitch}`);
    } catch (error) {
      console.error('❌ Error setting pitch:', error);
    }
  }

  isCurrentlySpeaking(): boolean {
    return this.isSpeaking;
  }

  // Event handlers
  private handleTTSStart(): void {
    console.log('🔊 TTS started');
    this.isSpeaking = true;
  }

  private handleTTSFinish(): void {
    console.log('🔇 TTS finished');
    this.isSpeaking = false;
  }

  private handleTTSCancel(): void {
    console.log('⏹️ TTS cancelled');
    this.isSpeaking = false;
  }

  private handleTTSError(error: any): void {
    console.error('❌ TTS error:', error);
    this.isSpeaking = false;
  }

  // Platform-specific methods
  async initializeForAndroid(): Promise<boolean> {
    if (Platform.OS !== 'android') return true;

    try {
      console.log('🤖 Initializing TTS for Android...');
      
      // Android-specific initialization
      await Tts.setDefaultLanguage('pt-BR');
      await Tts.setDefaultRate(0.3); // Extremely slow default rate
      await Tts.setDefaultPitch(1.0);
      
      console.log('✅ Android TTS initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Error initializing Android TTS:', error);
      return false;
    }
  }

  async initializeForIOS(): Promise<boolean> {
    if (Platform.OS !== 'ios') return true;

    try {
      console.log('🍎 Initializing TTS for iOS...');
      
      // iOS-specific initialization
      await Tts.setDefaultLanguage('pt-BR');
      await Tts.setDefaultRate(0.3); // Extremely slow default rate
      await Tts.setDefaultPitch(1.0);
      
      console.log('✅ iOS TTS initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Error initializing iOS TTS:', error);
      return false;
    }
  }

  // Cleanup
  destroy(): void {
    try {
      Tts.removeAllListeners('tts-start');
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-cancel');
      Tts.removeAllListeners('tts-error');
      this.isInitialized = false;
      console.log('🧹 TTS Service destroyed');
    } catch (error) {
      console.error('❌ Error destroying TTS Service:', error);
    }
  }
}

export default TTSService.getInstance();
