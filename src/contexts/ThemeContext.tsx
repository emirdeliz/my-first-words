import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  // Cores principais
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Cores de fundo
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  
  // Cores de texto
  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;
  
  // Cores de interface
  surface: string;
  surfaceSecondary: string;
  border: string;
  borderSecondary: string;
  
  // Cores de estado
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Specific colors
  card: string;
  cardSecondary: string;
  shadow: string;
}

export interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Paleta de cores para tema claro
const lightColors: ThemeColors = {
  primary: '#2563eb',
  primaryLight: '#3b82f6',
  primaryDark: '#1d4ed8',
  
  background: '#f8fafc',
  backgroundSecondary: '#f1f5f9',
  backgroundTertiary: '#e2e8f0',
  
  text: '#1e293b',
  textSecondary: '#475569',
  textTertiary: '#64748b',
  textInverse: '#ffffff',
  
  surface: '#ffffff',
  surfaceSecondary: '#f8fafc',
  border: '#e2e8f0',
  borderSecondary: '#cbd5e1',
  
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  
  card: '#ffffff',
  cardSecondary: '#f8fafc',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

// Paleta de cores para tema escuro
const darkColors: ThemeColors = {
  primary: '#3b82f6',
  primaryLight: '#60a5fa',
  primaryDark: '#2563eb',
  
  background: '#0f172a',
  backgroundSecondary: '#1e293b',
  backgroundTertiary: '#334155',
  
  text: '#f8fafc',
  textSecondary: '#cbd5e1',
  textTertiary: '#94a3b8',
  textInverse: '#ffffff',
  
  surface: '#1e293b',
  surfaceSecondary: '#334155',
  border: '#475569',
  borderSecondary: '#64748b',
  
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  
  card: '#1e293b',
  cardSecondary: '#334155',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    updateTheme();
  }, [theme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setThemeState(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
    }
  };

  const updateTheme = () => {
    if (theme === 'system') {
          // Detect system preference
    // For now, we'll use a default value
      setIsDark(false);
    } else {
      setIsDark(theme === 'dark');
    }
  };

  const setTheme = async (newTheme: ThemeMode) => {
    try {
      await AsyncStorage.setItem('theme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = isDark ? 'light' : 'dark';
    await setTheme(newTheme);
  };

  const colors = isDark ? darkColors : lightColors;

  const value: ThemeContextType = {
    theme,
    colors,
    isDark,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
