import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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
  const getSizeClasses = () => {
    if (isLarge) return 'w-[48%] aspect-square';
    if (isSmall) return 'w-[30%] aspect-square';
    return 'w-[48%] aspect-square'; // default
  };

  const getBorderRadius = () => {
    if (isRounded) return 'rounded-2xl';
    return 'rounded-lg';
  };

  const getShadow = () => {
    if (hasShadow) return 'shadow-lg';
    return '';
  };

  const getTextSize = () => {
    if (isLarge) return 'text-base';
    if (isSmall) return 'text-sm';
    return 'text-base'; // default
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
        customClasses={`${getSizeClasses()} ${getBorderRadius()} justify-center items-center mb-4 w-full ${getShadow()}`}
        style={{ 
          backgroundColor: isPrimary ? '#2563eb' : 
                         isSecondary ? '#16a34a' : 
                         isAccent ? '#9333ea' : 
                         isFeelings ? '#db2777' : 
                         isSocial ? '#ea580c' : 
                         '#4b5563'
        }}
      >
        <MaterialIcons name={icon} size={isLarge ? 48 : 36} color="white" />
        <LayoutText 
          customClasses={`${getTextSize()} font-bold text-white mt-2 text-center`}
          isTextWhite
          isFontBold
          hasMarginTop
          isTextCenter
        >
          {title}
        </LayoutText>
      </LayoutView>
    </TouchableOpacity>
  );
};

export default CategoryButton;