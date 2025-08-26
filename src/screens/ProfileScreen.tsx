import React from 'react';
import {
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { Box, Typography, Pressable, Card } from '../ui';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme, isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { level, totalExperience, currentStreak, words } = useProgress();

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.navigate('Login' as never);
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    // Implementar edição de perfil
    console.log('Editar perfil');
  };

  const handleNotifications = () => {
    // Implementar configurações de notificação
    console.log('Configurar notificações');
  };

  const handlePrivacy = () => {
    // Implementar configurações de privacidade
    console.log('Configurar privacidade');
  };

  const handleHelp = () => {
    // Implementar tela de ajuda
    console.log('Abrir ajuda');
  };

  const handleAbout = () => {
    // Implementar tela sobre
    console.log('Abrir sobre');
  };

  const menuItems = [
    {
      id: 'edit',
      title: 'Editar Perfil',
      icon: 'account-edit',
      onPress: handleEditProfile,
      showArrow: true,
    },
    {
      id: 'notifications',
      title: 'Notificações',
      icon: 'bell',
      onPress: handleNotifications,
      showArrow: true,
    },
    {
      id: 'privacy',
      title: 'Privacidade',
      icon: 'shield',
      onPress: handlePrivacy,
      showArrow: true,
    },
    {
      id: 'help',
      title: 'Ajuda e Suporte',
      icon: 'help-circle',
      onPress: handleHelp,
      showArrow: true,
    },
    {
      id: 'about',
      title: 'Sobre o App',
      icon: 'information',
      onPress: handleAbout,
      showArrow: true,
    },
    {
      id: 'theme',
      title: 'Tema Escuro',
      icon: 'theme-light-dark',
      onPress: toggleTheme,
      showSwitch: true,
      switchValue: isDark,
    },
  ];

  const renderMenuItem = (item: any) => (
    <Pressable
      key={item.id}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: 8,
        borderRadius: 12,
        backgroundColor: theme.colors.surface,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      onPress={item.onPress}
      disabled={item.showSwitch}
    >
      <Box style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Icon name={item.icon} size={24} color={theme.colors.primary} style={{ marginRight: 16 }} />
        <Typography variant="body" color="text" weight="medium">
          {item.title}
        </Typography>
      </Box>
      
      <Box style={{ alignItems: 'center' }}>
        {item.showSwitch && (
          <Switch
            value={item.switchValue}
            onValueChange={item.onPress}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={theme.colors.background}
          />
        )}
        {item.showArrow && (
          <Icon name="chevron-right" size={20} color={theme.colors.textSecondary} />
        )}
      </Box>
    </Pressable>
  );

  const totalWords = words.length;
  const learnedWords = words.filter((w: any) => w.isLearned).length;
  const progressPercentage = totalWords > 0 ? (learnedWords / totalWords) * 100 : 0;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      showsVerticalScrollIndicator={false}
    >
      <Box style={{ padding: 20, paddingBottom: 10 }}>
        <Card style={{ flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 16 }} elevation={3}>
          <Box style={{ width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginRight: 20, backgroundColor: theme.colors.primary }}>
            <Typography variant="h1" color="white" weight="bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Typography>
          </Box>
          
          <Box style={{ flex: 1 }}>
            <Typography variant="h2" color="text" weight="bold" style={{ marginBottom: 4 }}>
              {user?.name || 'Usuário'}
            </Typography>
            <Typography variant="body" color="textSecondary">
              {user?.email || 'usuario@exemplo.com'}
            </Typography>
          </Box>
        </Card>
      </Box>

      <Box style={{ padding: 20, paddingBottom: 10 }}>
        <Typography variant="h3" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
          Estatísticas
        </Typography>
        
        <Box style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <Card style={{ flex: 1, alignItems: 'center', padding: 16, marginHorizontal: 4, borderRadius: 12 }} elevation={2}>
            <Icon name="star" size={24} color={theme.colors.warning} />
            <Typography variant="body" color="text" weight="bold" style={{ marginTop: 8, marginBottom: 4 }}>
              Nível {level}
            </Typography>
            <Typography variant="caption" color="textSecondary" align="center">
              Nível Atual
            </Typography>
          </Card>

          <Card style={{ flex: 1, alignItems: 'center', padding: 16, marginHorizontal: 4, borderRadius: 12 }} elevation={2}>
            <Icon name="lightning-bolt" size={24} color={theme.colors.secondary} />
            <Typography variant="body" color="text" weight="bold" style={{ marginTop: 8, marginBottom: 4 }}>
              {totalExperience}
            </Typography>
            <Typography variant="caption" color="textSecondary" align="center">
              Experiência
            </Typography>
          </Card>

          <Card style={{ flex: 1, alignItems: 'center', padding: 16, marginHorizontal: 4, borderRadius: 12 }} elevation={2}>
            <Icon name="fire" size={24} color={theme.colors.error} />
            <Typography variant="body" color="text" weight="bold" style={{ marginTop: 8, marginBottom: 4 }}>
              {currentStreak}
            </Typography>
            <Typography variant="caption" color="textSecondary" align="center">
              Dias Sequência
            </Typography>
          </Card>
        </Box>

        <Card style={{ borderRadius: 12, padding: 20 }} elevation={2}>
          <Typography variant="h3" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
            Progresso Geral
          </Typography>
          <Box style={{ height: 12, backgroundColor: '#E9ECEF', borderRadius: 6, marginBottom: 12, overflow: 'hidden' }}>
            <Box
              style={{
                width: `${progressPercentage}%`,
                height: '100%',
                borderRadius: 6,
                backgroundColor: theme.colors.primary,
              }}
            />
          </Box>
          <Typography variant="body" color="textSecondary" align="center">
            {learnedWords} de {totalWords} palavras aprendidas ({progressPercentage.toFixed(1)}%)
          </Typography>
        </Card>
      </Box>

      <Box style={{ padding: 20, paddingBottom: 10 }}>
        <Typography variant="h3" color="text" weight="semiBold" style={{ marginBottom: 16 }}>
          Configurações
        </Typography>
        {menuItems.map(renderMenuItem)}
      </Box>

      <Box style={{ padding: 20, paddingBottom: 40 }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 16,
            borderRadius: 12,
            backgroundColor: theme.colors.error,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
          onPress={handleLogout}
        >
          <Icon name="logout" size={20} color="white" style={{ marginRight: 8 }} />
          <Typography variant="body" color="white" weight="semiBold">
            Sair da Conta
          </Typography>
        </Pressable>
      </Box>
    </ScrollView>
  );
};

export default ProfileScreen;
