import '../global.css';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from '../contexts/LanguageContext';
import { LearningLevelProvider } from '../contexts/LearningLevelContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ParentalConfigProvider } from '../contexts/ParentalConfigContext';
import { AudioConfigProvider } from '../contexts/AudioConfigContext';

const RootLayout = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#2563eb" />
      <LanguageProvider>
        <LearningLevelProvider>
          <ThemeProvider>
            <ParentalConfigProvider>
              <AudioConfigProvider>
                <StatusBar style="light" backgroundColor="#2563eb" hidden />
                <Stack screenOptions={{ headerShown: false, headerStyle: { backgroundColor: '#2563eb' } }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="settings" />
                  <Stack.Screen name="parental-config" />
                </Stack>
              </AudioConfigProvider>
            </ParentalConfigProvider>
          </ThemeProvider>
        </LearningLevelProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

// https://www.onspace.ai/ai-app-builder/9b1j3r
// 

export default RootLayout;