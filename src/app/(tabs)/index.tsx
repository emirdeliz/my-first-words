import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import CommunicationBoardTemplate from '../../components/templates/CommunicationBoardTemplate';

const HomeScreen = () => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <CommunicationBoardTemplate />
    </SafeAreaView>
  );
};

export default HomeScreen;
