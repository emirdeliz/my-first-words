import React from 'react';
import {
  ScrollView,
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
  Button,
  Box,
  Pressable
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
    <Box style={{ padding: 20 }}>
      <Typography variant="h3" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
        Ações Rápidas
      </Typography>
      <Box style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Button
          title="Continuar"
          onPress={() => {}}
          variant="primary"
          size="large"
          icon={<Icon name="play-circle" size={32} color="white" />}
          style={{ width: (width - 60) / 2, height: 80, marginBottom: 12 }}
        />
        
        <Button
          title="Nova Lição"
          onPress={() => {}}
          variant="secondary"
          size="large"
          icon={<Icon name="book-open-variant" size={32} color="white" />}
          style={{ width: (width - 60) / 2, height: 80, marginBottom: 12 }}
        />
        
        <Button
          title="Revisar"
          onPress={() => {}}
          variant="outline"
          size="large"
          icon={<Icon name="refresh" size={32} color={theme.colors.info} />}
          style={{ width: (width - 60) / 2, height: 80, marginBottom: 12 }}
        />
        
        <Button
          title="Conquistas"
          onPress={() => {}}
          variant="outline"
          size="large"
          icon={<Icon name="trophy" size={32} color={theme.colors.success} />}
          style={{ width: (width - 60) / 2, height: 80, marginBottom: 12 }}
        />
      </Box>
    </Box>
  );

  const renderCategories = () => (
    <Box style={{ padding: 20, paddingBottom: 40 }}>
      <Typography variant="h3" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
        Categorias Disponíveis
      </Typography>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={{
              width: 120,
              height: 120,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16,
              backgroundColor: category.isUnlocked ? category.color : theme.colors.border,
              opacity: category.isUnlocked ? 1 : 0.5,
              elevation: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            }}
            disabled={!category.isUnlocked}
          >
            <Typography variant="h1" color="white" align="center" style={{ marginBottom: 8 }}>
              {category.icon}
            </Typography>
            <Typography variant="body" color="white" weight="semiBold" align="center" style={{ marginBottom: 4 }}>
              {category.name}
            </Typography>
            <Typography variant="caption" color="white" align="center" style={{ opacity: 0.9 }}>
              {category.learnedWords}/{category.totalWords}
            </Typography>
          </Pressable>
        ))}
      </ScrollView>
    </Box>
  );

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header com saudação */}
      <Box style={{ padding: 20, paddingTop: 10 }}>
        <Typography variant="h2" color="text" weight="bold">
          Olá, {user?.name || 'Usuário'}! 👋
        </Typography>
        <Typography variant="body" color="textSecondary">
          Continue sua jornada de aprendizado
        </Typography>
      </Box>

      {/* Cards de estatísticas */}
      <Box style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 }}>
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
      </Box>

      {/* Barra de progresso do nível */}
      <Box style={{ margin: 20, marginBottom: 20 }}>
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
      </Box>

      {/* Card de progresso geral */}
      <Box style={{ margin: 20, marginBottom: 20 }}>
        <ProgressCard
          title="Progresso Geral"
          currentValue={learnedWords}
          maxValue={totalWords}
          showPercentage={true}
          color={theme.colors.primary}
        />
      </Box>

      {/* Ações rápidas */}
      {renderQuickActions()}

      {/* Categorias disponíveis */}
      {renderCategories()}
    </ScrollView>
  );
};

export default HomeScreen;
