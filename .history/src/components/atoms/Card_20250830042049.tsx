import React from 'react';
import { ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import LayoutView from './LayoutView';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  customClasses?: string;
  p5?: boolean;
  p4?: boolean;
  p3?: boolean;
  p2?: boolean;
  p1?: boolean;
  mb6?: boolean;
  mb4?: boolean;
  mb3?: boolean;
  mb2?: boolean;
  mb1?: boolean;
  mt6?: boolean;
  mt4?: boolean;
  mt3?: boolean;
  mt2?: boolean;
  mt1?: boolean;
}

/**
 * Componente Card com sombras otimizadas para ambos os temas
 */
const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  customClasses = '',
  p5 = false,
  p4 = false,
  p3 = false,
  p2 = false,
  p1 = false,
  mb6 = false,
  mb4 = false,
  mb3 = false,
  mb2 = false,
  mb1 = false,
  mt6 = false,
  mt4 = false,
  mt3 = false,
  mt2 = false,
  mt1 = false,
}) => {
  const { colors, isDark } = useTheme();

  // Construir classes customizadas
  const classes = [
    customClasses,
    p5 && 'p-5',
    p4 && 'p-4',
    p3 && 'p-3',
    p2 && 'p-2',
    p1 && 'p-1',
    mb6 && 'mb-6',
    mb4 && 'mb-4',
    mb3 && 'mb-3',
    mb2 && 'mb-2',
    mb1 && 'mb-1',
    mt6 && 'mt-6',
    mt4 && 'mt-4',
    mt3 && 'mt-3',
    mt2 && 'mt-2',
    mt1 && 'mt-1',
  ].filter(Boolean).join(' ');

  // Estilos base do card
  const cardStyle: ViewStyle = {
    backgroundColor: isDark ? colors.surface : colors.background,
    borderRadius: 12,
    // Sombras otimizadas para cada tema
    ...(isDark ? {
      // Tema escuro: sombra mais sutil
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 8,
    } : {
      // Tema claro: sombra mais visível
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 6,
      // Adicionar borda sutil para melhor definição no tema claro
      borderWidth: 1,
      borderColor: colors.border,
    }),
  };

  return (
    <LayoutView
      style={[cardStyle, style]}
      customClasses={classes}
    >
      {children}
    </LayoutView>
  );
};

export default Card;
