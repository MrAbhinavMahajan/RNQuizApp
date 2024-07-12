import React from "react";
import { ScrollView, View } from "react-native";
import { styles } from "./styles";
import { Question } from "../../../constants/types";
import { useQuizContext } from "../../../providers/Quiz";
import AnswerOption from "../AnswerOption";
import { vpx } from "../../../libraries/responsive-pixels";

type QuestionCardProps = {
  question: Question;
};

const QuestionCard = ({ question }: QuestionCardProps) => {
  const { options, id: questionId } = question;
  const { getOptionSelection, saveOptionSelection, checkIsSelectionCorrect } =
    useQuizContext();

  const onSelectOption = (optionId: string) => {
    saveOptionSelection(questionId, optionId);
  };

  return (
    <View
      style={styles.optionsContainer}
      pointerEvents={getOptionSelection(questionId) ? "none" : "auto"}
    >
      <ScrollView contentContainerStyle={styles.scrollableOptionsContainer}>
        {options.map((option) => (
          <AnswerOption
            key={`${questionId}_${option?.id}`}
            option={option}
            onPress={() => onSelectOption(option.id)}
            isSelected={option.id === getOptionSelection(questionId)}
            isCorrect={checkIsSelectionCorrect(questionId, option.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default QuestionCard;
