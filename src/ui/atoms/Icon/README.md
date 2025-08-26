# Componente Icon

O componente `Icon` é um atom que centraliza o uso de ícones de diferentes famílias, permitindo um uso mais declarativo e consistente.

## Uso Básico

```tsx
import { Icon } from '../ui';

// Usando Material Community Icons (padrão)
<Icon materialCommunityName="star" size={24} color="#FFD700" />

// Usando Material Icons
<Icon material materialName="home" size={32} color="#007AFF" />

// Usando Ionicons
<Icon ionicons ioniconsName="heart" size={20} color="#FF3B30" />

// Usando Feather
<Icon feather featherName="settings" size={28} color="#5856D6" />
```

## Props Boolean para Tipos de Ícone

```tsx
// Em vez de especificar o tipo, use as props boolean
<Icon 
  materialCommunity  // true = usa MaterialCommunityIcons
  materialCommunityName="star"
  size={24} 
  color="#FFD700" 
/>

<Icon 
  material  // true = usa MaterialIcons
  materialName="home"
  size={32} 
  color="#007AFF" 
/>

<Icon 
  ionicons  // true = usa Ionicons
  ioniconsName="heart"
  size={20} 
  color="#FF3B30" 
/>
```

## Famílias de Ícones Suportadas

- `material` - Material Icons
- `materialCommunity` - Material Community Icons (padrão)
- `ionicons` - Ionicons
- `feather` - Feather Icons
- `fontAwesome` - Font Awesome
- `fontAwesome5` - Font Awesome 5
- `antDesign` - Ant Design Icons
- `entypo` - Entypo
- `evilIcons` - Evil Icons
- `foundation` - Foundation
- `octicons` - Octicons
- `simpleLineIcons` - Simple Line Icons
- `zocial` - Zocial

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `material` | boolean | false | Usa Material Icons |
| `materialCommunity` | boolean | false | Usa Material Community Icons |
| `ionicons` | boolean | false | Usa Ionicons |
| `feather` | boolean | false | Usa Feather Icons |
| `fontAwesome` | boolean | false | Usa Font Awesome |
| `fontAwesome5` | boolean | false | Usa Font Awesome 5 |
| `antDesign` | boolean | false | Usa Ant Design Icons |
| `entypo` | boolean | false | Usa Entypo |
| `evilIcons` | boolean | false | Usa Evil Icons |
| `foundation` | boolean | false | Usa Foundation |
| `octicons` | boolean | false | Usa Octicons |
| `simpleLineIcons` | boolean | false | Usa Simple Line Icons |
| `zocial` | boolean | false | Usa Zocial |
| `size` | number | 24 | Tamanho do ícone |
| `color` | string | '#000' | Cor do ícone |
| `style` | ViewStyle | undefined | Estilos adicionais |

## Exemplos de Uso nos Screens

```tsx
// Antes (importação direta)
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
<Icon name="star" size={24} color="#FFD700" />

// Depois (usando o componente Icon)
import { Icon } from '../ui';
<Icon materialCommunityName="star" size={24} color="#FFD700" />
```

## Vantagens

1. **Declarativo**: Use props boolean para indicar o tipo de ícone
2. **Consistente**: Padrão único para todos os ícones
3. **Flexível**: Suporte para múltiplas famílias de ícones
4. **Type-safe**: TypeScript completo com todas as props
5. **Fácil manutenção**: Centraliza a lógica de ícones
6. **Reutilizável**: Use em qualquer lugar da aplicação
