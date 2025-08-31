import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../contexts/ThemeContext";
import {
  useParentalConfig,
  AudioItem,
} from "../contexts/ParentalConfigContext";
import LayoutView from "../components/atoms/LayoutView";
import LayoutText from "../components/atoms/LayoutText";

const ParentalConfigScreen = () => {
  const { translation } = useLanguage();
  const { colors, isDark } = useTheme();
  const {
    config,
    toggleAudioItem,
    enableAllInCategory,
    disableAllInCategory,
    enableAllItems,
    disableAllItems,
    getEnabledItemsByCategory,
  } = useParentalConfig();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const categories = [
    { id: "basic", name: translation.categories.basic, icon: "restaurant", color: "#2563eb" },
    {
      id: "emotions",
      name: translation.categories.emotions,
      icon: "sentiment-satisfied",
      color: "#db2777",
    },
    {
      id: "activities",
      name: translation.categories.activities,
      icon: "sports-esports",
      color: "#16a34a",
    },
    { id: "social", name: translation.categories.social, icon: "people", color: "#9333ea" },
  ];

  const getCategoryStats = (categoryId: string) => {
    const enabledItems = getEnabledItemsByCategory(categoryId);
    const totalItems = config.enabledAudioItems.filter(
      (item) => item.categoryId === categoryId
    );
    return `${enabledItems.length}/${totalItems.length}`;
  };

  const openCategoryConfig = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCategory(null);
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name || categoryId;
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.icon || "help";
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.color || "#6b7280";
  };

  return (
    <>
      {/* Header */}
      <LayoutView
        style={{
          backgroundColor: isDark ? colors.surface : colors.primary,
          height: 100,
          flexDirection: "row",
          alignItems: "flex-end",
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
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={colors.textInverse}
          />
        </TouchableOpacity>
        <LayoutText
          isTextXl
          isFontBold
          style={{ color: colors.textInverse, marginLeft: 16 }}
        >
          {translation.parentalConfig.title}
        </LayoutText>
      </LayoutView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
      >
        <LayoutView p5>
          {/* Instructions */}
          <LayoutView
            style={{
              backgroundColor: isDark ? colors.surface : colors.background,
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: isDark ? colors.border : colors.borderSecondary,
            }}
          >
            <LayoutText
              isTextLg
              isFontBold
              style={{ color: colors.text, marginBottom: 8 }}
            >
              {translation.parentalConfig.instructions.title}
            </LayoutText>
            <LayoutText
              isTextBase
              style={{ color: colors.textSecondary, marginBottom: 8 }}
            >
              {translation.parentalConfig.instructions.subtitle}
            </LayoutText>

            {/* Quick Actions */}
            <LayoutView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              <TouchableOpacity
                onPress={enableAllItems}
                style={{
                  backgroundColor: colors.success,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                }}
              >
                <LayoutText isTextWhite isTextSm isFontSemibold>
                  {translation.parentalConfig.actions.enableAll}
                </LayoutText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={disableAllItems}
                style={{
                  backgroundColor: colors.warning,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                }}
              >
                <LayoutText isTextWhite isTextSm isFontSemibold>
                  {translation.parentalConfig.actions.disableAll}
                </LayoutText>
              </TouchableOpacity>
            </LayoutView>
          </LayoutView>

          {/* Categories */}
          {categories.map((category) => (
            <LayoutView
              key={category.id}
              style={{
                backgroundColor: isDark ? colors.surface : colors.background,
                borderRadius: 12,
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                marginBottom: 16,
              }}
            >
              <TouchableOpacity
                onPress={() => openCategoryConfig(category.id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 20,
                }}
              >
                <LayoutView
                  style={{
                    backgroundColor: category.color,
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <MaterialIcons
                    name={category.icon as any}
                    size={24}
                    color="white"
                  />
                </LayoutView>

                <LayoutView style={{ flex: 1 }}>
                  <LayoutText
                    isTextLg
                    isFontBold
                    style={{ color: colors.text }}
                  >
                    {category.name}
                  </LayoutText>
                  <LayoutText
                    isTextSm
                    style={{ color: colors.textSecondary, marginTop: 4 }}
                  >
                    {getCategoryStats(category.id)}{" "}
                    {translation.parentalConfig.items.enabled}
                  </LayoutText>
                </LayoutView>

                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </LayoutView>
          ))}
        </LayoutView>
      </ScrollView>

      {/* Category Configuration Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <LayoutView
          isFlex
          isHFull
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LayoutView
            style={{
              backgroundColor: colors.background,
              borderRadius: 16,
              width: "90%",
              maxHeight: "80%",
              padding: 20,
            }}
          >
            {/* Modal Header */}
            <LayoutView
              isFlexRow
              isItemsCenter
              isJustifyBetween
              style={{ marginBottom: 16 }}
            >
              <LayoutView isFlexRow style={{ alignItems: "center" }}>
                <LayoutView
                  style={{
                    backgroundColor: selectedCategory
                      ? getCategoryColor(selectedCategory)
                      : colors.primary,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <MaterialIcons
                    name={
                      selectedCategory
                        ? (getCategoryIcon(selectedCategory) as any)
                        : "help"
                    }
                    size={20}
                    color="white"
                  />
                </LayoutView>
                <LayoutText isTextXl isFontBold style={{ color: colors.text }}>
                  {selectedCategory
                    ? getCategoryName(selectedCategory)
                    : translation.categories.basic}
                </LayoutText>
              </LayoutView>

              <TouchableOpacity onPress={closeModal}>
                <MaterialIcons
                  name="close"
                  size={24}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </LayoutView>

            {/* Category Actions */}
            <LayoutView
              isFlexRow
              style={{ justifyContent: "space-between", marginBottom: 16 }}
            >
              <TouchableOpacity
                onPress={() =>
                  selectedCategory && enableAllInCategory(selectedCategory)
                }
                style={{
                  backgroundColor: colors.success,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                  flex: 1,
                  marginRight: 8,
                }}
              >
                <LayoutText isTextWhite isTextSm isFontSemibold isTextCenter>
                  {translation.parentalConfig.actions.enableAll}
                </LayoutText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  selectedCategory && disableAllInCategory(selectedCategory)
                }
                style={{
                  backgroundColor: colors.warning,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8,
                  flex: 1,
                  marginLeft: 8,
                }}
              >
                <LayoutText isTextWhite isTextSm isFontSemibold isTextCenter>
                  {translation.parentalConfig.actions.disableAll}
                </LayoutText>
              </TouchableOpacity>
            </LayoutView>

            {/* Audio Items List */}
            <ScrollView style={{ maxHeight: 400 }}>
              {selectedCategory &&
                config.enabledAudioItems
                  .filter((item) => item.categoryId === selectedCategory)
                  .map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => toggleAudioItem(item.id)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 16,
                        marginBottom: 8,
                        backgroundColor: item.isEnabled
                          ? isDark
                            ? colors.surfaceSecondary
                            : colors.cardSecondary
                          : isDark
                          ? colors.surface
                          : colors.background,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor: item.isEnabled
                          ? colors.primary
                          : colors.border,
                      }}
                    >
                      <MaterialIcons
                        name={item.icon as any}
                        size={24}
                        color={
                          item.isEnabled ? colors.primary : colors.textSecondary
                        }
                        style={{ marginRight: 12 }}
                      />

                      <LayoutView style={{ flex: 1 }}>
                        <LayoutText
                          isTextBase
                          isFontSemibold
                          style={{
                            color: item.isEnabled
                              ? colors.text
                              : colors.textSecondary,
                          }}
                        >
                          {item.text}
                        </LayoutText>
                        <LayoutText
                          isTextSm
                          style={{
                            color: item.isEnabled
                              ? colors.textSecondary
                              : colors.textTertiary,
                            marginTop: 4,
                          }}
                        >
                          {translation.categories[item.categoryId as keyof typeof translation.categories]} • {item.textKey}
                        </LayoutText>
                      </LayoutView>

                      <MaterialIcons
                        name={
                          item.isEnabled
                            ? "check-circle"
                            : "radio-button-unchecked"
                        }
                        size={24}
                        color={
                          item.isEnabled ? colors.success : colors.textSecondary
                        }
                      />
                    </TouchableOpacity>
                  ))}
            </ScrollView>

            {/* Close Button */}
            <TouchableOpacity
              onPress={closeModal}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <LayoutText isTextWhite isTextBase isFontSemibold>
                {translation.parentalConfig.actions.close}
              </LayoutText>
            </TouchableOpacity>
          </LayoutView>
        </LayoutView>
      </Modal>
    </>
  );
};

export default ParentalConfigScreen;
