import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLearningLevel } from "../contexts/LearningLevelContext";
import { useLanguage } from "../hooks/useLanguage";
import LayoutView from "../components/atoms/LayoutView";
import LayoutText from "../components/atoms/LayoutText";
import LearningLevelSelector from "../components/molecules/LearningLevelSelector";
import LanguageSelector from "../components/molecules/LanguageSelector";
import VoiceSelector from '../components/molecules/VoiceSelector';
import ThemeSelector from '../components/molecules/ThemeSelector';
import { useTheme } from "../contexts/ThemeContext";

const SettingsScreen = () => {
  const { currentLevel } = useLearningLevel();
  const { currentLanguage, translation } = useLanguage();
  const { colors, isDark } = useTheme();

  const handleBack = () => {
    router.back();
  };

  const getLevelIcon = (level: number) => {
    switch (level) {
      case 1:
        return "school";
      case 2:
        return "trending-up";
      case 3:
        return "star";
      default:
        return "help";
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "#10b981"; // green
      case 2:
        return "#f59e0b"; // amber
      case 3:
        return "#8b5cf6"; // purple
      default:
        return "#6b7280"; // gray
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
      <LayoutView
        style={{
          backgroundColor: isDark ? colors.surface : colors.primary,
          height: 100,
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingHorizontal: 20,
          paddingVertical: 12,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <TouchableOpacity onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <LayoutText isTextXl isFontBold isTextWhite customClasses="ml-4">
          {translation.settings.title}
        </LayoutText>
      </LayoutView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        style={{ backgroundColor: colors.background }}
      >
        <LayoutView p5>
          {/* Seção de Idioma */}
          <LayoutView
            style={{
              backgroundColor: isDark ? colors.surface : colors.background,
              borderRadius: 12,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            customClasses="mb-6"
            p5
          >
            <LayoutView isFlexRow isItemsCenter hasMarginBottom>
              <MaterialIcons name="language" size={28} color={colors.primary} />
              <LayoutText
                isTextLg
                isFontBold
                style={{ color: isDark ? colors.text : colors.text }}
                customClasses="ml-3"
              >
                {translation.settings.language.title}
              </LayoutText>
            </LayoutView>

            <LayoutText
              isTextBase
              style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
              hasMarginBottom
              customClasses="mb-4"
            >
              {translation.settings.language.subtitle}
            </LayoutText>

            {/* Idioma Atual */}
            <LayoutView
              style={{
                backgroundColor: isDark ? colors.surfaceSecondary : colors.cardSecondary,
                borderRadius: 8,
              }}
              customClasses="mb-4"
              p4
            >
              <LayoutView isFlexRow isItemsCenter hasMarginBottom>
                <MaterialIcons name="language" size={32} color={colors.primary} />
                                              <LayoutView hasMarginLeft isFlex1>
                                <LayoutText
                                  isTextLg
                                  isFontBold
                                  style={{ color: isDark ? colors.text : colors.text }}
                                >
                                  {currentLanguage.name}
                                </LayoutText>
                  <LayoutText 
                    isTextSm 
                    style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
                    customClasses="mt-1"
                  >
                    {translation.settings.language.code}: {currentLanguage.code}
                  </LayoutText>
                </LayoutView>
              </LayoutView>
            </LayoutView>

            {/* Seletor de Idioma */}
            <LanguageSelector />
          </LayoutView>

          {/* Seção de Nível de Aprendizado */}
          <LayoutView
            style={{
              backgroundColor: isDark ? colors.surface : colors.background,
              borderRadius: 12,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            customClasses="mb-6"
            p5
          >
            <LayoutView isFlexRow isItemsCenter hasMarginBottom>
              <MaterialIcons name="school" size={28} color={colors.primary} />
              <LayoutText
                isTextLg
                isFontBold
                style={{ color: isDark ? colors.text : colors.text }}
                customClasses="ml-3"
              >
                {translation.settings.learningLevel.title}
              </LayoutText>
            </LayoutView>

            <LayoutText
              isTextBase
              style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
              hasMarginBottom
              customClasses="mb-4"
            >
              {translation.settings.learningLevel.subtitle}
            </LayoutText>

            {/* Nível Atual */}
            <LayoutView
              style={{
                backgroundColor: isDark ? colors.surfaceSecondary : colors.cardSecondary,
                borderRadius: 8,
              }}
              customClasses="mb-4"
              p4
            >
              <LayoutView isFlexRow isItemsCenter hasMarginBottom>
                <MaterialIcons
                  name={getLevelIcon(currentLevel)}
                  size={32}
                  color={getLevelColor(currentLevel)}
                />
                                                <LayoutView hasMarginLeft isFlex1>
                                  <LayoutText
                                    isTextLg
                                    isFontBold
                                    style={{ color: isDark ? colors.text : colors.text }}
                                  >
                                    {
                                      translation.settings.learningLevel.levels[
                                        `level${currentLevel}` as keyof typeof translation.settings.learningLevel.levels
                                      ]
                                    }{" "}
                                    - {translation.settings.learningLevel.active}
                                  </LayoutText>
                  <LayoutText 
                    isTextSm 
                    style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
                    customClasses="mt-1"
                  >
                    {
                      translation.settings.learningLevel.levels[
                        `level${currentLevel}Desc` as keyof typeof translation.settings.learningLevel.levels
                      ]
                    }
                  </LayoutText>
                </LayoutView>
              </LayoutView>

              {/* Características do Nível */}
              <LayoutView customClasses="mt-3">
                <LayoutText
                  isTextSm
                  isFontSemibold
                  style={{ color: isDark ? colors.text : colors.text }}
                  hasMarginBottom
                  customClasses="mb-2"
                >
                  {translation.settings.learningLevel.features}
                </LayoutText>
                {getLevelFeatures(currentLevel).map((feature, index) => (
                  <LayoutView
                    key={index}
                    isFlexRow
                    isItemsCenter
                    customClasses="mb-1"
                  >
                    <MaterialIcons
                      name="check-circle"
                      size={16}
                      color={getLevelColor(currentLevel)}
                    />
                    <LayoutText 
                      isTextSm 
                      style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
                      customClasses="ml-2"
                    >
                      {feature}
                    </LayoutText>
                  </LayoutView>
                ))}
              </LayoutView>
            </LayoutView>

            {/* Botão para Alterar Nível */}
            <LearningLevelSelector />
          </LayoutView>

          {/* Seção de Áudio */}
          <LayoutView
            style={{
              backgroundColor: isDark ? colors.surface : colors.background,
              borderRadius: 12,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            customClasses="mb-6"
            p5
          >
            <LayoutView
              isFlexRow
              isItemsCenter
              hasMarginBottom
            >
              <MaterialIcons
                name="volume-up"
                size={28}
                color={colors.primary}
              />
              <LayoutText
                isTextLg
                isFontBold
                style={{ color: isDark ? colors.text : colors.text }}
                customClasses="ml-3"
              >
                {translation.settings.audio.title}
              </LayoutText>
            </LayoutView>

            <LayoutText
              isTextBase
              style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
              hasMarginBottom
              customClasses="mb-4"
            >
              {translation.settings.audio.subtitle}
            </LayoutText>

            <LayoutView customClasses="mb-4">
              <LayoutText
                isTextSm
                isFontSemibold
                style={{ color: isDark ? colors.text : colors.text }}
                hasMarginBottom
                customClasses="mb-2"
              >
                Qualidade da Voz
              </LayoutText>
              <LayoutText
                isTextSm
                style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
                customClasses="mb-3"
              >
                Selecione a melhor voz disponível para o idioma {currentLanguage.name}. Vozes de alta qualidade soam mais naturais e são melhores para o aprendizado.
              </LayoutText>
                          <VoiceSelector />
          </LayoutView>
        </LayoutView>

        {/* Seção de Aparência */}
        <LayoutView
          style={{
            backgroundColor: isDark ? colors.surface : colors.background,
            borderRadius: 12,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          customClasses="mb-6"
          p5
        >
          <LayoutView
            isFlexRow
            isItemsCenter
            hasMarginBottom
          >
            <MaterialIcons
              name="palette"
              size={28}
              color={colors.primary}
            />
            <LayoutText
              isTextLg
              isFontBold
              style={{ color: isDark ? colors.text : colors.text }}
              customClasses="ml-3"
            >
              Aparência
            </LayoutText>
          </LayoutView>

                      <LayoutText
              isTextBase
              style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
              hasMarginBottom
              customClasses="mb-4"
            >
              Personalize a aparência do app escolhendo entre tema claro, escuro ou automático.
            </LayoutText>

            <LayoutView customClasses="mb-4">
              <LayoutText
                isTextSm
                isFontSemibold
                style={{ color: isDark ? colors.text : colors.text }}
                hasMarginBottom
                customClasses="mb-2"
              >
                Tema do App
              </LayoutText>
              <LayoutText
                isTextSm
                style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
                customClasses="mb-3"
              >
                Escolha o tema que melhor se adapta ao seu ambiente e preferência visual.
              </LayoutText>
              <ThemeSelector />
            </LayoutView>
          </LayoutView>

          {/* Seção de Configuração Parental */}
          <LayoutView
            style={{
              backgroundColor: isDark ? colors.surface : colors.background,
              borderRadius: 12,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            customClasses="mb-6"
            p5
          >
            <LayoutView
              isFlexRow
              isItemsCenter
              hasMarginBottom
            >
              <MaterialIcons
                name="family-restroom"
                size={28}
                color={colors.primary}
              />
              <LayoutText
                isTextLg
                isFontBold
                style={{ color: isDark ? colors.text : colors.text }}
                customClasses="ml-3"
              >
                Configuração Parental
              </LayoutText>
            </LayoutView>

            <LayoutText
              isTextBase
              style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
              hasMarginBottom
              customClasses="mb-4"
            >
              Configure quais áudios estarão disponíveis para a criança no app principal.
            </LayoutText>

            <TouchableOpacity
              onPress={() => router.push('/parental-config')}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 8,
                alignItems: 'center',
              }}
            >
              <LayoutText isTextWhite isTextBase isFontSemibold>
                Configurar Áudios Disponíveis
              </LayoutText>
            </TouchableOpacity>
          </LayoutView>

        {/* Sobre o App */}
          <LayoutView
            style={{
              backgroundColor: isDark ? colors.surface : colors.background,
              borderRadius: 12,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
            p5
          >
            <LayoutView isFlexRow isItemsCenter hasMarginBottom>
              <MaterialIcons name="info" size={28} color={colors.primary} />
              <LayoutText
                isTextLg
                isFontBold
                style={{ color: isDark ? colors.text : colors.text }}
                customClasses="ml-3"
              >
                {translation.settings.about.title}
              </LayoutText>
            </LayoutView>

            <LayoutText
              isTextBase
              style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
              hasMarginBottom
              customClasses="mb-4"
            >
              {translation.settings.about.subtitle}
            </LayoutText>

            <LayoutView 
              style={{
                backgroundColor: isDark ? colors.surfaceSecondary : colors.cardSecondary,
                borderRadius: 8,
              }}
              p4
            >
              <LayoutText 
                isTextSm 
                style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
                customClasses="mb-2"
              >
                <LayoutText isFontSemibold>
                  {translation.settings.about.version}:
                </LayoutText>{" "}
                1.0.0
              </LayoutText>
              <LayoutText 
                isTextSm 
                style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
                customClasses="mb-2"
              >
                <LayoutText isFontSemibold>
                  {translation.settings.about.developer}:
                </LayoutText>{" "}
                Emir Marques de Liz para seu filho Miguel ❤️
              </LayoutText>
              <LayoutText 
                isTextSm 
                style={{ color: isDark ? colors.textSecondary : colors.textSecondary }}
              >
                <LayoutText isFontSemibold>
                  {translation.settings.about.description}:
                </LayoutText>{" "}
                App para aprendizado de comunicação através de sons e palavras
              </LayoutText>
            </LayoutView>
          </LayoutView>
        </LayoutView>
      </ScrollView>
    </>
  );
};

export default SettingsScreen;
