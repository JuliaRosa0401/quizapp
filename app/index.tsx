import QuizScreen from "@/components/QuizScreen";
import { ThemeProvider } from '../ThemeContext';

const HomePage = () => {
  return ( 
    <ThemeProvider>
      <QuizScreen />
    </ThemeProvider>
  

  );
};

export default HomePage;