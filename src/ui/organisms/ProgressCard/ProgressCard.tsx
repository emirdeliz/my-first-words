import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Card from '../../atoms/Card';
import Typography from '../../atoms/Typography';

export interface ProgressCardProps {
  title: string;
  currentValue: number;
  maxValue: number;
  showPercentage?: boolean;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  currentValue,
  maxValue,
  showPercentage = true,
  color = '#007AFF',
  size = 'medium',
  style,
}) => {
  const percentage = maxValue > 0 ? (currentValue / maxValue) * 100 : 0;
  
  const getHeight = () => {
    switch (size) {
      case 'small':
        return 8;
      case 'large':
        return 16;
      default:
        return 12;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 24;
      default:
        return 16;
    }
  };

  return (
    <Card style={[styles.container, { padding: getPadding() }, style]} elevation={2}>
      <View style={styles.header}>
        <Typography variant="body" color="text" weight="semiBold">
          {title}
        </Typography>
        {showPercentage && (
          <Typography variant="caption" color="textSecondary">
            {percentage.toFixed(1)}%
          </Typography>
        )}
      </View>
      
      <View style={[styles.progressBar, { height: getHeight() }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
      
      <View style={styles.footer}>
        <Typography variant="caption" color="textSecondary">
          {currentValue}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {maxValue}
        </Typography>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    backgroundColor: '#E9ECEF',
    borderRadius: 6,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ProgressCard;
