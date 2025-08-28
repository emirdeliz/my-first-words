import React, { useState } from 'react';
import { TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';

interface ThemeSelectorProps {
  onThemeSelect?: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemeSelector = ({ onThemeSelect }: ThemeSelectorProps) => {
  const { theme, setTheme, colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const themes = [
    {
      id: 'light' as const,
      name: 'Claro',
      description: 'Tema claro com cores vibrantes',
      icon: 'light-mode',
      color: '#fbbf24',
    },
    {
      id: 'dark' as const,
      name: 'Escuro',
      description: 'Tema escuro para ambientes com pouca luz',
      icon: 'dark-mode',
      color: '#8b5cf6',
    },
    {
      id: 'system' as const,
      name: 'Automático',
      description: 'Segue a preferência do sistema',
      icon: 'settings-brightness',
      color: '#10b981',
    },
  ];

  const selectTheme = async (themeId: 'light' | 'dark' | 'system') => {
    try {
      await setTheme(themeId);
      onThemeSelect?.(themeId);
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao alterar tema:', error);
    }
  };

  const getThemeIcon = (themeId: string) => {
    switch (themeId) {
      case 'light':
        return 'light-mode';
      case 'dark':
        return 'dark-mode';
      case 'system':
        return 'settings-brightness';
      default:
        return 'palette';
    }
  };

  const getThemeColor = (themeId: string) => {
    switch (themeId) {
      case 'light':
        return '#fbbf24';
      case 'dark':
        return '#8b5cf6';
      case 'system':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <LayoutText
          style={{ color: colors.textInverse }}
          isTextBase
          isFontSemibold
        >
          Alterar Tema
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
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          isHFull
          isJustifyCenter
          isItemsCenter
        >
          <LayoutView
            style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 20,
              width: '80%',
              maxHeight: '80%',
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <LayoutText
              style={{ color: colors.text }}
              isTextXl
              isFontBold
              isTextCenter
              hasMarginBottom
              customClasses="mb-5"
            >
              Escolher Tema
            </LayoutText>

            <ScrollView style={{ maxHeight: 400 }}>
              {themes.map((themeOption) => (
                <TouchableOpacity
                  key={themeOption.id}
                  onPress={() => selectTheme(themeOption.id)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                    marginBottom: 12,
                    backgroundColor: theme === themeOption.id ? colors.backgroundSecondary : colors.surfaceSecondary,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: theme === themeOption.id ? colors.primary : colors.border,
                  }}
                >
                  <LayoutView
                    isFlexRow
                    isItemsCenter
                    isFlex1
                  >
                    <MaterialIcons
                      name={themeOption.icon as any}
                      size={32}
                      color={getThemeColor(themeOption.id)}
                    />
                    <LayoutView hasMarginLeft isFlex1>
                      <LayoutText
                        style={{ color: colors.text }}
                        isTextLg
                        isFontBold
                      >
                        {themeOption.name}
                      </LayoutText>
                      <LayoutText
                        style={{ color: colors.textSecondary }}
                        isTextSm
                        customClasses="mt-1"
                      >
                        {themeOption.description}
                      </LayoutText>
                    </LayoutView>
                  </LayoutView>

                  {theme === themeOption.id && (
                    <MaterialIcons
                      name="check-circle"
                      size={24}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: colors.border,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                marginTop: 16,
              }}
            >
              <LayoutText
                style={{ color: colors.text }}
                isTextBase
                isFontSemibold
                isTextCenter
              >
                Fechar
              </LayoutText>
            </TouchableOpacity>
          </LayoutView>
        </LayoutView>
      </Modal>
    </>
  );
};

export default ThemeSelector;
