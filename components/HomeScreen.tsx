// components/HomeScreen.tsx
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av'; // ← Certifique-se que está como expo-av
import { useEffect, useState } from 'react';

type HomeScreenProps = {
  onStartQuiz: () => void;
};

export default function HomeScreen({ onStartQuiz }: HomeScreenProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [backgroundMusic, setBackgroundMusic] = useState<Audio.Sound | null>(null);

  // Carrega o som de fundo quando o componente é montado
  useEffect(() => {
    loadSounds();
    
    return () => {
      // Limpa os sons quando o componente é desmontado
      if (sound) {
        sound.unloadAsync();
      }
      if (backgroundMusic) {
        backgroundMusic.unloadAsync();
      }
    };
  }, []);

  const loadSounds = async () => {
    try {
      // Som de início (quando clica no botão)
      const { sound: soundObject } = await Audio.Sound.createAsync(
        require('../assets/sounds/start.mp3')
      );
      setSound(soundObject);

      // Música de fundo (toca em loop)
      const { sound: musicObject } = await Audio.Sound.createAsync(
        require('../assets/sounds/background.mp3'), 
        { shouldPlay: true, isLooping: true } // Toca automaticamente e em loop
      );
      setBackgroundMusic(musicObject);

      // Configura o volume da música de fundo (opcional)
      await musicObject.setVolumeAsync(0.7); // 70% do volume

    } catch (error) {
      console.log('Erro ao carregar sons:', error);
    }
  };

  const playStartSound = async () => {
    try {
      if (sound) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.log('Erro ao reproduzir som:', error);
    }
  };

  const handleStartQuiz = async () => {
    await playStartSound();
    
    // Para a música de fundo quando inicia o quiz
    if (backgroundMusic) {
      await backgroundMusic.stopAsync();
      await backgroundMusic.unloadAsync();
    }
    
    onStartQuiz();
  };

  // Função para pausar/retomar a música (opcional)
  const toggleMusic = async () => {
    if (backgroundMusic) {
      const status = await backgroundMusic.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await backgroundMusic.pauseAsync();
        } else {
          await backgroundMusic.playAsync();
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Botão para controlar música (opcional) */}
        <TouchableOpacity 
          style={styles.musicButton} 
          onPress={toggleMusic}
        >
          <Text style={styles.musicButtonText}>🎵</Text>
        </TouchableOpacity>

        {/* Título principal */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Greek Mythology</Text>
          <Text style={styles.subtitleText}>Quiz Adventure</Text>
          <View style={styles.titleIcon}>
            <Text style={styles.titleIconText}>⚡</Text>
          </View>
        </View>

        {/* Imagem decorativa */}
        <View style={styles.imageContainer}>
          <Text style={styles.imagePlaceholder}>🏛️🌊⚡🦉</Text>
          <Text style={styles.imageText}>Descenda ao Olimpo</Text>
        </View>

        {/* Descrição */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Teste seu conhecimento sobre os deuses, heróis e mitos da Grécia Antiga!
            Escolha entre três níveis de dificuldade!
          </Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• 12 perguntas desafiadoras</Text>
            <Text style={styles.featureItem}>• Deuses do Olimpo</Text>
            <Text style={styles.featureItem}>• Heróis lendários</Text>
            <Text style={styles.featureItem}>• Criaturas mitológicas</Text>
          </View>
        </View>

        {/* Botão de início */}
        <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
          <Text style={styles.startButtonText}>Iniciar Jornada</Text>
          <Text style={styles.startButtonIcon}>⚔️</Text>
        </TouchableOpacity>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Prepare-se para desafiar os deuses!</Text>
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
    justifyContent: 'space-between',
  },
  musicButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    zIndex: 10,
  },
  musicButtonText: {
    fontSize: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitleText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#fdd143',
    marginTop: 5,
    fontStyle: 'italic',
  },
  titleIcon: {
    marginTop: 15,
    backgroundColor: 'rgba(253, 209, 67, 0.2)',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fdd143',
  },
  titleIconText: {
    fontSize: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  imagePlaceholder: {
    fontSize: 50,
    marginBottom: 15,
  },
  imageText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
  descriptionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(253, 209, 67, 0.3)',
  },
  descriptionText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 24,
  },
  featuresList: {
    marginTop: 10,
  },
  featureItem: {
    fontSize: 16,
    color: '#fdd143',
    marginVertical: 3,
  },
  startButton: {
    backgroundColor: '#8B4513',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fdd143',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 10,
  },
  startButtonIcon: {
    fontSize: 24,
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