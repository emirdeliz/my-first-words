import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
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
  const { colors } = useTheme();
  const getSizeClasses = () => {
    if (isLarge) return { isW48: true, isAspect56: true };
    if (isSmall) return { isW30: true, isAspect65: true };
    return { isW48: true, isAspect56: true }; // default
  };

  const getBorderRadius = () => {
    if (isRounded) return { isRoundedXl: true };
    return { isRoundedLg: true };
  };

  const getShadow = () => {
    if (hasShadow) return { hasShadowLg: true };
    return {};
  };

  const getPadding = () => {
    if (hasPadding) return { p4: true };
    return {};
  };

  const getTextSize = () => {
    if (isLarge) return { isTextSm: true };
    if (isSmall) return { isTextXs: true };
    return { isTextSm: true }; // default
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
              style={{ width: '48%' }}
    >
      <LayoutView 
        {...getSizeClasses()}
        {...getBorderRadius()}
        {...getShadow()}
        {...getPadding()}
        isJustifyCenter
        isItemsCenter
        hasMarginBottom
        isWFull
        customClasses="mb-4"
        style={{ 
          backgroundColor: isPrimary ? colors.primary : 
                         isSecondary ? colors.success : 
                         isAccent ? colors.info : 
                         isWarning ? colors.warning : 
                         colors.textSecondary
        }}
      >
        <MaterialIcons name={icon} size={getIconSize()} color="white" />
        <LayoutText 
          {...getTextSize()}
          isFontSemibold
          isTextWhite
          hasMarginTop
          isTextCenter
          customClasses="mt-2 leading-[18px]"
        >
          {text}
        </LayoutText>
      </LayoutView>
    </TouchableOpacity>
  );
};

export default CommunicationButton;