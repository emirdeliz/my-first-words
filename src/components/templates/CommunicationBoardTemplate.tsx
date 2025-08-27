import React, { useState } from 'react';
import AppHeader from '../organisms/AppHeader';
import CategoryGrid from '../organisms/CategoryGrid';
import CommunicationGrid from '../organisms/CommunicationGrid';
import { SpeechService } from '../../services/speechService';
import { useLanguage } from '../../hooks/useLanguage';

interface CommunicationItem {
  id: string;
  textKey: string;
  icon: keyof typeof import('@expo/vector-icons/MaterialIcons').default.glyphMap;
  type: 'primary' | 'secondary' | 'accent' | 'warning';
}

interface Category {
  id: string;
  nameKey: string;
  icon: keyof typeof import('@expo/vector-icons/MaterialIcons').default.glyphMap;
  type: 'primary' | 'secondary' | 'accent';
  items: CommunicationItem[];
}

const getCategoriesData = (): Category[] => [
  {
    id: 'basic',
    nameKey: 'basic',
    icon: 'home',
    type: 'primary',
    items: [
      { id: 'hungry', textKey: 'hungry', icon: 'restaurant', type: 'warning' },
      { id: 'thirsty', textKey: 'thirsty', icon: 'local-drink', type: 'accent' },
      { id: 'tired', textKey: 'tired', icon: 'bed', type: 'accent' },
      { id: 'bathroom', textKey: 'bathroom', icon: 'wc', type: 'secondary' },
      { id: 'help', textKey: 'help', icon: 'help', type: 'warning' },
      { id: 'break', textKey: 'break', icon: 'pause', type: 'secondary' },
    ]
  },
  {
    id: 'emotions',
    nameKey: 'emotions',
    icon: 'mood',
    type: 'accent',
    items: [
      { id: 'happy', textKey: 'happy', icon: 'mood', type: 'secondary' },
      { id: 'sad', textKey: 'sad', icon: 'mood-bad', type: 'primary' },
      { id: 'angry', textKey: 'angry', icon: 'sentiment-very-dissatisfied', type: 'warning' },
      { id: 'scared', textKey: 'scared', icon: 'warning', type: 'warning' },
      { id: 'excited', textKey: 'excited', icon: 'celebration', type: 'accent' },
      { id: 'calm', textKey: 'calm', icon: 'spa', type: 'accent' },
    ]
  },
  {
    id: 'activities',
    nameKey: 'activities',
    icon: 'sports-esports',
    type: 'secondary',
    items: [
      { id: 'play', textKey: 'play', icon: 'sports-esports', type: 'primary' },
      { id: 'read', textKey: 'read', icon: 'book', type: 'accent' },
      { id: 'music', textKey: 'music', icon: 'music-note', type: 'accent' },
      { id: 'outside', textKey: 'outside', icon: 'nature', type: 'secondary' },
      { id: 'tv', textKey: 'tv', icon: 'tv', type: 'secondary' },
      { id: 'draw', textKey: 'draw', icon: 'brush', type: 'warning' },
    ]
  },
  {
    id: 'social',
    nameKey: 'social',
    icon: 'people',
    type: 'accent',
    items: [
      { id: 'hello', textKey: 'hello', icon: 'waving-hand', type: 'secondary' },
      { id: 'goodbye', textKey: 'goodbye', icon: 'back-hand', type: 'primary' },
      { id: 'please', textKey: 'please', icon: 'volunteer-activism', type: 'accent' },
      { id: 'thankyou', textKey: 'thankyou', icon: 'favorite', type: 'warning' },
      { id: 'sorry', textKey: 'sorry', icon: 'sentiment-dissatisfied', type: 'accent' },  
      { id: 'yes', textKey: 'yes', icon: 'check', type: 'secondary' },
      { id: 'no', textKey: 'no', icon: 'close', type: 'warning' },
    ]
  }
];

const CommunicationBoardTemplate = () => {
  const { currentLanguage, loading } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getCategoriesData();

  const handleItemPress = async (text: string) => {
    await SpeechService.speak(text, currentLanguage.speechCode);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  if (loading) {
    return (
      <>
        <AppHeader />
      </>
    );
  }

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <>
      <AppHeader />
      
      {selectedCategoryData ? (
        <CommunicationGrid
          category={selectedCategoryData}
          onBack={handleBackToCategories}
          onItemPress={handleItemPress}
        />
      ) : (
        <CategoryGrid
          categories={categories}
          onSelectCategory={handleCategorySelect}
        />
      )}
    </>
  );
};

export default CommunicationBoardTemplate;