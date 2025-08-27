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
          isFlexRow={true}
          isItemsCenter={true}
        >
          <MaterialIcons name="language" size={24} color="white" />
          <LayoutText 
            isTextWhite={true}
            isTextSm={true}
            isFontBold={true}
            hasMarginLeft={true}
            customClasses="ml-1"
          >
            {currentLanguage.code.toUpperCase()}
          </LayoutText>
        </LayoutView>
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <LayoutView 
          isFlex={true}
          isBgBlack50={true}
          isJustifyCenter={true}
          isItemsCenter={true}
        >
          <LayoutView 
            isBgWhite={true}
            isRounded2xl={true}
            hasPadding={true}
            customClasses="p-5 w-4/5 max-h-[70%]"
          >
            <LayoutText 
              isTextXl={true}
              isFontBold={true}
              isTextCenter={true}
              hasMarginBottom={true}
              isTextGray800={true}
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
                    isTextBase={true}
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
                isTextWhite={true}
                isTextBase={true}
                isFontSemibold={true}
                isTextCenter={true}
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