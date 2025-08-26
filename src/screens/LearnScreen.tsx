import React from 'react';
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

const LearnScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { categories, lessons } = useProgress();

  const handleCategoryPress = (categoryId: string) => {
    // Navegar para a tela de lições da categoria
    console.log('Categoria selecionada:', categoryId);
  };

  const handleLessonPress = (lessonId: string) => {
    // Navegar para a tela da lição
    console.log('Lição selecionada:', lessonId);
  };

  const renderCategoryCard = (category: any) => (
    <Pressable
      key={category.id}
      style={{
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        backgroundColor: category.isUnlocked ? category.color : theme.colors.border,
        opacity: category.isUnlocked ? 1 : 0.6,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      onPress={() => handleCategoryPress(category.id)}
      disabled={!category.isUnlocked}
    >
      <Box style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <Typography variant="h1" color="white" style={{ marginRight: 16 }}>
          {category.icon}
        </Typography>
        <Box style={{ flex: 1 }}>
          <Typography variant="body" color="white" weight="semiBold" style={{ marginBottom: 4 }}>
            {category.name}
          </Typography>
          <Typography variant="caption" color="white" style={{ opacity: 0.9 }}>
            {category.description}
          </Typography>
        </Box>
      </Box>
      
      <Box style={{ marginTop: 8 }}>
        <Box style={{ height: 6, backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 3, marginBottom: 8, overflow: 'hidden' }}>
          <Box
            style={{
              width: `${(category.learnedWords / category.totalWords) * 100}%`,
              height: '100%',
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
          />
        </Box>
        <Typography variant="caption" color="white" align="center" style={{ opacity: 0.9 }}>
          {category.learnedWords}/{category.totalWords} palavras
        </Typography>
      </Box>

      {!category.isUnlocked && (
        <Box style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center', alignItems: 'center', borderRadius: 16 }}>
          <Icon name="lock" size={24} color="white" />
        </Box>
      )}
    </Pressable>
  );

  const renderLessonCard = (lesson: any) => (
    <Pressable
      key={lesson.id}
      style={{
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: lesson.isCompleted ? theme.colors.success : theme.colors.border,
        backgroundColor: theme.colors.surface,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      onPress={() => handleLessonPress(lesson.id)}
    >
      <Box style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Box style={{ marginRight: 12 }}>
          <Icon
            name={lesson.isCompleted ? 'check-circle' : 'play-circle'}
            size={24}
            color={lesson.isCompleted ? theme.colors.success : theme.colors.primary}
          />
        </Box>
        <Box style={{ flex: 1 }}>
          <Typography variant="body" color="text" weight="semiBold" style={{ marginBottom: 4 }}>
            {lesson.title}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {lesson.description}
          </Typography>
        </Box>
      </Box>

      <Box style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" color="textSecondary">
          {lesson.score}/{lesson.maxScore} pontos
        </Typography>
        {lesson.isCompleted && (
          <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="trophy" size={16} color={theme.colors.warning} />
            <Typography variant="caption" color="warning" weight="semiBold" style={{ marginLeft: 4 }}>
              Concluída
            </Typography>
          </Box>
        )}
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
          Categorias de Aprendizado
        </Typography>
        <Typography variant="body" color="textSecondary">
          Escolha uma categoria para começar
        </Typography>
      </Box>

      <Box style={{ padding: 20, paddingBottom: 10 }}>
        <Typography variant="h3" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
          Categorias Disponíveis
        </Typography>
        {categories.map(renderCategoryCard)}
      </Box>

      <Box style={{ padding: 20, paddingBottom: 40 }}>
        <Typography variant="h3" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
          Lições Recentes
        </Typography>
        {lessons.map(renderLessonCard)}
      </Box>
    </ScrollView>
  );
};

export default LearnScreen;
