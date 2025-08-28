import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../hooks/useLanguage';

export interface AudioItem {
  id: string;
  categoryId: string;
  textKey: string;
  text: string;
  icon: string;
  type: 'basic' | 'emotions' | 'activities' | 'social';
  isEnabled: boolean;
}

export interface ParentalConfig {
  enabledAudioItems: AudioItem[];
  isParentMode: boolean;
  lastUpdated: Date;
}

interface ParentalConfigContextType {
  config: ParentalConfig;
  toggleAudioItem: (itemId: string) => void;
  enableAllInCategory: (categoryId: string) => void;
  disableAllInCategory: (categoryId: string) => void;
  enableAllItems: () => void;
  disableAllItems: () => void;
  setParentMode: (isParent: boolean) => void;
  getEnabledItems: () => AudioItem[];
  getEnabledItemsByCategory: (categoryId: string) => AudioItem[];
  isItemEnabled: (itemId: string) => boolean;
  saveConfig: () => Promise<void>;
  loadConfig: () => Promise<void>;
}

const ParentalConfigContext = createContext<ParentalConfigContextType | undefined>(undefined);

export const useParentalConfig = () => {
  const context = useContext(ParentalConfigContext);
  if (!context) {
    throw new Error('useParentalConfig must be used within a ParentalConfigProvider');
  }
  return context;
};

interface ParentalConfigProviderProps {
  children: React.ReactNode;
}

// Default audio items configuration (without hardcoded text)
const DEFAULT_AUDIO_ITEMS_CONFIG = [
  // Basic Needs
  { id: 'basic-hungry', categoryId: 'basic', textKey: 'hungry', icon: 'restaurant', type: 'basic' as const },
  { id: 'basic-thirsty', categoryId: 'basic', textKey: 'thirsty', icon: 'local-drink', type: 'basic' as const },
  { id: 'basic-tired', categoryId: 'basic', textKey: 'tired', icon: 'bedtime', type: 'basic' as const },
  { id: 'basic-bathroom', categoryId: 'basic', textKey: 'bathroom', icon: 'wc', type: 'basic' as const },
  { id: 'basic-help', categoryId: 'basic', textKey: 'help', icon: 'help', type: 'basic' as const },
  { id: 'basic-break', categoryId: 'basic', textKey: 'break', icon: 'pause', type: 'basic' as const },
  
  // Emotions
  { id: 'emotions-happy', categoryId: 'emotions', textKey: 'happy', icon: 'sentiment-satisfied', type: 'emotions' as const },
  { id: 'emotions-sad', categoryId: 'emotions', textKey: 'sad', icon: 'sentiment-dissatisfied', type: 'emotions' as const },
  { id: 'emotions-angry', categoryId: 'emotions', textKey: 'angry', icon: 'mood-bad', type: 'emotions' as const },
  { id: 'emotions-scared', categoryId: 'emotions', textKey: 'scared', icon: 'sentiment-very-dissatisfied', type: 'emotions' as const },
  { id: 'emotions-excited', categoryId: 'emotions', textKey: 'excited', icon: 'sentiment-very-satisfied', type: 'emotions' as const },
  { id: 'emotions-calm', categoryId: 'emotions', textKey: 'calm', icon: 'sentiment-neutral', type: 'emotions' as const },
  
  // Activities
  { id: 'activities-play', categoryId: 'activities', textKey: 'play', icon: 'sports-esports', type: 'activities' as const },
  { id: 'activities-read', categoryId: 'activities', textKey: 'read', icon: 'book', type: 'activities' as const },
  { id: 'activities-music', categoryId: 'activities', textKey: 'music', icon: 'music-note', type: 'activities' as const },
  { id: 'activities-outside', categoryId: 'activities', textKey: 'outside', icon: 'park', type: 'activities' as const },
  { id: 'activities-tv', categoryId: 'activities', textKey: 'tv', icon: 'tv', type: 'activities' as const },
  { id: 'activities-draw', categoryId: 'activities', textKey: 'draw', icon: 'brush', type: 'activities' as const },
  
  // Social
  { id: 'social-hello', categoryId: 'social', textKey: 'hello', icon: 'handshake', type: 'social' as const },
  { id: 'social-goodbye', categoryId: 'social', textKey: 'goodbye', icon: 'exit-to-app', type: 'social' as const },
  { id: 'social-please', categoryId: 'social', textKey: 'please', icon: 'favorite', type: 'social' as const },
  { id: 'social-thankyou', categoryId: 'social', textKey: 'thankyou', icon: 'thumb-up', type: 'social' as const },
  { id: 'social-sorry', categoryId: 'social', textKey: 'sorry', icon: 'sentiment-dissatisfied', type: 'social' as const },
  { id: 'social-yes', categoryId: 'social', textKey: 'yes', icon: 'check-circle', type: 'social' as const },
  { id: 'social-no', categoryId: 'social', textKey: 'no', icon: 'cancel', type: 'social' as const },
];

const STORAGE_KEY = 'parental_config';

export const ParentalConfigProvider: React.FC<ParentalConfigProviderProps> = ({ children }) => {
  const { translation } = useLanguage();
  
  // Function to create audio items with translated text
  const createTranslatedAudioItems = (): AudioItem[] => {
    return DEFAULT_AUDIO_ITEMS_CONFIG.map(item => {
      let translatedText = '';
      
      // Get translated text based on category and textKey
      if (item.categoryId === 'basic') {
        translatedText = (translation.basicNeeds as any)[item.textKey] || item.textKey;
      } else if (item.categoryId === 'emotions') {
        translatedText = (translation.emotions as any)[item.textKey] || item.textKey;
      } else if (item.categoryId === 'activities') {
        translatedText = (translation.activities as any)[item.textKey] || item.textKey;
      } else if (item.categoryId === 'social') {
        translatedText = (translation.social as any)[item.textKey] || item.textKey;
      }
      
      return {
        ...item,
        text: translatedText,
        isEnabled: true,
      };
    });
  };

  const [config, setConfig] = useState<ParentalConfig>({
    enabledAudioItems: createTranslatedAudioItems(),
    isParentMode: false,
    lastUpdated: new Date(),
  });

  // Load configuration from storage
  const loadConfig = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedConfig = JSON.parse(stored);
        // Ensure all items exist (in case new items were added)
        const mergedItems = createTranslatedAudioItems().map(defaultItem => {
          const storedItem = parsedConfig.enabledAudioItems.find(
            (item: AudioItem) => item.id === defaultItem.id
          );
          return storedItem || { ...defaultItem, isEnabled: true };
        });
        
        setConfig({
          ...parsedConfig,
          enabledAudioItems: mergedItems,
          lastUpdated: new Date(parsedConfig.lastUpdated),
        });
      }
    } catch (error) {
      console.error('Error loading parental config:', error);
    }
  };

  // Save configuration to storage
  const saveConfig = async () => {
    try {
      const configToSave = {
        ...config,
        lastUpdated: new Date(),
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(configToSave));
      setConfig(configToSave);
    } catch (error) {
      console.error('Error saving parental config:', error);
    }
  };

  // Toggle individual audio item
  const toggleAudioItem = (itemId: string) => {
    setConfig(prev => ({
      ...prev,
      enabledAudioItems: prev.enabledAudioItems.map(item =>
        item.id === itemId ? { ...item, isEnabled: !item.isEnabled } : item
      ),
    }));
  };

  // Enable all items in a category
  const enableAllInCategory = (categoryId: string) => {
    setConfig(prev => ({
      ...prev,
      enabledAudioItems: prev.enabledAudioItems.map(item =>
        item.categoryId === categoryId ? { ...item, isEnabled: true } : item
      ),
    }));
  };

  // Disable all items in a category
  const disableAllInCategory = (categoryId: string) => {
    setConfig(prev => ({
      ...prev,
      enabledAudioItems: prev.enabledAudioItems.map(item =>
        item.categoryId === categoryId ? { ...item, isEnabled: false } : item
      ),
    }));
  };

  // Enable all items
  const enableAllItems = () => {
    setConfig(prev => ({
      ...prev,
      enabledAudioItems: prev.enabledAudioItems.map(item => ({ ...item, isEnabled: true })),
    }));
  };

  // Disable all items
  const disableAllItems = () => {
    setConfig(prev => ({
      ...prev,
      enabledAudioItems: prev.enabledAudioItems.map(item => ({ ...item, isEnabled: false })),
    }));
  };

  // Set parent mode
  const setParentMode = (isParent: boolean) => {
    setConfig(prev => ({ ...prev, isParentMode: isParent }));
  };

  // Get all enabled items
  const getEnabledItems = () => {
    return config.enabledAudioItems.filter(item => item.isEnabled);
  };

  // Get enabled items by category
  const getEnabledItemsByCategory = (categoryId: string) => {
    return config.enabledAudioItems.filter(item => item.categoryId === categoryId && item.isEnabled);
  };

  // Check if specific item is enabled
  const isItemEnabled = (itemId: string) => {
    const item = config.enabledAudioItems.find(item => item.id === itemId);
    return item?.isEnabled || false;
  };

  // Load config on mount
  useEffect(() => {
    loadConfig();
  }, []);

  // Update translations when language changes
  useEffect(() => {
    setConfig(prev => ({
      ...prev,
      enabledAudioItems: prev.enabledAudioItems.map(item => {
        const updatedConfig = createTranslatedAudioItems();
        const updatedItem = updatedConfig.find(updated => updated.id === item.id);
        return updatedItem ? { ...updatedItem, isEnabled: item.isEnabled } : item;
      }),
    }));
  }, [translation]);

  // Save config whenever it changes
  useEffect(() => {
    saveConfig();
  }, [config.enabledAudioItems]);

  const value: ParentalConfigContextType = {
    config,
    toggleAudioItem,
    enableAllInCategory,
    disableAllInCategory,
    enableAllItems,
    disableAllItems,
    setParentMode,
    getEnabledItems,
    getEnabledItemsByCategory,
    isItemEnabled,
    saveConfig,
    loadConfig,
  };

  return (
    <ParentalConfigContext.Provider value={value}>
      {children}
    </ParentalConfigContext.Provider>
  );
};
