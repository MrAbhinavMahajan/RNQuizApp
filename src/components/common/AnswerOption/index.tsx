import React from "react";
import { styles } from "./styles";
import RNCta from "../RNCta";
import { Option } from "../../../constants/types";

type AnswerOption = {
  option: Option;
  isSelected: boolean;
  isCorrect: boolean;
  onPress: () => void;
};

const AnswerOption = ({
  option: { value },
  isSelected,
  isCorrect,
  onPress,
}: AnswerOption) => (
  <RNCta
    title={value}
    onPress={onPress}
    containerStyles={[
      styles.answerOption,
      isSelected &&
        (isCorrect
          ? styles.selectedCorrectOption
          : styles.selectedIncorrectOption),
    ]}
    titleStyles={[
      styles.answerText,
      isSelected &&
        (isCorrect
          ? styles.selectedCorrectOptionText
          : styles.selectedIncorrectOptionText),
    ]}
  />
);

export default AnswerOption;
