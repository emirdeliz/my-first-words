import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme, isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { level, totalExperience, currentStreak, words } = useAuth();

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
            navigation.replace('Login');
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
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem, { backgroundColor: theme.colors.surface }]}
      onPress={item.onPress}
      disabled={item.showSwitch}
    >
      <View style={styles.menuItemLeft}>
        <Icon name={item.icon} size={24} color={theme.colors.primary} style={styles.menuIcon} />
        <Text style={[styles.menuTitle, { color: theme.colors.text }]}>
          {item.title}
        </Text>
      </View>
      
      <View style={styles.menuItemRight}>
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
      </View>
    </TouchableOpacity>
  );

  const totalWords = words.length;
  const learnedWords = words.filter(w => w.isLearned).length;
  const progressPercentage = totalWords > 0 ? (learnedWords / totalWords) * 100 : 0;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              {user?.name || 'Usuário'}
            </Text>
            <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]}>
              {user?.email || 'usuario@exemplo.com'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Estatísticas
        </Text>
        
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Icon name="star" size={24} color={theme.colors.warning} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              Nível {level}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Nível Atual
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Icon name="lightning-bolt" size={24} color={theme.colors.secondary} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {totalExperience}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Experiência
            </Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Icon name="fire" size={24} color={theme.colors.error} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {currentStreak}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Dias Sequência
            </Text>
          </View>
        </View>

        <View style={[styles.progressCard, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.progressTitle, { color: theme.colors.text }]}>
            Progresso Geral
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressPercentage}%`,
                  backgroundColor: theme.colors.primary,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>
            {learnedWords} de {totalWords} palavras aprendidas ({progressPercentage.toFixed(1)}%)
          </Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Configurações
        </Text>
        {menuItems.map(renderMenuItem)}
      </View>

      <View style={styles.logoutSection}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          onPress={handleLogout}
        >
          <Icon name="logout" size={20} color="white" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
  },
  statsSection: {
    padding: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  progressCard: {
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E9ECEF',
    borderRadius: 6,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
  menuSection: {
    padding: 20,
    paddingBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuItemRight: {
    alignItems: 'center',
  },
  logoutSection: {
    padding: 20,
    paddingBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileScreen;
