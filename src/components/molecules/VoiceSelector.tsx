import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PlatformAwareSpeechService from '../../services/PlatformAwareSpeechService';
import { useLanguage } from '../../hooks/useLanguage';
import { useAudioConfig } from '../../contexts/AudioConfigContext';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';

interface VoiceSelectorProps {
  onVoiceSelect?: (voice: string) => void;
}

const VoiceSelector = ({ onVoiceSelect }: VoiceSelectorProps) => {
  const { currentLanguage, translation } = useLanguage();
  const { audioConfig, setSelectedVoice: saveSelectedVoice } = useAudioConfig();
  const [modalVisible, setModalVisible] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<any[]>([]);
  const [testingVoice, setTestingVoice] = useState<string | null>(null);

  useEffect(() => {
    loadAvailableVoices();
  }, [currentLanguage.code]);

  const loadAvailableVoices = async () => {
    try {
      const voices = await PlatformAwareSpeechService.getAvailableVoices();
      
      // Filter voices for the current language and offline availability
      const filteredVoices = voices.filter(voice => {
        const voiceLang = voice.language.toLowerCase();
        const targetLang = currentLanguage.code.toLowerCase();
        
        // First, check if voice is offline (not requiring internet)
        // Different TTS engines may have different properties for offline detection
        const isOffline = !voice.requiresInternet && 
                         !voice.isOnline && 
                         !voice.isStreaming && 
                         !voice.isCloud && 
                         !voice.isNetwork &&
                         !voice.isStreaming &&
                         !voice.isRemote &&
                         !voice.isExternal &&
                         !voice.isWeb &&
                         !voice.isBrowser &&
                         !voice.isChrome &&
                         !voice.isSafari &&
                         !voice.isEdge &&
                         !voice.isFirefox &&
                         voice.identifier !== 'default-voice' && // Skip default voice as it might be cloud-based
                         !voice.identifier.includes('cloud') &&
                         !voice.identifier.includes('online') &&
                         !voice.identifier.includes('web') &&
                         !voice.identifier.includes('streaming') &&
                         !voice.identifier.includes('remote') &&
                         !voice.identifier.includes('external') &&
                         !voice.identifier.includes('browser') &&
                         !voice.identifier.includes('chrome') &&
                         !voice.identifier.includes('safari') &&
                         !voice.identifier.includes('edge') &&
                         !voice.identifier.includes('firefox');
        
        // If voice requires internet, skip it
        if (!isOffline) {
          console.log('🎵 Skipping online voice:', voice.name || voice.identifier, voice);
          return false;
        }
        
        // Additional offline checks for common online indicators
        const voiceName = (voice.name || '').toLowerCase();
        const voiceId = (voice.identifier || '').toLowerCase();
        
        if (voiceName.includes('google') || voiceId.includes('google') ||
            voiceName.includes('siri') || voiceId.includes('siri') ||
            voiceName.includes('alexa') || voiceId.includes('alexa') ||
            voiceName.includes('cortana') || voiceId.includes('cortana') ||
            voiceName.includes('bixby') || voiceId.includes('bixby') ||
            voiceName.includes('assistant') || voiceId.includes('assistant') ||
            voiceName.includes('ai') || voiceId.includes('ai') ||
            voiceName.includes('neural') || voiceId.includes('neural') ||
            voiceName.includes('cloud') || voiceId.includes('cloud')) {
          console.log('🎵 Skipping AI/cloud voice:', voice.name || voice.identifier);
          return false;
        }
        
        // For Portuguese, be more specific to avoid mixing PT-PT and PT-BR
        if (targetLang === 'pt-br') {
          // Prefer PT-BR, but also accept generic PT if no PT-BR available
          return voiceLang === 'pt-br' || voiceLang === 'pt_br' || 
                 (voiceLang === 'pt' && !voiceLang.includes('pt-pt') && !voiceLang.includes('pt_pt'));
        }
        
        // For other languages, use exact match or language family
        if (voiceLang === targetLang) return true;
        if (targetLang.includes('-')) {
          const baseLang = targetLang.split('-')[0];
          return voiceLang === baseLang;
        }
        
        return false;
      });
      
      console.log('🎵 All available voices:', voices);
      console.log('🎵 Target language:', currentLanguage.code);
      console.log('🎵 Offline voices found:', filteredVoices.length);
      
      // Check for different types of duplicates
      const duplicateCheck = new Map();
      const duplicates: any[] = [];
      const similarVoices: any[] = [];
      
      filteredVoices.forEach(voice => {
        // Check for exact duplicates (same identifier)
        const exactKey = `${voice.language}-${voice.identifier}`;
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
            (v.name === voice.name || v.identifier === voice.identifier)
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
      
      if (duplicates.length > 0) {
        console.log('⚠️ Exact duplicate voices found:', duplicates);
      }
      
      if (similarVoices.length > 0) {
        console.log('⚠️ Similar voices found (potential duplicates):', similarVoices);
      }
      
      if (duplicates.length === 0 && similarVoices.length === 0) {
        console.log('✅ No duplicate voices found');
      }
      
      console.log('🎵 Voice examples:');
      filteredVoices.slice(0, 3).forEach(voice => {
        console.log(`  - ${getFriendlyVoiceName(voice)} (${getVoiceDescription(voice)})`);
        console.log(`    Código: ${generateVoiceCode(voice, 0)}`);
      });
      
      // Remove duplicates before setting available voices
      const uniqueVoices = removeDuplicateVoices(filteredVoices);
      console.log('🎵 Unique voices after deduplication:', uniqueVoices.length);
      
      // Ensure we have a good mix of male and female voices
      const maleVoices = uniqueVoices.filter(voice => {
        const identifier = voice.identifier || '';
        const name = voice.name || '';
        return identifier.toLowerCase().includes('male') || 
               name.toLowerCase().includes('male') ||
               identifier.toLowerCase().includes('homem') || 
               name.toLowerCase().includes('homem');
      });
      
      const femaleVoices = uniqueVoices.filter(voice => {
        const identifier = voice.identifier || '';
        const name = voice.name || '';
        return identifier.toLowerCase().includes('female') || 
               name.toLowerCase().includes('female') ||
               identifier.toLowerCase().includes('mulher') || 
               name.toLowerCase().includes('mulher');
      });
      
      console.log(`🎵 Male voices: ${maleVoices.length}, Female voices: ${femaleVoices.length}`);
      
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
      
      setAvailableVoices(finalVoices);
      
      // Select the best available voice for the current language
      if (finalVoices.length > 0) {
        // Try to find a male voice first, then fall back to any available voice
        const maleVoice = finalVoices.find(voice => {
          const identifier = voice.identifier || '';
          const name = voice.name || '';
          return identifier.toLowerCase().includes('male') || 
                 name.toLowerCase().includes('male') ||
                 identifier.toLowerCase().includes('homem') || 
                 name.toLowerCase().includes('homem');
        });
        
        const selectedVoice = maleVoice || finalVoices[0];
        saveSelectedVoice(selectedVoice.identifier);
        console.log('🎯 Selected best voice:', selectedVoice);
      }
    } catch (error) {
      console.error('❌ Error loading voices:', error);
      // Create a default offline voice list if unable to load
      const defaultVoices = [
        {
          identifier: 'offline-default-voice',
          name: 'Voz Padrão do Sistema',
          language: currentLanguage.code,
          quality: 'Offline',
          requiresInternet: false,
          isOnline: false,
          isStreaming: false,
          isCloud: false,
          isNetwork: false
        }
      ];
      
      console.log('🎵 Default voice code:', generateVoiceCode(defaultVoices[0], 0));
      setAvailableVoices(defaultVoices);
      saveSelectedVoice('offline-default-voice');
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
      
      let testText = 'Hello'; // Default in English
      switch (currentLanguage.code) {
        case 'pt-BR': case 'pt': testText = 'Olá'; break;
        case 'es': testText = 'Hola'; break;
        case 'de': testText = 'Hallo'; break;
        default: testText = 'Hello';
      }
      console.log(`🎵 Testing voice: ${voiceId} with text: "${testText}"`);
      
      const speechOptions: any = {
        language: currentLanguage.code,
        pitch: 1.0,
        rate: 0.9,
        onStart: () => { console.log(`✅ Voice test started: ${voiceId}`); },
        onFinish: () => { console.log(`✅ Voice tested successfully: ${voiceId}`); setTestingVoice(null); },
        onError: (error: any) => { console.error(`❌ Error testing voice:`, error); setTestingVoice(null); },
        onStopped: () => { console.log(`⏹️ Test stopped: ${voiceId}`); setTestingVoice(null); },
      };
      if (voiceId !== 'offline-default-voice') { speechOptions.voice = voiceId; }
      await PlatformAwareSpeechService.speak(testText, speechOptions);
      
    } catch (error) {
      console.error('❌ Error testing voice:', error);
      setTestingVoice(null);
      // Show error message to user
      alert('Unable to test this voice. Try again or select another voice.');
    }
  };

  const getFriendlyVoiceName = (voice: any): string => {
    // Extract language and region from voice identifier or language
    const lang = voice.language || '';
    const identifier = voice.identifier || '';
    
    // Handle specific voice names
    if (voice.name && voice.name !== voice.identifier) {
      return voice.name;
    }
    
    // Handle special cases
    if (identifier === 'offline-default-voice') {
      return 'Voz Padrão do Sistema';
    }
    
    // Extract gender from identifier or name
    let gender = '';
    if (identifier.toLowerCase().includes('female') || identifier.toLowerCase().includes('mulher')) {
      gender = 'Feminina';
    } else if (identifier.toLowerCase().includes('male') || identifier.toLowerCase().includes('homem')) {
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
    const voiceNumber = identifier.match(/\d+/);
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
    const identifier = voice.identifier || '';
    if (identifier.toLowerCase().includes('child') || identifier.toLowerCase().includes('criança') || 
        identifier.toLowerCase().includes('kid') || identifier.toLowerCase().includes('infantil') ||
        identifier.toLowerCase().includes('young') || identifier.toLowerCase().includes('jovem') ||
        identifier.toLowerCase().includes('teen') || identifier.toLowerCase().includes('adolescente')) {
      parts.push('Infantil');
    } else {
      // For adult voices, show gender instead of "Adulto"
      if (identifier.toLowerCase().includes('female') || identifier.toLowerCase().includes('mulher')) {
        parts.push('Mulher');
      } else if (identifier.toLowerCase().includes('male') || identifier.toLowerCase().includes('homem')) {
        parts.push('Homem');
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

  const getAgeGroupIcon = (voice: any) => {
    const identifier = voice.identifier || '';
    if (identifier.toLowerCase().includes('child') || identifier.toLowerCase().includes('criança') || 
        identifier.toLowerCase().includes('kid') || identifier.toLowerCase().includes('infantil') ||
        identifier.toLowerCase().includes('young') || identifier.toLowerCase().includes('jovem') ||
        identifier.toLowerCase().includes('teen') || identifier.toLowerCase().includes('adolescente')) {
      return 'child-care'; // Icon for child voices
    } else {
      // For adult voices, show gender-specific icons
      if (identifier.toLowerCase().includes('female') || identifier.toLowerCase().includes('mulher')) {
        return 'face'; // Icon for female voices
      } else if (identifier.toLowerCase().includes('male') || identifier.toLowerCase().includes('homem')) {
        return 'person'; // Icon for male voices
      } else {
        return 'person-outline'; // Generic icon for unspecified gender
      }
    }
  };

  const getAgeGroupColor = (voice: any) => {
    const identifier = voice.identifier || '';
    if (identifier.toLowerCase().includes('child') || identifier.toLowerCase().includes('criança') || 
        identifier.toLowerCase().includes('kid') || identifier.toLowerCase().includes('infantil') ||
        identifier.toLowerCase().includes('young') || identifier.toLowerCase().includes('jovem') ||
        identifier.toLowerCase().includes('teen') || identifier.toLowerCase().includes('adolescente')) {
      return '#ec4899'; // Pink for child voices
    } else {
      // For adult voices, show gender-specific colors
      if (identifier.toLowerCase().includes('female') || identifier.toLowerCase().includes('mulher')) {
        return '#ec4899'; // Pink for female voices
      } else if (identifier.toLowerCase().includes('male') || identifier.toLowerCase().includes('homem')) {
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
      const identifier = voice.identifier || '';
      const name = voice.name || '';
      const language = voice.language || '';
      
      // Create multiple keys to catch different types of duplicates
      const key1 = `${language}-${identifier}`;
      const key2 = `${language}-${name}`;
      const key3 = `${identifier}`;
      const key4 = `${name}`;
      
      // Check if this is a duplicate based on multiple criteria
      const isDuplicate = uniqueVoices.has(key1) || 
                         uniqueVoices.has(key2) || 
                         seenIdentifiers.has(identifier) || 
                         seenNames.has(name) ||
                         (identifier && identifier.length > 0 && seenIdentifiers.has(identifier)) ||
                         (name && name.length > 0 && seenNames.has(name));
      
      if (!isDuplicate) {
        // Add to all tracking maps
        uniqueVoices.set(key1, voice);
        uniqueVoices.set(key2, voice);
        if (identifier) seenIdentifiers.add(identifier);
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
            if (identifier) seenIdentifiers.add(identifier);
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
      const isMaleA = (a.identifier || '').toLowerCase().includes('male') || 
                     (a.name || '').toLowerCase().includes('male') ||
                     (a.identifier || '').toLowerCase().includes('homem') || 
                     (a.name || '').toLowerCase().includes('homem');
      const isMaleB = (b.identifier || '').toLowerCase().includes('male') || 
                     (b.name || '').toLowerCase().includes('male') ||
                     (b.identifier || '').toLowerCase().includes('homem') || 
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

  const generateVoiceCode = (voice: any, index: number): string => {
    const identifier = voice.identifier || '';
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
    if (identifier.toLowerCase().includes('female') || identifier.toLowerCase().includes('mulher')) {
      genderCode = 'F';
    } else if (identifier.toLowerCase().includes('male') || identifier.toLowerCase().includes('homem')) {
      genderCode = 'M';
    } else {
      genderCode = 'U'; // Unknown/Unspecified
    }
    
    // Extract age group code
    let ageCode = '';
    if (identifier.toLowerCase().includes('child') || identifier.toLowerCase().includes('criança') || 
        identifier.toLowerCase().includes('kid') || identifier.toLowerCase().includes('infantil') ||
        identifier.toLowerCase().includes('young') || identifier.toLowerCase().includes('jovem') ||
        identifier.toLowerCase().includes('teen') || identifier.toLowerCase().includes('adolescente')) {
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
              Selecionar Voz (Offline)
            </LayoutText>
            
            <LayoutText
              isTextSm
              isTextCenter
              hasMarginBottom
              isTextGray500
              customClasses="mb-4"
            >
              Apenas vozes offline disponíveis • Inclui opções masculinas e femininas
            </LayoutText>

            <ScrollView style={{ maxHeight: 400 }}>
              {availableVoices.length > 0 ? (
                availableVoices.map((voice, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => selectVoice(voice.identifier)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 16,
                      marginBottom: 8,
                      backgroundColor: audioConfig.selectedVoice === voice.identifier ? '#f3f4f6' : 'white',
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: audioConfig.selectedVoice === voice.identifier ? '#8b5cf6' : '#e5e7eb',
                    }}
                  >
                    <LayoutView
                      isFlexRow
                      isItemsCenter
                      isFlex1
                    >
                      <LayoutView isFlexRow isItemsCenter>
                        <MaterialIcons
                          name={getVoiceQualityIcon(voice)}
                          size={20}
                          color={getVoiceQualityColor(voice)}
                        />
                        <MaterialIcons
                          name="wifi-off"
                          size={16}
                          color="#10b981"
                          style={{ marginLeft: 4 }}
                        />
                        <MaterialIcons
                          name={getAgeGroupIcon(voice)}
                          size={16}
                          color={getAgeGroupColor(voice)}
                          style={{ marginLeft: 4 }}
                        />
                      </LayoutView>
                      <LayoutView hasMarginLeft isFlex1>
                        <LayoutText
                          isTextLg
                          isFontBold
                          customClasses={`${
                            audioConfig.selectedVoice === voice.identifier ? 'text-gray-800' : 'text-gray-700'
                          }`}
                        >
                          {getFriendlyVoiceName(voice)}
                        </LayoutText>
                        <LayoutText
                          isTextSm
                          customClasses={`${
                            audioConfig.selectedVoice === voice.identifier ? 'text-gray-600' : 'text-gray-500'
                          } mt-1`}
                        >
                          {getVoiceDescription(voice)}
                        </LayoutText>
                        <LayoutText
                          isTextXs
                          customClasses={`${
                            audioConfig.selectedVoice === voice.identifier ? 'text-gray-500' : 'text-gray-400'
                          } mt-1 font-mono`}
                        >
                          Código: {generateVoiceCode(voice, index)}
                        </LayoutText>
                      </LayoutView>
                    </LayoutView>

                    {audioConfig.selectedVoice === voice.identifier && (
                      <MaterialIcons
                        name="check-circle"
                        size={24}
                        color="#8b5cf6"
                      />
                    )}

                    <TouchableOpacity
                      onPress={() => testVoice(voice.identifier)}
                      disabled={testingVoice === voice.identifier}
                      style={{
                        marginLeft: 12,
                        padding: 8,
                        backgroundColor: testingVoice === voice.identifier ? '#9ca3af' : '#10b981',
                        borderRadius: 6,
                        opacity: testingVoice === voice.identifier ? 0.6 : 1,
                      }}
                    >
                      <MaterialIcons
                        name={testingVoice === voice.identifier ? 'hourglass-empty' : 'play-arrow'}
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
                    Nenhuma voz offline disponível
                  </LayoutText>
                  <LayoutText
                    isTextSm
                    isTextGray
                    isTextCenter
                    customClasses="mb-2"
                  >
                    Este idioma não possui vozes offline. Verifique se há vozes instaladas no seu dispositivo.
                  </LayoutText>
                  <LayoutText
                    isTextSm
                    isTextGray
                    isTextCenter
                  >
                    Dica: Vozes infantis são ideais para crianças, enquanto vozes de homem ou mulher são melhores para aprendizado avançado.
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
                {translation.settings?.modal?.close || 'Fechar'}
              </LayoutText>
            </TouchableOpacity>
          </LayoutView>
        </LayoutView>
      </Modal>
    </>
  );
};

export default VoiceSelector;
