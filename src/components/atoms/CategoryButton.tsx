import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import LayoutView from './LayoutView';
import LayoutText from './LayoutText';

interface CategoryButtonProps {
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isAccent?: boolean;
  isFeelings?: boolean;
  isSocial?: boolean;
  isLarge?: boolean;
  isSmall?: boolean;
  isRounded?: boolean;
  hasShadow?: boolean;
  onPress: () => void;
}

const CategoryButton = ({ 
  title, 
  icon, 
  isPrimary = false,
  isSecondary = false,
  isAccent = false,
  isFeelings = false,
  isSocial = false,
  isLarge = true,
  isSmall = false,
  isRounded = true,
  hasShadow = true,
  onPress 
}: CategoryButtonProps) => {
  const { colors } = useTheme();
  const getSizeClasses = () => {
    if (isLarge) return { isW48: true, isAspectSquare: true };
    if (isSmall) return { isW30: true, isAspectSquare: true };
    return { isW48: true, isAspectSquare: true }; // default
  };

  const getBorderRadius = () => {
    if (isRounded) return { isRounded2xl: true };
    return { isRoundedLg: true };
  };

  const getShadow = () => {
    if (hasShadow) return { hasShadowLg: true };
    return {};
  };

  const getTextSize = () => {
    if (isLarge) return { isTextBase: true };
    if (isSmall) return { isTextSm: true };
    return { isTextBase: true }; // default
  };

  const handlePress = () => {
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      className='w-[48%] aspect-square'
    >
      <LayoutView 
        {...getSizeClasses()}
        {...getBorderRadius()}
        {...getShadow()}
        isJustifyCenter
        isItemsCenter
        hasMarginBottom
        isWFull
        customClasses="mb-4"
        style={{ 
          backgroundColor: isPrimary ? colors.primary : 
                         isSecondary ? colors.success : 
                         isAccent ? colors.info : 
                         isFeelings ? '#db2777' : 
                         isSocial ? '#ea580c' : 
                         colors.textSecondary
        }}
      >
        <MaterialIcons name={icon} size={isLarge ? 48 : 36} color="white" />
        <LayoutText 
          {...getTextSize()}
          isFontBold
          isTextWhite
          hasMarginTop
          isTextCenter
          customClasses="mt-2"
        >
          {title}
        </LayoutText>
      </LayoutView>
    </TouchableOpacity>
  );
};

export default CategoryButton;