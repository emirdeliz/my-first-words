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
          <Box mb={2}>
            <Typography variant="h1" color="white" align="center">
              Olá, {user?.name || 'Usuário'}! 👋
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body" color="white" weight="semiBold" align="center">
              Bem-vindo de volta ao My First Words
            </Typography>
          </Box>
          <Box opacity90>
            <Typography variant="caption" color="white" align="center">
              Continue sua jornada de aprendizado
            </Typography>
          </Box>
        </Box>

        {/* Quick Actions */}
        <Box px py={4}>
          <Box mb={4}>
            <Typography variant="h2" color="text" weight="semiBold">
              Ações Rápidas
            </Typography>
          </Box>
          <Box flexRow justifyBetween>
            {quickActions.map((action, index) => (
              <Pressable
                key={index}
                onPress={action.onPress}
                bgWhite
                p={4}
                roundedLg
                itemsCenter
                shadow
                elevation3
                style={{
                  flex: 1,
                  marginHorizontal: index === 1 ? 8 : 0,
                }}
              >
                <Box
                  w={12}
                  h={12}
                  roundedFull
                  justifyCenter
                  itemsCenter
                  mb={3}
                  style={{
                    backgroundColor: action.color + '20',
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
          <Box mb={4}>
            <Typography variant="h2" color="text" weight="semiBold">
              Suas Estatísticas
            </Typography>
          </Box>
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
          <Box mb={4}>
            <Typography variant="h2" color="text" weight="semiBold">
              Atividade Recente
            </Typography>
          </Box>
          <Card style={{ padding: 16 }}>
            <Box flexRow itemsCenter>
              <Box
                w={10}
                h={10}
                roundedFull
                justifyCenter
                itemsCenter
                mr={3}
                style={{
                  backgroundColor: '#007AFF20',
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
