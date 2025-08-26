import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  secureTextEntry?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  secureTextEntry = false,
  disabled = false,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  ...rest
}) => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderLeftIcon = () => {
    if (!leftIcon) return null;
    return (
      <Icon
        name={leftIcon}
        size={20}
        color={theme.colors.textSecondary}
        style={styles.leftIcon}
      />
    );
  };

  const renderRightIcon = () => {
    if (secureTextEntry) {
      return (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.rightIcon}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>
      );
    }

    if (rightIcon && onRightIconPress) {
      return (
        <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
          <Icon name={rightIcon} size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      );
    }

    return null;
  };

  const isPasswordInput = secureTextEntry && !showPassword;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.text }, labelStyle]}>
          {label}
        </Text>
      )}
      
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error ? theme.colors.error : theme.colors.border,
            backgroundColor: disabled ? theme.colors.surface : theme.colors.background,
          },
          inputStyle,
        ]}
      >
        {renderLeftIcon()}
        
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text,
              paddingLeft: leftIcon ? 40 : 16,
              paddingRight: (rightIcon || secureTextEntry) ? 40 : 16,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPasswordInput}
          editable={!disabled}
          {...rest}
        />
        
        {renderRightIcon()}
      </View>
      
      {error && (
        <Text style={[styles.errorText, { color: theme.colors.error }, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 50,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
    padding: 4,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input;
