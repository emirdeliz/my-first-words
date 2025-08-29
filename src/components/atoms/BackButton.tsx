import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { useTheme } from '../../contexts/ThemeContext';
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
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LayoutView 
        isFlexRow
        isItemsCenter
        hasPaddingX
        hasPaddingY
        isRounded
        customClasses="px-3 py-2"
        style={{
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.borderSecondary,
          borderWidth: 1,
        }}
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
          style={{ color: colors.textInverse }}
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