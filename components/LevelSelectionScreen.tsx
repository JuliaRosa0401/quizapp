// components/LevelSelectionScreen.tsx
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

type LevelSelectionScreenProps = {
  onSelectLevel: (level: string) => void;
  onBackToHome: () => void;
};

export default function LevelSelectionScreen({ onSelectLevel, onBackToHome }: LevelSelectionScreenProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    loadSound();
    
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const loadSound = async () => {
    try {
      const { sound: soundObject } = await Audio.Sound.createAsync(
        require('../assets/sounds/select.mp3')
      );
      setSound(soundObject);
    } catch (error) {
      console.log('Erro ao carregar som:', error);
    }
  };

  const playSelectSound = async () => {
    try {
      if (sound) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.log('Erro ao reproduzir som:', error);
    }
  };

  const handleLevelSelect = async (level: string) => {
    await playSelectSound();
    onSelectLevel(level);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Botão de voltar */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBackToHome}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        {/* Título */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Escolha o Nível</Text>
          <Text style={styles.subtitleText}>Selecione o desafio</Text>
          
        </View>

        {/* Botões de nível */}
        <View style={styles.levelsContainer}>
          <TouchableOpacity 
            style={[styles.levelButton, styles.easyLevel]}
            onPress={() => handleLevelSelect('fácil')}
          >
            <Text style={styles.levelButtonText}>Fácil</Text>
            <Text style={styles.levelDescription}>Deuses e conceitos básicos</Text>
            <Text style={styles.levelIcon}>🛡️</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.levelButton, styles.mediumLevel]}
            onPress={() => handleLevelSelect('médio')}
          >
            <Text style={styles.levelButtonText}>Médio</Text>
            <Text style={styles.levelDescription}>Heróis e criaturas</Text>
            <Text style={styles.levelIcon}>⚔️</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.levelButton, styles.hardLevel]}
            onPress={() => handleLevelSelect('difícil')}
          >
            <Text style={styles.levelButtonText}>Difícil</Text>
            <Text style={styles.levelDescription}>Mitos complexos e detalhes</Text>
            <Text style={styles.levelIcon}>🔥</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Escolha sabiamente, herói!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a2a6c',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    padding: 10,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitleText: {
    fontSize: 18,
    color: '#fdd143',
    marginTop: 5,
  },
  titleIconText: {
    fontSize: 30,
  },
  levelsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  levelButton: {
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  easyLevel: {
    backgroundColor: '#27ae60',
    borderColor: '#2ecc71',
  },
  mediumLevel: {
    backgroundColor: '#f39c12',
    borderColor: '#f1c40f',
  },
  hardLevel: {
    backgroundColor: '#e74c3c',
    borderColor: '#c0392b',
  },
  levelButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  levelDescription: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 10,
  },
  levelIcon: {
    fontSize: 30,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontStyle: 'italic',
  },
});