import React, { useState, useRef } from 'react';
import {
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { Box, Typography, Pressable } from '../ui';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const onboardingData = [
    {
      title: 'Bem-vindo ao My First Words!',
      description: 'Aprenda suas primeiras palavras de forma divertida e interativa',
      icon: '🎯',
      color: theme.colors.primary,
    },
    {
      title: 'Categorias Organizadas',
      description: 'Palavras organizadas por temas para facilitar o aprendizado',
      icon: '📚',
      color: theme.colors.secondary,
    },
    {
      title: 'Aprenda no Seu Ritmo',
      description: 'Progresso personalizado com sistema de níveis e experiência',
      icon: '⭐',
      color: theme.colors.warning,
    },
    {
      title: 'Pronto para Começar?',
      description: 'Vamos começar sua jornada de aprendizado!',
      icon: '🚀',
      color: theme.colors.success,
    },
  ];

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      scrollViewRef.current?.scrollTo({
        x: nextPage * width,
        animated: true,
      });
    } else {
      navigation.navigate('Login' as never);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login' as never);
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffset / width);
    setCurrentPage(page);
  };

  const renderPage = (item: any, index: number) => (
    <Box key={index} flex justifyCenter itemsCenter style={{ width }}>
      <Box 
        style={{ 
          width: 120, 
          height: 120, 
          borderRadius: 60,
          backgroundColor: 'rgba(74, 144, 226, 0.1)',
          marginBottom: 40,
        }}
        justifyCenter 
        itemsCenter
      >
        <Typography variant="h1" style={{ fontSize: 60 }}>
          {item.icon}
        </Typography>
      </Box>
      
      <Typography 
        variant="h2" 
        color="text" 
        weight="bold" 
        align="center"
        style={{ marginBottom: 20, lineHeight: 36 }}
      >
        {item.title}
      </Typography>
      
      <Typography 
        variant="body" 
        color="textSecondary" 
        align="center"
        style={{ lineHeight: 26, paddingHorizontal: 20 }}
      >
        {item.description}
      </Typography>
    </Box>
  );

  const renderDots = () => (
    <Box flexRow justifyCenter style={{ marginBottom: 40 }}>
      {onboardingData.map((_, index) => (
        <Box
          key={index}
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 5,
            backgroundColor: index === currentPage ? theme.colors.primary : theme.colors.border,
          }}
        />
      ))}
    </Box>
  );

  return (
    <Box flex style={{ backgroundColor: theme.colors.background }}>
      <Box flexRow justifyEnd style={{ paddingTop: 60, paddingHorizontal: 20 }}>
        <Pressable onPress={handleSkip}>
          <Typography variant="body" color="textSecondary" weight="medium">
            Pular
          </Typography>
        </Pressable>
      </Box>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {onboardingData.map(renderPage)}
      </ScrollView>

      {renderDots()}

      <Box style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            paddingHorizontal: 32,
            borderRadius: 25,
            backgroundColor: theme.colors.primary,
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
          onPress={handleNext}
        >
          <Typography 
            variant="body" 
            color="text"
            weight="semiBold"
            style={{ marginRight: 8 }}
          >
            {currentPage === onboardingData.length - 1 ? 'Começar' : 'Próximo'}
          </Typography>
          <Icon
            name={currentPage === onboardingData.length - 1 ? 'rocket-launch' : 'arrow-right'}
            size={20}
            color="white"
          />
        </Pressable>
      </Box>
    </Box>
  );
};

export default OnboardingScreen;
