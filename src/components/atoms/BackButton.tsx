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
    <TouchableOpacity onPress={onPress}>
      <LayoutView 
        isFlexRow={true}
        isItemsCenter={true}
        hasMarginRight={true}
        customClasses="mr-4"
      >
        <Icon 
          name="arrow-back"
          isMedium={!isLarge && !isSmall}
          isLarge={isLarge}
          isSmall={isSmall}
          isWhite={true}
          hasMargin={hasMargin}
        />
        <LayoutText 
          isTextWhite={true}
          isTextBase={true}
          hasMarginLeft={true}
          isFontMedium={true}
          customClasses="ml-2"
        >
          {text}
        </LayoutText>
      </LayoutView>
    </TouchableOpacity>
  );
};

export default BackButton;