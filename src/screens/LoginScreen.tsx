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
  FormField, 
  Button, 
  Typography, 
  Card,
  Box
} from '../ui';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        navigation.navigate('Main' as never);
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register' as never);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
        <Box style={{ alignItems: 'center', marginBottom: 40 }}>
          <Card style={{ width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }} padding="large" elevation={4}>
            <Typography variant="h1" color="primary" align="center">
              📚
            </Typography>
          </Card>
          
          <Typography variant="h2" color="text" weight="bold" align="center">
            My First Words
          </Typography>
          <Typography variant="body" color="textSecondary" align="center">
            Faça login para continuar aprendendo
          </Typography>
        </Box>

        <Box style={{ marginBottom: 30 }}>
          <FormField
            label="Email"
            placeholder="Digite seu email"
            value={email}
            onChangeText={setEmail}
            leftIcon="email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            required
          />

          <FormField
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            leftIcon="lock"
            secureTextEntry
            required
          />

          <Button
            title="Entrar"
            onPress={handleLogin}
            loading={isLoading}
            fullWidth
            size="large"
            style={{ marginTop: 10 }}
          />

          <Button
            title="Esqueceu sua senha?"
            onPress={() => {}}
            variant="ghost"
            size="medium"
            style={{ marginTop: 20 }}
          />
        </Box>

        <Box style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body" color="textSecondary" align="center">
            Não tem uma conta?{' '}
          </Typography>
          <Button
            title="Cadastre-se"
            onPress={handleRegister}
            variant="ghost"
            size="medium"
          />
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
