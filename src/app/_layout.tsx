import '../global.css';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from '../contexts/LanguageContext';
import { LearningLevelProvider } from '../contexts/LearningLevelContext';
import { ThemeProvider } from '../contexts/ThemeContext';

const RootLayout = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#2563eb" />
      <LanguageProvider>
        <LearningLevelProvider>
          <ThemeProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="settings" />
            </Stack>
          </ThemeProvider>
        </LearningLevelProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

// https://www.onspace.ai/ai-app-builder/9b1j3r

export default RootLayout;