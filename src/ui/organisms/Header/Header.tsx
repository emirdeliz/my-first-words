import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
  style?: ViewStyle;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {showBackButton && (
        <Button
          title=""
          onPress={onBackPress || (() => {})}
          variant="ghost"
          size="small"
          icon={<Icon name="arrow-left" size={24} color="#000" />}
          style={styles.backButton}
        />
      )}
      
      <View style={styles.content}>
        <Typography variant="h2" color="text" weight="bold" align="center">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body" color="textSecondary" align="center">
            {subtitle}
          </Typography>
        )}
      </View>
      
      {rightAction && (
        <Button
          title=""
          onPress={rightAction.onPress}
          variant="ghost"
          size="small"
          icon={<Icon name={rightAction.icon as any} size={24} color="#000" />}
          style={styles.rightButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  rightButton: {
    position: 'absolute',
    right: 20,
    zIndex: 1,
  },
});

export default Header;
