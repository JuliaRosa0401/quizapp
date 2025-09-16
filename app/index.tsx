// index.tsx (atualizado)
import { useState } from 'react';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import HomeScreen from '../components/HomeScreen';
import LevelSelectionScreen from '../components/LevelSelectionScreen';
import TimeScreen from '../components/TimeScreen';
import questions from '../questions.json';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: string;
}

const typedQuestions: Question[] = questions as Question[];
const TOTAL_QUESTIONS = 12; // Número fixo de perguntas

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'level' | 'time' | 'quiz' | 'result'>('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<string>('fácil');
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [isTimedMode, setIsTimedMode] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  // Função para selecionar perguntas aleatórias
  const selectRandomQuestions = (questions: Question[], count: number): Question[] => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Filtrar questões baseado no nível selecionado e selecionar 12 aleatórias
  const filterQuestionsByLevel = (level: string) => {
    const levelQuestions = typedQuestions.filter(question => question.difficulty === level);
    return selectRandomQuestions(levelQuestions, TOTAL_QUESTIONS);
  };

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleStartQuiz = () => {
    setCurrentScreen('level');
  };

  const handleSelectLevel = (level: string) => {
    setSelectedLevel(level);
    const filtered = filterQuestionsByLevel(level);
    setFilteredQuestions(filtered);
    setCurrentScreen('time');
  };

  const handleSelectMode = (withTime: boolean) => {
    setIsTimedMode(withTime);
    setCurrentScreen('quiz');
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
    setHintsUsed(0); // Resetar dicas usadas a cada novo quiz
  };

  const handleTimeUp = () => {
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
    // Gerar novas perguntas aleatórias ao jogar novamente
    const newFiltered = filterQuestionsByLevel(selectedLevel);
    setFilteredQuestions(newFiltered);
    setCurrentScreen('quiz');
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
    setHintsUsed(0);
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