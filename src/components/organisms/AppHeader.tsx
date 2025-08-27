import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import LanguageSelector from '../molecules/LanguageSelector';
import { useLanguage } from '../../hooks/useLanguage';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';

const AppHeader = () => {
  const { translation } = useLanguage();

  return (
    <LayoutView 
      isBgPrimary600={true}
      isFlexRow={true}
      isItemsEnd={true}
      isJustifyBetween={true}
      hasPaddingX={true}
      hasPaddingY={true}
      hasShadow={true}
      style={{
        height: 100
      }}
    >
      <MaterialIcons name="record-voice-over" size={28} color="white" />
      <LayoutText 
        isTextXl={true}
        isFontBold={true}
        isTextWhite={true}
      >
        {translation.appTitle}
      </LayoutText>
      <LanguageSelector />
    </LayoutView>
  );
};

export default AppHeader;