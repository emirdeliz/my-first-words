import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useProgress } from '../contexts/ProgressContext';
import { Box, Typography, Pressable, Card, Icon } from '../ui';

interface GameMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isUnlocked: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

const PracticeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { currentStreak, totalExperience, level } = useProgress();
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const gameModes: GameMode[] = [
    {
      id: '1',
      name: 'Quiz Rápido',
      description: 'Teste seu conhecimento com perguntas rápidas',
      icon: 'lightning-bolt',
      color: '#FF6B6B',
      isUnlocked: true,
      difficulty: 'easy',
    },
    {
      id: '2',
      name: 'Jogo da Memória',
      description: 'Encontre pares de palavras e traduções',
      icon: 'cards',
      color: '#4ECDC4',
      isUnlocked: true,
      difficulty: 'medium',
    },
    {
      id: '3',
      name: 'Palavras Cruzadas',
      description: 'Complete as palavras com as letras corretas',
      icon: 'puzzle',
      color: '#45B7D1',
      isUnlocked: true,
      difficulty: 'medium',
    },
    {
      id: '4',
      name: 'Desafio Diário',
      description: 'Novo desafio todos os dias',
      icon: 'calendar-star',
      color: '#FFD93D',
      isUnlocked: false,
      difficulty: 'hard',
    },
    {
      id: '5',
      name: 'Batalha de Palavras',
      description: 'Compete com outros jogadores',
      icon: 'sword-cross',
      color: '#FF8E72',
      isUnlocked: false,
      difficulty: 'hard',
    },
  ];

  const handleGameModePress = (mode: GameMode) => {
    if (mode.isUnlocked) {
      setSelectedMode(mode.id);
      // Aqui você pode navegar para o jogo selecionado
      // navigation.navigate('Game', { gameMode: mode.id });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#4CAF50';
      case 'medium':
        return '#FF9800';
      case 'hard':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Fácil';
      case 'medium':
        return 'Médio';
      case 'hard':
        return 'Difícil';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <Box flex bgGray>
      <ScrollView>
        {/* Header */}
        <Box bgPrimary px py={6} style={{ paddingTop: 60 }}>
          <Box flexRow itemsCenter>
            <Typography variant="h1" color="white" style={{ marginRight: 16 }}>
              🎮
            </Typography>
            <Box flex>
              <Typography variant="body" color="white" weight="semiBold" style={{ marginBottom: 4 }}>
                Praticar e Jogar
              </Typography>
              <Typography variant="caption" color="white" style={{ opacity: 0.9 }}>
                Melhore suas habilidades com jogos divertidos
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Box px py={4}>
          <Box flexRow justifyBetween>
            <Card style={{ flex: 1, marginRight: 8 }}>
              <Box itemsCenter py={3}>
                <Icon materialCommunityName="fire" size={24} color="#FF6B6B" />
                <Typography variant="body" color="text" weight="semiBold" style={{ marginTop: 8 }}>
                  {currentStreak}
                </Typography>
                <Typography variant="caption" color="textSecondary" align="center">
                  Dias seguidos
                </Typography>
              </Box>
            </Card>
            
            <Card style={{ flex: 1, marginLeft: 8 }}>
              <Box itemsCenter py={3}>
                <Icon materialCommunityName="star" size={24} color="#FFD700" />
                <Typography variant="body" color="text" weight="semiBold" style={{ marginTop: 8 }}>
                  {level}
                </Typography>
                <Typography variant="caption" color="textSecondary" align="center">
                  Nível atual
                </Typography>
              </Box>
            </Card>
          </Box>
        </Box>

        {/* Game Modes */}
        <Box px py={4}>
          <Typography variant="h2" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
            Modos de Jogo
          </Typography>
          
          {gameModes.map((mode) => (
            <Pressable
              key={mode.id}
              onPress={() => handleGameModePress(mode)}
              style={{ marginBottom: 16 }}
            >
              <Card
                style={{
                  padding: 16,
                  opacity: mode.isUnlocked ? 1 : 0.6,
                }}
              >
                <Box flexRow itemsCenter>
                  <Box
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 28,
                      backgroundColor: mode.color + '20',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 16,
                    }}
                  >
                    <Icon 
                      materialCommunityName={mode.icon} 
                      size={28} 
                      color={mode.color} 
                    />
                  </Box>
                  
                  <Box flex>
                    <Box flexRow itemsCenter style={{ marginBottom: 4 }}>
                      <Typography variant="body" color="text" weight="semiBold">
                        {mode.name}
                      </Typography>
                      <Box
                        style={{
                          marginLeft: 8,
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          backgroundColor: getDifficultyColor(mode.difficulty) + '20',
                          borderRadius: 12,
                        }}
                      >
                        <Typography variant="caption" color="text" weight="semiBold">
                          {getDifficultyLabel(mode.difficulty)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="caption" color="textSecondary" style={{ marginBottom: 8 }}>
                      {mode.description}
                    </Typography>
                    
                    {!mode.isUnlocked && (
                      <Box flexRow itemsCenter>
                        <Icon materialCommunityName="lock" size={16} color="#999" />
                        <Typography variant="caption" color="textSecondary" style={{ marginLeft: 4 }}>
                          Desbloqueie no nível {level + 2}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  <Box
                    style={{
                      padding: 8,
                      backgroundColor: mode.isUnlocked ? mode.color : '#999',
                      borderRadius: 20,
                    }}
                  >
                    <Icon 
                      materialCommunityName={mode.isUnlocked ? "play" : "lock"} 
                      size={20} 
                      color="white" 
                    />
                  </Box>
                </Box>
              </Card>
            </Pressable>
          ))}
        </Box>

        {/* Quick Practice */}
        <Box px py={4} style={{ paddingBottom: 32 }}>
          <Typography variant="h2" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
            Prática Rápida
          </Typography>
          <Card style={{ padding: 16 }}>
            <Box flexRow itemsCenter>
              <Box
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#007AFF20',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 16,
                }}
              >
                <Icon materialCommunityName="target" size={24} color="#007AFF" />
              </Box>
              <Box flex>
                <Typography variant="body" color="text" weight="semiBold">
                  Prática Personalizada
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Foque nas palavras que você precisa revisar
                </Typography>
              </Box>
              <Pressable
                onPress={() => {}}
                style={{
                  padding: 8,
                  backgroundColor: '#007AFF',
                  borderRadius: 20,
                }}
              >
                <Icon materialCommunityName="arrow-right" size={20} color="white" />
              </Pressable>
            </Box>
          </Card>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default PracticeScreen;
