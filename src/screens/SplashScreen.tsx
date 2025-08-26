import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Box, Typography, Card } from '../ui';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();
  
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimations();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        navigateToNextScreen();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated]);

  const startAnimations = () => {
    // Animação do logo
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Animação do título
    Animated.timing(titleOpacity, {
      toValue: 1,
      duration: 600,
      delay: 400,
      useNativeDriver: true,
    }).start();

    // Animação do subtítulo
    Animated.timing(subtitleOpacity, {
      toValue: 1,
      duration: 600,
      delay: 600,
      useNativeDriver: true,
    }).start();
  };

  const navigateToNextScreen = () => {
    if (isAuthenticated) {
      navigation.navigate('Main' as never);
    } else {
      navigation.navigate('Onboarding' as never);
    }
  };

  return (
    <Box flex justifyCenter itemsCenter style={{ backgroundColor: theme.colors.background }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      
      <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }}>
        {/* Logo animado */}
        <Animated.View
          style={{
            marginBottom: 40,
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          }}
        >
          <Card style={{ width: 120, height: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.primary }} padding="large" elevation={8}>
            <Typography variant="h1" color="white" align="center">
              📚
            </Typography>
          </Card>
        </Animated.View>

        {/* Título animado */}
        <Animated.Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 16,
            color: theme.colors.text,
            opacity: titleOpacity,
          }}
        >
          My First Words
        </Animated.Text>

        {/* Subtítulo animado */}
        <Animated.Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            lineHeight: 24,
            color: theme.colors.textSecondary,
            opacity: subtitleOpacity,
          }}
        >
          Aprenda suas primeiras palavras de forma divertida
        </Animated.Text>
      </Box>

      {/* Indicador de carregamento */}
      <Box flexRow style={{ marginBottom: 60 }}>
        <Box
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
            backgroundColor: theme.colors.primary,
          }}
        />
        <Box
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
            backgroundColor: theme.colors.secondary,
          }}
        />
        <Box
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            marginHorizontal: 4,
            backgroundColor: theme.colors.primary,
          }}
        />
      </Box>
    </Box>
  );
};

export default SplashScreen;
