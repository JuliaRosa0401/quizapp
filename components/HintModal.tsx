// components/HintModal.tsx
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';

type HintModalProps = {
  visible: boolean;
  hint: string;
  onClose: () => void;
};

export default function HintModal({ visible, hint, onClose }: HintModalProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playHintSound = async () => {
    try {
      const { sound: soundObject } = await Audio.Sound.createAsync(
        require('../assets/sounds/hint.mp3') // Crie este som ou use um existente
      );
      setSound(soundObject);
      await soundObject.replayAsync();
    } catch (error) {
      console.log('Erro ao reproduzir som:', error);
    }
  };

  const handleClose = () => {
    if (sound) {
      sound.unloadAsync();
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onShow={playHintSound}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>💡 Dica dos Deuses</Text>
          <Text style={styles.hintText}>{hint}</Text>
          
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleClose}
          >
            <Text style={styles.closeButtonText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 25,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#8B4513',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 15,
    textAlign: 'center',
  },
  hintText: {
    fontSize: 18,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  closeButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});