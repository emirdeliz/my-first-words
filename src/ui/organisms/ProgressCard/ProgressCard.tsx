import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Card } from '../../atoms/Card';
import { Typography } from '../../atoms/Typography';
import { useTheme } from '../../../contexts/ThemeContext';

export interface ProgressCardProps {
  title: string;
  currentValue: number;
  maxValue: number;
  showPercentage?: boolean;
  showValues?: boolean;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  currentValue,
  maxValue,
  showPercentage = true,
  showValues = true,
  color,
  size = 'medium',
  style,
}) => {
  const { theme } = useTheme();

  const progressPercentage = maxValue > 0 ? (currentValue / maxValue) * 100 : 0;
  const progressColor = color || theme.colors.primary;

  const getBarHeight = () => {
    switch (size) {
      case 'small':
        return 6;
      case 'large':
        return 16;
      default:
        return 12;
    }
  };

  const getTitleSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 20;
      default:
        return 18;
    }
  };

  const getValueSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 16;
      default:
        return 14;
    }
  };

  return (
    <Card
      style={[styles.container, style]}
      padding="medium"
      elevation={2}
      borderRadius="medium"
    >
      <Typography
        variant="body"
        color="text"
        weight="semiBold"
        style={[styles.title, { fontSize: getTitleSize() }]}
      >
        {title}
      </Typography>

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            {
              height: getBarHeight(),
              backgroundColor: theme.colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercentage}%`,
                backgroundColor: progressColor,
                height: getBarHeight(),
              },
            ]}
          />
        </View>
      </View>

      {(showValues || showPercentage) && (
        <View style={styles.infoContainer}>
          {showValues && (
            <Typography
              variant="caption"
              color="textSecondary"
              style={[styles.values, { fontSize: getValueSize() }]}
            >
              {currentValue} de {maxValue}
            </Typography>
          )}
          
          {showPercentage && (
            <Typography
              variant="caption"
              color="textSecondary"
              style={[styles.percentage, { fontSize: getValueSize() }]}
            >
              {progressPercentage.toFixed(1)}%
            </Typography>
          )}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 6,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  values: {
    flex: 1,
  },
  percentage: {
    textAlign: 'right',
  },
});

export default ProgressCard;
