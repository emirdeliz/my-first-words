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
                         voice.identifier !== 'default-voice'; // Skip default voice as it might be cloud-based
        
        // If voice requires internet, skip it
        if (!isOffline) {
          console.log('🎵 Skipping online voice:', voice.name || voice.identifier, voice);
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
      console.log('🎵 Voice examples:');
      filteredVoices.slice(0, 3).forEach(voice => {
        console.log(`  - ${getFriendlyVoiceName(voice)} (${getVoiceDescription(voice)})`);
      });
      setAvailableVoices(filteredVoices);
      
      // Select the best available voice for the current language
      if (filteredVoices.length > 0) {
        // Sort voices to prioritize exact language matches and higher quality
        const sortedVoices = filteredVoices.sort((a, b) => {
          const aLang = a.language.toLowerCase();
          const bLang = b.language.toLowerCase();
          const targetLang = currentLanguage.code.toLowerCase();
          
          // Priority 1: Exact language match
          if (aLang === targetLang && bLang !== targetLang) return -1;
          if (bLang === targetLang && aLang !== targetLang) return 1;
          
          // Priority 2: Language family match (e.g., 'pt' for 'pt-br')
          if (aLang === targetLang.split('-')[0] && bLang !== targetLang.split('-')[0]) return -1;
          if (bLang === targetLang.split('-')[0] && aLang !== targetLang.split('-')[0]) return 1;
          
          // Priority 3: Higher quality voices first
          const qualityOrder = { 'Enhanced': 3, 'Premium': 3, 'High': 2, 'Default': 1 };
          const aQuality = qualityOrder[a.quality as keyof typeof qualityOrder] || 1;
          const bQuality = qualityOrder[b.quality as keyof typeof qualityOrder] || 1;
          
          return bQuality - aQuality;
        });
        
        saveSelectedVoice(sortedVoices[0].identifier);
        console.log('🎯 Selected best voice:', sortedVoices[0]);
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
      setAvailableVoices(defaultVoices);
      saveSelectedVoice('offline-default-voice');
    }
  };

  const selectVoice = async (voiceId: string) => {
    console.log('🎤 VoiceSelector - Selecting voice:', voiceId);
    await saveSelectedVoice(voiceId);
    console.log('🎤 VoiceSelector - Voice saved, closing modal');
    onVoiceSelect?.(voiceId);
    setModalVisible(false);
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
    
    // Extract age group from identifier or name
    let ageGroup = '';
    if (identifier.toLowerCase().includes('child') || identifier.toLowerCase().includes('criança') || 
        identifier.toLowerCase().includes('kid') || identifier.toLowerCase().includes('infantil') ||
        identifier.toLowerCase().includes('young') || identifier.toLowerCase().includes('jovem') ||
        identifier.toLowerCase().includes('teen') || identifier.toLowerCase().includes('adolescente')) {
      ageGroup = 'Infantil';
    } else {
      ageGroup = 'Adulto';
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
    
    // Add age group first (more important for user selection)
    friendlyName += ` ${ageGroup}`;
    
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
    
    // Add gender
    const identifier = voice.identifier || '';
    if (identifier.toLowerCase().includes('female') || identifier.toLowerCase().includes('mulher')) {
      parts.push('Feminina');
    } else if (identifier.toLowerCase().includes('male') || identifier.toLowerCase().includes('homem')) {
      parts.push('Masculina');
    }
    
    // Add age group (adult/child)
    if (identifier.toLowerCase().includes('child') || identifier.toLowerCase().includes('criança') || 
        identifier.toLowerCase().includes('kid') || identifier.toLowerCase().includes('infantil') ||
        identifier.toLowerCase().includes('young') || identifier.toLowerCase().includes('jovem') ||
        identifier.toLowerCase().includes('teen') || identifier.toLowerCase().includes('adolescente')) {
      parts.push('Infantil');
    } else {
      parts.push('Adulto');
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
          Selecionar Voz
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

            <ScrollView style={{ maxHeight: 400 }}>
              {availableVoices.length > 0 ? (
                availableVoices.map((voice) => (
                  <TouchableOpacity
                    key={voice.identifier}
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
                  >
                    Este idioma não possui vozes offline. Verifique se há vozes instaladas no seu dispositivo.
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
