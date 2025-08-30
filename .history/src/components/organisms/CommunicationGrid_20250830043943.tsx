import React from 'react';
import { ScrollView } from 'react-native';
import CommunicationButton from '../atoms/CommunicationButton';
import BackButton from '../atoms/BackButton';
import { useLanguage } from '../../hooks/useLanguage';
import { useLearningLevel } from '../../contexts/LearningLevelContext';
import AudioService from '../../services/AudioService';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';
import { useTheme } from '../../contexts/ThemeContext';

interface CommunicationItem {
  id: string;
  textKey: string;
  icon: keyof typeof import('@expo/vector-icons/MaterialIcons').default.glyphMap;
  type: 'primary' | 'secondary' | 'accent' | 'warning';
}

interface Category {
  id: string;
  nameKey: string;
  items: CommunicationItem[];
}

interface CommunicationGridProps {
  category: Category;
  onBack: () => void;
  onItemPress: (text: string) => void;
}

const CommunicationGrid = ({ 
  category, 
  onBack, 
  onItemPress 
}: CommunicationGridProps) => {
  const { translation, currentLanguage } = useLanguage();
  const { currentLevel } = useLearningLevel();
  const { colors, isDark } = useTheme();

  // Sincronizar idioma com o AudioService
  React.useEffect(() => {
    AudioService.setLanguage(currentLanguage.code);
  }, [currentLanguage.code]);

  const getTranslatedText = (categoryId: string, itemTextKey: string): string => {
    // Level 1: Simple words
    if (currentLevel === 1) {
      if (categoryId === 'basic') return (translation.basicNeedsLevel1 as any)[itemTextKey];
      if (categoryId === 'emotions') return (translation.emotionsLevel1 as any)[itemTextKey];
      if (categoryId === 'activities') return (translation.activitiesLevel1 as any)[itemTextKey];
      if (categoryId === 'social') return (translation.socialLevel1 as any)[itemTextKey];
    }
    
    // Levels 2 and 3: Complete phrases
    if (categoryId === 'basic') return (translation.basicNeeds as any)[itemTextKey];
    if (categoryId === 'emotions') return (translation.emotions as any)[itemTextKey];
    if (categoryId === 'activities') return (translation.activities as any)[itemTextKey];
    if (categoryId === 'social') return (translation.social as any)[itemTextKey];
    
    return itemTextKey;
  };

  const getCommunicationButtonProps = (type: CommunicationItem['type']) => {
    switch (type) {
      case 'primary':
        return { isPrimary: true };
      case 'secondary':
        return { isSecondary: true };
      case 'accent':
        return { isAccent: true };
      case 'warning':
        return { isWarning: true };
      default:
        return {};
    }
  };

  const handleItemPress = async (text: string) => {
    try {
      // Update level in audio service
      AudioService.setLevel(currentLevel);
      
      // Play audio sequence based on level
      await AudioService.playAudioSequence(text);
      
      // Call original callback
      onItemPress(text);
    } catch (error) {
      console.error('Error playing audio:', error);
      // Fallback: just call original callback
      onItemPress(text);
    }
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <LayoutView isFlex isFlex1 isHFull>
      <LayoutView 
        isFlexRow
        isItemsCenter
        hasPaddingX
        hasPaddingY
        hasShadow
        customClasses="px-5 py-3"
        style={{
          backgroundColor: isDark ? colors.surface : colors.primary,
          height: 100,
        }}
      >
        <BackButton onPress={handleBack} text={translation.back} />
        <LayoutView isFlex1 isItemsCenter>
          <LayoutText 
            isTextLg
            isFontBold
            isTextWhite
            isTextCenter
          >
            {(translation.categories as any)[category.nameKey]}
          </LayoutText>
          <LayoutText 
            isTextSm
            isTextWhite
            isTextCenter
            customClasses="mt-1 opacity-90"
          >
            {translation.settings.learningLevel.levels[`level${currentLevel}` as keyof typeof translation.settings.learningLevel.levels]} - {translation.settings.learningLevel.levels[`level${currentLevel}Desc` as keyof typeof translation.settings.learningLevel.levels]}
          </LayoutText>
        </LayoutView>
        {/* Spacer to keep title centered */}
        <LayoutView style={{ width: 80 }} />
      </LayoutView>
    
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={{ backgroundColor: colors.background, flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <LayoutView 
          isFlexRow
          isFlexWrap
          p4
          isJustifyStart
          customClasses="gap-6"
        >
          {category.items.map((item) => {
            const translatedText = getTranslatedText(category.id, item.textKey);
            return (
              <CommunicationButton
                key={item.id}
                text={translatedText}
                icon={item.icon}
                {...getCommunicationButtonProps(item.type)}
                onPress={() => handleItemPress(translatedText)}
              />
            );
          })}
        </LayoutView>
      </ScrollView>
    </LayoutView>
  );
};

export default CommunicationGrid;