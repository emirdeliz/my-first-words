import React from 'react';
import { View, ViewProps } from 'react-native';

interface LayoutViewProps extends ViewProps {
  // Flexbox
  isFlex?: boolean;
  isFlexRow?: boolean;
  isFlexCol?: boolean;
  isFlexWrap?: boolean;
  isFlex1?: boolean;
  isFlexGrow?: boolean;
  isFlexShrink?: boolean;
  
  // Justify
  isJustifyStart?: boolean;
  isJustifyEnd?: boolean;
  isJustifyCenter?: boolean;
  isJustifyBetween?: boolean;
  isJustifyAround?: boolean;
  isJustifyEvenly?: boolean;
  
  // Align
  isItemsStart?: boolean;
  isItemsEnd?: boolean;
  isItemsCenter?: boolean;
  isItemsBaseline?: boolean;
  isItemsStretch?: boolean;
  isSelfCenter?: boolean;
  isSelfStart?: boolean;
  isSelfEnd?: boolean;
  
  // Spacing
  hasMargin?: boolean;
  hasMarginX?: boolean;
  hasMarginY?: boolean;
  hasMarginTop?: boolean;
  hasMarginBottom?: boolean;
  hasMarginLeft?: boolean;
  hasMarginRight?: boolean;
  hasPadding?: boolean;
  hasPaddingX?: boolean;
  hasPaddingY?: boolean;
  hasPaddingTop?: boolean;
  hasPaddingBottom?: boolean;
  hasPaddingLeft?: boolean;
  hasPaddingRight?: boolean;
  
  // Position
  isAbsolute?: boolean;
  isRelative?: boolean;
  isFixed?: boolean;
  isSticky?: boolean;
  isTop?: boolean;
  isBottom?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
  isInset?: boolean;
  isZ10?: boolean;
  isZ20?: boolean;
  isZ30?: boolean;
  isZ40?: boolean;
  isZ50?: boolean;
  
  // Display
  isHidden?: boolean;
  isVisible?: boolean;
  isBlock?: boolean;
  isInline?: boolean;
  isInlineBlock?: boolean;
  
  // Overflow
  isOverflowHidden?: boolean;
  isOverflowVisible?: boolean;
  isOverflowScroll?: boolean;
  isOverflowAuto?: boolean;
  
  // Width/Height
  isWFull?: boolean;
  isHFull?: boolean;
  isWScreen?: boolean;
  isHScreen?: boolean;
  isW48?: boolean;
  isW30?: boolean;
  isAspectSquare?: boolean;
  isAspectVideo?: boolean;
  isAspect56?: boolean;
  isAspect65?: boolean;
  
  // Border
  isRounded?: boolean;
  isRoundedLg?: boolean;
  isRoundedXl?: boolean;
  isRounded2xl?: boolean;
  isRoundedFull?: boolean;
  isRoundedTop?: boolean;
  isRoundedBottom?: boolean;
  isRoundedLeft?: boolean;
  isRoundedRight?: boolean;
  
  // Shadow
  hasShadow?: boolean;
  hasShadowSm?: boolean;
  hasShadowMd?: boolean;
  hasShadowLg?: boolean;
  hasShadowXl?: boolean;
  hasShadow2xl?: boolean;
  
  // Background Colors
  isBgBlack?: boolean;
  isBgWhite?: boolean;
  isBgGray?: boolean;
  isBgGray100?: boolean;
  isBgGray200?: boolean;
  isBgGray300?: boolean;
  isBgGray400?: boolean;
  isBgGray500?: boolean;
  isBgGray600?: boolean;
  isBgGray700?: boolean;
  isBgGray800?: boolean;
  isBgGray900?: boolean;
  isBgPrimary600?: boolean;
  isBgSlate50?: boolean;
  isBgYellow400?: boolean;
  isBgBlack50?: boolean;
  
  // Text Colors
  isTextWhite?: boolean;
  isTextBlack?: boolean;
  isTextGray?: boolean;
  isTextGray300?: boolean;
  isTextGray800?: boolean;
  
  // Text Sizes
  isTextXl?: boolean;
  isText3xl?: boolean;
  isTextBase?: boolean;
  isTextLg?: boolean;
  isTextSm?: boolean;
  isTextXs?: boolean;
  
  // Text Weights
  isFontBold?: boolean;
  isFontSemibold?: boolean;
  isFontMedium?: boolean;
  
  // Text Alignment
  isTextCenter?: boolean;
  
  // Custom Classes
  customClasses?: string;
  
  children?: React.ReactNode;
}

const LayoutView = ({
  // Flexbox
  isFlex = false,
  isFlexRow = false,
  isFlexCol = false,
  isFlexWrap = false,
  isFlex1 = false,
  isFlexGrow = false,
  isFlexShrink = false,
  
  // Justify
  isJustifyStart = false,
  isJustifyEnd = false,
  isJustifyCenter = false,
  isJustifyBetween = false,
  isJustifyAround = false,
  isJustifyEvenly = false,
  
  // Align
  isItemsStart = false,
  isItemsEnd = false,
  isItemsCenter = false,
  isItemsBaseline = false,
  isItemsStretch = false,
  isSelfCenter = false,
  isSelfStart = false,
  isSelfEnd = false,
  
  // Spacing
  hasMargin = false,
  hasMarginX = false,
  hasMarginY = false,
  hasMarginTop = false,
  hasMarginBottom = false,
  hasMarginLeft = false,
  hasMarginRight = false,
  hasPadding = false,
  hasPaddingX = false,
  hasPaddingY = false,
  hasPaddingTop = false,
  hasPaddingBottom = false,
  hasPaddingLeft = false,
  hasPaddingRight = false,
  
  // Position
  isAbsolute = false,
  isRelative = false,
  isFixed = false,
  isSticky = false,
  isTop = false,
  isBottom = false,
  isLeft = false,
  isRight = false,
  isInset = false,
  isZ10 = false,
  isZ20 = false,
  isZ30 = false,
  isZ40 = false,
  isZ50 = false,
  
  // Display
  isHidden = false,
  isVisible = false,
  isBlock = false,
  isInline = false,
  isInlineBlock = false,
  
  // Overflow
  isOverflowHidden = false,
  isOverflowVisible = false,
  isOverflowScroll = false,
  isOverflowAuto = false,
  
  // Width/Height
  isWFull = false,
  isHFull = false,
  isWScreen = false,
  isHScreen = false,
  isW48 = false,
  isW30 = false,
  isAspectSquare = false,
  isAspectVideo = false,
  isAspect56 = false,
  isAspect65 = false,
  
  // Border
  isRounded = false,
  isRoundedLg = false,
  isRoundedXl = false,
  isRounded2xl = false,
  isRoundedFull = false,
  isRoundedTop = false,
  isRoundedBottom = false,
  isRoundedLeft = false,
  isRoundedRight = false,
  
  // Shadow
  hasShadow = false,
  hasShadowSm = false,
  hasShadowMd = false,
  hasShadowLg = false,
  hasShadowXl = false,
  hasShadow2xl = false,
  
  // Background Colors
  isBgBlack = false,
  isBgWhite = false,
  isBgGray = false,
  isBgGray100 = false,
  isBgGray200 = false,
  isBgGray300 = false,
  isBgGray400 = false,
  isBgGray500 = false,
  isBgGray600 = false,
  isBgGray700 = false,
  isBgGray800 = false,
  isBgGray900 = false,
  isBgPrimary600 = false,
  isBgSlate50 = false,
  isBgYellow400 = false,
  isBgBlack50 = false,
  
  // Text Colors
  isTextWhite = false,
  isTextBlack = false,
  isTextGray = false,
  isTextGray300 = false,
  isTextGray800 = false,
  
  // Text Sizes
  isTextXl = false,
  isText3xl = false,
  isTextBase = false,
  isTextLg = false,
  isTextSm = false,
  isTextXs = false,
  
  // Text Weights
  isFontBold = false,
  isFontSemibold = false,
  isFontMedium = false,
  
  // Text Alignment
  isTextCenter = false,
  
  // Custom Classes
  customClasses = '',
  
  children,
  ...viewProps
}: LayoutViewProps) => {
  
  // Function to determine all layout classes
  const getLayoutClasses = (): string => {
    const classes: string[] = [];
    
    // Flexbox
    if (isFlex) classes.push('flex');
    if (isFlexRow) classes.push('flex-row');
    if (isFlexCol) classes.push('flex-col');
    if (isFlexWrap) classes.push('flex-wrap');
    if (isFlex1) classes.push('flex-1');
    if (isFlexGrow) classes.push('flex-grow');
    if (isFlexShrink) classes.push('flex-shrink');
    
    // Justify
    if (isJustifyStart) classes.push('justify-start');
    if (isJustifyEnd) classes.push('justify-end');
    if (isJustifyCenter) classes.push('justify-center');
    if (isJustifyBetween) classes.push('justify-between');
    if (isJustifyAround) classes.push('justify-around');
    if (isJustifyEvenly) classes.push('justify-evenly');
    
    // Align
    if (isItemsStart) classes.push('items-start');
    if (isItemsEnd) classes.push('items-end');
    if (isItemsCenter) classes.push('items-center');
    if (isItemsBaseline) classes.push('items-baseline');
    if (isItemsStretch) classes.push('items-stretch');
    if (isSelfCenter) classes.push('self-center');
    if (isSelfStart) classes.push('self-start');
    if (isSelfEnd) classes.push('self-end');
    
    // Spacing
    if (hasMargin) classes.push('m-2');
    if (hasMarginX) classes.push('mx-2');
    if (hasMarginY) classes.push('my-2');
    if (hasMarginTop) classes.push('mt-2');
    if (hasMarginBottom) classes.push('mb-2');
    if (hasMarginLeft) classes.push('ml-2');
    if (hasMarginRight) classes.push('mr-2');
    if (hasPadding) classes.push('p-2');
    if (hasPaddingX) classes.push('px-2');
    if (hasPaddingY) classes.push('py-2');
    if (hasPaddingTop) classes.push('pt-2');
    if (hasPaddingBottom) classes.push('pb-2');
    if (hasPaddingLeft) classes.push('pl-2');
    if (hasPaddingRight) classes.push('pr-2');
    
    // Position
    if (isAbsolute) classes.push('absolute');
    if (isRelative) classes.push('relative');
    if (isFixed) classes.push('fixed');
    if (isSticky) classes.push('sticky');
    if (isTop) classes.push('top-0');
    if (isBottom) classes.push('bottom-0');
    if (isLeft) classes.push('left-0');
    if (isRight) classes.push('right-0');
    if (isInset) classes.push('inset-0');
    if (isZ10) classes.push('z-10');
    if (isZ20) classes.push('z-20');
    if (isZ30) classes.push('z-30');
    if (isZ40) classes.push('z-40');
    if (isZ50) classes.push('z-50');
    
    // Display
    if (isHidden) classes.push('hidden');
    if (isVisible) classes.push('visible');
    if (isBlock) classes.push('block');
    if (isInline) classes.push('inline');
    if (isInlineBlock) classes.push('inline-block');
    
    // Overflow
    if (isOverflowHidden) classes.push('overflow-hidden');
    if (isOverflowVisible) classes.push('overflow-visible');
    if (isOverflowScroll) classes.push('overflow-scroll');
    if (isOverflowAuto) classes.push('overflow-auto');
    
    // Width/Height
    if (isWFull) classes.push('w-full');
    if (isHFull) classes.push('h-full');
    if (isWScreen) classes.push('w-screen');
    if (isHScreen) classes.push('h-screen');
    if (isW48) classes.push('w-[48%]');
    if (isW30) classes.push('w-[30%]');
    if (isAspectSquare) classes.push('aspect-square');
    if (isAspectVideo) classes.push('aspect-video');
    if (isAspect56) classes.push('aspect-[5/6]');
    if (isAspect65) classes.push('aspect-[6/5]');
    
    // Border
    if (isRounded) classes.push('rounded');
    if (isRoundedLg) classes.push('rounded-lg');
    if (isRoundedXl) classes.push('rounded-xl');
    if (isRounded2xl) classes.push('rounded-2xl');
    if (isRoundedFull) classes.push('rounded-full');
    if (isRoundedTop) classes.push('rounded-t-lg');
    if (isRoundedBottom) classes.push('rounded-b-lg');
    if (isRoundedLeft) classes.push('rounded-l-lg');
    if (isRoundedRight) classes.push('rounded-r-lg');
    
    // Shadow
    if (hasShadow) classes.push('shadow');
    if (hasShadowSm) classes.push('shadow-sm');
    if (hasShadowMd) classes.push('shadow-md');
    if (hasShadowLg) classes.push('shadow-lg');
    if (hasShadowXl) classes.push('shadow-xl');
    if (hasShadow2xl) classes.push('shadow-2xl');
    
    // Background Colors
    if (isBgBlack) classes.push('bg-black');
    if (isBgWhite) classes.push('bg-white');
    if (isBgGray) classes.push('bg-gray');
    if (isBgGray100) classes.push('bg-gray-100');
    if (isBgGray200) classes.push('bg-gray-200');
    if (isBgGray300) classes.push('bg-gray-300');
    if (isBgGray400) classes.push('bg-gray-400');
    if (isBgGray500) classes.push('bg-gray-500');
    if (isBgGray600) classes.push('bg-gray-600');
    if (isBgGray700) classes.push('bg-gray-700');
    if (isBgGray800) classes.push('bg-gray-800');
    if (isBgGray900) classes.push('bg-gray-900');
    if (isBgPrimary600) classes.push('bg-primary-600');
    if (isBgSlate50) classes.push('bg-slate-50');
    if (isBgYellow400) classes.push('bg-yellow-400');
    if (isBgBlack50) classes.push('bg-black/50');
    
    // Text Colors
    if (isTextWhite) classes.push('text-white');
    if (isTextBlack) classes.push('text-black');
    if (isTextGray) classes.push('text-gray');
    if (isTextGray300) classes.push('text-gray-300');
    if (isTextGray800) classes.push('text-gray-800');
    
    // Text Sizes
    if (isTextXl) classes.push('text-xl');
    if (isText3xl) classes.push('text-3xl');
    if (isTextBase) classes.push('text-base');
    if (isTextLg) classes.push('text-lg');
    if (isTextSm) classes.push('text-sm');
    if (isTextXs) classes.push('text-xs');
    
    // Text Weights
    if (isFontBold) classes.push('font-bold');
    if (isFontSemibold) classes.push('font-semibold');
    if (isFontMedium) classes.push('font-medium');
    
    // Text Alignment
    if (isTextCenter) classes.push('text-center');
    
    // Add custom classes
    if (customClasses) {
      classes.push(customClasses);
    }
    
    return classes.join(' ');
  };

  return (
    <View className={getLayoutClasses()} {...viewProps}>
      {children}
    </View>
  );
};

export default LayoutView;
