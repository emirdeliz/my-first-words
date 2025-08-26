import React, { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

export interface InputFieldProps extends TextInputProps {
  // Layout
  wFull?: boolean;
  hAuto?: boolean;
  
  // Spacing
  p?: boolean;
  px?: boolean;
  py?: boolean;
  m?: boolean;
  mx?: boolean;
  my?: boolean;
  mt?: boolean;
  mb?: boolean;
  
  // Background
  bgWhite?: boolean;
  bgGray?: boolean;
  bgTransparent?: boolean;
  
  // Border
  border?: boolean;
  borderRounded?: boolean;
  borderRoundedLg?: boolean;
  borderRoundedXl?: boolean;
  borderPrimary?: boolean;
  borderSecondary?: boolean;
  borderSuccess?: boolean;
  borderWarning?: boolean;
  borderError?: boolean;
  borderFocus?: boolean;
  
  // Shadow
  shadow?: boolean;
  shadowLg?: boolean;
  shadowXl?: boolean;
  
  // Text styling
  textPrimary?: boolean;
  textSecondary?: boolean;
  textBlack?: boolean;
  textGray?: boolean;
  textCenter?: boolean;
  textLeft?: boolean;
  textRight?: boolean;
  
  // Font weight
  fontNormal?: boolean;
  fontMedium?: boolean;
  fontSemibold?: boolean;
  fontBold?: boolean;
  
  // Placeholder
  placeholderTextColor?: string;
  
  // Icon
  leftIcon?: string;
  rightIcon?: string;
  iconColor?: string;
  
  // States
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  
  // Custom classes
  className?: string;
  containerClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  wFull,
  hAuto,
  p,
  px,
  py,
  m,
  mx,
  my,
  mt,
  mb,
  bgWhite,
  bgGray,
  bgTransparent,
  border,
  borderRounded,
  borderRoundedLg,
  borderRoundedXl,
  borderPrimary,
  borderSecondary,
  borderSuccess,
  borderWarning,
  borderError,
  borderFocus,
  shadow,
  shadowLg,
  shadowXl,
  textPrimary,
  textSecondary,
  textBlack,
  textGray,
  textCenter,
  textLeft,
  textRight,
  fontNormal,
  fontMedium,
  fontSemibold,
  fontBold,
  placeholderTextColor = '#9CA3AF',
  leftIcon,
  rightIcon,
  iconColor = '#6B7280',
  error,
  success,
  disabled,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getInputClasses = () => {
    const classes: string[] = [];
    
    // Sizing
    if (wFull) classes.push('w-full');
    if (hAuto) classes.push('h-auto');
    
    // Spacing
    if (p) classes.push('p-4');
    if (px) classes.push('px-4');
    if (py) classes.push('py-3');
    
    // Background
    if (bgWhite) classes.push('bg-white');
    if (bgGray) classes.push('bg-gray-50');
    if (bgTransparent) classes.push('bg-transparent');
    
    // Border
    if (border) classes.push('border');
    if (borderRounded) classes.push('rounded');
    if (borderRoundedLg) classes.push('rounded-lg');
    if (borderRoundedXl) classes.push('rounded-xl');
    
    // Border colors
    if (error) classes.push('border-error-500');
    else if (success) classes.push('border-success-500');
    else if (borderPrimary) classes.push('border-primary-500');
    else if (borderSecondary) classes.push('border-secondary-500');
    else if (borderWarning) classes.push('border-warning-500');
    else if (borderError) classes.push('border-error-500');
    else if (isFocused && borderFocus) classes.push('border-primary-500');
    else classes.push('border-gray-300');
    
    // Shadow
    if (shadow) classes.push('shadow');
    if (shadowLg) classes.push('shadow-lg');
    if (shadowXl) classes.push('shadow-xl');
    
    // Text styling
    if (textPrimary) classes.push('text-primary-600');
    if (textSecondary) classes.push('text-secondary-600');
    if (textBlack) classes.push('text-black');
    if (textGray) classes.push('text-gray-600');
    if (textCenter) classes.push('text-center');
    if (textLeft) classes.push('text-left');
    if (textRight) classes.push('text-right');
    
    // Font weight
    if (fontNormal) classes.push('font-normal');
    if (fontMedium) classes.push('font-medium');
    if (fontSemibold) classes.push('font-semibold');
    if (fontBold) classes.push('font-bold');
    
    // States
    if (disabled) classes.push('opacity-50');
    
    return classes.join(' ');
  };

  const getContainerClasses = () => {
    const classes: string[] = [];
    
    // Spacing
    if (m) classes.push('m-4');
    if (mx) classes.push('mx-4');
    if (my) classes.push('my-4');
    if (mt) classes.push('mt-4');
    if (mb) classes.push('mb-4');
    
    return classes.join(' ');
  };

  const inputClasses = `${getInputClasses()} ${className}`.trim();
  const containerClasses = `${getContainerClasses()} ${containerClassName}`.trim();

  return (
    <View className={containerClasses}>
      <View className="relative">
        <TextInput
          className={inputClasses}
          placeholderTextColor={placeholderTextColor}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          {...props}
          style={[
            leftIcon && { paddingLeft: 40 },
            rightIcon && { paddingRight: 40 },
          ]}
        />
      </View>
    </View>
  );
};

export default InputField;
