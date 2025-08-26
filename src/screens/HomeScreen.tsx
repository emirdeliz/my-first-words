import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { 
  StatCard, 
  ProgressCard, 
  Typography, 
  Card, 
  Button 
} from '../ui';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { 
    currentStreak, 
    totalExperience, 
    level, 
    categories, 
    words 
  } = useProgress();

  const totalWords = words.length;
  const learnedWords = words.filter(word => word.isLearned).length;
  const progressPercentage = totalWords > 0 ? (learnedWords / totalWords) * 100 : 0;

  const getLevelProgress = () => {
    const experienceInLevel = totalExperience % 100;
    return experienceInLevel;
  };

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Typography variant="h3" color="text" weight="semiBold" style={styles.sectionTitle}>
        Ações Rápidas
      </Typography>
      <View style={styles.actionsGrid}>
        <Button
          title="Continuar"
          onPress={() => {}}
          variant="primary"
          size="large"
          icon={<Icon name="play-circle" size={32} color="white" />}
          style={styles.actionButton}
        />
        
        <Button
          title="Nova Lição"
          onPress={() => {}}
          variant="secondary"
          size="large"
          icon={<Icon name="book-open-variant" size={32} color="white" />}
          style={styles.actionButton}
        />
        
        <Button
          title="Revisar"
          onPress={() => {}}
          variant="outline"
          size="large"
          icon={<Icon name="refresh" size={32} color={theme.colors.info} />}
          style={styles.actionButton}
        />
        
        <Button
          title="Conquistas"
          onPress={() => {}}
          variant="outline"
          size="large"
          icon={<Icon name="trophy" size={32} color={theme.colors.success} />}
          style={styles.actionButton}
        />
      </View>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <Typography variant="h3" color="text" weight="semiBold" style={styles.sectionTitle}>
        Categorias Disponíveis
      </Typography>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryCard,
              { 
                backgroundColor: category.isUnlocked ? category.color : theme.colors.border,
                opacity: category.isUnlocked ? 1 : 0.5,
              },
            ]}
            disabled={!category.isUnlocked}
          >
            <Typography variant="h1" color="white" align="center" style={styles.categoryIcon}>
              {category.icon}
            </Typography>
            <Typography variant="body" color="white" weight="semiBold" align="center" style={styles.categoryName}>
              {category.name}
            </Typography>
            <Typography variant="caption" color="white" align="center" style={styles.categoryProgress}>
              {category.learnedWords}/{category.totalWords}
            </Typography>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header com saudação */}
      <View style={styles.header}>
        <Typography variant="h2" color="text" weight="bold">
          Olá, {user?.name || 'Usuário'}! 👋
        </Typography>
        <Typography variant="body" color="textSecondary">
          Continue sua jornada de aprendizado
        </Typography>
      </View>

      {/* Cards de estatísticas */}
      <View style={styles.statsContainer}>
        <StatCard
          icon="star"
          value={`Nível ${level}`}
          label="Nível"
          color={theme.colors.warning}
        />
        <StatCard
          icon="lightning-bolt"
          value={totalExperience}
          label="Experiência"
          color={theme.colors.secondary}
        />
        <StatCard
          icon="fire"
          value={`${currentStreak} dias`}
          label="Sequência"
          color={theme.colors.error}
        />
      </View>

      {/* Barra de progresso do nível */}
      <View style={styles.levelProgressContainer}>
        <ProgressCard
          title={`Nível ${level}`}
          currentValue={getLevelProgress()}
          maxValue={100}
          showPercentage={false}
          color={theme.colors.primary}
          size="small"
        />
        <Typography variant="caption" color="textSecondary" align="center">
          {getLevelProgress()} / 100 XP para o próximo nível
        </Typography>
      </View>

      {/* Card de progresso geral */}
      <View style={styles.progressContainer}>
        <ProgressCard
          title="Progresso Geral"
          currentValue={learnedWords}
          maxValue={totalWords}
          showPercentage={true}
          color={theme.colors.primary}
        />
      </View>

      {/* Ações rápidas */}
      {renderQuickActions()}

      {/* Categorias disponíveis */}
      {renderCategories()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  levelProgressContainer: {
    margin: 20,
    marginBottom: 20,
  },
  progressContainer: {
    margin: 20,
    marginBottom: 20,
  },
  quickActionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: (width - 60) / 2,
    height: 80,
    marginBottom: 12,
  },
  categoriesContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  categoryCard: {
    width: 120,
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryName: {
    marginBottom: 4,
  },
  categoryProgress: {
    opacity: 0.9,
  },
});

export default HomeScreen;
