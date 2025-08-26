import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

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
      navigation.replace('Main');
    } else {
      navigation.replace('Onboarding');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      
      <View style={styles.content}>
        {/* Logo animado */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={[styles.logo, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.logoText}>📚</Text>
          </View>
        </Animated.View>

        {/* Título animado */}
        <Animated.Text
          style={[
            styles.title,
            {
              color: theme.colors.text,
              opacity: titleOpacity,
            },
          ]}
        >
          My First Words
        </Animated.Text>

        {/* Subtítulo animado */}
        <Animated.Text
          style={[
            styles.subtitle,
            {
              color: theme.colors.textSecondary,
              opacity: subtitleOpacity,
            },
          ]}
        >
          Aprenda suas primeiras palavras de forma divertida
        </Animated.Text>
      </View>

      {/* Indicador de carregamento */}
      <View style={styles.loadingContainer}>
        <View style={[styles.loadingDot, { backgroundColor: theme.colors.primary }]} />
        <View style={[styles.loadingDot, { backgroundColor: theme.colors.secondary }]} />
        <View style={[styles.loadingDot, { backgroundColor: theme.colors.primary }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoText: {
    fontSize: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingContainer: {
    flexDirection: 'row',
    marginBottom: 60,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default SplashScreen;
