import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../contexts/ThemeContext';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  leftAction?: {
    icon: string;
    onPress: () => void;
  };
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
  showBackButton?: boolean;
  onBackPress?: () => void;
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftAction,
  rightAction,
  showBackButton = false,
  onBackPress,
  style,
}) => {
  const { theme } = useTheme();

  const renderLeftSection = () => {
    if (showBackButton && onBackPress) {
      return (
        <Button
          variant="ghost"
          size="small"
          onPress={onBackPress}
          icon={<Icon name="arrow-left" size={24} color={theme.colors.text} />}
          style={styles.actionButton}
        />
      );
    }

    if (leftAction) {
      return (
        <Button
          variant="ghost"
          size="small"
          onPress={leftAction.onPress}
          icon={<Icon name={leftAction.icon} size={24} color={theme.colors.text} />}
          style={styles.actionButton}
        />
      );
    }

    return <View style={styles.actionButton} />;
  };

  const renderRightSection = () => {
    if (rightAction) {
      return (
        <Button
          variant="ghost"
          size="small"
          onPress={rightAction.onPress}
          icon={<Icon name={rightAction.icon} size={24} color={theme.colors.text} />}
          style={styles.actionButton}
        />
      );
    }

    return <View style={styles.actionButton} />;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        {renderLeftSection()}
        
        <View style={styles.titleContainer}>
          <Typography variant="h2" color="text" weight="bold" align="center">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body" color="textSecondary" align="center" style={styles.subtitle}>
              {subtitle}
            </Typography>
          )}
        </View>
        
        {renderRightSection()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: 48,
    height: 48,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  subtitle: {
    marginTop: 4,
  },
});

export default Header;
