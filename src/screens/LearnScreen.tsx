import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Box, Typography, Pressable, Card, Icon } from '../ui';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  totalWords: number;
  learnedWords: number;
  isUnlocked: boolean;
}

const LearnScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: '1',
      name: 'Cores',
      description: 'Aprenda as cores básicas em inglês',
      icon: 'palette',
      color: '#FF6B6B',
      totalWords: 12,
      learnedWords: 8,
      isUnlocked: true,
    },
    {
      id: '2',
      name: 'Números',
      description: 'Conte de 1 a 20 em inglês',
      icon: 'numeric',
      color: '#4ECDC4',
      totalWords: 20,
      learnedWords: 15,
      isUnlocked: true,
    },
    {
      id: '3',
      name: 'Animais',
      description: 'Conheça os nomes dos animais',
      icon: 'paw',
      color: '#45B7D1',
      totalWords: 15,
      learnedWords: 10,
      isUnlocked: true,
    },
    {
      id: '4',
      name: 'Frutas',
      description: 'Aprenda os nomes das frutas',
      icon: 'food-apple',
      color: '#96CEB4',
      totalWords: 18,
      learnedWords: 0,
      isUnlocked: false,
    },
    {
      id: '5',
      name: 'Família',
      description: 'Membros da família em inglês',
      icon: 'account-group',
      color: '#FFEAA7',
      totalWords: 14,
      learnedWords: 0,
      isUnlocked: false,
    },
    {
      id: '6',
      name: 'Profissões',
      description: 'Diferentes tipos de trabalho',
      icon: 'briefcase',
      color: '#DDA0DD',
      totalWords: 16,
      learnedWords: 0,
      isUnlocked: false,
    },
  ];

  const handleCategoryPress = (category: Category) => {
    if (category.isUnlocked) {
      setSelectedCategory(category.id);
      // Aqui você pode navegar para a tela de palavras da categoria
      // navigation.navigate('CategoryWords', { categoryId: category.id });
    }
  };

  const getProgressPercentage = (learned: number, total: number) => {
    return total > 0 ? (learned / total) * 100 : 0;
  };

  return (
    <Box flex bgGray>
      <ScrollView>
        {/* Header */}
        <Box bgPrimary px py={6} style={{ paddingTop: 60 }}>
          <Box flexRow itemsCenter>
            <Typography variant="h1" color="white" style={{ marginRight: 16 }}>
              📚
            </Typography>
            <Box flex>
              <Typography variant="body" color="white" weight="semiBold" style={{ marginBottom: 4 }}>
                Aprenda Novas Palavras
              </Typography>
              <Typography variant="caption" color="white" style={{ opacity: 0.9 }}>
                Escolha uma categoria para começar
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Categories Grid */}
        <Box px py={4}>
          <Typography variant="h2" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
            Categorias Disponíveis
          </Typography>
          
          <Box style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => handleCategoryPress(category)}
                style={{
                  width: '48%',
                  marginBottom: 16,
                  opacity: category.isUnlocked ? 1 : 0.6,
                }}
              >
                <Card
                  style={{
                    padding: 16,
                    alignItems: 'center',
                    backgroundColor: category.isUnlocked ? 'white' : '#F5F5F5',
                  }}
                >
                  <Box
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: category.color + '20',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <Icon 
                      materialCommunityName={category.icon} 
                      size={30} 
                      color={category.color} 
                    />
                  </Box>
                  
                  <Typography variant="body" color="text" weight="semiBold" align="center" style={{ marginBottom: 4 }}>
                    {category.name}
                  </Typography>
                  
                  <Typography variant="caption" color="textSecondary" align="center" style={{ opacity: 0.9, textAlign: 'center' }}>
                    {category.description}
                  </Typography>
                  
                  {category.isUnlocked && (
                    <Box style={{ marginTop: 12, width: '100%' }}>
                      <Box
                        style={{
                          height: 4,
                          backgroundColor: '#E9ECEF',
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          style={{
                            height: '100%',
                            backgroundColor: category.color,
                            width: `${getProgressPercentage(category.learnedWords, category.totalWords)}%`,
                          }}
                        />
                      </Box>
                      <Typography variant="caption" color="textSecondary" align="center" style={{ marginTop: 4 }}>
                        {category.learnedWords}/{category.totalWords} palavras
                      </Typography>
                    </Box>
                  )}
                  
                  {!category.isUnlocked && (
                    <Box style={{ marginTop: 12 }}>
                      <Icon materialCommunityName="lock" size={20} color="#999" />
                    </Box>
                  )}
                </Card>
              </Pressable>
            ))}
          </Box>
        </Box>

        {/* Quick Start */}
        <Box px py={4} style={{ paddingBottom: 32 }}>
          <Typography variant="h2" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
            Começar Rápido
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
                <Icon materialCommunityName="play-circle" size={24} color="#007AFF" />
              </Box>
              <Box flex>
                <Typography variant="body" color="text" weight="semiBold">
                  Continuar de onde parou
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Retome sua última lição
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

export default LearnScreen;
