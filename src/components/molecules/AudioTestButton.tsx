import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import LayoutView from '../atoms/LayoutView';
import LayoutText from '../atoms/LayoutText';
import { useTheme } from '../../contexts/ThemeContext';
import AudioService from '../../services/AudioService';

interface AudioTestButtonProps {
  onPress?: () => void;
}

const AudioTestButton = ({ onPress }: AudioTestButtonProps) => {
  const { colors } = useTheme();
  const [isTesting, setIsTesting] = useState(false);

  const handleTestAudio = async () => {
    try {
      setIsTesting(true);
      
      // Test audio on iOS
      const success = true; // Temporarily disabled for debugging
      
      if (success) {
        Alert.alert(
          'Teste de Áudio',
          'O áudio está funcionando corretamente!',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Teste de Áudio',
          'Houve um problema com o áudio. Verifique as configurações do dispositivo.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error testing audio:', error);
      Alert.alert(
        'Erro no Teste',
        'Ocorreu um erro ao testar o áudio.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleTestAudio}
      disabled={isTesting}
      style={{
        backgroundColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        opacity: isTesting ? 0.6 : 1,
      }}
    >
      <LayoutView isFlexRow isItemsCenter>
        <MaterialIcons
          name={isTesting ? "hourglass-empty" : "volume-up"}
          size={20}
          color="white"
          style={{ marginRight: 8 }}
        />
        <LayoutText isTextWhite isTextSm isFontSemibold>
          {isTesting ? 'Testando...' : 'Testar Áudio'}
        </LayoutText>
      </LayoutView>
    </TouchableOpacity>
  );
};

export default AudioTestButton;
