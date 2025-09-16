import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type ResultScreenProps = {
    score: number;
    totalQuestions: number;
    onPlayAgain: () => void;
    onBackToHome?: () => void;
    hintsUsed?: number;
};

export default function ResultScreen({
  score, 
  totalQuestions, 
  onPlayAgain,
  onBackToHome,
  hintsUsed,
}:ResultScreenProps){
    // Determinar o título com base no desempenho
    const getTitle = () => {
        const percentage = (score / totalQuestions) * 100;
        if (percentage >= 80) return 'Lendário Herói Olímpico!';
        if (percentage >= 60) return 'Bravo Herói Grego!';
        if (percentage >= 40) return 'Aprendiz dos Deuses';
        return 'Mero Mortal';
    };

    // Determinar mensagem com base no desempenho
    const getMessage = () => {
        const percentage = (score / totalQuestions) * 100;
        if (percentage >= 80) return 'Você conquistou o favor de Zeus!';
        if (percentage >= 60) return 'Os deuses estão impressionados com seu conhecimento.';
        if (percentage >= 40) return 'Continue estudando e poderá se tornar um herói.';
        return 'Até os deuses começaram como aprendizes.';
    };

    return(
        <View style={styles.container}>
            <View style={styles.content}>

                {onBackToHome && (
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={onBackToHome}
                    >
                        <Text style={styles.backButtonText}>← Menu Principal</Text>
                    </TouchableOpacity>
                )}

                <Text style={styles.title}>{getTitle()}</Text>
                
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>
                        {score} / {totalQuestions}
                    </Text>
                    <Text style={styles.percentageText}>
                        {Math.round((score / totalQuestions) * 100)}%
                    </Text>
                </View>
                
                <Text style={styles.messageText}>{getMessage()}</Text>

                <View style={styles.trophyContainer}>
                    <Text style={styles.trophy}>🏆</Text>
                    {score === totalQuestions && (
                        <Text style={styles.perfectScore}>Perfeito! Você dominou o Olimpo!</Text>
                    )}
                </View>

                <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
                    <Text style={styles.buttonText}>Desafiar o Olimpo Novamente</Text>
                </TouchableOpacity>

                {hintsUsed && hintsUsed > 0 && (
                  <Text style={styles.hintsText}>
                    💡 Você usou {hintsUsed} dica{hintsUsed !== 1 ? 's' : ''} de 3 disponíveis
                  </Text>
                )}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a2a6c', // Azul escuro inspirado no mar Egeu
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
    borderWidth: 3,
    borderColor: '#8B4513', // Marrom escuro
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8B4513', // Marrom escuro
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50', // Azul escuro
  },
  percentageText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#8B4513', // Marrom escuro
  },
  messageText: {
    fontSize: 18,
    marginBottom: 25,
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  trophyContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  trophy: {
    fontSize: 60,
    marginBottom: 10,
  },
  perfectScore: {
    fontSize: 16,
    color: '#8B4513', // Marrom escuro
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#8B4513', // Marrom escuro
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
   backButton: {
    alignSelf: 'flex-start',
    marginBottom: 15,
    padding: 8,
  },
  backButtonText: {
    color: '#8B4513',
    fontSize: 16,
    fontWeight: '600',
  },
 hintsText: {
    fontSize: 18,
    marginBottom: 25,
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
