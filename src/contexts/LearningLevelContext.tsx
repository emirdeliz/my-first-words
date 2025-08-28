import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LearningLevel = 1 | 2 | 3;

export interface LearningLevelContextType {
  currentLevel: LearningLevel;
  setLearningLevel: (level: LearningLevel) => Promise<void>;
  getLevelDescription: (level: LearningLevel) => string;
  getLevelFeatures: (level: LearningLevel) => string[];
}

const LearningLevelContext = createContext<LearningLevelContextType | undefined>(undefined);

export const useLearningLevel = () => {
  const context = useContext(LearningLevelContext);
  if (!context) {
    throw new Error('useLearningLevel must be used within a LearningLevelProvider');
  }
  return context;
};

interface LearningLevelProviderProps {
  children: React.ReactNode;
}

export const LearningLevelProvider: React.FC<LearningLevelProviderProps> = ({ children }) => {
  const [currentLevel, setCurrentLevel] = useState<LearningLevel>(1);

  useEffect(() => {
    loadLearningLevel();
  }, []);

  const loadLearningLevel = async () => {
    try {
      const savedLevel = await AsyncStorage.getItem('learningLevel');
      if (savedLevel) {
        setCurrentLevel(parseInt(savedLevel) as LearningLevel);
      }
    } catch (error) {
      console.error('Error loading learning level:', error);
    }
  };

  const setLearningLevel = async (level: LearningLevel) => {
    try {
      await AsyncStorage.setItem('learningLevel', level.toString());
      setCurrentLevel(level);
    } catch (error) {
      console.error('Error saving learning level:', error);
    }
  };

  const getLevelDescription = (level: LearningLevel): string => {
    switch (level) {
      case 1:
        return 'Nível Básico - Apenas sons de palavras';
      case 2:
        return 'Nível Intermediário - Sons de palavras e frases simples';
      case 3:
        return 'Nível Avançado - Sons de palavras e frases completas';
      default:
        return 'Nível não definido';
    }
  };

  const getLevelFeatures = (level: LearningLevel): string[] => {
    switch (level) {
      case 1:
        return [
          'Sons de palavras individuais',
          'Pronúncia clara e lenta',
          'Foco na compreensão básica'
        ];
      case 2:
        return [
          'Sons de palavras individuais',
          'Frases simples (2-3 palavras)',
          'Velocidade moderada',
          'Contexto básico'
        ];
      case 3:
        return [
          'Sons de palavras individuais',
          'Frases completas e complexas',
          'Velocidade natural',
          'Contexto rico e variado',
          'Expressões idiomáticas'
        ];
      default:
        return [];
    }
  };

  const value: LearningLevelContextType = {
    currentLevel,
    setLearningLevel,
    getLevelDescription,
    getLevelFeatures,
  };

  return (
    <LearningLevelContext.Provider value={value}>
      {children}
    </LearningLevelContext.Provider>
  );
};
