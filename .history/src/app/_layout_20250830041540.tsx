import '../global.css';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import { LearningLevelProvider } from '../contexts/LearningLevelContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { ParentalConfigProvider } from '../contexts/ParentalConfigContext';
import PlatformAwareSpeechService from '../services/PlatformAwareSpeechService';

const RootLayout = () => {
  useEffect(() => {
    // Inicializar serviços de fala quando o app iniciar
    const initializeSpeechServices = async () => {
      try {
        console.log('🚀 Initializing platform-aware speech service on app start...');
        await PlatformAwareSpeechService.initialize();
        
        // Mostrar informações do ambiente
        const envInfo = PlatformAwareSpeechService.getEnvironmentInfo();
        console.log('🔍 Environment info:', envInfo);
        
        // Testar o serviço após inicialização
        setTimeout(async () => {
          try {
            await PlatformAwareSpeechService.speak('Serviço de fala inicializado', {
              language: 'pt-BR',
              rate: 0.8,
              pitch: 1.0,
            });
          } catch (error) {
            console.log('⚠️ Speech test failed (this is normal in some environments):', error);
          }
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