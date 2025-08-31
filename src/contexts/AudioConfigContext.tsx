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
  rate: 0.3, // Extremely slow default rate for maximum clarity
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
      console.log('🔊 Raw saved config:', savedConfig);
      
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        console.log('🔊 Parsed config:', parsedConfig);
        setAudioConfig({
          ...parsedConfig,
          lastUpdated: new Date(parsedConfig.lastUpdated),
        });
        console.log('✅ Audio config loaded successfully');
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
    console.log('🎤 AudioConfigContext - Previous config:', audioConfig);
    await saveAudioConfig({ selectedVoice: voiceId });
    console.log('🎤 AudioConfigContext - Voice updated, new config:', audioConfig);
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
