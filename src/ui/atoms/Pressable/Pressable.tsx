import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export interface PressableProps extends TouchableOpacityProps {
  // Layout
  flex?: boolean;
  flexRow?: boolean;
  flexCol?: boolean;
  justifyCenter?: boolean;
  justifyStart?: boolean;
  justifyEnd?: boolean;
  justifyBetween?: boolean;
  justifyAround?: boolean;
  itemsCenter?: boolean;
  itemsStart?: boolean;
  itemsEnd?: boolean;
  itemsStretch?: boolean;
  
  // Spacing
  p?: boolean;
  px?: boolean;
  py?: boolean;
  pt?: boolean;
  pr?: boolean;
  pb?: boolean;
  pl?: boolean;
  m?: boolean;
  mx?: boolean;
  my?: boolean;
  mt?: boolean;
  mr?: boolean;
  mb?: boolean;
  ml?: boolean;
  
  // Sizing
  wFull?: boolean;
  hFull?: boolean;
  wAuto?: boolean;
  hAuto?: boolean;
  
  // Background
  bgPrimary?: boolean;
  bgSecondary?: boolean;
  bgSuccess?: boolean;
  bgWarning?: boolean;
  bgError?: boolean;
  bgTransparent?: boolean;
  bgWhite?: boolean;
  bgBlack?: boolean;
  bgGray?: boolean;
  
  // Border
  border?: boolean;
  borderRounded?: boolean;
  borderRoundedLg?: boolean;
  borderRoundedXl?: boolean;
  borderRounded2xl?: boolean;
  borderRoundedFull?: boolean;
  borderPrimary?: boolean;
  borderSecondary?: boolean;
  borderSuccess?: boolean;
  borderWarning?: boolean;
  borderError?: boolean;
  
  // Shadow
  shadow?: boolean;
  shadowLg?: boolean;
  shadowXl?: boolean;
  
  // Position
  absolute?: boolean;
  relative?: boolean;
  top0?: boolean;
  right0?: boolean;
  bottom0?: boolean;
  left0?: boolean;
  
  // Z-index
  z10?: boolean;
  z20?: boolean;
  z30?: boolean;
  z40?: boolean;
  z50?: boolean;
  
  // Opacity
  opacity50?: boolean;
  opacity75?: boolean;
  
  // Overflow
  overflowHidden?: boolean;
  overflowScroll?: boolean;
  
  // Interactive states
  activeOpacity?: number;
  
  // Custom classes
  className?: string;
}

const Pressable: React.FC<PressableProps> = ({
  flex,
  flexRow,
  flexCol,
  justifyCenter,
  justifyStart,
  justifyEnd,
  justifyBetween,
  justifyAround,
  itemsCenter,
  itemsStart,
  itemsEnd,
  itemsStretch,
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  wFull,
  hFull,
  wAuto,
  hAuto,
  bgPrimary,
  bgSecondary,
  bgSuccess,
  bgWarning,
  bgError,
  bgTransparent,
  bgWhite,
  bgBlack,
  bgGray,
  border,
  borderRounded,
  borderRoundedLg,
  borderRoundedXl,
  borderRounded2xl,
  borderRoundedFull,
  borderPrimary,
  borderSecondary,
  borderSuccess,
  borderWarning,
  borderError,
  shadow,
  shadowLg,
  shadowXl,
  absolute,
  relative,
  top0,
  right0,
  bottom0,
  left0,
  z10,
  z20,
  z30,
  z40,
  z50,
  opacity50,
  opacity75,
  overflowHidden,
  overflowScroll,
  activeOpacity = 0.7,
  className = '',
  style,
  ...props
}) => {
  const getClasses = () => {
    const classes: string[] = [];
    
    // Layout
    if (flex) classes.push('flex');
    if (flexRow) classes.push('flex-row');
    if (flexCol) classes.push('flex-col');
    if (justifyCenter) classes.push('justify-center');
    if (justifyStart) classes.push('justify-start');
    if (justifyEnd) classes.push('justify-end');
    if (justifyBetween) classes.push('justify-between');
    if (justifyAround) classes.push('justify-around');
    if (itemsCenter) classes.push('items-center');
    if (itemsStart) classes.push('items-start');
    if (itemsEnd) classes.push('items-end');
    if (itemsStretch) classes.push('items-stretch');
    
    // Spacing
    if (p) classes.push('p-4');
    if (px) classes.push('px-4');
    if (py) classes.push('py-4');
    if (pt) classes.push('pt-4');
    if (pr) classes.push('pr-4');
    if (pb) classes.push('pb-4');
    if (pl) classes.push('pl-4');
    if (m) classes.push('m-4');
    if (mx) classes.push('mx-4');
    if (my) classes.push('my-4');
    if (mt) classes.push('mt-4');
    if (mr) classes.push('mr-4');
    if (mb) classes.push('mb-4');
    if (ml) classes.push('ml-4');
    
    // Sizing
    if (wFull) classes.push('w-full');
    if (hFull) classes.push('h-full');
    if (wAuto) classes.push('w-auto');
    if (hAuto) classes.push('h-auto');
    
    // Background
    if (bgPrimary) classes.push('bg-primary-500');
    if (bgSecondary) classes.push('bg-secondary-500');
    if (bgSuccess) classes.push('bg-success-500');
    if (bgWarning) classes.push('bg-warning-500');
    if (bgError) classes.push('bg-error-500');
    if (bgTransparent) classes.push('bg-transparent');
    if (bgWhite) classes.push('bg-white');
    if (bgBlack) classes.push('bg-black');
    if (bgGray) classes.push('bg-gray-100');
    
    // Border
    if (border) classes.push('border border-gray-300');
    if (borderRounded) classes.push('rounded');
    if (borderRoundedLg) classes.push('rounded-lg');
    if (borderRoundedXl) classes.push('rounded-xl');
    if (borderRounded2xl) classes.push('rounded-2xl');
    if (borderRoundedFull) classes.push('rounded-full');
    if (borderPrimary) classes.push('border-primary-500');
    if (borderSecondary) classes.push('border-secondary-500');
    if (borderSuccess) classes.push('border-success-500');
    if (borderWarning) classes.push('border-warning-500');
    if (borderError) classes.push('border-error-500');
    
    // Shadow
    if (shadow) classes.push('shadow');
    if (shadowLg) classes.push('shadow-lg');
    if (shadowXl) classes.push('shadow-xl');
    
    // Position
    if (absolute) classes.push('absolute');
    if (relative) classes.push('relative');
    if (top0) classes.push('top-0');
    if (right0) classes.push('right-0');
    if (bottom0) classes.push('bottom-0');
    if (left0) classes.push('left-0');
    
    // Z-index
    if (z10) classes.push('z-10');
    if (z20) classes.push('z-20');
    if (z30) classes.push('z-30');
    if (z40) classes.push('z-40');
    if (z50) classes.push('z-50');
    
    // Opacity
    if (opacity50) classes.push('opacity-50');
    if (opacity75) classes.push('opacity-75');
    
    // Overflow
    if (overflowHidden) classes.push('overflow-hidden');
    if (overflowScroll) classes.push('overflow-scroll');
    
    return classes.join(' ');
  };

  const combinedClasses = `${getClasses()} ${className}`.trim();

  return (
    <TouchableOpacity 
      className={combinedClasses} 
      style={style}
      activeOpacity={activeOpacity}
      {...props} 
    />
  );
};

export default Pressable;
