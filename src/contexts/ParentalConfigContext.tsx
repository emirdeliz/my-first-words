import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Default audio items configuration
const DEFAULT_AUDIO_ITEMS: AudioItem[] = [
  // Basic Needs
  { id: 'basic-hungry', categoryId: 'basic', textKey: 'hungry', text: 'Hungry', icon: 'restaurant', type: 'basic', isEnabled: true },
  { id: 'basic-thirsty', categoryId: 'basic', textKey: 'thirsty', text: 'Thirsty', icon: 'local-drink', type: 'basic', isEnabled: true },
  { id: 'basic-tired', categoryId: 'basic', textKey: 'tired', text: 'Tired', icon: 'bedtime', type: 'basic', isEnabled: true },
  { id: 'basic-bathroom', categoryId: 'basic', textKey: 'bathroom', text: 'Bathroom', icon: 'wc', type: 'basic', isEnabled: true },
  { id: 'basic-help', categoryId: 'basic', textKey: 'help', text: 'Help', icon: 'help', type: 'basic', isEnabled: true },
  { id: 'basic-break', categoryId: 'basic', textKey: 'break', text: 'Break', icon: 'pause', type: 'basic', isEnabled: true },
  
  // Emotions
  { id: 'emotions-happy', categoryId: 'emotions', textKey: 'happy', text: 'Happy', icon: 'sentiment-satisfied', type: 'emotions', isEnabled: true },
  { id: 'emotions-sad', categoryId: 'emotions', textKey: 'sad', text: 'Sad', icon: 'sentiment-dissatisfied', type: 'emotions', isEnabled: true },
  { id: 'emotions-angry', categoryId: 'emotions', textKey: 'angry', text: 'Angry', icon: 'mood-bad', type: 'emotions', isEnabled: true },
  { id: 'emotions-scared', categoryId: 'emotions', textKey: 'scared', text: 'Scared', icon: 'sentiment-very-dissatisfied', type: 'emotions', isEnabled: true },
  { id: 'emotions-excited', categoryId: 'emotions', textKey: 'excited', text: 'Excited', icon: 'sentiment-very-satisfied', type: 'emotions', isEnabled: true },
  { id: 'emotions-calm', categoryId: 'emotions', textKey: 'calm', text: 'Calm', icon: 'sentiment-neutral', type: 'emotions', isEnabled: true },
  
  // Activities
  { id: 'activities-play', categoryId: 'activities', textKey: 'play', text: 'Play', icon: 'sports-esports', type: 'activities', isEnabled: true },
  { id: 'activities-read', categoryId: 'activities', textKey: 'read', text: 'Read', icon: 'book', type: 'activities', isEnabled: true },
  { id: 'activities-music', categoryId: 'activities', textKey: 'music', text: 'Music', icon: 'music-note', type: 'activities', isEnabled: true },
  { id: 'activities-outside', categoryId: 'activities', textKey: 'outside', text: 'Outside', icon: 'park', type: 'activities', isEnabled: true },
  { id: 'activities-tv', categoryId: 'activities', textKey: 'tv', text: 'TV', icon: 'tv', type: 'activities', isEnabled: true },
  { id: 'activities-draw', categoryId: 'activities', textKey: 'draw', text: 'Draw', icon: 'brush', type: 'activities', isEnabled: true },
  
  // Social
  { id: 'social-hello', categoryId: 'social', textKey: 'hello', text: 'Hello', icon: 'handshake', type: 'social', isEnabled: true },
  { id: 'social-goodbye', categoryId: 'social', textKey: 'goodbye', text: 'Goodbye', icon: 'exit-to-app', type: 'social', isEnabled: true },
  { id: 'social-please', categoryId: 'social', textKey: 'please', text: 'Please', icon: 'favorite', type: 'social', isEnabled: true },
  { id: 'social-thankyou', categoryId: 'social', textKey: 'thankyou', text: 'Thanks', icon: 'thumb-up', type: 'social', isEnabled: true },
  { id: 'social-sorry', categoryId: 'social', textKey: 'sorry', text: 'Sorry', icon: 'sentiment-dissatisfied', type: 'social', isEnabled: true },
  { id: 'social-yes', categoryId: 'social', textKey: 'yes', text: 'Yes', icon: 'check-circle', type: 'social', isEnabled: true },
  { id: 'social-no', categoryId: 'social', textKey: 'no', text: 'No', icon: 'cancel', type: 'social', isEnabled: true },
];

const STORAGE_KEY = 'parental_config';

export const ParentalConfigProvider: React.FC<ParentalConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<ParentalConfig>({
    enabledAudioItems: DEFAULT_AUDIO_ITEMS,
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
        const mergedItems = DEFAULT_AUDIO_ITEMS.map(defaultItem => {
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
