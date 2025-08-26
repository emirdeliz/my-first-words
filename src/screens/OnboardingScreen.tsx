import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Typography, Pressable, Icon } from '../ui';

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
}

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      title: 'Bem-vindo ao My First Words!',
      description: 'Aprenda inglês de forma divertida e interativa',
      icon: 'star',
    },
    {
      title: 'Aprenda com Jogos',
      description: 'Jogos educativos para fixar o vocabulário',
      icon: 'gamepad-variant',
    },
    {
      title: 'Acompanhe seu Progresso',
      description: 'Veja como você está evoluindo no aprendizado',
      icon: 'chart-line',
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
    <Box flex bgPrimary pt={15}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <Box flexRow justifyBetween itemsCenter px py>
          <Typography variant="h2" color="white" weight="bold">
            My First Words
          </Typography>
          <Pressable onPress={skipOnboarding}>
            <Box opacity80>
              <Typography variant="body" color="white">
                Pular
              </Typography>
            </Box>
          </Pressable>
        </Box>

        {/* Content */}
        <Box flex justifyCenter itemsCenter px>
          {/* Step Indicator */}
          <Box flexRow mb={8}>
            {steps.map((_, index) => (
              <Box
                key={index}
                w={2}
                h={2}
                roundedFull
                style={{
                  backgroundColor: index === currentStep ? 'white' : 'rgba(255, 255, 255, 0.3)',
                  marginHorizontal: 4,
                }}
              />
            ))}
          </Box>

          {/* Step Content */}
          <Box itemsCenter>
            <Box
              w={30}
              h={30}
              roundedFull
              justifyCenter
              itemsCenter
              mb={8}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Icon 
                materialCommunityName={steps[currentStep].icon} 
                size={60} 
                color="white" 
              />
            </Box>

            <Box mb={4}>
              <Typography variant="h1" color="white" align="center">
                {steps[currentStep].title}
              </Typography>
            </Box>

            <Box opacity90>
              <Typography variant="body" color="white" align="center">
                {steps[currentStep].description}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box px py={8}>
          <Pressable
            onPress={nextStep}
            bgWhite
            py={4}
            px={8}
            roundedFull
            itemsCenter
            shadow
            elevation5
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            }}
          >
            <Typography variant="body" color="primary" weight="semiBold">
              {currentStep === steps.length - 1 ? 'Começar' : 'Próximo'}
            </Typography>
          </Pressable>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default OnboardingScreen; 
