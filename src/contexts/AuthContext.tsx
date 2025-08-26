import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  experience: number;
  wordsLearned: number;
  streak: number;
  lastLoginDate: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: null,
  });

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userData = await AsyncStorage.getItem('user_data');

      if (token && userData) {
        const user = JSON.parse(userData);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          token,
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Simula chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock de usuário para demonstração
      const mockUser: User = {
        id: '1',
        name: 'João Silva',
        email,
        level: 1,
        experience: 0,
        wordsLearned: 0,
        streak: 0,
        lastLoginDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

      // Salva dados no AsyncStorage
      await AsyncStorage.setItem('auth_token', mockToken);
      await AsyncStorage.setItem('user_data', JSON.stringify(mockUser));

      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        token: mockToken,
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Simula chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock de usuário para demonstração
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        level: 1,
        experience: 0,
        wordsLearned: 0,
        streak: 0,
        lastLoginDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'mock_jwt_token_' + Date.now();

      // Salva dados no AsyncStorage
      await AsyncStorage.setItem('auth_token', mockToken);
      await AsyncStorage.setItem('user_data', JSON.stringify(mockUser));

      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        token: mockToken,
      });

      return true;
    } catch (error) {
      console.error('Register error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        token: null,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<void> => {
    if (!state.user) return;

    try {
      const updatedUser = { ...state.user, ...userData };
      await AsyncStorage.setItem('user_data', JSON.stringify(updatedUser));

      setState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (userData) {
        const user = JSON.parse(userData);
        setState(prev => ({ ...prev, user }));
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
