import React, { useState } from 'react';
import { ScrollView, Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Typography, Pressable } from '../ui';
import { useTheme } from '../contexts/ThemeContext';

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string[];
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const { theme } = useTheme();

  const steps: OnboardingStep[] = [
    {
      title: 'Bem-vindo ao\nMy First Words!',
      description: 'Aprenda suas primeiras palavras de forma divertida e interativa',
      icon: '🎯',
      color: theme.colors.primary,
      gradient: ['#667eea', '#764ba2'],
    },
    {
      title: 'Categorias\nOrganizadas',
      description: 'Palavras organizadas por temas para facilitar o aprendizado',
      icon: '📚',
      color: theme.colors.secondary,
      gradient: ['#f093fb', '#f5576c'],
    },
    {
      title: 'Aprenda no\nSeu Ritmo',
      description: 'Progresso personalizado com sistema de níveis e experiência',
      icon: '⭐',
      color: theme.colors.warning,
      gradient: ['#4facfe', '#00f2fe'],
    },
    {
      title: 'Pronto para\nComeçar?',
      description: 'Vamos começar sua jornada de aprendizado!',
      icon: '🚀',
      color: theme.colors.success,
      gradient: ['#43e97b', '#38f9d7'],
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('Login' as never);
    }
  };

  const skipOnboarding = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <Box flex style={{ backgroundColor: '#0f0f23' }}>
      {/* Background Pattern */}
      <Box 
        absolute 
        top0 
        left0 
        right0 
        bottom0 
        style={{
          backgroundColor: '#0f0f23',
          opacity: 0.8,
        }}
      />
      
      {/* Floating Elements */}
      <Box 
        absolute 
        style={{
          top: 100,
          right: -50,
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transform: [{ rotate: '45deg' }],
        }}
      />
      <Box 
        absolute 
        style={{
          top: 200,
          left: -30,
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
        }}
      />
      <Box 
        absolute 
        style={{
          bottom: 300,
          right: -20,
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
        }}
      />

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 60 }}
      >
        {/* Header */}
        <Box flexRow justifyBetween itemsCenter px={6} py={8}>
          <Box>
            <Typography 
              variant="h1" 
              color="white" 
              weight="bold"
              style={{ 
                fontSize: 24,
                textShadowColor: 'rgba(255, 255, 255, 0.3)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 4,
              }}
            >
              My First Words
            </Typography>
            <Box opacity80>
              <Typography 
                variant="caption" 
                color="white" 
                style={{ fontSize: 12, marginTop: 2 }}
              >
                Aprenda inglês de forma divertida
              </Typography>
            </Box>
          </Box>
          
          <Pressable onPress={skipOnboarding}>
            <Box 
              px={4} 
              py={2} 
              roundedFull 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Typography variant="body" color="white" weight="semiBold" style={{ fontSize: 14 }}>
                Pular
              </Typography>
            </Box>
          </Pressable>
        </Box>

        {/* Main Content */}
        <Box flex justifyCenter itemsCenter px={6} style={{ minHeight: screenHeight * 0.6 }}>
          {/* Step Indicator */}
          <Box flexRow mb={16}>
            {steps.map((_, index) => (
              <Box
                key={index}
                w={4}
                h={4}
                roundedFull
                style={{
                  backgroundColor: index === currentStep ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                  marginHorizontal: 8,
                  transform: [{ scale: index === currentStep ? 1.3 : 1 }],
                  shadowColor: index === currentStep ? '#ffffff' : 'transparent',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: index === currentStep ? 0.8 : 0,
                  shadowRadius: 8,
                  elevation: index === currentStep ? 8 : 0,
                }}
              />
            ))}
          </Box>

          {/* Icon Container with Gradient Background */}
          <Box
            w={44}
            h={44}
            roundedFull
            justifyCenter
            itemsCenter
            mb={12}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 2,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              shadowColor: steps[currentStep].color,
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.4,
              shadowRadius: 24,
              elevation: 12,
            }}
          >
            <Typography 
              variant="h1" 
              color="white" 
              style={{ fontSize: 72 }}
            >
              {steps[currentStep].icon}
            </Typography>
          </Box>

          {/* Title */}
          <Box mb={8} px={2}>
            <Typography 
              variant="h1" 
              color="white" 
              align="center"
              weight="bold"
              style={{ 
                fontSize: 32, 
                lineHeight: 40,
                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                textShadowOffset: { width: 0, height: 4 },
                textShadowRadius: 8,
              }}
            >
              {steps[currentStep].title}
            </Typography>
          </Box>

          {/* Description */}
          <Box px={8}>
            <Box opacity90>
              <Typography 
                variant="body" 
                color="white" 
                align="center"
                style={{ 
                  fontSize: 18, 
                  lineHeight: 26,
                  textShadowColor: 'rgba(0, 0, 0, 0.3)',
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 4,
                }}
              >
                {steps[currentStep].description}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box px={6} py={8}>
          {/* Progress Bar */}
          <Box mb={8}>
            <Box 
              roundedFull 
              style={{ 
                height: 6, 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box 
                roundedFull 
                style={{ 
                  height: 6, 
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                  backgroundColor: steps[currentStep].color,
                  shadowColor: steps[currentStep].color,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.6,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              />
            </Box>
          </Box>

          {/* Action Button */}
          <Pressable
            onPress={nextStep}
            py={5}
            px={8}
            roundedFull
            itemsCenter
            style={{
              backgroundColor: steps[currentStep].color,
              minHeight: 60,
              shadowColor: steps[currentStep].color,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
              elevation: 12,
            }}
          >
            <Typography 
              variant="body" 
              color="white" 
              weight="bold"
              style={{ fontSize: 18 }}
            >
              {currentStep === steps.length - 1 ? 'Começar Jornada' : 'Continuar'}
            </Typography>
          </Pressable>

          {/* Step Counter */}
          <Box itemsCenter mt={6}>
            <Box 
              px={4} 
              py={2} 
              roundedFull 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box opacity90>
                <Typography 
                  variant="caption" 
                  color="white" 
                  style={{ fontSize: 14, fontWeight: '600' }}
                >
                  {currentStep + 1} de {steps.length}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default OnboardingScreen; 
