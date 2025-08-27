import React, { createContext, ReactNode, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGES, TRANSLATIONS, Language, Translation } from '../constants/Languages';

const LANGUAGE_STORAGE_KEY = 'aac_selected_language';

interface LanguageContextType {
  currentLanguage: Language;
  translation: Translation;
  availableLanguages: Language[];
  changeLanguage: (languageCode: string) => Promise<void>;
  loading: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[0]);
  const [translation, setTranslation] = useState<Translation>(TRANSLATIONS.en);
  const [loading, setLoading] = useState(true);

  // Load saved language on app start
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      console.log('🔄 Loading saved language...');
      const savedLanguageCode = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      console.log('💾 Saved language code:', savedLanguageCode);
      
      if (savedLanguageCode) {
        const language = LANGUAGES.find(lang => lang.code === savedLanguageCode);
        if (language && TRANSLATIONS[language.code]) {
          console.log('✅ Restored language:', language.name);
          setCurrentLanguage(language);
          setTranslation(TRANSLATIONS[language.code]);
        } else {
          console.log('⚠️ Invalid saved language, using default');
        }
      } else {
        console.log('📝 No saved language, using default');
      }
    } catch (error) {
      console.error('❌ Error loading saved language:', error);
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = async (languageCode: string) => {
    try {
      console.log('🌍 Changing language to:', languageCode);
      const language = LANGUAGES.find(lang => lang.code === languageCode);
      
      if (language && TRANSLATIONS[languageCode]) {
        setCurrentLanguage(language);
        setTranslation(TRANSLATIONS[languageCode]);
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
        console.log('✅ Language changed and saved:', language.name);
      } else {
        console.error('❌ Invalid language code:', languageCode);
      }
    } catch (error) {
      console.error('❌ Error saving language preference:', error);
    }
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    translation,
    availableLanguages: LANGUAGES,
    changeLanguage,
    loading,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}