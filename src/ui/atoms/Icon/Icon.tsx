import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

export interface IconProps {
  // Icon types
  material?: boolean;
  materialCommunity?: boolean;
  ionicons?: boolean;
  feather?: boolean;
  fontAwesome?: boolean;
  fontAwesome5?: boolean;
  antDesign?: boolean;
  entypo?: boolean;
  evilIcons?: boolean;
  foundation?: boolean;
  octicons?: boolean;
  simpleLineIcons?: boolean;
  zocial?: boolean;
  
  // Icon names for each type
  materialName?: string;
  materialCommunityName?: string;
  ioniconsName?: string;
  featherName?: string;
  fontAwesomeName?: string;
  fontAwesome5Name?: string;
  antDesignName?: string;
  entypoName?: string;
  evilIconsName?: string;
  foundationName?: string;
  octiconsName?: string;
  simpleLineIconsName?: string;
  zocialName?: string;
  
  // Common properties
  size?: number;
  color?: string;
  style?: ViewStyle;
  
  // Default icon (when no specific type is specified)
  name?: string;
  type?: 'material' | 'materialCommunity' | 'ionicons' | 'feather' | 'fontAwesome' | 'fontAwesome5' | 'antDesign' | 'entypo' | 'evilIcons' | 'foundation' | 'octicons' | 'simpleLineIcons' | 'zocial';
}

const Icon: React.FC<IconProps> = ({
  // Icon types
  material,
  materialCommunity,
  ionicons,
  feather,
  fontAwesome,
  fontAwesome5,
  antDesign,
  entypo,
  evilIcons,
  foundation,
  octicons,
  simpleLineIcons,
  zocial,
  
  // Icon names for each type
  materialName,
  materialCommunityName,
  ioniconsName,
  featherName,
  fontAwesomeName,
  fontAwesome5Name,
  antDesignName,
  entypoName,
  evilIconsName,
  foundationName,
  octiconsName,
  simpleLineIconsName,
  zocialName,
  
  // Common properties
  size = 24,
  color = '#000',
  style,
  
  // Default icon
  name,
  type = 'materialCommunity',
}) => {
  // Helper function to get icon name based on boolean props
  const getIconName = (): string => {
    if (materialName) return materialName;
    if (materialCommunityName) return materialCommunityName;
    if (ioniconsName) return ioniconsName;
    if (featherName) return featherName;
    if (fontAwesomeName) return fontAwesomeName;
    if (fontAwesome5Name) return fontAwesome5Name;
    if (antDesignName) return antDesignName;
    if (entypoName) return entypoName;
    if (evilIconsName) return evilIconsName;
    if (foundationName) return foundationName;
    if (octiconsName) return octiconsName;
    if (simpleLineIconsName) return simpleLineIconsName;
    if (zocialName) return zocialName;
    return name || 'help-circle';
  };

  // Helper function to get icon type based on boolean props
  const getIconType = (): string => {
    if (material) return 'material';
    if (materialCommunity) return 'materialCommunity';
    if (ionicons) return 'ionicons';
    if (feather) return 'feather';
    if (fontAwesome) return 'fontAwesome';
    if (fontAwesome5) return 'fontAwesome5';
    if (antDesign) return 'antDesign';
    if (entypo) return 'entypo';
    if (evilIcons) return 'evilIcons';
    if (foundation) return 'foundation';
    if (octicons) return 'octicons';
    if (simpleLineIcons) return 'simpleLineIcons';
    if (zocial) return 'zocial';
    return type;
  };

  const iconName = getIconName();
  const iconType = getIconType();

  // Render icon based on type
  switch (iconType) {
    case 'material':
      return <MaterialIcons name={iconName as any} size={size} color={color} style={style} />;
    case 'ionicons':
      return <Ionicons name={iconName as any} size={size} color={color} style={style} />;
    case 'feather':
      return <Feather name={iconName as any} size={size} color={color} style={style} />;
    case 'fontAwesome':
      return <FontAwesome name={iconName as any} size={size} color={color} style={style} />;
    case 'fontAwesome5':
      return <FontAwesome5 name={iconName as any} size={size} color={color} style={style} />;
    case 'antDesign':
      return <AntDesign name={iconName as any} size={size} color={color} style={style} />;
    case 'entypo':
      return <Entypo name={iconName as any} size={size} color={color} style={style} />;
    case 'evilIcons':
      return <EvilIcons name={iconName as any} size={size} color={color} style={style} />;
    case 'foundation':
      return <Foundation name={iconName as any} size={size} color={color} style={style} />;
    case 'octicons':
      return <Octicons name={iconName as any} size={size} color={color} style={style} />;
    case 'simpleLineIcons':
      return <SimpleLineIcons name={iconName as any} size={size} color={color} style={style} />;
    case 'zocial':
      return <Zocial name={iconName as any} size={size} color={color} style={style} />;
    default:
      return <MaterialCommunityIcons name={iconName as any} size={size} color={color} style={style} />;
  }
};

export default Icon;
