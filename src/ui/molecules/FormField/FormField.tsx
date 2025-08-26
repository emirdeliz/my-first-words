import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Input, InputProps } from '../../atoms/Input';
import { Typography } from '../../atoms/Typography';

export interface FormFieldProps extends InputProps {
  label?: string;
  error?: string;
  required?: boolean;
  containerStyle?: ViewStyle;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  containerStyle,
  ...inputProps
}) => {
  const renderLabel = () => {
    if (!label) return null;

    return (
      <View style={styles.labelContainer}>
        <Typography variant="label" color="text">
          {label}
        </Typography>
        {required && (
          <Typography variant="caption" color="error" style={styles.required}>
            *
          </Typography>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {renderLabel()}
      <Input
        {...inputProps}
        error={error}
        label={undefined} // Remove label from Input since we're handling it here
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  required: {
    marginLeft: 4,
  },
});

export default FormField;
