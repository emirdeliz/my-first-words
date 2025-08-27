import React from 'react';
import { Text, TextProps } from 'react-native';

interface LayoutTextProps extends TextProps {
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
  
  // Custom Classes
  customClasses?: string;
  
  children?: React.ReactNode;
}

const LayoutText = ({
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
  
  // Custom Classes
  customClasses = '',
  
  children,
  ...textProps
}: LayoutTextProps) => {
  
  // Function to determine all text classes
  const getTextClasses = (): string => {
    const classes: string[] = [];
    
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
    
    // Add custom classes
    if (customClasses) {
      classes.push(customClasses);
    }
    
    return classes.join(' ');
  };

  return (
    <Text className={getTextClasses()} {...textProps}>
      {children}
    </Text>
  );
};

export default LayoutText;
