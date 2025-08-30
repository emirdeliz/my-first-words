import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../contexts/ThemeContext';
import { useParentalConfig } from '../../contexts/ParentalConfigContext';
import { useLearningLevel } from '../../contexts/LearningLevelContext';
import { useAudioConfig } from '../../contexts/AudioConfigContext';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';
import AudioService from '../../services/AudioService';
import { router } from 'expo-router';

const CommunicationBoardTemplate = () => {
  const { translation, currentLanguage } = useLanguage();
  const { colors, isDark } = useTheme();
  const { getEnabledItems } = useParentalConfig();
  const { currentLevel } = useLearningLevel();
  const { audioConfig, loadAudioConfig } = useAudioConfig();

  // Monitor changes in audio config
  useEffect(() => {
    console.log('🎤 CommunicationBoardTemplate - Audio config updated:', audioConfig);
  }, [audioConfig]);

  // Monitor when screen comes into focus (only once per focus)
  useFocusEffect(
    React.useCallback(() => {
      console.log('🎤 CommunicationBoardTemplate - Screen focused, current audio config:', audioConfig);
      
      // Force refresh of audio config when screen comes into focus (only once)
      const refreshAudioConfig = async () => {
        try {
          await loadAudioConfig();
          console.log('🔄 Audio config refreshed on focus');
        } catch (error) {
          console.error('❌ Error refreshing audio config:', error);
        }
      };
      
      refreshAudioConfig();
    }, []) // No dependencies to prevent infinite loop
  );

  const enabledItems = getEnabledItems();

  // Function to get translated text based on level and language
  const getTranslatedText = (categoryId: string, textKey: string): string => {
    console.log('🌐 getTranslatedText - categoryId:', categoryId, 'textKey:', textKey, 'level:', currentLevel);
    console.log('🌐 getTranslatedText - current language:', currentLanguage);
    console.log('🌐 getTranslatedText - translation object:', translation);
    
    let translatedText = '';
    
    try {
      // Level 1: Simple words
      if (currentLevel === 1) {
        if (categoryId === 'basic' && translation.basicNeedsLevel1) {
          translatedText = (translation.basicNeedsLevel1 as any)[textKey];
        } else if (categoryId === 'emotions' && translation.emotionsLevel1) {
          translatedText = (translation.emotionsLevel1 as any)[textKey];
        } else if (categoryId === 'activities' && translation.activitiesLevel1) {
          translatedText = (translation.activitiesLevel1 as any)[textKey];
        } else if (categoryId === 'social' && translation.socialLevel1) {
          translatedText = (translation.socialLevel1 as any)[textKey];
        }
      } else {
        // Levels 2 and 3: Complete phrases
        if (categoryId === 'basic' && translation.basicNeeds) {
          translatedText = (translation.basicNeeds as any)[textKey];
        } else if (categoryId === 'emotions' && translation.emotions) {
          translatedText = (translation.emotions as any)[textKey];
        } else if (categoryId === 'activities' && translation.activities) {
          translatedText = (translation.activities as any)[textKey];
        } else if (categoryId === 'social' && translation.social) {
          translatedText = (translation.social as any)[textKey];
        }
      }
      
      console.log('🌐 getTranslatedText - result:', translatedText);
      
      // Fallback to textKey if no translation found
      if (!translatedText) {
        console.warn('⚠️ No translation found for:', categoryId, textKey, 'level:', currentLevel);
        translatedText = textKey;
      }
      
      return translatedText;
    } catch (error) {
      console.error('❌ Error in getTranslatedText:', error);
      return textKey; // Fallback to original text
    }
  };

  const handleItemPress = async (text: string, categoryId: string, textKey: string) => {
    try {
      console.log('🎤 CommunicationBoardTemplate - Selected voice:', audioConfig.selectedVoice);
      console.log('🎤 CommunicationBoardTemplate - Audio config:', audioConfig);
      
      // Update level in audio service
      AudioService.setLevel(currentLevel);
      
      // Get translated text for audio
      const translatedText = getTranslatedText(categoryId, textKey);
      
      // Play audio sequence with selected voice
      await AudioService.playAudioSequence(translatedText, audioConfig.selectedVoice);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'basic':
        return colors.primary;
      case 'emotions':
        return '#db2777';
      case 'activities':
        return colors.success;
      case 'social':
        return '#9333ea';
      default:
        return colors.textSecondary;
    }
  };

  const getItemIcon = (iconName: string) => {
    return iconName as keyof typeof MaterialIcons.glyphMap;
  };

  if (enabledItems.length === 0) {
    return (
      <LayoutView 
        isFlex 
        isJustifyCenter 
        isItemsCenter 
        p5
        style={{ backgroundColor: colors.background }}
      >
        <MaterialIcons name="volume-off" size={64} color={colors.textSecondary} />
        <LayoutText
          isTextLg
          isFontBold
          style={{ color: colors.text }}
          customClasses="mt-4 mb-2"
        >
          {translation.parentalConfig.noAudioConfigured}
        </LayoutText>
        <LayoutText
          isTextBase
          style={{ color: colors.textSecondary }}
          isTextCenter
        >
          {translation.parentalConfig.goToSettings}
        </LayoutText>
      </LayoutView>
    );
  }

  return (
    <LayoutView isFlex style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <LayoutView
        isFlexRow
        isItemsEnd
        isJustifyBetween
        hasPaddingX
        hasPaddingY
        hasShadow
        customClasses="px-5 py-3"
        style={{
          backgroundColor: isDark ? colors.surface : colors.primary,
          height: 100,
        }}
      >
        <MaterialIcons 
          name="record-voice-over" 
          size={28} 
          color={colors.textInverse} 
        />
        <LayoutText 
          isTextXl
          isFontBold
          style={{ color: colors.textInverse }}
        >
          {translation.appTitle}
        </LayoutText>
        <LayoutText 
          isTextSm
          style={{ color: colors.textInverse, opacity: 0.8 }}
        >
          Voz: {audioConfig.selectedVoice || 'Padrão'}
        </LayoutText>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <MaterialIcons name="settings" size={24} color={colors.textInverse} />
        </TouchableOpacity>
      </LayoutView>

      {/* Audio Items Grid */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <LayoutView 
          isFlex
          isFlexRow
          isFlexWrap
          p4
          isJustifyBetween
        >
          {enabledItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleItemPress(item.text, item.categoryId, item.textKey)}
              activeOpacity={0.7}
              style={{ width: '49%', marginBottom: 16 }}
            >
              <LayoutView 
                isJustifyCenter
                isItemsCenter
                hasPadding
                hasShadow
                customClasses="p-3"
                style={{
                  backgroundColor: getItemColor(item.type),
                  aspectRatio: 5/6,
                  borderRadius: 12,
                }}
              >
                <MaterialIcons 
                  name={getItemIcon(item.icon)} 
                  size={36} 
                  color="white" 
                />
                <LayoutText 
                  isTextSm
                  isFontSemibold
                  isTextWhite
                  hasMarginTop
                  isTextCenter
                  customClasses="mt-2 leading-[18px]"
                >
                  {getTranslatedText(item.categoryId, item.textKey)}
                </LayoutText>
              </LayoutView>
            </TouchableOpacity>
          ))}
        </LayoutView>
      </ScrollView>
    </LayoutView>
  );
};

export default CommunicationBoardTemplate;