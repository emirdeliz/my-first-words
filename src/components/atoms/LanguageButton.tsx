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
    if (isLarge) return 'px-4 py-3';
    if (isSmall) return 'px-2 py-1';
    return 'px-3 py-2'; // default
  };

  const getTextSize = () => {
    if (isLarge) return 'text-lg';
    if (isSmall) return 'text-xs';
    return 'text-sm'; // default
  };

  const getIconSize = () => {
    if (isLarge) return 28;
    if (isSmall) return 16;
    return 24; // default
  };

  const getAlignment = () => {
    if (isCentered) return 'justify-center';
    return 'flex-row items-center';
  };

  return (
    <TouchableOpacity 
      onPress={onPress}
    >
      <LayoutView 
        customClasses={`${getAlignment()} ${getSizeClasses()}`}
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
          customClasses={`${getTextSize()} font-bold ${hasIcon ? 'ml-1' : ''}`}
        >
          {languageCode.toUpperCase()}
        </LayoutText>
      </LayoutView>
    </TouchableOpacity>
  );
};

export default LanguageButton;