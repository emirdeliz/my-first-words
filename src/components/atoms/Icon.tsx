import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Available icon types in the app
type IconName = 
  // Navigation
  | 'arrow-back'
  | 'check'
  | 'close'
  | 'language'
  | 'photo-camera'
  | 'photo-library'
  
  // Main categories
  | 'home'
  | 'mood'
  | 'sports-esports'
  | 'people'
  
  // Basic needs
  | 'restaurant'
  | 'local-drink'
  | 'bed'
  | 'wc'
  | 'help'
  | 'pause'
  
  // Emotions
  | 'mood-bad'
  | 'sentiment-very-dissatisfied'
  | 'warning'
  | 'celebration'
  | 'spa'
  
  // Activities
  | 'book'
  | 'music-note'
  | 'nature'
  | 'tv'
  | 'brush'
  
  // Social
  | 'waving-hand'
  | 'back-hand'
  | 'volunteer-activism'
  | 'favorite'
  | 'sentiment-dissatisfied'
  
  // Interface
  | 'record-voice-over';

interface IconProps {
  name: IconName;
  
  // Sizes
  isTiny?: boolean;      // 16px
  isSmall?: boolean;     // 20px
  isMedium?: boolean;    // 24px
  isLarge?: boolean;     // 28px
  isXLarge?: boolean;    // 36px
  isXXLarge?: boolean;   // 48px
  isHuge?: boolean;      // 80px
  
  // Colors
  isPrimary?: boolean;   // blue
  isSecondary?: boolean; // green
  isAccent?: boolean;    // purple
  isWarning?: boolean;   // yellow
  isSuccess?: boolean;   // light green
  isError?: boolean;     // red
  isWhite?: boolean;     // white
  isGray?: boolean;      // gray
  isDark?: boolean;      // dark
  
  // Styles
  isBold?: boolean;
  isOutlined?: boolean;
  isSharp?: boolean;
  
  // Layout - Flexbox
  isFlex?: boolean;
  isFlexRow?: boolean;
  isFlexCol?: boolean;
  isFlexWrap?: boolean;
  isFlex1?: boolean;
  isFlexGrow?: boolean;
  isFlexShrink?: boolean;
  
  // Layout - Justify
  isJustifyStart?: boolean;
  isJustifyEnd?: boolean;
  isJustifyCenter?: boolean;
  isJustifyBetween?: boolean;
  isJustifyAround?: boolean;
  isJustifyEvenly?: boolean;
  
  // Layout - Align
  isItemsStart?: boolean;
  isItemsEnd?: boolean;
  isItemsCenter?: boolean;
  isItemsBaseline?: boolean;
  isItemsStretch?: boolean;
  isSelfCenter?: boolean;
  isSelfStart?: boolean;
  isSelfEnd?: boolean;
  
  // Layout - Spacing
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
  
  // Layout - Position
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
  
  // Layout - Display
  isHidden?: boolean;
  isVisible?: boolean;
  isBlock?: boolean;
  isInline?: boolean;
  isInlineBlock?: boolean;
  
  // Layout - Overflow
  isOverflowHidden?: boolean;
  isOverflowVisible?: boolean;
  isOverflowScroll?: boolean;
  isOverflowAuto?: boolean;
  
  // Layout - Width/Height
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
  
  // Layout - Border
  isRounded?: boolean;
  isRoundedLg?: boolean;
  isRoundedXl?: boolean;
  isRounded2xl?: boolean;
  isRoundedFull?: boolean;
  isRoundedTop?: boolean;
  isRoundedBottom?: boolean;
  isRoundedLeft?: boolean;
  isRoundedRight?: boolean;
  
  // Layout - Shadow
  hasShadow?: boolean;
  hasShadowSm?: boolean;
  hasShadowMd?: boolean;
  hasShadowLg?: boolean;
  hasShadowXl?: boolean;
  hasShadow2xl?: boolean;
  
  // Interactivity
  isClickable?: boolean;
  isDisabled?: boolean;
  
  // Customization
  customSize?: number;
  customColor?: string;
  customClasses?: string;
  
  // Events
  onPress?: () => void;
}

const Icon = ({
  name,
  
  // Sizes
  isTiny = false,
  isSmall = false,
  isMedium = false,
  isLarge = false,
  isXLarge = false,
  isXXLarge = false,
  isHuge = false,
  
  // Colors
  isPrimary = false,
  isSecondary = false,
  isAccent = false,
  isWarning = false,
  isSuccess = false,
  isError = false,
  isWhite = false,
  isGray = false,
  isDark = false,
  
  // Styles
  isBold = false,
  isOutlined = false,
  isSharp = false,
  
  // Layout - Flexbox
  isFlex = false,
  isFlexRow = false,
  isFlexCol = false,
  isFlexWrap = false,
  isFlex1 = false,
  isFlexGrow = false,
  isFlexShrink = false,
  
  // Layout - Justify
  isJustifyStart = false,
  isJustifyEnd = false,
  isJustifyCenter = false,
  isJustifyBetween = false,
  isJustifyAround = false,
  isJustifyEvenly = false,
  
  // Layout - Align
  isItemsStart = false,
  isItemsEnd = false,
  isItemsCenter = false,
  isItemsBaseline = false,
  isItemsStretch = false,
  isSelfCenter = false,
  isSelfStart = false,
  isSelfEnd = false,
  
  // Layout - Spacing
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
  
  // Layout - Position
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
  
  // Layout - Display
  isHidden = false,
  isVisible = false,
  isBlock = false,
  isInline = false,
  isInlineBlock = false,
  
  // Layout - Overflow
  isOverflowHidden = false,
  isOverflowVisible = false,
  isOverflowScroll = false,
  isOverflowAuto = false,
  
  // Layout - Width/Height
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
  
  // Layout - Border
  isRounded = false,
  isRoundedLg = false,
  isRoundedXl = false,
  isRounded2xl = false,
  isRoundedFull = false,
  isRoundedTop = false,
  isRoundedBottom = false,
  isRoundedLeft = false,
  isRoundedRight = false,
  
  // Layout - Shadow
  hasShadow = false,
  hasShadowSm = false,
  hasShadowMd = false,
  hasShadowLg = false,
  hasShadowXl = false,
  hasShadow2xl = false,
  
  // Interactivity
  isClickable = false,
  isDisabled = false,
  
  // Customization
  customSize,
  customColor,
  customClasses = '',
  
  // Events
  onPress
}: IconProps) => {
  
  // Function to determine size
  const getSize = (): number => {
    if (customSize) return customSize;
    if (isHuge) return 80;
    if (isXXLarge) return 48;
    if (isXLarge) return 36;
    if (isLarge) return 28;
    if (isMedium) return 24;
    if (isSmall) return 20;
    if (isTiny) return 16;
    return 24; // default
  };

  // Function to determine color
  const getColor = (): string => {
    if (customColor) return customColor;
    if (isPrimary) return '#3b82f6';      // blue-500
    if (isSecondary) return '#10b981';    // emerald-500
    if (isAccent) return '#8b5cf6';       // violet-500
    if (isWarning) return '#f59e0b';      // amber-500
    if (isSuccess) return '#22c55e';      // green-500
    if (isError) return '#ef4444';        // red-500
    if (isWhite) return '#ffffff';
    if (isGray) return '#6b7280';         // gray-500
    if (isDark) return '#111827';         // gray-900
    return '#6b7280'; // default gray
  };

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
    
    // Add custom classes
    if (customClasses) {
      classes.push(customClasses);
    }
    
    return classes.join(' ');
  };

  const iconElement = (
    <MaterialIcons
      name={name}
      size={getSize()}
      color={getColor()}
      style={{
        fontWeight: isBold ? 'bold' : 'normal',
      }}
    />
  );

  // If clickable, wrap in TouchableOpacity
  if (isClickable && onPress) {
    return (
      <TouchableOpacity 
        className={getLayoutClasses()}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={isDisabled ? 1 : 0.7}
      >
        {iconElement}
      </TouchableOpacity>
    );
  }

  // If not clickable, return just the icon
  return (
    <View className={getLayoutClasses()}>
      {iconElement}
    </View>
  );
};

export default Icon;
