import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../hooks/useLanguage';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';

const LanguageSelector = () => {
  const { currentLanguage, availableLanguages, changeLanguage } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  const selectLanguage = async (languageCode: string) => {
    try {
      await changeLanguage(languageCode);
      setModalVisible(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <LayoutView 
          isFlexRow
          isItemsCenter
        >
          <MaterialIcons name="language" size={24} color="white" />
          <LayoutText 
            isTextWhite
            isTextSm
            isFontBold
            hasMarginLeft
            customClasses="ml-1"
          >
            {currentLanguage.code.toUpperCase()}
          </LayoutText>
        </LayoutView>
      </Pressable>

      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent
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
            customClasses="p-5 w-4/5 max-h-[70%]"
          >
            <LayoutText 
              isTextXl
              isFontBold
              isTextCenter
              hasMarginBottom
              isTextGray800
              customClasses="mb-5"
            >
              Select Language / Selecionar Idioma
            </LayoutText>

            <ScrollView style={{ maxHeight: 320 }}>
              {availableLanguages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  onPress={() => selectLanguage(language.code)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    marginBottom: 8,
                    backgroundColor: currentLanguage.code === language.code ? '#e5e7eb' : '#f3f4f6',
                  }}
                >
                  <LayoutText 
                    isTextBase
                    customClasses={`${
                      currentLanguage.code === language.code ? 'text-gray-800' : 'text-gray-600'
                    }`}
                  >
                    {language.name}
                  </LayoutText>
                  {currentLanguage.code === language.code && (
                    <MaterialIcons name="check" size={20} color="#10b981" />
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
                Cancel
              </LayoutText>
            </TouchableOpacity>
          </LayoutView>
        </LayoutView>
      </Modal>
    </>
  );
};

export default LanguageSelector;