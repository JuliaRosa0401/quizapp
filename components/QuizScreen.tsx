import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView,
  Vibration 
} from 'react-native';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import HintModal from './HintModal';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: string;
  hint?: string;
};

type QuizScreenProps = {
  currentQuestion: Question;
  selectedOption: string | null;
  isOptionsDisabled: boolean;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
  onBackToHome?: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  isTimedMode?: boolean;
  timePerQuestion?: number;
  onTimeUp?: () => void;
  onUseHint?: () => void; 
  hintsAvailable: number; 
  hintsUsed: number;
};


export default function QuizScreen({
  currentQuestion,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
  onBackToHome,
  currentQuestionIndex,
  totalQuestions,
  isTimedMode = false,
  timePerQuestion = 15,
  onTimeUp,
  onUseHint, 
  hintsAvailable,
  hintsUsed,
}: QuizScreenProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [timerActive, setTimerActive] = useState(true);
  const [hintModalVisible, setHintModalVisible] = useState(false); 

  useEffect(() => {
    loadSound();
    
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Efeito para o timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isTimedMode && timerActive && timeLeft > 0 && !selectedOption) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isTimedMode && timeLeft === 0 && !selectedOption && onTimeUp) {
      onTimeUp();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimedMode, timeLeft, timerActive, selectedOption]);

  // Reset do timer quando a questão muda
  useEffect(() => {
    setTimeLeft(timePerQuestion);
    setTimerActive(true);
    setHintModalVisible(false); // Fechar dica quando a questão muda
  }, [currentQuestionIndex, timePerQuestion]);

  const loadSound = async () => {
    try {
      const { sound: soundObject } = await Audio.Sound.createAsync(
        require('../assets/sounds/correct.mp3')
      );
      setSound(soundObject);
    } catch (error) {
      console.log('Erro ao carregar som:', error);
    }
  };

  const playCorrectSound = async () => {
    try {
      if (sound) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.log('Erro ao reproduzir som:', error);
    }
  };

  const handleOptionPress = async (option: string) => {
    setTimerActive(false);
    onOptionPress(option);
    
    if (option !== currentQuestion.correctAnswer) {
      Vibration.vibrate(300);
    } else {
      await playCorrectSound();
    }
  };

  const handleShowHint = () => {
    setHintModalVisible(true);
    if (onUseHint) {
      onUseHint(); // Notificar o componente pai que uma dica foi usada
    }
  };

  const handleCloseHint = () => {
    setHintModalVisible(false);
  };

  const getOptionStyle = (option: string) => {
    if (selectedOption) {
      const isCorrect = option === currentQuestion.correctAnswer;
      if (isCorrect) {
        return styles.correctOption;
      }
      if (option === selectedOption && !isCorrect) {
        return styles.incorrectOption;
      }
    }
    return {};
  };

  // Formatar o tempo no formato MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header com botão de voltar e contador de questões */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBackToHome}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerText}>Greek Mythology Quiz</Text>
            <Text style={styles.questionCounter}>
              {currentQuestionIndex + 1}/{totalQuestions}
            </Text>
          </View>
          
          {/* Timer ou Ícone do Olimpo */}
          {isTimedMode ? (
            <View style={[
              styles.timerContainer, 
              timeLeft <= 10 && styles.timerWarning,
              timeLeft <= 5 && styles.timerDanger
            ]}>
              <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            </View>
          ) : (
            <View style={styles.olympusIcon}>
              <Text style={styles.olympusIconText}>🏛️</Text>
            </View>
          )}
        </View>

        {/* Botão de dica - só aparece se houver dica disponível, nenhuma opção selecionada e dicas restantes */}
        {currentQuestion.hint && !selectedOption && hintsAvailable > 0 && (
          <TouchableOpacity 
            style={styles.hintButton}
            onPress={handleShowHint}
          >
            <Text style={styles.hintButtonText}>💡 ({hintsAvailable} / 3 restantes)</Text>
          </TouchableOpacity>
        )}

        <View style={styles.questionContainer}>
          <View style={styles.columnDecoration} />
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          <View style={styles.columnDecoration} />
        </View>

        

        {/* Mensagem quando não há mais dicas */}
        {currentQuestion.hint && !selectedOption && hintsAvailable === 0 && (
          <View style={styles.noHintsContainer}>
            <Text style={styles.noHintsText}>❌ Sem dicas disponíveis</Text>
          </View>
        )}

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.option, getOptionStyle(option)]}
              onPress={() => handleOptionPress(option)}
              disabled={isOptionsDisabled || (isTimedMode && timeLeft === 0)}
            >
              <Text style={styles.optionText}>{option}</Text>
              {selectedOption && option === currentQuestion.correctAnswer && (
                <View style={styles.correctIcon}>
                  <Text style={styles.iconText}>✓</Text>
                </View>
              )}
              {selectedOption && option === selectedOption && option !== currentQuestion.correctAnswer && (
                <View style={styles.incorrectIcon}>
                  <Text style={styles.iconText}>✗</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {selectedOption && (
          <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion}>
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < totalQuestions - 1 ? 'Próxima Questão' : 'Ver Resultados'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Mensagem de tempo esgotado */}
        {isTimedMode && timeLeft === 0 && !selectedOption && (
          <View style={styles.timeUpContainer}>
            <Text style={styles.timeUpText}>⏰ Tempo esgotado!</Text>
            <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion}>
              <Text style={styles.nextButtonText}>Próxima Questão</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Modal de dica */}
        <HintModal
          visible={hintModalVisible}
          hint={currentQuestion.hint || ''}
          onClose={handleCloseHint}
        />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a2a6c',
    paddingVertical: 60, 
  },
  container: { 
    flex: 1, 
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    padding: 15,
    backgroundColor: 'rgba(147, 111, 85, 1)',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fdd143ff', 
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    textAlign: 'center',
  },
  questionCounter: {
    fontSize: 16,
    color: '#fdd143',
    fontWeight: '600',
    marginTop: 5,
  },
  olympusIcon: {
    backgroundColor: '#181a2eff', 
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  olympusIconText: {
    fontSize: 20,
  },
  questionContainer: { 
    flexDirection: 'row',
    backgroundColor: 'rgba(254, 248, 240, 0.9)', 
    borderRadius: 20, 
    padding: 20, 
    justifyContent: 'center', 
    marginBottom: 25,
    borderWidth: 3,
    borderColor: '#8B4513', 
    minHeight: 150,
    alignItems: 'center',
    position: 'relative',
    
  },
  columnDecoration: {
    width: 10,
    height: '100%',
    backgroundColor: '#8B4513', 
    marginHorizontal: 10,
    borderRadius: 5,
  },
  questionText: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    flex: 1,
    color: '#2c3e50', 
    fontStyle: 'italic',
  },
  optionsContainer: { 
    flex: 1, 
    justifyContent: 'center',
    gap:25,

  },
  option: { 
    backgroundColor: 'rgba(255, 250, 239, 0.95)',
    padding: 15, 
    borderRadius: 15, 
    borderWidth: 2, 
    borderColor: '#8B4513',
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: { 
    fontSize: 18, 
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  correctOption: { 
    borderColor: '#27ae60', 
    backgroundColor: 'rgba(195, 253, 219, 1)', 
    borderWidth: 3 
  },
  incorrectOption: { 
    borderColor: '#e74c3c', 
    backgroundColor: 'rgba(246, 156, 147, 1)', 
    borderWidth: 3 
  },
  nextButton: { 
    backgroundColor: '#8B4513', 
    padding: 18, 
    borderRadius: 15, 
    marginTop: 20,  
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  nextButtonText: { 
    color: '#ffffff', 
    fontSize: 20, 
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  correctIcon: {
    backgroundColor: '#27ae60', 
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  incorrectIcon: {
    backgroundColor: '#e74c3c',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
timerContainer: {
    backgroundColor: '#27ae60',
    borderRadius: 20,
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  timerWarning: {
    backgroundColor: '#f39c12',
  },
  timerDanger: {
    backgroundColor: '#e74c3c',
  },
  timerText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeUpContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  timeUpText: {
    color: '#e74c3c',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  hintButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  hintButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noHintsContainer: {
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(231, 76, 60, 0.3)',
    padding: 12,
    borderRadius: 20,
    alignSelf: 'center',
  },
  noHintsText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});