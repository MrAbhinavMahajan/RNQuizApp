import React from "react";
import QuizProvider from "../providers/Quiz";
import QuizScreen from "../components/screens/quiz";

const AppEntry = () => {
  return (
    <QuizProvider>
      <QuizScreen />
    </QuizProvider>
  );
};

export default AppEntry;
