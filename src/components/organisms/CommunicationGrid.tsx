import React from 'react';
import { ScrollView } from 'react-native';
import CommunicationButton from '../atoms/CommunicationButton';
import BackButton from '../atoms/BackButton';
import { useLanguage } from '../../hooks/useLanguage';
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

  const getTranslatedText = (categoryId: string, itemTextKey: string): string => {
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

  const handleItemPress = (text: string) => {
    onItemPress(text);
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
        hasPaddingX
        hasPaddingY
        customClasses="px-5 py-3"
      >
        <BackButton onPress={handleBack} text={translation.back} />
        <LayoutText 
          isTextLg
          isFontBold
          isTextWhite
        >
          {(translation.categories as any)[category.nameKey]}
        </LayoutText>
      </LayoutView>
      
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <LayoutView 
          isFlex
          isFlexRow
          isFlexWrap
          hasPadding
          isJustifyBetween
          customClasses="p-4 justify-between"
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