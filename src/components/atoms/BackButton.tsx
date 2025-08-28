import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from './Icon';
import LayoutView from './LayoutView';
import LayoutText from './LayoutText';

interface BackButtonProps {
  onPress: () => void;
  text: string;
  isLarge?: boolean;
  isSmall?: boolean;
  hasMargin?: boolean;
}

const BackButton = ({ 
  onPress, 
  text,
  isLarge = false,
  isSmall = false,
  hasMargin = false
}: BackButtonProps) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
      }}
    >
      <LayoutView 
        isFlexRow
        isItemsCenter
      >
        <Icon 
          name="arrow-back"
          isMedium={!isLarge && !isSmall}
          isLarge={isLarge}
          isSmall={isSmall}
          isWhite
          hasMargin={hasMargin}
        />
        <LayoutText 
          isTextWhite
          isTextBase
          hasMarginLeft
          isFontMedium
          customClasses="ml-2"
        >
          {text}
        </LayoutText>
      </LayoutView>
    </TouchableOpacity>
  );
};

export default BackButton;