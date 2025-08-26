import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';

export interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'text' | 'textSecondary' | 'error' | 'success' | 'warning' | 'white';
  weight?: 'normal' | 'medium' | 'semiBold' | 'bold';
  align?: 'left' | 'center' | 'right';
  style?: TextStyle;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'text',
  weight = 'normal',
  align = 'left',
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  const getTypographyStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      textAlign: align,
    };

    // Variant styles
    switch (variant) {
      case 'h1':
        baseStyle.fontSize = theme.typography.h1.fontSize;
        baseStyle.fontWeight = theme.typography.h1.fontWeight as any;
        break;
      case 'h2':
        baseStyle.fontSize = theme.typography.h2.fontSize;
        baseStyle.fontWeight = theme.typography.h2.fontWeight as any;
        break;
      case 'h3':
        baseStyle.fontSize = theme.typography.h3.fontSize;
        baseStyle.fontWeight = theme.typography.h3.fontWeight as any;
        break;
      case 'body':
        baseStyle.fontSize = theme.typography.body.fontSize;
        baseStyle.fontWeight = theme.typography.body.fontWeight as any;
        break;
      case 'caption':
        baseStyle.fontSize = theme.typography.caption.fontSize;
        baseStyle.fontWeight = theme.typography.caption.fontWeight as any;
        break;
      case 'label':
        baseStyle.fontSize = 14;
        baseStyle.fontWeight = '500';
        break;
    }

    // Weight override
    if (weight !== 'normal') {
      baseStyle.fontWeight = weight === 'medium' ? '500' : weight === 'semiBold' ? '600' : 'bold';
    }

    // Color
    switch (color) {
      case 'primary':
        baseStyle.color = theme.colors.primary;
        break;
      case 'secondary':
        baseStyle.color = theme.colors.secondary;
        break;
      case 'text':
        baseStyle.color = theme.colors.text;
        break;
      case 'textSecondary':
        baseStyle.color = theme.colors.textSecondary;
        break;
      case 'error':
        baseStyle.color = theme.colors.error;
        break;
      case 'success':
        baseStyle.color = theme.colors.success;
        break;
      case 'warning':
        baseStyle.color = theme.colors.warning;
        break;
      case 'white':
        baseStyle.color = 'white';
        break;
    }

    return baseStyle;
  };

  return (
    <Text style={[getTypographyStyle(), style]} {...rest}>
      {children}
    </Text>
  );
};

export default Typography;
