import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Box, 
  Typography, 
  Pressable, 
  InputField, 
  Button,
  Card
} from '../ui';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { register, isLoading } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (name.length < 2) {
      Alert.alert('Erro', 'O nome deve ter pelo menos 2 caracteres');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      const success = await register(name, email, password);
      if (success) {
        Alert.alert(
          'Sucesso!',
          'Conta criada com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Main' as never),
            },
          ]
        );
      } else {
        Alert.alert('Erro', 'Não foi possível criar a conta');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar a conta');
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
        <Box style={{ alignItems: 'center', marginBottom: 40 }}>
          <Pressable 
            style={{ position: 'absolute', top: 0, left: 0, padding: 10 }} 
            onPress={handleBackToLogin}
          >
            <Icon name="arrow-left" size={24} color={theme.colors.text} />
          </Pressable>
          
          <Card style={{ width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20, backgroundColor: theme.colors.primary }} padding="large" elevation={4}>
            <Typography variant="h1" color="white" align="center">
              📚
            </Typography>
          </Card>
          
          <Typography variant="h2" color="text" weight="bold" align="center">
            Criar Conta
          </Typography>
          <Typography variant="body" color="textSecondary" align="center">
            Comece sua jornada de aprendizado
          </Typography>
        </Box>

        <Box style={{ marginBottom: 30 }}>
          <InputField
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
            leftIcon="account"
            style={{ marginBottom: 20 }}
          />

          <InputField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon="email"
            style={{ marginBottom: 20 }}
          />

          <InputField
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            leftIcon="lock"
            style={{ marginBottom: 20 }}
          />

          <InputField
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            leftIcon="lock-check"
            style={{ marginBottom: 20 }}
          />

          <Button
            title={isLoading ? "Criando conta..." : "Criar Conta"}
            onPress={handleRegister}
            loading={isLoading}
            fullWidth
            size="large"
            style={{ marginTop: 10 }}
          />
        </Box>

        <Box style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body" color="textSecondary" align="center">
            Já tem uma conta?{' '}
          </Typography>
          <Pressable onPress={handleBackToLogin}>
            <Typography variant="body" color="primary" weight="semiBold">
              Faça login
            </Typography>
          </Pressable>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
