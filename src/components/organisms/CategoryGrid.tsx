import React from 'react';
import CategoryButton from '../atoms/CategoryButton';
import { useLanguage } from '../../hooks/useLanguage';
import LayoutView from '../atoms/LayoutView';

interface Category {
  id: string;
  nameKey: string;
  icon: keyof typeof import('@expo/vector-icons/MaterialIcons').default.glyphMap;
  type: 'primary' | 'secondary' | 'accent';
}

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

const CategoryGrid = ({ categories, onSelectCategory }: CategoryGridProps) => {
  const { translation } = useLanguage();

  const getCategoryProps = (category: Category) => {
    // Use category ID for specific colors
    if (category.id === 'emotions') {
      return { isFeelings: true };
    }
    if (category.id === 'social') {
      return { isSocial: true };
    }
    
    // Use type for general colors
    switch (category.type) {
      case 'primary':
        return { isPrimary: true };
      case 'secondary':
        return { isSecondary: true };
      case 'accent':
        return { isAccent: true };
      default:
        return {};
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    onSelectCategory(categoryId);
  };

  return (
    <LayoutView 
      isFlex={true}
      isFlexRow={true}
      isFlexWrap={true}
      hasPadding={true}
      isJustifyBetween={true}
      customClasses="p-5 justify-between"
    >
      {categories.map((category) => {
        const categoryProps = getCategoryProps(category);
        
        return (
          <CategoryButton
            key={category.id}
            title={(translation.categories as any)[category.nameKey]}
            icon={category.icon}
            {...categoryProps}
            onPress={() => handleCategorySelect(category.id)}
          />
        );
      })}
    </LayoutView>
  );
};

export default CategoryGrid;