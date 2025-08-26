import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'small' | 'medium' | 'large';
  elevation?: number;
  borderRadius?: 'small' | 'medium' | 'large';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'medium',
  elevation = 2,
  borderRadius = 'medium',
}) => {
  const { theme } = useTheme();

  const getPadding = () => {
    switch (padding) {
      case 'none':
        return 0;
      case 'small':
        return theme.spacing.sm;
      case 'large':
        return theme.spacing.lg;
      default:
        return theme.spacing.md;
    }
  };

  const getBorderRadius = () => {
    switch (borderRadius) {
      case 'small':
        return theme.borderRadius.sm;
      case 'large':
        return theme.borderRadius.lg;
      default:
        return theme.borderRadius.md;
    }
  };

  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: getBorderRadius(),
    padding: getPadding(),
    elevation,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: elevation / 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: elevation,
  };

  return <View style={[cardStyle, style]}>{children}</View>;
};

export default Card;
