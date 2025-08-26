import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export interface TextProps extends RNTextProps {
  // Typography variants
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  body?: boolean;
  bodyLg?: boolean;
  bodySm?: boolean;
  caption?: boolean;
  label?: boolean;
  
  // Font weight
  fontLight?: boolean;
  fontNormal?: boolean;
  fontMedium?: boolean;
  fontSemibold?: boolean;
  fontBold?: boolean;
  fontExtrabold?: boolean;
  
  // Text alignment
  textCenter?: boolean;
  textLeft?: boolean;
  textRight?: boolean;
  textJustify?: boolean;
  
  // Text colors
  textPrimary?: boolean;
  textSecondary?: boolean;
  textSuccess?: boolean;
  textWarning?: boolean;
  textError?: boolean;
  textWhite?: boolean;
  textBlack?: boolean;
  textGray?: boolean;
  
  // Text decoration
  underline?: boolean;
  lineThrough?: boolean;
  noUnderline?: boolean;
  
  // Text transform
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  normalCase?: boolean;
  
  // Spacing
  leadingTight?: boolean;
  leadingNormal?: boolean;
  leadingRelaxed?: boolean;
  leadingLoose?: boolean;
  
  // Custom classes
  className?: string;
}

const Text: React.FC<TextProps> = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  body,
  bodyLg,
  bodySm,
  caption,
  label,
  fontLight,
  fontNormal,
  fontMedium,
  fontSemibold,
  fontBold,
  fontExtrabold,
  textCenter,
  textLeft,
  textRight,
  textJustify,
  textPrimary,
  textSecondary,
  textSuccess,
  textWarning,
  textError,
  textWhite,
  textBlack,
  textGray,
  underline,
  lineThrough,
  noUnderline,
  uppercase,
  lowercase,
  capitalize,
  normalCase,
  leadingTight,
  leadingNormal,
  leadingRelaxed,
  leadingLoose,
  className = '',
  ...props
}) => {
  const getClasses = () => {
    const classes: string[] = [];
    
    // Typography variants
    if (h1) classes.push('text-4xl');
    if (h2) classes.push('text-3xl');
    if (h3) classes.push('text-2xl');
    if (h4) classes.push('text-xl');
    if (h5) classes.push('text-lg');
    if (h6) classes.push('text-base');
    if (body) classes.push('text-base');
    if (bodyLg) classes.push('text-lg');
    if (bodySm) classes.push('text-sm');
    if (caption) classes.push('text-sm');
    if (label) classes.push('text-sm');
    
    // Font weight
    if (fontLight) classes.push('font-light');
    if (fontNormal) classes.push('font-normal');
    if (fontMedium) classes.push('font-medium');
    if (fontSemibold) classes.push('font-semibold');
    if (fontBold) classes.push('font-bold');
    if (fontExtrabold) classes.push('font-extrabold');
    
    // Text alignment
    if (textCenter) classes.push('text-center');
    if (textLeft) classes.push('text-left');
    if (textRight) classes.push('text-right');
    if (textJustify) classes.push('text-justify');
    
    // Text colors
    if (textPrimary) classes.push('text-primary-600');
    if (textSecondary) classes.push('text-secondary-600');
    if (textSuccess) classes.push('text-success-600');
    if (textWarning) classes.push('text-warning-600');
    if (textError) classes.push('text-error-600');
    if (textWhite) classes.push('text-white');
    if (textBlack) classes.push('text-black');
    if (textGray) classes.push('text-gray-600');
    
    // Text decoration
    if (underline) classes.push('underline');
    if (lineThrough) classes.push('line-through');
    if (noUnderline) classes.push('no-underline');
    
    // Text transform
    if (uppercase) classes.push('uppercase');
    if (lowercase) classes.push('lowercase');
    if (capitalize) classes.push('capitalize');
    if (normalCase) classes.push('normal-case');
    
    // Spacing
    if (leadingTight) classes.push('leading-tight');
    if (leadingNormal) classes.push('leading-normal');
    if (leadingRelaxed) classes.push('leading-relaxed');
    if (leadingLoose) classes.push('leading-loose');
    
    return classes.join(' ');
  };

  const combinedClasses = `${getClasses()} ${className}`.trim();

  return (
    <RNText className={combinedClasses} {...props} />
  );
};

export default Text;
