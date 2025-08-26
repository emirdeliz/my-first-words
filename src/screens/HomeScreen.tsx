import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import {
  Box,
  Typography,
  Pressable,
  Button,
  Card,
  StatCard,
  ProgressCard,
  Icon,
} from '../ui';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { level, totalExperience, currentStreak, words } = useProgress();

  const quickActions = [
    {
      title: 'Aprender',
      icon: 'book-open-variant',
      color: '#007AFF',
      onPress: () => navigation.navigate('Learn' as never),
    },
    {
      title: 'Praticar',
      icon: 'gamepad-variant',
      color: '#34C759',
      onPress: () => navigation.navigate('Practice' as never),
    },
    {
      title: 'Perfil',
      icon: 'account',
      color: '#FF9500',
      onPress: () => navigation.navigate('Profile' as never),
    },
  ];

  const stats = [
    {
      icon: 'star',
      value: level,
      label: 'Nível',
      color: '#FFD700',
    },
    {
      icon: 'lightning-bolt',
      value: currentStreak,
      label: 'Sequência',
      color: '#FF6B6B',
    },
    {
      icon: 'bookmark',
      value: words.filter((w: any) => w.isLearned).length,
      label: 'Aprendidas',
      color: '#4ECDC4',
    },
  ];

  return (
    <Box flex bgGray>
      <ScrollView>
        {/* Header */}
        <Box bgPrimary px py={6} style={{ paddingTop: 60 }}>
          <Typography variant="h1" color="white" align="center" style={{ marginBottom: 8 }}>
            Olá, {user?.name || 'Usuário'}! 👋
          </Typography>
          <Typography variant="body" color="white" weight="semiBold" align="center" style={{ marginBottom: 4 }}>
            Bem-vindo de volta ao My First Words
          </Typography>
          <Typography variant="caption" color="white" align="center" style={{ opacity: 0.9 }}>
            Continue sua jornada de aprendizado
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Box px py={4}>
          <Typography variant="h2" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
            Ações Rápidas
          </Typography>
          <Box flexRow justifyBetween>
            {quickActions.map((action, index) => (
              <Pressable
                key={index}
                onPress={action.onPress}
                bgWhite
                style={{
                  flex: 1,
                  padding: 16,
                  borderRadius: 12,
                  alignItems: 'center',
                  marginHorizontal: index === 1 ? 8 : 0,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Box
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: action.color + '20',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <Icon materialCommunityName={action.icon} size={24} color={action.color} />
                </Box>
                <Typography variant="body" color="text" weight="medium" align="center">
                  {action.title}
                </Typography>
              </Pressable>
            ))}
          </Box>
        </Box>

        {/* Progress Card */}
        <Box px py={2}>
          <ProgressCard
            title="Progresso Geral"
            currentValue={totalExperience}
            maxValue={1000}
            color="#007AFF"
            size="large"
          />
        </Box>

        {/* Stats */}
        <Box px py={4}>
          <Typography variant="h2" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
            Suas Estatísticas
          </Typography>
          <Box flexRow justifyBetween>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                color={stat.color}
                style={{ flex: 1, marginHorizontal: index === 1 ? 8 : 0 }}
              />
            ))}
          </Box>
        </Box>

        {/* Recent Activity */}
        <Box px py={4} style={{ paddingBottom: 32 }}>
          <Typography variant="h2" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
            Atividade Recente
          </Typography>
          <Card style={{ padding: 16 }}>
            <Box flexRow itemsCenter>
              <Box
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: '#007AFF20',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                }}
              >
                <Icon materialCommunityName="trophy" size={20} color="#007AFF" />
              </Box>
              <Box flex>
                <Typography variant="body" color="text" weight="semiBold">
                  Novo nível alcançado!
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Parabéns! Você chegou ao nível {level}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default HomeScreen;
