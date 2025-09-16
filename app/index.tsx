// index.tsx (atualizado)
import { useState } from 'react';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import HomeScreen from '../components/HomeScreen';
import LevelSelectionScreen from '../components/LevelSelectionScreen';
import TimeScreen from '../components/TimeScreen'; // Importe a TimeScreen
import questions from '../questions.json';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: string;
}

const typedQuestions: Question[] = questions as Question[];
const [hintsUsed, setHintsUsed] = useState(0);

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'level' | 'time' | 'quiz' | 'result'>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<string>('fácil');
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(typedQuestions);
  const [isTimedMode, setIsTimedMode] = useState(false); // Estado para modo cronometrado

  // Filtrar questões baseado no nível selecionado
  const filterQuestionsByLevel = (level: string) => {
    return typedQuestions.filter(question => question.difficulty === level);
  };

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleStartQuiz = () => {
    setCurrentScreen('level');
  };

  const handleSelectLevel = (level: string) => {
    setSelectedLevel(level);
    const filtered = filterQuestionsByLevel(level);
    setFilteredQuestions(filtered);
    setCurrentScreen('time'); // Vai para a tela de seleção de tempo
  };

  const handleSelectMode = (withTime: boolean) => {
    setIsTimedMode(withTime);
    setCurrentScreen('quiz'); // Agora vai para o quiz
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
  };

  const handleTimeUp = () => {
    // Avança automaticamente para a próxima questão quando o tempo acaba
    handleNextQuestion();
  };

  const handleOptionPress = (option: string) => {
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(option);
    setIsOptionsDisabled(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    } else {
      setCurrentScreen('result');
    }
  };

  const handlePlayAgain = () => {
    setCurrentScreen('level');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleBackToLevelSelection = () => {
    setCurrentScreen('level');
  };

  const handleBackToTimeSelection = () => {
    setCurrentScreen('time');
  };

  // Renderização condicional baseada na tela atual
  switch (currentScreen) {
    case 'home':
      return <HomeScreen onStartQuiz={handleStartQuiz} />;
    
    case 'level':
      return (
        <LevelSelectionScreen 
          onSelectLevel={handleSelectLevel}
          onBackToHome={handleBackToHome}
        />
      );
    
    case 'time':
      return (
        <TimeScreen
          onSelectMode={handleSelectMode}
          onBackToLevels={handleBackToLevelSelection}
        />
      );
    
    case 'quiz':
      return (
        <QuizScreen
          currentQuestion={currentQuestion}
          selectedOption={selectedOption}
          isOptionsDisabled={isOptionsDisabled}
          onOptionPress={handleOptionPress}
          onNextQuestion={handleNextQuestion}
          onBackToHome={handleBackToTimeSelection}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={filteredQuestions.length}
          isTimedMode={isTimedMode}
          timePerQuestion={15}
          onTimeUp={handleTimeUp}
          onUseHint={() => setHintsUsed(prev => prev + 1)}
        />
      );
    
    case 'result':
      return (
        <ResultScreen
          score={score}
          totalQuestions={filteredQuestions.length}
          onPlayAgain={handlePlayAgain}
          onBackToHome={handleBackToLevelSelection}
          hintsUsed={hintsUsed}
        />
      );
    
    default:
      return <HomeScreen onStartQuiz={handleStartQuiz} />;
  }
}