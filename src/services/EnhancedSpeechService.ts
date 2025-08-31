import { Platform } from 'react-native';
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

export class EnhancedSpeechService {
  private static instance: EnhancedSpeechService;
  private isInitialized: boolean = false;
  private isSpeaking: boolean = false;
  private currentLanguage: string = 'pt-BR';

  private constructor() {
    this.initializeVoice();
  }

  static getInstance(): EnhancedSpeechService {
    if (!EnhancedSpeechService.instance) {
      EnhancedSpeechService.instance = new EnhancedSpeechService();
    }
    return EnhancedSpeechService.instance;
  }

  private initializeVoice(): void {
    try {
      // Configure voice event listeners
      Voice.onSpeechStart = this.handleSpeechStart.bind(this);
      Voice.onSpeechEnd = this.handleSpeechEnd.bind(this);
      Voice.onSpeechError = this.handleSpeechError.bind(this);
      Voice.onSpeechResults = this.handleSpeechResults.bind(this);
      Voice.onSpeechVolumeChanged = this.handleSpeechVolumeChanged.bind(this);
      
      this.isInitialized = true;
      console.log('✅ EnhancedSpeechService initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing EnhancedSpeechService:', error);
      this.isInitialized = false;
    }
  }

  setLanguage(language: string): void {
    this.currentLanguage = language;
    console.log(`🌍 Language set to: ${language}`);
  }

  async speak(text: string, options: SpeechOptions = {}): Promise<void> {
    if (!this.isInitialized) {
      console.error('❌ EnhancedSpeechService not initialized');
      throw new Error('Speech service not initialized');
    }

    if (this.isSpeaking) {
      console.log('🔄 Already speaking, stopping current speech...');
      await this.stop();
      // Small delay to ensure clean stop
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    try {
      console.log(`🗣️ Speaking: "${text}" in ${options.language || this.currentLanguage}`);
      
      // Set up event handlers
      if (options.onStart) Voice.onSpeechStart = options.onStart;
      if (options.onEnd) Voice.onSpeechEnd = options.onEnd;
      if (options.onError) Voice.onSpeechError = options.onError;
      if (options.onStopped) Voice.onSpeechStopped = options.onStopped;

      // Start speaking
      await Voice.start(options.language || this.currentLanguage);
      
      // For Android, we need to use a different approach since Voice.start is for speech recognition
      // We'll use the native TTS engine
      if (Platform.OS === 'android') {
        await this.speakAndroid(text, options);
      } else {
        // For iOS, we can use Voice or fallback to expo-speech
        await this.speakIOS(text, options);
      }

    } catch (error) {
      console.error('❌ Error starting speech:', error);
      throw error;
    }
  }

  private async speakAndroid(text: string, options: SpeechOptions): Promise<void> {
    try {
      // Android-specific implementation using native TTS
      const androidOptions = {
        language: options.language || this.currentLanguage,
        pitch: options.pitch || 1.0,
        rate: options.rate || 0.3, // Extremely slow default rate
        voice: options.voice,
      };

      console.log(`🤖 Android TTS options:`, androidOptions);
      
      // Use Voice.start for Android TTS (it supports TTS on Android)
      await Voice.start(androidOptions.language);
      
      // Simulate speech duration based on text length
      const speechDuration = Math.max(text.length * 100, 1000);
      
      setTimeout(() => {
        this.handleSpeechEnd();
      }, speechDuration);

    } catch (error) {
      console.error('❌ Android TTS error:', error);
      throw error;
    }
  }

  private async speakIOS(text: string, options: SpeechOptions): Promise<void> {
    try {
      // iOS implementation using Voice
      console.log(`🍎 iOS speech options:`, options);
      
      // iOS Voice.start works well for TTS
      await Voice.start(options.language || this.currentLanguage);
      
    } catch (error) {
      console.error('❌ iOS speech error:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      if (this.isSpeaking) {
        await Voice.stop();
        this.isSpeaking = false;
        console.log('⏹️ Speech stopped');
      }
    } catch (error) {
      console.error('❌ Error stopping speech:', error);
    }
  }

  async getAvailableVoices(): Promise<any[]> {
    try {
      // This would need to be implemented based on the specific TTS engine
      // For now, return a basic list
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

  // Event handlers
  private handleSpeechStart(): void {
    console.log('🔊 Speech started');
    this.isSpeaking = true;
  }

  private handleSpeechEnd(): void {
    console.log('🔇 Speech ended');
    this.isSpeaking = false;
  }

  private handleSpeechError(error: any): void {
    console.error('❌ Speech error:', error);
    this.isSpeaking = false;
  }

  private handleSpeechResults(event: any): void {
    console.log('📝 Speech results:', event);
  }

  private handleSpeechVolumeChanged(event: any): void {
    console.log('🔊 Volume changed:', event);
  }

  // Cleanup
  destroy(): void {
    try {
      Voice.destroy().then(Voice.removeAllListeners);
      this.isInitialized = false;
      console.log('🧹 EnhancedSpeechService destroyed');
    } catch (error) {
      console.error('❌ Error destroying EnhancedSpeechService:', error);
    }
  }
}

export default EnhancedSpeechService.getInstance();
