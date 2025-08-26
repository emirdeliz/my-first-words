import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Card from '../../atoms/Card';
import Typography from '../../atoms/Typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface StatCardProps {
  icon: string;
  value: string | number;
  label: string;
  color: string;
  style?: ViewStyle;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  color,
  style,
}) => {
  return (
    <Card style={[styles.container, style] as any} elevation={2}>
      <View style={styles.iconContainer}>
        <Icon name={icon as any} size={24} color={color} />
      </View>
      <Typography variant="body" color="text" weight="bold" style={styles.value}>
        {value}
      </Typography>
      <Typography variant="caption" color="textSecondary" align="center">
        {label}
      </Typography>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 4,
  },
  iconContainer: {
    marginBottom: 8,
  },
  value: {
    marginBottom: 4,
    textAlign: 'center',
  },
});

export default StatCard;
