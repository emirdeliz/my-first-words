import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Word {
  id: string;
  word: string;
  translation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  pronunciation: string;
  example: string;
  imageUrl?: string;
  audioUrl?: string;
  isLearned: boolean;
  timesReviewed: number;
  lastReviewed?: string;
  nextReview?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  totalWords: number;
  learnedWords: number;
  isUnlocked: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  words: Word[];
  isCompleted: boolean;
  score: number;
  maxScore: number;
  completedAt?: string;
}

export interface ProgressState {
  words: Word[];
  categories: Category[];
  lessons: Lesson[];
  currentStreak: number;
  totalExperience: number;
  level: number;
  isLoading: boolean;
}

interface ProgressContextType extends ProgressState {
  addWord: (word: Word) => Promise<void>;
  markWordAsLearned: (wordId: string) => Promise<void>;
  updateWordProgress: (wordId: string, progress: Partial<Word>) => Promise<void>;
  completeLesson: (lessonId: string, score: number) => Promise<void>;
  unlockCategory: (categoryId: string) => Promise<void>;
  addExperience: (amount: number) => Promise<void>;
  resetProgress: () => Promise<void>;
  loadProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

interface ProgressProviderProps {
  children: React.ReactNode;
}

export const ProgressProvider: React.FC<ProgressProviderProps> = ({ children }) => {
  const [state, setState] = useState<ProgressState>({
    words: [],
    categories: [],
    lessons: [],
    currentStreak: 0,
    totalExperience: 0,
    level: 1,
    isLoading: true,
  });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Carrega dados salvos
      const savedProgress = await AsyncStorage.getItem('user_progress');
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        setState(prev => ({ ...prev, ...progress, isLoading: false }));
      } else {
        // Inicializa com dados padrão
        await initializeDefaultData();
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const initializeDefaultData = async (): Promise<void> => {
    const defaultCategories: Category[] = [
      {
        id: '1',
        name: 'Cores',
        description: 'Aprenda as cores básicas',
        icon: '🎨',
        color: '#FF6B6B',
        totalWords: 10,
        learnedWords: 0,
        isUnlocked: true,
      },
      {
        id: '2',
        name: 'Números',
        description: 'Conte de 1 a 10',
        icon: '🔢',
        color: '#4ECDC4',
        totalWords: 10,
        learnedWords: 0,
        isUnlocked: false,
      },
      {
        id: '3',
        name: 'Animais',
        description: 'Conheça os animais',
        icon: '🐾',
        color: '#45B7D1',
        totalWords: 15,
        learnedWords: 0,
        isUnlocked: false,
      },
    ];

    const defaultWords: Word[] = [
      {
        id: '1',
        word: 'Vermelho',
        translation: 'Red',
        category: '1',
        difficulty: 'easy',
        pronunciation: 'ver-me-lho',
        example: 'A maçã é vermelha',
        isLearned: false,
        timesReviewed: 0,
      },
      {
        id: '2',
        word: 'Azul',
        translation: 'Blue',
        category: '1',
        difficulty: 'easy',
        pronunciation: 'a-zul',
        example: 'O céu é azul',
        isLearned: false,
        timesReviewed: 0,
      },
      {
        id: '3',
        word: 'Verde',
        translation: 'Green',
        category: '1',
        difficulty: 'easy',
        pronunciation: 'ver-de',
        example: 'A grama é verde',
        isLearned: false,
        timesReviewed: 0,
      },
    ];

    const defaultLessons: Lesson[] = [
      {
        id: '1',
        title: 'Lição 1: Cores Básicas',
        description: 'Aprenda as cores principais',
        categoryId: '1',
        words: defaultWords.slice(0, 3),
        isCompleted: false,
        score: 0,
        maxScore: 30,
      },
    ];

    const defaultProgress: ProgressState = {
      words: defaultWords,
      categories: defaultCategories,
      lessons: defaultLessons,
      currentStreak: 0,
      totalExperience: 0,
      level: 1,
      isLoading: false,
    };

    setState(defaultProgress);
    await saveProgress(defaultProgress);
  };

  const saveProgress = async (progress: ProgressState): Promise<void> => {
    try {
      await AsyncStorage.setItem('user_progress', JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const addWord = async (word: Word): Promise<void> => {
    const newWords = [...state.words, word];
    const newState = { ...state, words: newWords };
    setState(newState);
    await saveProgress(newState);
  };

  const markWordAsLearned = async (wordId: string): Promise<void> => {
    const updatedWords = state.words.map(word =>
      word.id === wordId ? { ...word, isLearned: true } : word
    );
    const newState = { ...state, words: updatedWords };
    setState(newState);
    await saveProgress(newState);
  };

  const updateWordProgress = async (wordId: string, progress: Partial<Word>): Promise<void> => {
    const updatedWords = state.words.map(word =>
      word.id === wordId ? { ...word, ...progress } : word
    );
    const newState = { ...state, words: updatedWords };
    setState(newState);
    await saveProgress(newState);
  };

  const completeLesson = async (lessonId: string, score: number): Promise<void> => {
    const updatedLessons = state.lessons.map(lesson =>
      lesson.id === lessonId
        ? { ...lesson, isCompleted: true, score, completedAt: new Date().toISOString() }
        : lesson
    );
    const newState = { ...state, lessons: updatedLessons };
    setState(newState);
    await saveProgress(newState);
  };

  const unlockCategory = async (categoryId: string): Promise<void> => {
    const updatedCategories = state.categories.map(category =>
      category.id === categoryId ? { ...category, isUnlocked: true } : category
    );
    const newState = { ...state, categories: updatedCategories };
    setState(newState);
    await saveProgress(newState);
  };

  const addExperience = async (amount: number): Promise<void> => {
    const newExperience = state.totalExperience + amount;
    const newLevel = Math.floor(newExperience / 100) + 1;
    const newState = { ...state, totalExperience: newExperience, level: newLevel };
    setState(newState);
    await saveProgress(newState);
  };

  const resetProgress = async (): Promise<void> => {
    await AsyncStorage.removeItem('user_progress');
    await initializeDefaultData();
  };

  return (
    <ProgressContext.Provider
      value={{
        ...state,
        addWord,
        markWordAsLearned,
        updateWordProgress,
        completeLesson,
        unlockCategory,
        addExperience,
        resetProgress,
        loadProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
