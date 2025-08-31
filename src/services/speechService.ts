import { Platform } from 'react-native';
import PlatformAwareSpeechService from './PlatformAwareSpeechService';

const VOICE_NAME_IGNORE = ['Trinoids', 'Albert', 'Jester'];

export class SpeechService {
  static async speak(text: string, languageCode: string): Promise<void> {
    try {
      // Stop any ongoing speech first
      await PlatformAwareSpeechService.stop();
      
      console.log(`🗣️ Speaking in ${languageCode}: "${text}"`);
      
      if (Platform.OS === 'web') {
        await this.speakWeb(text, languageCode);
      } else {
        await this.speakMobile(text, languageCode);
      }
      
    } catch (error) {
      console.error('❌ Speech error:', error);
    }
  }

  private static async speakWeb(text: string, languageCode: string): Promise<void> {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.2; // Extremely slow rate for maximum clarity
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      const loadAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log(`🎤 Available web voices: ${voices.length}`);
        
        // Enhanced voice matching
        let selectedVoice = null;
        
        // Strategy 1: Exact match
        selectedVoice = voices.find(voice => voice.lang === languageCode);
        if (selectedVoice) {
          console.log(`✅ Exact match found: ${selectedVoice.name} (${selectedVoice.lang})`);
        }
        
        // Strategy 2: Language family match
        if (!selectedVoice) {
          const langCode = languageCode.split('-')[0];
          selectedVoice = voices.find(voice => voice.lang.startsWith(langCode));
          if (selectedVoice) {
            console.log(`✅ Language family match: ${selectedVoice.name} (${selectedVoice.lang})`);
          }
        }
        
        // Strategy 3: Alternative language codes
        if (!selectedVoice) {
          const alternatives = this.getAlternativeLanguageCodes(languageCode);
          for (const altCode of alternatives) {
            selectedVoice = voices.find(voice => voice.lang === altCode);
            if (selectedVoice) {
              console.log(`✅ Alternative match: ${selectedVoice.name} (${selectedVoice.lang})`);
              break;
            }
          }
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          utterance.lang = selectedVoice.lang;
          console.log(`🎯 Using voice: ${selectedVoice.name} (${selectedVoice.lang})`);
        } else {
          utterance.lang = languageCode;
          console.log(`⚠️ No specific voice found, using default with lang: ${languageCode}`);
        }
        
        utterance.onstart = () => console.log('🔊 Speech started');
        utterance.onend = () => console.log('🔇 Speech ended');
        utterance.onerror = (event) => console.error('❌ Speech error:', event.error);
        
        window.speechSynthesis.speak(utterance);
      };
      
      // Ensure voices are loaded
      if (window.speechSynthesis.getVoices().length === 0) {
        console.log('⏳ Waiting for voices to load...');
        window.speechSynthesis.onvoiceschanged = loadAndSpeak;
        setTimeout(loadAndSpeak, 1000);
      } else {
        loadAndSpeak();
      }
    } else {
      console.error('❌ Web Speech API not supported');
    }
  }

  private static async speakMobile(text: string, languageCode: string): Promise<void> {
    try {
      const voices = await PlatformAwareSpeechService.getAvailableVoices();
      console.log(`🎤 Available mobile voices: ${voices.length}`);
      
      // Enhanced voice matching for mobile
      let selectedVoice = null;
      
      // Strategy 1: Exact language match
      selectedVoice = voices.find(voice => voice.language === languageCode && !VOICE_NAME_IGNORE.includes(voice.name));
      
      // Strategy 2: Language family match
      if (!selectedVoice) {
        const langCode = languageCode.split('-')[0];
        selectedVoice = voices.find(voice => voice.language.startsWith(langCode) && !VOICE_NAME_IGNORE.includes(voice.name));
      }
      
      // Strategy 3: Alternative codes for mobile
      if (!selectedVoice) {
        const alternatives = this.getAlternativeLanguageCodes(languageCode);
        for (const altCode of alternatives) {

          console.log('altCode', altCode);

          selectedVoice = voices.find(voice => voice.language === altCode && !VOICE_NAME_IGNORE.includes(voice.name));
          if (selectedVoice) break;
        }
      }
      
      const speechOptions = {
        language: languageCode,
        pitch: 1.0,
        rate: 0.7,
      } as any;
      
      if (selectedVoice) {
        speechOptions.voice = selectedVoice.identifier;
        console.log(`🎯 Using mobile voice: ${selectedVoice.name} (${selectedVoice.language})`);
      } else {
        console.log(`⚠️ No specific voice found for ${languageCode}, using system default`);
      }
      
      await PlatformAwareSpeechService.speak(text, speechOptions);
      
    } catch (voiceError) {
      console.warn('⚠️ Voice selection error, using basic speech:', voiceError);
      // Fallback to basic speech
      Speech.speak(text, {
        language: languageCode,
        pitch: 1.0,
        rate: 0.7,
      });
    }
  }

  private static getAlternativeLanguageCodes(languageCode: string): string[] {
    const alternatives: Record<string, string[]> = {
      'es-ES': ['es-MX', 'es-US', 'es-AR'],
      'pt-PT': ['pt-PT'],
      'pt-BR': ['pt-BR'],
      'de-DE': ['de-AT', 'de-CH'],
      'en-US': ['en-US'],
    };
    
    return alternatives[languageCode] || [];
  }
}