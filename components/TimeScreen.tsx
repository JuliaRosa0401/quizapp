
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

type TimeScreenProps = {
  onSelectMode: (withTime: boolean) => void;
  onBackToLevels: () => void;
};

export default function TimeScreen({ onSelectMode, onBackToLevels }: TimeScreenProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isTimedMode, setIsTimedMode] = useState(false);

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

  const handleModeSelect = async () => {
    await playSelectSound();
    onSelectMode(isTimedMode);
  };

  const toggleTimedMode = () => {
    setIsTimedMode(previousState => !previousState);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Botão de voltar */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBackToLevels}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        {/* Título */}
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Modo de Jogo</Text>
          <Text style={styles.subtitleText}>Escolha o estilo de desafio</Text>
          <Text style={styles.titleIcon}>⏰</Text>
        </View>

        {/* Opções de modo */}
        <View style={styles.modesContainer}>
          <View style={styles.modeOption}>
            <View style={styles.modeInfo}>
              <Text style={styles.modeIcon}>🐢</Text>
              <View style={styles.modeTextContainer}>
                <Text style={styles.modeTitle}>Modo Sem Tempo</Text>
                <Text style={styles.modeDescription}>
                  Pense com calma, sem pressão. Ideal para aprender!
                </Text>
              </View>
            </View>
            <Switch
              value={!isTimedMode}
              onValueChange={() => setIsTimedMode(false)}
              thumbColor={!isTimedMode ? '#27ae60' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>

          <View style={styles.separator} />

          <View style={styles.modeOption}>
            <View style={styles.modeInfo}>
              <Text style={styles.modeIcon}>⚡</Text>
              <View style={styles.modeTextContainer}>
                <Text style={styles.modeTitle}>Modo Cronometrado</Text>
                <Text style={styles.modeDescription}>
                  15 segundos por pergunta! Teste sua velocidade!
                </Text>
              </View>
            </View>
            <Switch
              value={isTimedMode}
              onValueChange={() => setIsTimedMode(true)}
              thumbColor={isTimedMode ? '#e74c3c' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>
        </View>

        {/* Informações adicionais */}
        {isTimedMode && (
          <View style={styles.timerInfo}>
            <Text style={styles.timerInfoText}>⏱️ 15 segundos por pergunta</Text>
            <Text style={styles.timerInfoText}>🔥 Desafio dos deuses do Olimpo!</Text>
          </View>
        )}

        {/* Botão de confirmar */}
        <TouchableOpacity 
          style={[styles.confirmButton, isTimedMode && styles.timedButton]}
          onPress={handleModeSelect}
        >
          <Text style={styles.confirmButtonText}>
            {isTimedMode ? 'Iniciar Desafio Cronometrado' : 'Iniciar Modo Relaxado'}
          </Text>
          <Text style={styles.confirmButtonIcon}>
            {isTimedMode ? '⚡' : '📚'}
          </Text>
        </TouchableOpacity>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isTimedMode 
              ? 'Prepare-se para o desafio dos deuses!' 
              : 'Aproveite para aprender sem pressão!'}
          </Text>
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
    marginBottom: 15,
  },
  titleIcon: {
    fontSize: 40,
  },
  modesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: 'rgba(253, 209, 67, 0.3)',
  },
  modeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  modeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  modeIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  modeTextContainer: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  modeDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 10,
  },
  timerInfo: {
    backgroundColor: 'rgba(231, 76, 60, 0.2)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(231, 76, 60, 0.5)',
    marginBottom: 30,
  },
  timerInfoText: {
    color: '#FFF',
    fontSize: 14,
    marginVertical: 3,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#27ae60',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fdd143',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  timedButton: {
    backgroundColor: '#e74c3c',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    textAlign: 'center',
  },
  confirmButtonIcon: {
    fontSize: 20,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});