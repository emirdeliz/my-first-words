import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Card } from '../../atoms/Card';
import { Typography } from '../../atoms/Typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../contexts/ThemeContext';

export interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  color,
  size = 'medium',
  style,
}) => {
  const { theme } = useTheme();

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 20;
      case 'large':
        return 32;
      default:
        return 24;
    }
  };

  const getValueSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  const getLabelSize = () => {
    switch (size) {
      case 'small':
        return 10;
      case 'large':
        return 14;
      default:
        return 12;
    }
  };

  const iconColor = color || theme.colors.primary;

  return (
    <Card
      style={[styles.container, style]}
      padding="medium"
      elevation={2}
      borderRadius="medium"
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: iconColor }]}>
          <Icon name={icon} size={getIconSize()} color="white" />
        </View>
        
        <View style={styles.textContainer}>
          <Typography
            variant="body"
            color="text"
            weight="bold"
            style={[styles.value, { fontSize: getValueSize() }]}
          >
            {value}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            align="center"
            style={[styles.label, { fontSize: getLabelSize() }]}
          >
            {label}
          </Typography>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    alignItems: 'center',
  },
  value: {
    marginBottom: 4,
  },
  label: {
    textAlign: 'center',
  },
});

export default StatCard;
