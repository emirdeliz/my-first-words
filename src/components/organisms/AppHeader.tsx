import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useLanguage } from '../../hooks/useLanguage';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';

const AppHeader = () => {
  const { translation } = useLanguage();

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  return (
    <LayoutView 
      isBgPrimary600
      isFlexRow
      isItemsEnd
      isJustifyBetween
      hasPaddingX
      hasPaddingY
      hasShadow
      style={{
        height: 100
      }}
    >
      <MaterialIcons name="record-voice-over" size={28} color="white" />
      <LayoutText 
        isTextXl
        isFontBold
        isTextWhite
      >
        {translation.appTitle}
      </LayoutText>
      <TouchableOpacity onPress={handleSettingsPress}>
        <MaterialIcons name="settings" size={24} color="white" />
      </TouchableOpacity>
    </LayoutView>
  );
};

export default AppHeader;