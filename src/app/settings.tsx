import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLearningLevel } from "../contexts/LearningLevelContext";
import { useLanguage } from "../hooks/useLanguage";
import LayoutView from "../components/atoms/LayoutView";
import LayoutText from "../components/atoms/LayoutText";
import LearningLevelSelector from "../components/molecules/LearningLevelSelector";
import LanguageSelector from "../components/molecules/LanguageSelector";

const SettingsScreen = () => {
  const { currentLevel } = useLearningLevel();
  const { currentLanguage, translation } = useLanguage();

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
        isBgPrimary600
        isFlexRow
        isItemsEnd
        hasPaddingX
        hasPaddingY
        hasShadow
        style={{
          height: 100,
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
      >
        <LayoutView p5>
          {/* Seção de Idioma */}
          <LayoutView
            isBgWhite
            isRoundedXl
            hasShadow
            customClasses="mb-6"
            p5
          >
            <LayoutView isFlexRow isItemsCenter hasMarginBottom>
              <MaterialIcons name="language" size={28} color="#2563eb" />
              <LayoutText
                isTextLg
                isFontBold
                isTextGray800
                customClasses="ml-3"
              >
                {translation.settings.language.title}
              </LayoutText>
            </LayoutView>

            <LayoutText
              isTextBase
              isTextGray
              hasMarginBottom
              customClasses="mb-4"
            >
              {translation.settings.language.subtitle}
            </LayoutText>

            {/* Idioma Atual */}
            <LayoutView
              isBgGray100
              isRoundedLg
              customClasses="mb-4"
              p4
            >
              <LayoutView isFlexRow isItemsCenter hasMarginBottom>
                <MaterialIcons name="language" size={32} color="#2563eb" />
                <LayoutView customClasses="ml-3 flex-1">
                  <LayoutText isTextLg isFontBold isTextGray800>
                    {currentLanguage.name}
                  </LayoutText>
                  <LayoutText isTextSm isTextGray customClasses="mt-1">
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
            isBgWhite
            isRoundedXl
            hasShadow
            customClasses="mb-6"
            p5
          >
            <LayoutView isFlexRow isItemsCenter hasMarginBottom>
              <MaterialIcons name="school" size={28} color="#2563eb" />
              <LayoutText
                isTextLg
                isFontBold
                isTextGray800
                customClasses="ml-3"
              >
                {translation.settings.learningLevel.title}
              </LayoutText>
            </LayoutView>

            <LayoutText
              isTextBase
              isTextGray
              hasMarginBottom
              customClasses="mb-4"
            >
              {translation.settings.learningLevel.subtitle}
            </LayoutText>

            {/* Nível Atual */}
            <LayoutView
              isBgGray100
              isRoundedLg
              customClasses="mb-4"
              p4
            >
              <LayoutView isFlexRow isItemsCenter hasMarginBottom>
                <MaterialIcons
                  name={getLevelIcon(currentLevel)}
                  size={32}
                  color={getLevelColor(currentLevel)}
                />
                <LayoutView customClasses="ml-3 flex-1">
                  <LayoutText isTextLg isFontBold isTextGray800>
                    {
                      translation.settings.learningLevel.levels[
                        `level${currentLevel}` as keyof typeof translation.settings.learningLevel.levels
                      ]
                    }{" "}
                    - {translation.settings.learningLevel.active}
                  </LayoutText>
                  <LayoutText isTextSm isTextGray customClasses="mt-1">
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
                  isTextGray800
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
                    <LayoutText isTextSm isTextGray customClasses="ml-2">
                      {feature}
                    </LayoutText>
                  </LayoutView>
                ))}
              </LayoutView>
            </LayoutView>

            {/* Botão para Alterar Nível */}
            <LearningLevelSelector />
          </LayoutView>

          {/* Sobre o App */}
          <LayoutView
            isBgWhite
            isRoundedXl
            hasShadow
            p5
          >
            <LayoutView isFlexRow isItemsCenter hasMarginBottom>
              <MaterialIcons name="info" size={28} color="#2563eb" />
              <LayoutText
                isTextLg
                isFontBold
                isTextGray800
                customClasses="ml-3"
              >
                {translation.settings.about.title}
              </LayoutText>
            </LayoutView>

            <LayoutText
              isTextBase
              isTextGray
              hasMarginBottom
              customClasses="mb-4"
            >
              {translation.settings.about.subtitle}
            </LayoutText>

            <LayoutView isBgGray100 isRoundedLg p4>
              <LayoutText isTextSm isTextGray customClasses="mb-2">
                <LayoutText isFontSemibold>
                  {translation.settings.about.version}:
                </LayoutText>{" "}
                1.0.0
              </LayoutText>
              <LayoutText isTextSm isTextGray customClasses="mb-2">
                <LayoutText isFontSemibold>
                  {translation.settings.about.developer}:
                </LayoutText>{" "}
                Emir Marques de Liz para seu filho Miguel ❤️
              </LayoutText>
              <LayoutText isTextSm isTextGray>
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
