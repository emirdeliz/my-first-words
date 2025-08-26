import React, { useState } from 'react';
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
    <TouchableOpacity
      key={mode.id}
      style={[
        styles.practiceModeCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: mode.color,
        },
      ]}
      onPress={() => handlePracticeMode(mode.id)}
    >
      <View style={styles.modeHeader}>
        <View style={[styles.modeIcon, { backgroundColor: mode.color }]}>
          <Icon name={mode.icon} size={24} color="white" />
        </View>
        <View style={styles.modeInfo}>
          <Text style={[styles.modeTitle, { color: theme.colors.text }]}>
            {mode.title}
          </Text>
          <Text style={[styles.modeDescription, { color: theme.colors.textSecondary }]}>
            {mode.description}
          </Text>
        </View>
      </View>
      
      <View style={styles.modeFooter}>
        <View style={[styles.difficultyBadge, { backgroundColor: mode.color }]}>
          <Text style={styles.difficultyText}>{mode.difficulty}</Text>
        </View>
        <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  const renderQuickPractice = (option: any) => (
    <TouchableOpacity
      key={option.id}
      style={[
        styles.quickPracticeCard,
        { backgroundColor: option.color },
      ]}
      onPress={() => handleQuickPractice(option.id)}
    >
      <View style={styles.quickPracticeContent}>
        <Icon name={option.icon} size={32} color="white" />
        <View style={styles.quickPracticeInfo}>
          <Text style={styles.quickPracticeTitle}>{option.title}</Text>
          <Text style={styles.quickPracticeDescription}>{option.description}</Text>
        </View>
        <View style={styles.wordCount}>
          <Text style={styles.wordCountText}>{option.count}</Text>
        </View>
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
          Praticar
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Escolha um modo de prática
        </Text>
      </View>

      <View style={styles.streakContainer}>
        <View style={[styles.streakCard, { backgroundColor: theme.colors.surface }]}>
          <Icon name="fire" size={24} color={theme.colors.error} />
          <Text style={[styles.streakText, { color: theme.colors.text }]}>
            Sequência atual: {currentStreak} dias
          </Text>
        </View>
      </View>

      <View style={styles.quickPracticeSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Prática Rápida
        </Text>
        {quickPracticeOptions.map(renderQuickPractice)}
      </View>

      <View style={styles.practiceModesSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Modos de Prática
        </Text>
        {practiceModes.map(renderPracticeMode)}
      </View>

      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Estatísticas
        </Text>
        <View style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Total de palavras:
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {words.length}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Palavras aprendidas:
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.success }]}>
              {words.filter(w => w.isLearned).length}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Por aprender:
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.warning }]}>
              {words.filter(w => !w.isLearned).length}
            </Text>
          </View>
        </View>
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
  streakContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  streakText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  quickPracticeSection: {
    padding: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickPracticeCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  quickPracticeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickPracticeInfo: {
    flex: 1,
    marginLeft: 16,
  },
  quickPracticeTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  quickPracticeDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  wordCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  wordCountText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  practiceModesSection: {
    padding: 20,
    paddingBottom: 10,
  },
  practiceModeCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modeInfo: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  modeDescription: {
    fontSize: 14,
  },
  modeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  statsSection: {
    padding: 20,
    paddingBottom: 40,
  },
  statsCard: {
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statLabel: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PracticeScreen;
