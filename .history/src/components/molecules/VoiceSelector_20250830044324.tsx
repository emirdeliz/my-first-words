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
      
      // Filter voices for the current language with more specific matching
      const filteredVoices = voices.filter(voice => {
        const voiceLang = voice.language.toLowerCase();
        const targetLang = currentLanguage.code.toLowerCase();
        
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
      // Create a default voice list if unable to load
      const defaultVoices = [
        {
          identifier: 'default-voice',
          name: 'Default Voice',
          language: currentLanguage.code,
          quality: 'Default'
        }
      ];
      setAvailableVoices(defaultVoices);
      saveSelectedVoice('default-voice');
    }
  };

  const selectVoice = (voiceId: string) => {
    console.log('🎤 VoiceSelector - Selecting voice:', voiceId);
    saveSelectedVoice(voiceId);
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
      if (voiceId !== 'default-voice') { speechOptions.voice = voiceId; }
      await PlatformAwareSpeechService.speak(testText, speechOptions);
      
    } catch (error) {
      console.error('❌ Error testing voice:', error);
      setTestingVoice(null);
      // Show error message to user
      alert('Unable to test this voice. Try again or select another voice.');
    }
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
              Selecionar Voz
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
                      <MaterialIcons
                        name={getVoiceQualityIcon(voice)}
                        size={24}
                        color={getVoiceQualityColor(voice)}
                      />
                      <LayoutView hasMarginLeft isFlex1>
                        <LayoutText
                          isTextLg
                          isFontBold
                          customClasses={`${
                            audioConfig.selectedVoice === voice.identifier ? 'text-gray-800' : 'text-gray-700'
                          }`}
                        >
                          {voice.name || voice.identifier}
                        </LayoutText>
                        <LayoutText
                          isTextSm
                          customClasses={`${
                            audioConfig.selectedVoice === voice.identifier ? 'text-gray-600' : 'text-gray-500'
                          } mt-1`}
                        >
                          {voice.language} • {voice.quality || 'Padrão'}
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
                  <LayoutText
                    isTextGray
                    isTextCenter
                  >
                    Nenhuma voz disponível para este idioma
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
