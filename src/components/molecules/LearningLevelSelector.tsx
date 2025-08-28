import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLearningLevel } from '../../contexts/LearningLevelContext';
import { useLanguage } from '../../hooks/useLanguage';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';

const LearningLevelSelector = () => {
  const { currentLevel, setLearningLevel } = useLearningLevel();
  const { translation } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  const selectLevel = async (level: 1 | 2 | 3) => {
    try {
      await setLearningLevel(level);
      setModalVisible(false);
    } catch (error) {
      console.error('Error changing learning level:', error);
    }
  };

  const getLevelIcon = (level: number) => {
    switch (level) {
      case 1:
        return 'school';
      case 2:
        return 'trending-up';
      case 3:
        return 'star';
      default:
        return 'help';
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return '#10b981'; // green
      case 2:
        return '#f59e0b'; // amber
      case 3:
        return '#8b5cf6'; // purple
      default:
        return '#6b7280'; // gray
    }
  };

  const getLevelFeatures = (level: number) => {
    switch (level) {
      case 1:
        return translation.settings.learningLevel.levels.level1Features;
      case 2:
        return translation.settings.learningLevel.levels.level2Features;
      case 3:
        return translation.settings.learningLevel.levels.level3Features;
      default:
        return [];
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: '#2563eb',
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <LayoutText 
          isTextWhite
          isTextBase
          isFontSemibold
        >
          {translation.settings.learningLevel.changeButton}
        </LayoutText>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <LayoutView 
          isFlex
          isBgBlack50
          isHFull
          isJustifyCenter
          isItemsCenter
        >
          <LayoutView 
            isBgWhite
            isRounded2xl
            hasPadding
            customClasses="p-5 w-4/5 max-h-[80%]"
          >
            <LayoutText 
              isTextXl
              isFontBold
              isTextCenter
              hasMarginBottom
              isTextGray800
              customClasses="mb-5"
            >
              {translation.settings.modal.selectLevel}
            </LayoutText>

            <ScrollView style={{ maxHeight: 400 }}>
              {[1, 2, 3].map((level) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => selectLevel(level as 1 | 2 | 3)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 16,
                    paddingHorizontal: 12,
                    borderRadius: 12,
                    marginBottom: 12,
                    backgroundColor: currentLevel === level ? '#e5e7eb' : '#f3f4f6',
                    borderWidth: currentLevel === level ? 2 : 1,
                    borderColor: currentLevel === level ? getLevelColor(level) : '#d1d5db',
                  }}
                >
                  <LayoutView 
                    isFlexRow
                    isItemsCenter
                    isFlex1
                  >
                    <MaterialIcons 
                      name={getLevelIcon(level)} 
                      size={32} 
                      color={getLevelColor(level)} 
                    />
                                          <LayoutView hasMarginLeft isFlex1>
                      <LayoutText 
                        isTextLg
                        isFontBold
                        customClasses={`${
                          currentLevel === level ? 'text-gray-800' : 'text-gray-700'
                        }`}
                      >
                        {translation.settings.learningLevel.levels[`level${level}` as keyof typeof translation.settings.learningLevel.levels]}
                      </LayoutText>
                      <LayoutText 
                        isTextSm
                        customClasses={`${
                          currentLevel === level ? 'text-gray-600' : 'text-gray-500'
                        } mt-1`}
                      >
                        {translation.settings.learningLevel.levels[`level${level}Desc` as keyof typeof translation.settings.learningLevel.levels]}
                      </LayoutText>
                    </LayoutView>
                  </LayoutView>
                  
                  {currentLevel === level && (
                    <MaterialIcons 
                      name="check-circle" 
                      size={24} 
                      color={getLevelColor(level)} 
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: '#6b7280',
                paddingVertical: 12,
                borderRadius: 8,
                marginTop: 16,
              }}
            >
              <LayoutText 
                isTextWhite
                isTextBase
                isFontSemibold
                isTextCenter
              >
                {translation.settings.modal.close}
              </LayoutText>
            </TouchableOpacity>
          </LayoutView>
        </LayoutView>
      </Modal>
    </>
  );
};

export default LearningLevelSelector;
