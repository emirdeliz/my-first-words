import React, { useState } from 'react';
import {
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { Box, Typography, Pressable, Card } from '../ui';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const PracticeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { words, currentStreak } = useProgress();
  
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const practiceModes = [
    {
      id: 'flashcards',
      title: 'Flashcards',
      description: 'Revise palavras com cartões',
      icon: 'cards',
      color: theme.colors.primary,
      difficulty: 'Fácil',
    },
    {
      id: 'quiz',
      title: 'Quiz',
      description: 'Teste seu conhecimento',
      icon: 'help-circle',
      color: theme.colors.secondary,
      difficulty: 'Médio',
    },
    {
      id: 'matching',
      title: 'Associação',
      description: 'Conecte palavras e traduções',
      icon: 'puzzle',
      color: theme.colors.warning,
      difficulty: 'Médio',
    },
    {
      id: 'typing',
      title: 'Digitação',
      description: 'Digite as palavras corretas',
      icon: 'keyboard',
      color: theme.colors.info,
      difficulty: 'Difícil',
    },
    {
      id: 'listening',
      title: 'Audição',
      description: 'Ouça e identifique palavras',
      icon: 'ear',
      color: theme.colors.success,
      difficulty: 'Médio',
    },
    {
      id: 'speaking',
      title: 'Pronúncia',
      description: 'Pratique sua pronúncia',
      icon: 'microphone',
      color: theme.colors.error,
      difficulty: 'Difícil',
    },
  ];

  const quickPracticeOptions = [
    {
      id: 'daily',
      title: 'Prática Diária',
      description: '5 palavras para hoje',
      icon: 'calendar-today',
      color: theme.colors.primary,
      count: 5,
    },
    {
      id: 'review',
      title: 'Revisão',
      description: 'Palavras que precisam de revisão',
      icon: 'refresh',
      color: theme.colors.secondary,
      count: words.filter(w => !w.isLearned).length,
    },
    {
      id: 'challenge',
      title: 'Desafio',
      description: 'Teste suas habilidades',
      icon: 'trophy',
      color: theme.colors.warning,
      count: 10,
    },
  ];

  const handlePracticeMode = (modeId: string) => {
    setSelectedMode(modeId);
    // Implementar navegação para o modo de prática
    console.log('Modo selecionado:', modeId);
  };

  const handleQuickPractice = (optionId: string) => {
    // Implementar prática rápida
    console.log('Prática rápida:', optionId);
  };

  const renderPracticeMode = (mode: any) => (
    <Pressable
      key={mode.id}
      style={{
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: mode.color,
        backgroundColor: theme.colors.surface,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      onPress={() => handlePracticeMode(mode.id)}
    >
      <Box style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Box style={{ width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 16, backgroundColor: mode.color }}>
          <Icon name={mode.icon} size={24} color="white" />
        </Box>
        <Box style={{ flex: 1 }}>
          <Typography variant="body" color="text" weight="semiBold" style={{ marginBottom: 4 }}>
            {mode.title}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {mode.description}
          </Typography>
        </Box>
      </Box>
      
      <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, backgroundColor: mode.color }}>
          <Typography variant="caption" color="white" weight="semiBold">
            {mode.difficulty}
          </Typography>
        </Box>
        <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
      </Box>
    </Pressable>
  );

  const renderQuickPractice = (option: any) => (
    <Pressable
      key={option.id}
      style={{
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        backgroundColor: option.color,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      }}
      onPress={() => handleQuickPractice(option.id)}
    >
      <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name={option.icon} size={32} color="white" />
        <Box style={{ flex: 1, marginLeft: 16 }}>
          <Typography variant="body" color="white" weight="semiBold" style={{ marginBottom: 4 }}>
            {option.title}
          </Typography>
          <Typography variant="caption" color="white" style={{ opacity: 0.9 }}>
            {option.description}
          </Typography>
        </Box>
        <Box style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 }}>
          <Typography variant="body" color="white" weight="bold">
            {option.count}
          </Typography>
        </Box>
      </Box>
    </Pressable>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      showsVerticalScrollIndicator={false}
    >
      <Box style={{ padding: 20, paddingBottom: 10 }}>
        <Typography variant="h2" color="text" weight="bold" style={{ marginBottom: 8 }}>
          Praticar
        </Typography>
        <Typography variant="body" color="textSecondary">
          Escolha um modo de prática
        </Typography>
      </Box>

      <Box style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Card style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12 }} elevation={2}>
          <Icon name="fire" size={24} color={theme.colors.error} />
          <Typography variant="body" color="text" weight="semiBold" style={{ marginLeft: 12 }}>
            Sequência atual: {currentStreak} dias
          </Typography>
        </Card>
      </Box>

      <Box style={{ padding: 20, paddingBottom: 10 }}>
        <Typography variant="h3" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
          Prática Rápida
        </Typography>
        {quickPracticeOptions.map(renderQuickPractice)}
      </Box>

      <Box style={{ padding: 20, paddingBottom: 10 }}>
        <Typography variant="h3" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
          Modos de Prática
        </Typography>
        {practiceModes.map(renderPracticeMode)}
      </Box>

      <Box style={{ padding: 20, paddingBottom: 40 }}>
        <Typography variant="h3" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
          Estatísticas
        </Typography>
        <Card style={{ borderRadius: 12, padding: 20 }} elevation={2}>
          <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
            <Typography variant="body" color="textSecondary">
              Total de palavras:
            </Typography>
            <Typography variant="body" color="text" weight="semiBold">
              {words.length}
            </Typography>
          </Box>
          <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
            <Typography variant="body" color="textSecondary">
              Palavras aprendidas:
            </Typography>
            <Typography variant="body" color="success" weight="semiBold">
              {words.filter(w => w.isLearned).length}
            </Typography>
          </Box>
          <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
            <Typography variant="body" color="textSecondary">
              Por aprender:
            </Typography>
            <Typography variant="body" color="warning" weight="semiBold">
              {words.filter(w => !w.isLearned).length}
            </Typography>
          </Box>
        </Card>
      </Box>
    </ScrollView>
  );
};

export default PracticeScreen;
