import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import LayoutView from './LayoutView';
import LayoutText from './LayoutText';

interface CommunicationButtonProps {
  text: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isAccent?: boolean;
  isWarning?: boolean;
  isLarge?: boolean;
  isSmall?: boolean;
  isRounded?: boolean;
  hasShadow?: boolean;
  hasPadding?: boolean;
  onPress: () => void;
}

const CommunicationButton = ({ 
  text, 
  icon, 
  isPrimary = false,
  isSecondary = false,
  isAccent = false,
  isWarning = false,
  isLarge = true,
  isSmall = false,
  isRounded = true,
  hasShadow = true,
  hasPadding = true,
  onPress 
}: CommunicationButtonProps) => {
  const getSizeClasses = () => {
    if (isLarge) return 'w-[48%] aspect-[5/6]';
    if (isSmall) return 'w-[30%] aspect-[4/5]';
    return 'w-[48%] aspect-[5/6]'; // default
  };

  const getBorderRadius = () => {
    if (isRounded) return 'rounded-xl';
    return 'rounded-lg';
  };

  const getShadow = () => {
    if (hasShadow) return 'shadow-lg';
    return '';
  };

  const getPadding = () => {
    if (hasPadding) return 'p-3';
    return '';
  };

  const getTextSize = () => {
    if (isLarge) return 'text-sm';
    if (isSmall) return 'text-xs';
    return 'text-sm'; // default
  };

  const getIconSize = () => {
    if (isLarge) return 36;
    if (isSmall) return 24;
    return 36; // default
  };

  const handlePress = () => {
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <LayoutView 
        customClasses={`${getSizeClasses()} ${getBorderRadius()} justify-center items-center mb-4 ${getShadow()} ${getPadding()}`}
        style={{ 
          borderWidth: 2, 
          borderColor: 'blue',
          backgroundColor: isPrimary ? '#2563eb' : isSecondary ? '#16a34a' : isAccent ? '#9333ea' : isWarning ? '#ca8a04' : '#4b5563'
        }}
      >
        <MaterialIcons name={icon} size={getIconSize()} color="white" />
        <LayoutText 
          customClasses={`${getTextSize()} font-semibold text-white mt-2 text-center leading-[18px]`}
          isTextWhite={true}
          isFontSemibold={true}
          hasMarginTop={true}
          isTextCenter={true}
        >
          {text}
        </LayoutText>
      </LayoutView>
    </TouchableOpacity>
  );
};

export default CommunicationButton;