import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';

export interface BoxProps extends ViewProps {
  // Layout
  flex?: boolean;
  flexRow?: boolean;
  flexCol?: boolean;
  justifyCenter?: boolean;
  justifyStart?: boolean;
  justifyEnd?: boolean;
  justifyBetween?: boolean;
  justifyAround?: boolean;
  justifyEvenly?: boolean;
  itemsCenter?: boolean;
  itemsStart?: boolean;
  itemsEnd?: boolean;
  itemsStretch?: boolean;
  itemsBaseline?: boolean;
  
  // Spacing (boolean for default values, number for specific values)
  p?: boolean | number;
  px?: boolean | number;
  py?: boolean | number;
  pt?: boolean | number;
  pr?: boolean | number;
  pb?: boolean | number;
  pl?: boolean | number;
  m?: boolean | number;
  mx?: boolean | number;
  my?: boolean | number;
  mt?: boolean | number;
  mr?: boolean | number;
  mb?: boolean | number;
  ml?: boolean | number;
  
  // Specific margin values (for Android elevation and specific spacing)
  mt2?: boolean;
  mt4?: boolean;
  mt6?: boolean;
  mt8?: boolean;
  mt10?: boolean;
  mt12?: boolean;
  mt16?: boolean;
  mt20?: boolean;
  mt24?: boolean;
  mt32?: boolean;
  
  mr2?: boolean;
  mr4?: boolean;
  mr6?: boolean;
  mr8?: boolean;
  mr10?: boolean;
  mr12?: boolean;
  mr16?: boolean;
  mr20?: boolean;
  mr24?: boolean;
  mr32?: boolean;
  
  mb2?: boolean;
  mb4?: boolean;
  mb6?: boolean;
  mb8?: boolean;
  mb10?: boolean;
  mb12?: boolean;
  mb16?: boolean;
  mb20?: boolean;
  mb24?: boolean;
  mb32?: boolean;
  
  ml2?: boolean;
  ml4?: boolean;
  ml6?: boolean;
  ml8?: boolean;
  ml10?: boolean;
  ml12?: boolean;
  ml16?: boolean;
  ml20?: boolean;
  ml24?: boolean;
  ml32?: boolean;
  
  // Sizing
  wFull?: boolean;
  hFull?: boolean;
  wScreen?: boolean;
  hScreen?: boolean;
  wAuto?: boolean;
  
  // Width and Height (specific values)
  w?: number;
  h?: number;
  
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
  borderRoundedNone?: boolean;
  borderPrimary?: boolean;
  borderSecondary?: boolean;
  borderSuccess?: boolean;
  borderWarning?: boolean;
  borderError?: boolean;
  
  // Border Radius (specific values)
  rounded?: boolean;
  roundedSm?: boolean;
  roundedMd?: boolean;
  roundedLg?: boolean;
  roundedXl?: boolean;
  rounded2xl?: boolean;
  rounded3xl?: boolean;
  roundedFull?: boolean;
  
  // Shadow
  shadow?: boolean;
  shadowLg?: boolean;
  shadowXl?: boolean;
  shadow2xl?: boolean;
  shadowInner?: boolean;
  shadowNone?: boolean;
  
  // Elevation (Android specific)
  elevation0?: boolean;
  elevation1?: boolean;
  elevation2?: boolean;
  elevation3?: boolean;
  elevation4?: boolean;
  elevation5?: boolean;
  elevation6?: boolean;
  elevation8?: boolean;
  elevation10?: boolean;
  elevation12?: boolean;
  elevation16?: boolean;
  elevation20?: boolean;
  elevation24?: boolean;
  
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
  
  // Opacity (specific values)
  opacity0?: boolean;
  opacity5?: boolean;
  opacity10?: boolean;
  opacity20?: boolean;
  opacity25?: boolean;
  opacity30?: boolean;
  opacity40?: boolean;
  opacity50?: boolean;
  opacity60?: boolean;
  opacity70?: boolean;
  opacity75?: boolean;
  opacity80?: boolean;
  opacity90?: boolean;
  opacity95?: boolean;
  opacity100?: boolean;
  
  // Overflow
  overflowHidden?: boolean;
  overflowScroll?: boolean;
  overflowVisible?: boolean;
  
  // Custom classes
  className?: string;
}

const Box: React.FC<BoxProps> = ({
  flex,
  flexRow,
  flexCol,
  justifyCenter,
  justifyStart,
  justifyEnd,
  justifyBetween,
  justifyAround,
  justifyEvenly,
  itemsCenter,
  itemsStart,
  itemsEnd,
  itemsStretch,
  itemsBaseline,
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
  mt2,
  mt4,
  mt6,
  mt8,
  mt10,
  mt12,
  mt16,
  mt20,
  mt24,
  mt32,
  mr2,
  mr4,
  mr6,
  mr8,
  mr10,
  mr12,
  mr16,
  mr20,
  mr24,
  mr32,
  mb2,
  mb4,
  mb6,
  mb8,
  mb10,
  mb12,
  mb16,
  mb20,
  mb24,
  mb32,
  ml2,
  ml4,
  ml6,
  ml8,
  ml10,
  ml12,
  ml16,
  ml20,
  ml24,
  ml32,
  wFull,
  hFull,
  wScreen,
  hScreen,
  wAuto,
  w,
  h,
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
  borderRoundedNone,
  borderPrimary,
  borderSecondary,
  borderSuccess,
  borderWarning,
  borderError,
  rounded,
  roundedSm,
  roundedMd,
  roundedLg,
  roundedXl,
  rounded2xl,
  rounded3xl,
  roundedFull,
  shadow,
  shadowLg,
  shadowXl,
  shadow2xl,
  shadowInner,
  shadowNone,
  elevation0,
  elevation1,
  elevation2,
  elevation3,
  elevation4,
  elevation5,
  elevation6,
  elevation8,
  elevation10,
  elevation12,
  elevation16,
  elevation20,
  elevation24,
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
  opacity0,
  opacity5,
  opacity10,
  opacity20,
  opacity25,
  opacity30,
  opacity40,
  opacity50,
  opacity60,
  opacity70,
  opacity75,
  opacity80,
  opacity90,
  opacity95,
  opacity100,
  overflowHidden,
  overflowScroll,
  overflowVisible,
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
    if (justifyEvenly) classes.push('justify-evenly');
    if (itemsCenter) classes.push('items-center');
    if (itemsStart) classes.push('items-start');
    if (itemsEnd) classes.push('items-end');
    if (itemsStretch) classes.push('items-stretch');
    if (itemsBaseline) classes.push('items-baseline');
    
    // Spacing (boolean for default, number for specific values)
    if (p === true) classes.push('p-4');
    if (p === 2) classes.push('p-2');
    if (p === 4) classes.push('p-4');
    if (p === 6) classes.push('p-6');
    if (p === 8) classes.push('p-8');
    
    if (px === true) classes.push('px-4');
    if (px === 2) classes.push('px-2');
    if (px === 4) classes.push('px-4');
    if (px === 6) classes.push('px-6');
    if (px === 8) classes.push('px-8');
    
    if (py === true) classes.push('py-4');
    if (py === 2) classes.push('py-2');
    if (py === 4) classes.push('py-4');
    if (py === 6) classes.push('py-6');
    if (py === 8) classes.push('py-8');
    
    if (pt === true) classes.push('pt-4');
    if (pt === 2) classes.push('pt-2');
    if (pt === 4) classes.push('pt-4');
    if (pt === 6) classes.push('pt-6');
    if (pt === 8) classes.push('pt-8');
    
    if (pr === true) classes.push('pr-4');
    if (pr === 2) classes.push('pr-2');
    if (pr === 4) classes.push('pr-4');
    if (pr === 6) classes.push('pr-6');
    if (pr === 8) classes.push('pr-8');
    
    if (pb === true) classes.push('pb-4');
    if (pb === 2) classes.push('pb-2');
    if (pb === 4) classes.push('pb-4');
    if (pb === 6) classes.push('pb-6');
    if (pb === 8) classes.push('pb-8');
    
    if (pl === true) classes.push('pl-4');
    if (pl === 2) classes.push('pl-2');
    if (pl === 4) classes.push('pl-4');
    if (pl === 6) classes.push('pl-6');
    if (pl === 8) classes.push('pl-8');
    
    if (m === true) classes.push('m-4');
    if (m === 2) classes.push('m-2');
    if (m === 4) classes.push('m-4');
    if (m === 6) classes.push('m-6');
    if (m === 8) classes.push('m-8');
    
    if (mx === true) classes.push('mx-4');
    if (mx === 2) classes.push('mx-2');
    if (mx === 4) classes.push('mx-4');
    if (mx === 6) classes.push('mx-6');
    if (mx === 8) classes.push('mx-8');
    
    if (my === true) classes.push('my-4');
    if (my === 2) classes.push('my-2');
    if (my === 4) classes.push('my-4');
    if (my === 6) classes.push('my-6');
    if (my === 8) classes.push('my-8');
    
    if (mt === true) classes.push('mt-4');
    if (mt === 2) classes.push('mt-2');
    if (mt === 4) classes.push('mt-4');
    if (mt === 6) classes.push('mt-6');
    if (mt === 8) classes.push('mt-8');
    
    if (mr === true) classes.push('mr-4');
    if (mr === 2) classes.push('mr-2');
    if (mr === 4) classes.push('mr-4');
    if (mr === 6) classes.push('mr-6');
    if (mr === 8) classes.push('mr-8');
    
    if (mb === true) classes.push('mb-4');
    if (mb === 2) classes.push('mb-2');
    if (mb === 4) classes.push('mb-4');
    if (mb === 6) classes.push('mb-6');
    if (mb === 8) classes.push('mb-8');
    
    if (ml === true) classes.push('ml-4');
    if (ml === 2) classes.push('ml-2');
    if (ml === 4) classes.push('ml-4');
    if (ml === 6) classes.push('ml-6');
    if (ml === 8) classes.push('ml-8');
    
    // Specific margin values
    if (mt2) classes.push('mt-2');
    if (mt4) classes.push('mt-4');
    if (mt6) classes.push('mt-6');
    if (mt8) classes.push('mt-8');
    if (mt10) classes.push('mt-10');
    if (mt12) classes.push('mt-12');
    if (mt16) classes.push('mt-16');
    if (mt20) classes.push('mt-20');
    if (mt24) classes.push('mt-24');
    if (mt32) classes.push('mt-32');
    
    if (mr2) classes.push('mr-2');
    if (mr4) classes.push('mr-4');
    if (mr6) classes.push('mr-6');
    if (mr8) classes.push('mr-8');
    if (mr10) classes.push('mr-10');
    if (mr12) classes.push('mr-12');
    if (mr16) classes.push('mr-16');
    if (mr20) classes.push('mr-20');
    if (mr24) classes.push('mr-24');
    if (mr32) classes.push('mr-32');
    
    if (mb2) classes.push('mb-2');
    if (mb4) classes.push('mb-4');
    if (mb6) classes.push('mb-6');
    if (mb8) classes.push('mb-8');
    if (mb10) classes.push('mb-10');
    if (mb12) classes.push('mb-12');
    if (mb16) classes.push('mb-16');
    if (mb20) classes.push('mb-20');
    if (mb24) classes.push('mb-24');
    if (mb32) classes.push('mb-32');
    
    if (ml2) classes.push('ml-2');
    if (ml4) classes.push('ml-4');
    if (ml6) classes.push('ml-6');
    if (ml8) classes.push('ml-8');
    if (ml10) classes.push('ml-10');
    if (ml12) classes.push('ml-12');
    if (ml16) classes.push('ml-16');
    if (ml20) classes.push('ml-20');
    if (ml24) classes.push('ml-24');
    if (ml32) classes.push('ml-32');
    
    // Sizing
    if (wFull) classes.push('w-full');
    if (hFull) classes.push('h-full');
    if (wScreen) classes.push('w-screen');
    if (hScreen) classes.push('h-screen');
    if (wAuto) classes.push('w-auto');
    
    // Width and Height (specific values)
    if (w) classes.push(`w-${w}`);
    if (h) classes.push(`h-${h}`);
    
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
    if (borderRoundedNone) classes.push('rounded-none');
    if (borderPrimary) classes.push('border-primary-500');
    if (borderSecondary) classes.push('border-secondary-500');
    if (borderSuccess) classes.push('border-success-500');
    if (borderWarning) classes.push('border-warning-500');
    if (borderError) classes.push('border-error-500');
    
    // Border Radius (specific values)
    if (rounded) classes.push('rounded');
    if (roundedSm) classes.push('rounded-sm');
    if (roundedMd) classes.push('rounded-md');
    if (roundedLg) classes.push('rounded-lg');
    if (roundedXl) classes.push('rounded-xl');
    if (rounded2xl) classes.push('rounded-2xl');
    if (rounded3xl) classes.push('rounded-3xl');
    if (roundedFull) classes.push('rounded-full');
    
    // Shadow
    if (shadow) classes.push('shadow');
    if (shadowLg) classes.push('shadow-lg');
    if (shadowXl) classes.push('shadow-xl');
    if (shadow2xl) classes.push('shadow-2xl');
    if (shadowInner) classes.push('shadow-inner');
    if (shadowNone) classes.push('shadow-none');
    
    // Elevation (Android specific)
    if (elevation0) classes.push('elevation-0');
    if (elevation1) classes.push('elevation-1');
    if (elevation2) classes.push('elevation-2');
    if (elevation3) classes.push('elevation-3');
    if (elevation4) classes.push('elevation-4');
    if (elevation5) classes.push('elevation-5');
    if (elevation6) classes.push('elevation-6');
    if (elevation8) classes.push('elevation-8');
    if (elevation10) classes.push('elevation-10');
    if (elevation12) classes.push('elevation-12');
    if (elevation16) classes.push('elevation-16');
    if (elevation20) classes.push('elevation-20');
    if (elevation24) classes.push('elevation-24');
    
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
    
    // Opacity (specific values)
    if (opacity0) classes.push('opacity-0');
    if (opacity5) classes.push('opacity-5');
    if (opacity10) classes.push('opacity-10');
    if (opacity20) classes.push('opacity-20');
    if (opacity25) classes.push('opacity-25');
    if (opacity30) classes.push('opacity-30');
    if (opacity40) classes.push('opacity-40');
    if (opacity50) classes.push('opacity-50');
    if (opacity60) classes.push('opacity-60');
    if (opacity70) classes.push('opacity-70');
    if (opacity75) classes.push('opacity-75');
    if (opacity80) classes.push('opacity-80');
    if (opacity90) classes.push('opacity-90');
    if (opacity95) classes.push('opacity-95');
    if (opacity100) classes.push('opacity-100');
    
    // Overflow
    if (overflowHidden) classes.push('overflow-hidden');
    if (overflowScroll) classes.push('overflow-scroll');
    if (overflowVisible) classes.push('overflow-visible');
    
    return classes.join(' ');
  };

  const combinedClasses = `${getClasses()} ${className}`.trim();

  return (
    <View className={combinedClasses} style={style} {...props} />
  );
};

export default Box;
