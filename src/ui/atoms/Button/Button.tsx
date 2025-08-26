import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    switch (size) {
      case 'small':
        baseStyle.paddingVertical = theme.spacing.sm;
        baseStyle.paddingHorizontal = theme.spacing.md;
        break;
      case 'large':
        baseStyle.paddingVertical = theme.spacing.lg;
        baseStyle.paddingHorizontal = theme.spacing.xl;
        break;
      default:
        baseStyle.paddingVertical = theme.spacing.md;
        baseStyle.paddingHorizontal = theme.spacing.lg;
    }

    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = theme.colors.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 2;
        baseStyle.borderColor = theme.colors.primary;
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        break;
      default:
        baseStyle.backgroundColor = theme.colors.primary;
    }

    if (disabled) {
      baseStyle.opacity = 0.6;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: '600',
    };

    switch (size) {
      case 'small':
        baseTextStyle.fontSize = 14;
        break;
      case 'large':
        baseTextStyle.fontSize = 18;
        break;
      default:
        baseTextStyle.fontSize = 16;
    }

    switch (variant) {
      case 'outline':
        baseTextStyle.color = theme.colors.primary;
        break;
      case 'ghost':
        baseTextStyle.color = theme.colors.primary;
        break;
      default:
        baseTextStyle.color = 'white';
    }

    return baseTextStyle;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <ActivityIndicator
            size="small"
            color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary : 'white'}
            style={styles.loader}
          />
          <Text style={[getTextStyle(), textStyle]}>Carregando...</Text>
        </>
      );
    }

    return (
      <>
        {icon && iconPosition === 'left' && <>{icon}</>}
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        {icon && iconPosition === 'right' && <>{icon}</>}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginRight: 8,
  },
});

export default Button;
