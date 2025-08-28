import React from 'react';
import { ScrollView } from 'react-native';
import CommunicationButton from '../atoms/CommunicationButton';
import BackButton from '../atoms/BackButton';
import { useLanguage } from '../../hooks/useLanguage';
import { useLearningLevel } from '../../contexts/LearningLevelContext';
import AudioService from '../../services/AudioService';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';

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
  const { translation } = useLanguage();
  const { currentLevel } = useLearningLevel();

  const getTranslatedText = (categoryId: string, itemTextKey: string): string => {
    // Nível 1: Palavras simples
    if (currentLevel === 1) {
      if (categoryId === 'basic') return (translation.basicNeedsLevel1 as any)[itemTextKey];
      if (categoryId === 'emotions') return (translation.emotionsLevel1 as any)[itemTextKey];
      if (categoryId === 'activities') return (translation.activitiesLevel1 as any)[itemTextKey];
      if (categoryId === 'social') return (translation.socialLevel1 as any)[itemTextKey];
    }
    
    // Níveis 2 e 3: Frases completas
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
      // Atualizar o nível no serviço de áudio
      AudioService.setLevel(currentLevel);
      
      // Reproduzir áudio baseado no nível
      if (currentLevel === 1) {
        // Nível 1: Apenas palavras
        await AudioService.playWord(text);
      } else if (currentLevel === 2) {
        // Nível 2: Palavras e frases simples
        await AudioService.playWord(text);
        if (AudioService.isPhraseEnabled()) {
          const simplePhrase = `Esta é a palavra: ${text}`;
          await AudioService.playPhrase(simplePhrase);
        }
      } else if (currentLevel === 3) {
        // Nível 3: Palavras, frases e sentenças complexas
        await AudioService.playWord(text);
        if (AudioService.isPhraseEnabled()) {
          const simplePhrase = `Esta é a palavra: ${text}`;
          await AudioService.playPhrase(simplePhrase);
        }
        if (AudioService.isComplexSentenceEnabled()) {
          const complexSentence = `A palavra "${text}" é muito importante para comunicação. Vamos praticar juntos!`;
          await AudioService.playComplexSentence(complexSentence);
        }
      }
      
      // Chamar callback original
      onItemPress(text);
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
      // Fallback: apenas chamar callback original
      onItemPress(text);
    }
  };

  const handleBack = () => {
    onBack();
  };

  return (
    <LayoutView isFlex isHFull>
      <LayoutView 
        isBgPrimary600
        isFlexRow
        isItemsCenter
        px5
        py3
      >
        <BackButton onPress={handleBack} text={translation.back} />
        <LayoutView customClasses="flex-1 items-center">
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
        {/* Espaçador para manter o título centralizado */}
        <LayoutView customClasses="w-20" />
      </LayoutView>
    
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <LayoutView 
          isFlex
          isFlexRow
          isFlexWrap
          p4
          isJustifyBetween
          customClasses="justify-between"
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