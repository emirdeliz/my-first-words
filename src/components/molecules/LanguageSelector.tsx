import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '../../hooks/useLanguage';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';

const LanguageSelector = () => {
  const { currentLanguage, availableLanguages, changeLanguage, translation } = useLanguage();
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
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
      >
        <LayoutView 
          isBgPrimary600
          hasPaddingY
          hasPaddingX
          isRounded
          isItemsCenter
          customClasses="py-3 px-4"
        >
          <LayoutText 
            isTextWhite
            isTextBase
            isFontSemibold
          >
            {translation.settings.language.changeButton}
          </LayoutText>
        </LayoutView>
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
              {translation.settings.modal.selectLanguage}
            </LayoutText>

            <ScrollView style={{ maxHeight: 400 }}>
              {availableLanguages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  onPress={() => selectLanguage(language.code)}
                >
                  <LayoutView 
                    isFlexRow
                    isItemsCenter
                    isJustifyBetween
                    hasPaddingY
                    hasPaddingX
                    isRounded
                    hasMarginBottom
                    customClasses="py-4 px-3 mb-2"
                    style={{
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
                  </LayoutView>
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

export default LanguageSelector;