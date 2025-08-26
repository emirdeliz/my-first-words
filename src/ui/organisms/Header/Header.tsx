import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';

export interface HeaderProps {
  title: string;
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
  showBackButton = false,
  onBackPress,
  rightAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        {showBackButton && onBackPress && (
          <Button
            title=""
            onPress={onBackPress}
            style={styles.backButton}
            icon={<Icon materialCommunityName="arrow-left" size={24} color="#007AFF" />}
          />
        )}
      </View>
      
      <Typography variant="h2" color="text" weight="semiBold" style={styles.title}>
        {title}
      </Typography>
      
      <View style={styles.rightSection}>
        {rightAction && (
          <Button
            title=""
            onPress={rightAction.onPress}
            style={styles.actionButton}
            icon={<Icon materialCommunityName={rightAction.icon} size={24} color="#007AFF" />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    flex: 2,
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'transparent',
  },
  actionButton: {
    padding: 8,
    backgroundColor: 'transparent',
  },
});

export default Header;
