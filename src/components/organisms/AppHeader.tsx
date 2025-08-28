import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../contexts/ThemeContext';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';

const AppHeader = () => {
  const { translation } = useLanguage();
  const { colors, isDark } = useTheme();

  const handleSettingsPress = () => {
    router.push('/settings');
  };

  return (
    <LayoutView 
      style={{
        backgroundColor: isDark ? colors.surface : colors.primary,
        height: 100,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <MaterialIcons 
        name="record-voice-over" 
        size={28} 
        color={colors.textInverse} 
      />
      <LayoutText 
        isTextXl
        isFontBold
        style={{ color: colors.textInverse }}
      >
        {translation.appTitle}
      </LayoutText>
      <TouchableOpacity onPress={handleSettingsPress}>
        <MaterialIcons 
          name="settings" 
          size={24} 
          color={colors.textInverse} 
        />
      </TouchableOpacity>
    </LayoutView>
  );
};

export default AppHeader;