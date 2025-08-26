import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
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
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        {
          backgroundColor: category.isUnlocked ? category.color : theme.colors.border,
          opacity: category.isUnlocked ? 1 : 0.6,
        },
      ]}
      onPress={() => handleCategoryPress(category.id)}
      disabled={!category.isUnlocked}
    >
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </View>
      </View>
      
      <View style={styles.categoryProgress}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(category.learnedWords / category.totalWords) * 100}%`,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {category.learnedWords}/{category.totalWords} palavras
        </Text>
      </View>

      {!category.isUnlocked && (
        <View style={styles.lockOverlay}>
          <Icon name="lock" size={24} color="white" />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderLessonCard = (lesson: any) => (
    <TouchableOpacity
      key={lesson.id}
      style={[
        styles.lessonCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: lesson.isCompleted ? theme.colors.success : theme.colors.border,
        },
      ]}
      onPress={() => handleLessonPress(lesson.id)}
    >
      <View style={styles.lessonHeader}>
        <View style={styles.lessonIcon}>
          <Icon
            name={lesson.isCompleted ? 'check-circle' : 'play-circle'}
            size={24}
            color={lesson.isCompleted ? theme.colors.success : theme.colors.primary}
          />
        </View>
        <View style={styles.lessonInfo}>
          <Text style={[styles.lessonTitle, { color: theme.colors.text }]}>
            {lesson.title}
          </Text>
          <Text style={[styles.lessonDescription, { color: theme.colors.textSecondary }]}>
            {lesson.description}
          </Text>
        </View>
      </View>

      <View style={styles.lessonFooter}>
        <Text style={[styles.lessonScore, { color: theme.colors.textSecondary }]}>
          {lesson.score}/{lesson.maxScore} pontos
        </Text>
        {lesson.isCompleted && (
          <View style={styles.completedBadge}>
            <Icon name="trophy" size={16} color={theme.colors.warning} />
            <Text style={[styles.completedText, { color: theme.colors.warning }]}>
              Concluída
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Categorias de Aprendizado
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Escolha uma categoria para começar
        </Text>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Categorias Disponíveis
        </Text>
        {categories.map(renderCategoryCard)}
      </View>

      <View style={styles.lessonsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Lições Recentes
        </Text>
        {lessons.map(renderLessonCard)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  categoriesSection: {
    padding: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoryCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  categoryProgress: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    textAlign: 'center',
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  lessonsSection: {
    padding: 20,
    paddingBottom: 40,
  },
  lessonCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  lessonIcon: {
    marginRight: 12,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
  },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonScore: {
    fontSize: 14,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default LearnScreen;
