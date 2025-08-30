import '../global.css';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { LearningLevelProvider } from '../contexts/LearningLevelContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ParentalConfigProvider } from '../contexts/ParentalConfigContext';
import SpeechServiceInitializer from '../services/SpeechServiceInitializer';

const RootLayout = () => {
  useEffect(() => {
    // Inicializar serviços de fala quando o app iniciar
    const initializeSpeechServices = async () => {
      try {
        console.log('🚀 Initializing speech services on app start...');
        await SpeechServiceInitializer.initialize();
        
        // Testar os serviços após inicialização
        setTimeout(async () => {
          await SpeechServiceInitializer.testServices();
        }, 2000);
        
      } catch (error) {
        console.error('❌ Failed to initialize speech services:', error);
      }
    };

    initializeSpeechServices();
  }, []);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#2563eb" />
      <LanguageProvider>
        <LearningLevelProvider>
          <ThemeProvider>
            <ParentalConfigProvider>
              <StatusBar style="light" backgroundColor="#2563eb" hidden />
              <Stack screenOptions={{ headerShown: false, headerStyle: { backgroundColor: '#2563eb' } }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="settings" />
                <Stack.Screen name="parental-config" />
              </Stack>
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