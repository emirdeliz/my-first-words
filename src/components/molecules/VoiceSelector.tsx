import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PlatformAwareSpeechService from '../../services/PlatformAwareSpeechService';
import { useLanguage } from '../../hooks/useLanguage';
import { useAudioConfig } from '../../contexts/AudioConfigContext';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';
import { VOICE_TRANSLATIONS } from '../../constants/VoiceTranslations';

interface VoiceSelectorProps {
  onVoiceSelect?: (voice: string) => void;
}

const VoiceSelector = ({ onVoiceSelect }: VoiceSelectorProps) => {
  const { currentLanguage, translation } = useLanguage();
  const { audioConfig, setSelectedVoice: saveSelectedVoice } = useAudioConfig();
  const [modalVisible, setModalVisible] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<any[]>([]);
  const [testingVoice, setTestingVoice] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(false);
  
  // Get voice translations for current language
  const voiceTranslations = VOICE_TRANSLATIONS[currentLanguage.code] || VOICE_TRANSLATIONS['en'];

  useEffect(() => {
    loadAvailableVoices();
  }, [currentLanguage.code, isOnline]);

  // Check internet connectivity
  useEffect(() => {
    checkConnectivity();
    
    // Check connectivity every 30 seconds
    const interval = setInterval(checkConnectivity, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const checkConnectivity = async () => {
    try {
      // Simple connectivity check using fetch
      const response = await fetch('https://www.google.com', { 
        method: 'HEAD',
        mode: 'no-cors'
      });
      setIsOnline(true);
      console.log('🌐 Device is online');
    } catch (error) {
      setIsOnline(false);
      console.log('📱 Device is offline');
    }
  };

  const loadAvailableVoices = async () => {
    try {
      const voices = await PlatformAwareSpeechService.getAvailableVoices();
      console.log(`🎵 Total voices received: ${voices.length}`);
      console.log(`🎵 Current language: ${currentLanguage.code}`);
      
      // Log first few voices for debugging
      if (voices.length > 0) {
        console.log('🎵 Sample voices:', voices.slice(0, 3).map(v => ({
          id: v.id,
          name: v.name,
          language: v.language,
          requiresInternet: v.requiresInternet,
          isOnline: v.isOnline
        })));
      }
      
      // Filter voices for the current language and offline availability
      const filteredVoices = voices.filter(voice => {
        // Defensive check for voice properties
        if (!voice || !voice.language) {
          console.log('🎵 Skipping invalid voice:', voice);
          return false;
        }
        
        const voiceLang = voice.language.toLowerCase();
        const targetLang = currentLanguage.code.toLowerCase();
        
        // Check if voice requires internet
        const requiresInternet = voice.requiresInternet === true || 
                                voice.isOnline === true || 
                                voice.isStreaming === true || 
                                voice.isCloud === true || 
                                voice.isNetwork === true;
        
        // If device is offline, only accept offline voices
        if (!isOnline && requiresInternet) {
          console.log('🎵 Skipping online voice (device offline):', voice.name || voice.id);
          return false;
        }
        
        // If device is online, accept both offline and online voices
        if (isOnline) {
          console.log('🎵 Accepting voice (device online):', voice.name || voice.id, requiresInternet ? '(online)' : '(offline)');
        } else {
          console.log('🎵 Accepting offline voice (device offline):', voice.name || voice.id);
        }
        
        // Only skip obvious cloud/AI voices, be more permissive with system voices
        // const voiceName = (voice.name || '').toLowerCase();
        // const voiceId = (voice.id || '').toLowerCase();
        
        // Skip only the most obvious cloud/AI voices
        // if ((voiceName && voiceName.includes('google')) || (voiceId && voiceId.includes('google')) ||
        //     (voiceName && voiceName.includes('siri')) || (voiceId && voiceId.includes('siri')) ||
        //     (voiceName && voiceName.includes('alexa')) || (voiceId && voiceId.includes('alexa'))) {
        //   console.log('🎵 Skipping obvious cloud voice:', voice.name || voice.id);
        //   return false;
        // }
        
        // For Portuguese, be more specific to avoid mixing PT-PT and PT-BR
        if (targetLang === 'pt-br') {
          // Prefer PT-BR, but also accept generic PT if no PT-BR available
          // However, explicitly exclude PT-PT to avoid mixing
          if (voiceLang === 'pt-br' || voiceLang === 'pt_br') {
            console.log('🎵 Accepting PT-BR voice:', voice.name || voice.id, voiceLang);
            return true; // Accept PT-BR
          }
          if (voiceLang === 'pt' && !voiceLang.includes('pt-pt') && !voiceLang.includes('pt_pt')) {
            console.log('🎵 Accepting generic PT voice:', voice.name || voice.id, voiceLang);
            return true; // Accept generic PT but not PT-PT
          }
          if (voiceLang.includes('portuguese') || voiceLang.includes('portugues')) {
            console.log('🎵 Accepting Portuguese voice:', voice.name || voice.id, voiceLang);
            return true; // Accept Portuguese variations
          }
          console.log('🎵 Rejecting voice (likely PT-PT):', voice.name || voice.id, voiceLang);
          return false; // Reject PT-PT and other variations
        }
        
        // For other languages, be more permissive
        if (voiceLang === targetLang) return true;
        if (targetLang.includes('-')) {
          const baseLang = targetLang.split('-')[0];
          return voiceLang === baseLang || voiceLang.startsWith(baseLang);
        }
        
        // Accept any voice that might be compatible
        return true;
      });
      
      console.log(`🎵 Voices after filtering: ${filteredVoices.length}`);
      
      // Check for different types of duplicates
      const duplicateCheck = new Map();
      const duplicates: any[] = [];
      const similarVoices: any[] = [];
      
      filteredVoices.forEach(voice => {
        // Check for exact duplicates (same id)
        const exactKey = `${voice.language}-${voice.id}`;
        if (duplicateCheck.has(exactKey)) {
          duplicates.push({ 
            type: 'exact', 
            original: duplicateCheck.get(exactKey), 
            duplicate: voice 
          });
        } else {
          duplicateCheck.set(exactKey, voice);
        }
        
        // Check for similar voices (same language, similar properties)
        const similarKey = `${voice.language}-${voice.name || ''}`;
        if (similarKey !== exactKey) {
          const existing = Array.from(duplicateCheck.values()).find(v => 
            v.language === voice.language && 
            (v.name === voice.name || v.id === voice.id)
          );
          if (existing) {
            similarVoices.push({ 
              type: 'similar', 
              existing, 
              current: voice 
            });
          }
        }
      });
      
      // Log only if there are issues
      if (duplicates.length > 0 || similarVoices.length > 0) {
        console.log('⚠️ Voice duplicates found:', { duplicates: duplicates.length, similar: similarVoices.length });
      }
      
      // Remove duplicates before setting available voices
      const uniqueVoices = removeDuplicateVoices(filteredVoices);
      // Remove duplicates before setting available voices
      
      // Ensure we have a good mix of male and female voices
      const maleVoices = uniqueVoices.filter(voice => {
        const id = voice.id || '';
        const name = voice.name || '';
        return id.toLowerCase().includes('male') || 
               name.toLowerCase().includes('male') ||
               id.toLowerCase().includes('homem') || 
               name.toLowerCase().includes('homem');
      });
      
      const femaleVoices = uniqueVoices.filter(voice => {
        const id = voice.id || '';
        const name = voice.name || '';
        return id.toLowerCase().includes('female') || 
               name.toLowerCase().includes('female') ||
               id.toLowerCase().includes('mulher') || 
               name.toLowerCase().includes('mulher');
      });
      
      // Log voice distribution for debugging
      
      // If we have both male and female voices, prioritize them in the list
      let finalVoices = [...uniqueVoices];
      if (maleVoices.length > 0 && femaleVoices.length > 0) {
        // Sort to show male voices first, then female, then others
        finalVoices.sort((a, b) => {
          const isMaleA = maleVoices.includes(a);
          const isMaleB = maleVoices.includes(b);
          const isFemaleA = femaleVoices.includes(a);
          const isFemaleB = femaleVoices.includes(b);
          
          if (isMaleA && !isMaleB) return -1;
          if (!isMaleA && isMaleB) return 1;
          if (isFemaleA && !isFemaleB) return -1;
          if (!isFemaleA && isFemaleB) return 1;
          return 0;
        });
      }
      
      // If no voices found after filtering, try to get any available voices for the language
      if (finalVoices.length === 0) {
        console.log('⚠️ No voices found after filtering, trying to get any available voices for language:', currentLanguage.code);
        
        // Get all voices and filter by language more broadly
        const allVoices = await PlatformAwareSpeechService.getAvailableVoices();
        const broadFilteredVoices = allVoices.filter(voice => {
          if (!voice || !voice.language || !voice.id) return false;
          
          const voiceLang = voice.language.toLowerCase();
          const targetLang = currentLanguage.code.toLowerCase();
          
          // More permissive language matching
          if (voiceLang === targetLang) return true;
          if (targetLang.includes('-')) {
            const baseLang = targetLang.split('-')[0];
            return voiceLang === baseLang || voiceLang.startsWith(baseLang);
          }
          return voiceLang.includes(targetLang) || targetLang.includes(voiceLang);
        });
        
        if (broadFilteredVoices.length > 0) {
          finalVoices.push(...broadFilteredVoices);
          console.log('✅ Found voices with broader filtering:', broadFilteredVoices.length);
        } else {
          console.log('⚠️ No voices found even with broad filtering');
        }
      }
      
      setAvailableVoices(finalVoices);
      
      // Select the best available voice for the current language
      if (finalVoices.length > 0) {
        // Try to find a male voice first, then fall back to any available voice
        const maleVoice = finalVoices.find(voice => {
          const id = voice.id || '';
          const name = voice.name || '';
          return id.toLowerCase().includes('male') || 
                 name.toLowerCase().includes('male') ||
                 id.toLowerCase().includes('homem') || 
                 name.toLowerCase().includes('homem');
        });
        
        const selectedVoice = maleVoice || finalVoices[0];
        saveSelectedVoice(selectedVoice.id);
      }
    } catch (error) {
      console.error('❌ Error loading voices:', error);
      
      console.log('⚠️ No voices available after error, will use system default');
      setAvailableVoices([]);
    }
  };

  const selectVoice = async (voiceId: string) => {
    console.log('🎤 VoiceSelector - Selecting voice:', voiceId);
    await saveSelectedVoice(voiceId);
    console.log('🎤 VoiceSelector - Voice saved, closing modal');
    
    // Notify parent component about voice change
    onVoiceSelect?.(voiceId);
    
    // Small delay to ensure state is updated
    setTimeout(() => {
      setModalVisible(false);
    }, 100);
  };

  const testVoice = async (voiceId: string) => {
    try {
      setTestingVoice(voiceId); // Set loading state
      PlatformAwareSpeechService.stop(); // Stop any previous speech
      
      // Use voice translations for test text
      const testText = voiceTranslations.testText[currentLanguage.code as keyof typeof voiceTranslations.testText] || voiceTranslations.testText['en'];
      
      // Find the voice object to get more details
      const voiceObject = availableVoices.find(v => v.id === voiceId);
      console.log(`🎵 Testing voice: ${voiceId} (${voiceObject?.name || 'Unknown'}) with text: "${testText}"`);
      console.log(`🎵 Voice details:`, voiceObject);
      
      const speechOptions = {
        language: currentLanguage.code,
        voice: voiceId,
        pitch: 1.0,
        rate: 0.9,
        onStart: () => { console.log(`✅ Voice test started: ${voiceId}`); },
        onFinish: () => { console.log(`✅ Voice tested successfully: ${voiceId}`); setTestingVoice(null); },
        onError: (error: any) => { console.error(`❌ Error testing voice:`, error); setTestingVoice(null); },
        onStopped: () => { console.log(`⏹️ Test stopped: ${voiceId}`); setTestingVoice(null); },
      };
      
      console.log(`🎵 Speech options:`, speechOptions);
      await PlatformAwareSpeechService.speak(testText, speechOptions);
      
    } catch (error) {
      console.error('❌ Error testing voice:', error);
      setTestingVoice(null);
      // Show error message to user
      alert('Unable to test this voice. Try again or select another voice.');
    }
  };

  const getFriendlyVoiceName = (voice: any): string => {
    // Extract language and region from voice id or language
    const lang = voice.language || '';
    const id = voice.id || '';
    
    // Handle specific voice names
    if (voice.name && voice.name !== voice.id) {
      return voice.name;
    }
    
    // Handle special cases
    if (id === 'offline-default-voice') {
      return 'Voz Padrão do Sistema';
    }
    
    // Extract gender from id or name
    let gender = '';
    if (id.toLowerCase().includes('female') || id.toLowerCase().includes('mulher')) {
      gender = 'Feminina';
    } else if (id.toLowerCase().includes('male') || id.toLowerCase().includes('homem')) {
      gender = 'Masculina';
    }
    
    // Extract voice type/quality
    let voiceType = '';
    if (voice.quality === 'Enhanced' || voice.quality === 'Premium') {
      voiceType = 'Premium';
    } else if (voice.quality === 'High') {
      voiceType = 'Alta Qualidade';
    } else if (voice.quality === 'Offline') {
      voiceType = 'Offline';
    }
    
    // Build friendly name
    let friendlyName = '';
    
    // Language-specific naming
    if (lang.includes('pt-BR') || lang.includes('pt_br')) {
      friendlyName = 'Português Brasileiro';
    } else if (lang.includes('pt')) {
      friendlyName = 'Português';
    } else if (lang.includes('en')) {
      friendlyName = 'Inglês';
    } else if (lang.includes('es')) {
      friendlyName = 'Espanhol';
    } else if (lang.includes('de')) {
      friendlyName = 'Alemão';
    } else {
      friendlyName = lang || 'Voz';
    }
    
    // Add gender if available
    if (gender) {
      friendlyName += ` ${gender}`;
    }
    
    // Add voice type if available
    if (voiceType && voiceType !== 'Offline') {
      friendlyName += ` ${voiceType}`;
    }
    
    // Add number if it's a numbered voice
    const voiceNumber = id.match(/\d+/);
    if (voiceNumber) {
      friendlyName += ` ${voiceNumber[0]}`;
    }
    
    return friendlyName;
  };

  const getVoiceDescription = (voice: any): string => {
    const parts: string[] = [];
    
    // Add language in Portuguese
    const lang = voice.language || '';
    if (lang.includes('pt-BR') || lang.includes('pt_br')) {
      parts.push('Português BR');
    } else if (lang.includes('pt')) {
      parts.push('Português');
    } else if (lang.includes('en')) {
      parts.push('Inglês');
    } else if (lang.includes('es')) {
      parts.push('Espanhol');
    } else if (lang.includes('de')) {
      parts.push('Alemão');
    } else {
      parts.push(lang || 'Idioma');
    }
    
    // Add age group and gender (combined to avoid duplication)
    const id = voice.id || '';
    if (id.toLowerCase().includes('child') || id.toLowerCase().includes('criança') || 
        id.toLowerCase().includes('kid') || id.toLowerCase().includes('infantil') ||
        id.toLowerCase().includes('young') || id.toLowerCase().includes('jovem') ||
        id.toLowerCase().includes('teen') || id.toLowerCase().includes('adolescente')) {
      parts.push('Infantil');
    } else {
      // For adult voices, show gender instead of "Adulto"
      const name = voice.name || '';
      if (id.toLowerCase().includes('female') || id.toLowerCase().includes('mulher') ||
          id.toLowerCase().includes('feminina') || id.toLowerCase().includes('femenina') ||
          id.toLowerCase().includes('weiblich') ||
          name.toLowerCase().includes('female') || name.toLowerCase().includes('mulher') ||
          name.toLowerCase().includes('feminina') || name.toLowerCase().includes('femenina') ||
          name.toLowerCase().includes('weiblich')) {
        parts.push('Voz Feminina');
      } else if (id.toLowerCase().includes('male') || id.toLowerCase().includes('homem') ||
                 id.toLowerCase().includes('masculina') || id.toLowerCase().includes('männlich') ||
                 name.toLowerCase().includes('male') || name.toLowerCase().includes('homem') ||
                 name.toLowerCase().includes('masculina') || name.toLowerCase().includes('männlich')) {
        parts.push('Voz Masculina');
      } else {
        parts.push('Voz Adulta');
      }
    }
    
    // Add quality in Portuguese
    if (voice.quality === 'Enhanced' || voice.quality === 'Premium') {
      parts.push('Premium');
    } else if (voice.quality === 'High') {
      parts.push('Alta Qualidade');
    } else if (voice.quality === 'Offline') {
      parts.push('Offline');
    } else {
      parts.push('Padrão');
    }
    
    // Add offline indicator
    parts.push('Offline');
    
    // Voice code will be added separately in the UI with proper index
    return parts.join(' • ');
  };

  const getVoiceQualityIcon = (voice: any) => {
    if (voice.quality === 'Enhanced' || voice.quality === 'Premium') {
      return 'star';
    } else if (voice.quality === 'High') {
      return 'star-half';
    } else {
      return 'star-outline';
    }
  };

  const getVoiceQualityColor = (voice: any) => {
    if (voice.quality === 'Enhanced' || voice.quality === 'Premium') {
      return '#f59e0b'; // Amber for premium quality
    } else if (voice.quality === 'High') {
      return '#10b981'; // Green for high quality
    } else {
      return '#6b7280'; // Gray for standard quality
    }
  };

  const getVoiceQualityText = (voice: any): string => {
    if (voice.quality === 'Enhanced' || voice.quality === 'Premium') {
      return voiceTranslations.premium;
    } else if (voice.quality === 'High') {
      return voiceTranslations.highQuality;
    } else if (voice.quality === 'Offline') {
      return voiceTranslations.offline;
    } else {
      return voiceTranslations.standard;
    }
  };

  const getAgeGroupIcon = (voice: any) => {
    const id = voice.id || '';
    if (id.toLowerCase().includes('child') || id.toLowerCase().includes('criança') || 
        id.toLowerCase().includes('kid') || id.toLowerCase().includes('infantil') ||
        id.toLowerCase().includes('young') || id.toLowerCase().includes('jovem') ||
        id.toLowerCase().includes('teen') || id.toLowerCase().includes('adolescente')) {
      return 'child-care'; // Icon for child voices
    } else {
      // For adult voices, show gender-specific icons
      if (id.toLowerCase().includes('female') || id.toLowerCase().includes('mulher')) {
        return 'face'; // Icon for female voices
      } else if (id.toLowerCase().includes('male') || id.toLowerCase().includes('homem')) {
        return 'person'; // Icon for male voices
      } else {
        return 'person-outline'; // Generic icon for unspecified gender
      }
    }
  };

  const getAgeGroupColor = (voice: any) => {
    const id = voice.id || '';
    if (id.toLowerCase().includes('child') || id.toLowerCase().includes('criança') || 
        id.toLowerCase().includes('kid') || id.toLowerCase().includes('infantil') ||
        id.toLowerCase().includes('young') || id.toLowerCase().includes('jovem') ||
        id.toLowerCase().includes('teen') || id.toLowerCase().includes('adolescente')) {
      return '#ec4899'; // Pink for child voices
    } else {
      // For adult voices, show gender-specific colors
      if (id.toLowerCase().includes('female') || id.toLowerCase().includes('mulher')) {
        return '#ec4899'; // Pink for female voices
      } else if (id.toLowerCase().includes('male') || id.toLowerCase().includes('homem')) {
        return '#3b82f6'; // Blue for male voices
      } else {
        return '#6b7280'; // Gray for unspecified gender
      }
    }
  };

  const removeDuplicateVoices = (voices: any[]): any[] => {
    const uniqueVoices = new Map();
    const seenIdentifiers = new Set();
    const seenNames = new Set();
    
    voices.forEach(voice => {
      const id = voice.id || '';
      const name = voice.name || '';
      const language = voice.language || '';
      
      // Create multiple keys to catch different types of duplicates
      const key1 = `${language}-${id}`;
      const key2 = `${language}-${name}`;
      const key3 = `${id}`;
      const key4 = `${name}`;
      
      // Check if this is a duplicate based on multiple criteria
      const isDuplicate = uniqueVoices.has(key1) || 
                         uniqueVoices.has(key2) || 
                         seenIdentifiers.has(id) || 
                         seenNames.has(name) ||
                         (id && id.length > 0 && seenIdentifiers.has(id)) ||
                         (name && name.length > 0 && seenNames.has(name));
      
      if (!isDuplicate) {
        // Add to all tracking maps
        uniqueVoices.set(key1, voice);
        uniqueVoices.set(key2, voice);
        if (id) seenIdentifiers.add(id);
        if (name) seenNames.add(name);
      } else {
        // If duplicate, keep the one with better quality
        const existingVoice = uniqueVoices.get(key1) || uniqueVoices.get(key2);
        if (existingVoice) {
          const existingQuality = getVoiceQualityScore(existingVoice);
          const currentQuality = getVoiceQualityScore(voice);
          
          // Keep the voice with higher quality
          if (currentQuality > existingQuality) {
            // Replace in all tracking maps
            uniqueVoices.set(key1, voice);
            uniqueVoices.set(key2, voice);
            if (id) seenIdentifiers.add(id);
            if (name) seenNames.add(name);
          }
        }
      }
    });
    
    // Return unique voices, prioritizing diversity (male/female, different qualities)
    const uniqueArray = Array.from(uniqueVoices.values());
    
    // Sort by quality and ensure gender diversity
    return uniqueArray.sort((a, b) => {
      const qualityA = getVoiceQualityScore(a);
      const qualityB = getVoiceQualityScore(b);
      
      // First sort by quality (higher first)
      if (qualityA !== qualityB) {
        return qualityB - qualityA;
      }
      
      // Then ensure male voices are included by prioritizing them
      const isMaleA = (a.id || '').toLowerCase().includes('male') || 
                     (a.name || '').toLowerCase().includes('male') ||
                     (a.id || '').toLowerCase().includes('homem') || 
                     (a.name || '').toLowerCase().includes('homem');
      const isMaleB = (b.id || '').toLowerCase().includes('male') || 
                     (b.name || '').toLowerCase().includes('male') ||
                     (b.id || '').toLowerCase().includes('homem') || 
                     (b.name || '').toLowerCase().includes('homem');
      
      // Prioritize male voices to ensure they appear in the list
      if (isMaleA && !isMaleB) return -1;
      if (!isMaleA && isMaleB) return 1;
      
      return 0;
    });
  };

  const getVoiceQualityScore = (voice: any): number => {
    const qualityOrder = { 'Enhanced': 4, 'Premium': 4, 'High': 3, 'Offline': 2, 'Default': 1 };
    return qualityOrder[voice.quality as keyof typeof qualityOrder] || 1;
  };

  const getGenderLabel = (voice: any): string | null => {
    const id = voice.id || '';
    const name = voice.name || '';
    
    // Check for female indicators (multiple languages)
    if (id.toLowerCase().includes('female') || 
        id.toLowerCase().includes('mulher') ||
        id.toLowerCase().includes('feminina') ||
        id.toLowerCase().includes('femenina') ||
        id.toLowerCase().includes('weiblich') ||
        name.toLowerCase().includes('female') || 
        name.toLowerCase().includes('mulher') ||
        name.toLowerCase().includes('feminina') ||
        name.toLowerCase().includes('femenina') ||
        name.toLowerCase().includes('weiblich')) {
      return voiceTranslations.feminine;
    }
    
    // Check for male indicators (multiple languages)
    if (id.toLowerCase().includes('male') || 
        id.toLowerCase().includes('homem') ||
        id.toLowerCase().includes('masculina') ||
        id.toLowerCase().includes('masculina') ||
        id.toLowerCase().includes('männlich') ||
        name.toLowerCase().includes('male') || 
        name.toLowerCase().includes('homem') ||
        name.toLowerCase().includes('masculina') ||
        name.toLowerCase().includes('masculina') ||
        name.toLowerCase().includes('männlich')) {
      return voiceTranslations.masculine;
    }
    
    // No gender detected
    return null;
  };

  const generateVoiceCode = (voice: any, index: number): string => {
    const id = voice.id || '';
    const lang = voice.language || '';
    
    // Extract language code
    let langCode = '';
    if (lang.includes('pt-BR') || lang.includes('pt_br')) {
      langCode = 'PT-BR';
    } else if (lang.includes('pt')) {
      langCode = 'PT';
    } else if (lang.includes('en')) {
      langCode = 'EN';
    } else if (lang.includes('es')) {
      langCode = 'ES';
    } else if (lang.includes('de')) {
      langCode = 'DE';
    } else {
      langCode = lang.toUpperCase().substring(0, 2);
    }
    
    // Extract gender code
    let genderCode = '';
    if (id.toLowerCase().includes('female') || id.toLowerCase().includes('mulher')) {
      genderCode = 'F';
    } else if (id.toLowerCase().includes('male') || id.toLowerCase().includes('homem')) {
      genderCode = 'M';
    } else {
      genderCode = 'U'; // Unknown/Unspecified
    }
    
    // Extract age group code
    let ageCode = '';
    if (id.toLowerCase().includes('child') || id.toLowerCase().includes('criança') || 
        id.toLowerCase().includes('kid') || id.toLowerCase().includes('infantil') ||
        id.toLowerCase().includes('young') || id.toLowerCase().includes('jovem') ||
        id.toLowerCase().includes('teen') || id.toLowerCase().includes('adolescente')) {
      ageCode = 'C'; // Child
    } else {
      ageCode = 'A'; // Adult
    }
    
    // Extract quality code
    let qualityCode = '';
    if (voice.quality === 'Enhanced' || voice.quality === 'Premium') {
      qualityCode = 'P'; // Premium
    } else if (voice.quality === 'High') {
      qualityCode = 'H'; // High
    } else if (voice.quality === 'Offline') {
      qualityCode = 'O'; // Offline
    } else {
      qualityCode = 'S'; // Standard
    }
    
    // Use sequential index instead of extracted number
    const indexCode = String(index + 1).padStart(2, '0'); // 01, 02, 03, etc.
    
    // Generate unique code: LANG-GENDER+AGE-QUALITY-INDEX
    return `${langCode}-${genderCode}${ageCode}-${qualityCode}-${indexCode}`;
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: '#8b5cf6',
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <LayoutText
          isTextWhite
          isTextBase
          isFontSemibold
        >
          {translation.settings?.audio?.title || 'Selecionar Voz'}
        </LayoutText>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <LayoutView
          isFlex
          isBgBlack50
          isHFull
          isJustifyCenter
          isItemsCenter
        >
          <LayoutView
            isBgWhite
            isRounded2xl
            hasPadding
            customClasses="p-5 w-4/5 max-h-[80%]"
          >
            <LayoutText
              isTextXl
              isFontBold
              isTextCenter
              hasMarginBottom
              isTextGray800
              customClasses="mb-5"
            >
              {isOnline ? voiceTranslations.selectVoice : voiceTranslations.selectVoiceOffline}
            </LayoutText>
            
            <LayoutText
              isTextSm
              isTextCenter
              hasMarginBottom
              isTextGray500
              customClasses="mb-4"
            >
              {isOnline 
                ? `${voiceTranslations.onlineAndOffline} • ${voiceTranslations.includesMaleFemale}`
                : `${voiceTranslations.offlineOnly} • ${voiceTranslations.includesMaleFemale}`
              }
            </LayoutText>
            
            {/* Connectivity status indicator */}
            <LayoutView isFlexRow isItemsCenter isJustifyCenter customClasses="mb-4">
              <MaterialIcons
                name={isOnline ? "wifi" : "wifi-off"}
                size={16}
                color={isOnline ? "#3b82f6" : "#6b7280"}
                style={{ marginRight: 8 }}
              />
              <LayoutText
                isTextXs
                customClasses={`${isOnline ? 'text-blue-600' : 'text-gray-500'}`}
              >
                {isOnline ? voiceTranslations.connectedToInternet : voiceTranslations.noInternetConnection}
              </LayoutText>
            </LayoutView>

            <ScrollView style={{ maxHeight: 400 }}>
              {availableVoices.length > 0 ? (
                availableVoices.map((voice, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => selectVoice(voice.id)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 16,
                      marginBottom: 8,
                      backgroundColor: audioConfig.selectedVoice === voice.id ? '#f3f4f6' : 'white',
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: audioConfig.selectedVoice === voice.id ? '#8b5cf6' : '#e5e7eb',
                    }}
                  >
                    <LayoutView
                      isFlexRow
                      isItemsCenter
                      isFlex1
                    >
                      {/* Icons section */}
                      <LayoutView isFlexRow isItemsCenter>
                        <MaterialIcons
                          name={getVoiceQualityIcon(voice)}
                          size={20}
                          color={getVoiceQualityColor(voice)}
                        />
                        <MaterialIcons
                          name={voice.requiresInternet || voice.isOnline || voice.isStreaming || voice.isCloud || voice.isNetwork ? "wifi" : "wifi-off"}
                          size={16}
                          color={voice.requiresInternet || voice.isOnline || voice.isStreaming || voice.isCloud || voice.isNetwork ? "#3b82f6" : "#10b981"}
                          style={{ marginLeft: 4 }}
                        />
                        <MaterialIcons
                          name={getAgeGroupIcon(voice)}
                          size={16}
                          color={getAgeGroupColor(voice)}
                          style={{ marginLeft: 4 }}
                        />
                      </LayoutView>
                      
                      {/* Voice info section */}
                      <LayoutView hasMarginLeft isFlex1>
                          <LayoutView isFlexRow isItemsCenter customClasses="mb-1">
                            <LayoutText
                              isTextLg
                              isFontBold
                              customClasses={`${
                                audioConfig.selectedVoice === voice.id ? 'text-gray-800' : 'text-gray-700'
                              }`}
                            >
                              {getFriendlyVoiceName(voice)}
                            </LayoutText>
                            
                            {/* Gender label */}
                            {getGenderLabel(voice) && (
                              <LayoutView
                                customClasses={`ml-2 px-2 py-1 rounded-full ${
                                  getGenderLabel(voice) === voiceTranslations.feminine
                                    ? 'bg-pink-100 border border-pink-300' 
                                    : 'bg-blue-100 border border-blue-300'
                                }`}
                              >
                                <LayoutText
                                  isTextXs
                                  customClasses={`${
                                    getGenderLabel(voice) === voiceTranslations.feminine
                                      ? 'text-pink-700' 
                                      : 'text-blue-700'
                                  } font-medium`}
                                >
                                  {getGenderLabel(voice)}
                                </LayoutText>
                              </LayoutView>
                            )}
                          </LayoutView>
                          
                          <LayoutText
                            isTextSm
                            customClasses={`${
                              audioConfig.selectedVoice === voice.id ? 'text-gray-600' : 'text-gray-500'
                            } mt-1`}
                          >
                            {getVoiceDescription(voice)}
                          </LayoutText>
                          
                          {/* Gender info line */}
                          {getGenderLabel(voice) && (
                            <LayoutText
                              isTextSm
                              customClasses={`${
                                audioConfig.selectedVoice === voice.id ? 'text-gray-600' : 'text-gray-500'
                              } mt-1 font-medium`}
                            >
                              🎤 {getGenderLabel(voice)} • {voiceTranslations.quality}: {getVoiceQualityText(voice)}
                            </LayoutText>
                          )}
                          <LayoutText
                            isTextXs
                            customClasses={`${
                              audioConfig.selectedVoice === voice.id ? 'text-gray-500' : 'text-gray-400'
                            } mt-1 font-mono`}
                          >
                            {voiceTranslations.code}: {generateVoiceCode(voice, index)}
                          </LayoutText>
                        </LayoutView>
                    </LayoutView>

                    {audioConfig.selectedVoice === voice.id && (
                      <MaterialIcons
                        name="check-circle"
                        size={24}
                        color="#8b5cf6"
                      />
                    )}

                    <TouchableOpacity
                      onPress={() => testVoice(voice.id)}
                      disabled={testingVoice === voice.id}
                      style={{
                        marginLeft: 12,
                        padding: 8,
                        backgroundColor: testingVoice === voice.id ? '#9ca3af' : '#10b981',
                        borderRadius: 6,
                        opacity: testingVoice === voice.id ? 0.6 : 1,
                      }}
                    >
                      <MaterialIcons
                        name={testingVoice === voice.id ? 'hourglass-empty' : 'play-arrow'}
                        size={20}
                        color="white"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))
              ) : (
                <LayoutView p4 isItemsCenter>
                  <MaterialIcons name="wifi-off" size={48} color="#9ca3af" style={{ marginBottom: 16 }} />
                  <LayoutText
                    isTextLg
                    isFontBold
                    isTextGray
                    isTextCenter
                    customClasses="mb-2"
                  >
                    {voiceTranslations.noOfflineVoicesAvailable}
                  </LayoutText>
                  <LayoutText
                    isTextSm
                    isTextGray
                    isTextCenter
                    customClasses="mb-2"
                  >
                    {voiceTranslations.languageNoOfflineVoices} {voiceTranslations.checkInstalledVoices}
                  </LayoutText>
                  <LayoutText
                    isTextSm
                    isTextGray
                    isTextCenter
                  >
                    {voiceTranslations.tipChildVoices} {voiceTranslations.tipAdultVoices}
                  </LayoutText>
                </LayoutView>
              )}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: '#6b7280',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginTop: 16,
              }}
            >
              <LayoutText
                isTextWhite
                isTextBase
                isFontSemibold
                isTextCenter
              >
                {voiceTranslations.close}
              </LayoutText>
            </TouchableOpacity>
          </LayoutView>
        </LayoutView>
      </Modal>
    </>
  );
};

export default VoiceSelector;
