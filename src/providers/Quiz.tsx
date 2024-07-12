import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import dayjs from "dayjs";
import questions from "../data/questions";
import { Alert } from "react-native";
import { getValueFromStorage, saveToStorage } from "../utilities/App";

type QuizContext = {
  isStarted: boolean;
  isFinished: boolean;
  score: number;
  bestScore: number;
  questionIndex: number;
  totalQuestions: number;
  totalScore: number;
  hasPreviousQuestion: boolean;
  hasNextQuestion: boolean;
  endTime: number | undefined;
  saveOptionSelection: (questionId: string, optionId: string) => void;
  getOptionSelection: (questionId: string) => string;
  checkIsSelectionCorrect: (questionId: string, optionId: string) => boolean;
  checkAreAllAnswered: () => boolean;
  onPrevQuestion: () => void;
  onNextQuestion: () => void;
  onStartQuiz: () => void;
  onSubmitQuiz: () => void;
  onResetQuiz: () => void;
  onTimesUp: () => void;
};

const QuizContext = createContext<QuizContext>({
  score: 0,
  bestScore: 0,
  questionIndex: 0,
  totalQuestions: 0,
  totalScore: 0,
  isStarted: false,
  isFinished: false,
  hasPreviousQuestion: false,
  hasNextQuestion: false,
  endTime: 0,
  saveOptionSelection: () => {},
  getOptionSelection: () => "",
  checkIsSelectionCorrect: () => false,
  checkAreAllAnswered: () => false,
  onPrevQuestion: () => {},
  onNextQuestion: () => {},
  onStartQuiz: () => {},
  onSubmitQuiz: () => {},
  onResetQuiz: () => {},
  onTimesUp: () => {},
});

// Wrap all the screens using quizContext under this provider
const QuizProvider = ({ children }: PropsWithChildren) => {
  const [isStarted, setQuizStarted] = useState(false);
  const [isFinished, setQuizFinished] = useState(false);
  const [endTime, setEndTime] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestions = questions.length;
  const totalScore = questions.reduce((total, item) => total + item.score, 0);
  const [hasPreviousQuestion, setHasPreviousQuestion] = useState(
    questionIndex > 0
  );
  const [hasNextQuestion, setHasNextQuestion] = useState(
    questionIndex <= totalQuestions - 1
  );
  const [answersRecorded, setAnswersRecorded] = useState<Map<string, string>>(
    new Map()
  );
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);

  const loadStorage = () => {
    getValueFromStorage("BEST_SCORE").then((savedScore) => {
      !!savedScore && setBestScore(Number(savedScore));
    });
  };

  useEffect(() => {
    loadStorage();
  }, []);

  useEffect(() => {
    setHasPreviousQuestion(questionIndex > 0);
    setHasNextQuestion(questionIndex < totalQuestions - 1);
  }, [questionIndex]);

  useEffect(() => {
    if (isFinished && score > bestScore) {
      setBestScore(score);
      saveToStorage("BEST_SCORE", score.toString());
    }
  }, [isFinished]);

  const onResetQuiz = () => {
    setAnswersRecorded((m) => {
      m.clear();
      return m;
    });
    setQuizStarted(false);
    setQuizFinished(false);
    setQuestionIndex(0);
    setHasPreviousQuestion(false);
    setHasNextQuestion(false);
    setScore(0);
  };

  const updateScore = (questionId: string, optionId: string) => {
    const question = questions.filter((el) => el.id === questionId)[0];
    if (question.correctAnswer.id === optionId) {
      setScore((scr) => scr + question.score);
    }
  };

  const getOptionSelection = (questionId: string) => {
    return answersRecorded.get(questionId) ?? "";
  };

  const checkIsSelectionCorrect = (questionId: string, optionId: string) => {
    const question = questions.filter((el) => el.id === questionId)[0];
    return optionId === question?.correctAnswer?.id;
  };

  const checkAreAllAnswered = () => totalQuestions === answersRecorded.size;

  const saveOptionSelection = (questionId: string, optionId: string) => {
    if (!getOptionSelection(questionId)) {
      // ! Increment once for right answer
      updateScore(questionId, optionId);
    }
    setAnswersRecorded((prevMap) => {
      const newSelectedOption = new Map(prevMap);
      newSelectedOption.set(questionId, optionId);
      return newSelectedOption;
    });
    onNextQuestion();
  };

  const onStartQuiz = () => {
    setQuizStarted(true);
    setEndTime(dayjs().add(20, "minutes").valueOf());
  };

  const onSubmitQuiz = () => {
    if (!checkAreAllAnswered()) {
      Alert.alert(
        "Submission aborted",
        "You are requested to answer all questions to end quiz."
      );
    } else {
      setQuizFinished(true);
      Alert.alert("Finished", "Well done, you've completed quiz");
    }
  };

  const onTimesUp = () => {
    setQuizFinished(true);
    Alert.alert(
      "Time Up!",
      "Quiz have been submitted since time exceeded. please check the score"
    );
  };

  const onNextQuestion = () => {
    setQuestionIndex((qnIdx) => {
      if (qnIdx <= totalQuestions - 2) {
        setHasNextQuestion(true);
        return qnIdx + 1;
      }
      return qnIdx;
    });
  };

  const onPrevQuestion = () => {
    setQuestionIndex((qnIdx) => {
      if (qnIdx > 0) {
        setHasPreviousQuestion(true);
        return qnIdx - 1;
      }
      return qnIdx;
    });
  };

  return (
    <QuizContext.Provider
      value={{
        score,
        bestScore,
        totalScore,
        isStarted,
        isFinished,
        questionIndex,
        totalQuestions,
        hasPreviousQuestion,
        hasNextQuestion,
        endTime,
        onPrevQuestion,
        onNextQuestion,
        saveOptionSelection,
        getOptionSelection,
        checkIsSelectionCorrect,
        checkAreAllAnswered,
        onStartQuiz,
        onSubmitQuiz,
        onResetQuiz,
        onTimesUp,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;

// useQuizContext hook will be responsible for getting values being shared by the quiz context
export const useQuizContext = () => useContext(QuizContext);
