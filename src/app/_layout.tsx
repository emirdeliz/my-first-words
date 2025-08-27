import '../global.css';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from '../contexts/LanguageContext';

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <SafeAreaView style={{ backgroundColor: '#f8fafc', flex: 1 }} edges={['bottom']}>
          {/* <StatusBar style="light" backgroundColor="#2563eb" hidden={true} /> */}
          <Stack screenOptions={{ headerShown: false, headerStyle: { backgroundColor: '#2563eb' } }}>
            <Stack.Screen name="index" />
          </Stack>
        </SafeAreaView>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

export default RootLayout;