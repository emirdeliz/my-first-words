import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import LayoutView from './LayoutView';
import LayoutText from './LayoutText';

interface LanguageButtonProps {
  languageCode: string;
  isLarge?: boolean;
  isSmall?: boolean;
  hasIcon?: boolean;
  isCentered?: boolean;
  onPress: () => void;
}

const LanguageButton = ({ 
  languageCode, 
  isLarge = false,
  isSmall = false,
  hasIcon = true,
  isCentered = false,
  onPress 
}: LanguageButtonProps) => {
  const getSizeClasses = () => {
    if (isLarge) return { px4: true, py3: true };
    if (isSmall) return { px2: true, py1: true };
    return { px3: true, py2: true }; // default
  };

  const getTextSize = () => {
    if (isLarge) return { isTextLg: true };
    if (isSmall) return { isTextXs: true };
    return { isTextSm: true }; // default
  };

  const getIconSize = () => {
    if (isLarge) return 28;
    if (isSmall) return 16;
    return 24; // default
  };

  const getAlignment = () => {
    if (isCentered) return { isJustifyCenter: true };
    return { isFlexRow: true, isItemsCenter: true };
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
    >
      <LayoutView 
        {...getAlignment()}
        {...getSizeClasses()}
      >
        {hasIcon && (
          <MaterialIcons 
            name="language" 
            size={getIconSize()} 
            color="white" 
          />
        )}
        <LayoutText 
          isTextWhite
          isFontBold
          {...getTextSize()}
          customClasses={hasIcon ? 'ml-1' : ''}
        >
          {languageCode.toUpperCase()}
        </LayoutText>
      </LayoutView>
    </TouchableOpacity>
  );
};

export default LanguageButton;