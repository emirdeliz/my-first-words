import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AudioConfig {
  selectedVoice: string;
  pitch: number;
  rate: number;
  lastUpdated: Date;
}

interface AudioConfigContextType {
  audioConfig: AudioConfig;
  setSelectedVoice: (voiceId: string) => Promise<void>;
  setPitch: (pitch: number) => Promise<void>;
  setRate: (rate: number) => Promise<void>;
  loadAudioConfig: () => Promise<void>;
}

const AUDIO_CONFIG_STORAGE_KEY = '@my_first_words:audio_config';

const defaultAudioConfig: AudioConfig = {
  selectedVoice: '',
  pitch: 1.0,
  rate: 0.9,
  lastUpdated: new Date(),
};

const AudioConfigContext = createContext<AudioConfigContextType | undefined>(undefined);

export function AudioConfigProvider({ children }: { children: ReactNode }) {
  const [audioConfig, setAudioConfig] = useState<AudioConfig>(defaultAudioConfig);

  // Load saved audio config on app start
  useEffect(() => {
    loadAudioConfig();
  }, []);

  const loadAudioConfig = async () => {
    try {
      console.log('🔊 Loading saved audio config...');
      const savedConfig = await AsyncStorage.getItem(AUDIO_CONFIG_STORAGE_KEY);
      
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        setAudioConfig({
          ...parsedConfig,
          lastUpdated: new Date(parsedConfig.lastUpdated),
        });
        console.log('✅ Audio config loaded:', parsedConfig);
      } else {
        console.log('📝 No saved audio config, using defaults');
      }
    } catch (error) {
      console.error('❌ Error loading audio config:', error);
    }
  };

  const saveAudioConfig = async (newConfig: Partial<AudioConfig>) => {
    try {
      const configToSave = {
        ...audioConfig,
        ...newConfig,
        lastUpdated: new Date(),
      };
      
      console.log('💾 AudioConfigContext - Saving config:', configToSave);
      await AsyncStorage.setItem(AUDIO_CONFIG_STORAGE_KEY, JSON.stringify(configToSave));
      setAudioConfig(configToSave);
      console.log('💾 Audio config saved successfully');
    } catch (error) {
      console.error('❌ Error saving audio config:', error);
    }
  };

  const setSelectedVoice = async (voiceId: string) => {
    console.log('🎤 AudioConfigContext - Setting selected voice:', voiceId);
    await saveAudioConfig({ selectedVoice: voiceId });
  };

  const setPitch = async (pitch: number) => {
    await saveAudioConfig({ pitch });
  };

  const setRate = async (rate: number) => {
    await saveAudioConfig({ rate });
  };

  const contextValue: AudioConfigContextType = {
    audioConfig,
    setSelectedVoice,
    setPitch,
    setRate,
    loadAudioConfig,
  };

  return (
    <AudioConfigContext.Provider value={contextValue}>
      {children}
    </AudioConfigContext.Provider>
  );
}

export function useAudioConfig() {
  const context = useContext(AudioConfigContext);
  if (context === undefined) {
    throw new Error('useAudioConfig must be used within an AudioConfigProvider');
  }
  return context;
}
