import { StatusBar } from 'expo-status-bar';
import { Box, Text, Pressable } from './src/ui';

export default function App() {
  return (
    <Box 
      flex 
      bgPrimary 
      itemsCenter 
      justifyCenter 
      className="p-6"
    >
      <Text 
        h1 
        fontBold 
        textWhite 
        textCenter 
        className="mb-4"
      >
        My First Words
      </Text>
      
      <Text 
        body 
        textWhite 
        textCenter 
        className="mb-8 px-6"
      >
        Welcome to your language learning app! 🎯
      </Text>
      
      <Box 
        bgWhite 
        borderRoundedLg 
        p 
        shadowLg 
        className="w-full max-w-sm"
      >
        <Text 
          textPrimary 
          fontSemibold 
          textCenter 
          className="text-lg"
        >
          NativeWind + Atomic Design ✨
        </Text>
        
        <Text 
          caption 
          textSecondary 
          textCenter 
          className="mt-2"
        >
          Components with boolean props for styling
        </Text>
      </Box>
      
      <Pressable 
        bgSuccess 
        borderRoundedLg 
        p 
        mt 
        className="w-full max-w-sm"
      >
        <Text 
          textWhite 
          fontSemibold 
          textCenter 
        >
          Get Started
        </Text>
      </Pressable>
      
      <StatusBar style="light" />
    </Box>
  );
}
