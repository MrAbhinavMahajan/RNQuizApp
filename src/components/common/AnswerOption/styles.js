import { StyleSheet } from "react-native";
import { fpx, vpx } from "../../../libraries/responsive-pixels";

export const styles = StyleSheet.create({
  answerOption: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: vpx(16),
    borderRadius: 10,
    borderColor: "#44403c",
  },
  answerText: {
    fontSize: fpx(16),
    color: "#000000",
    fontWeight: "300",
  },
  selectedCorrectOption: {
    backgroundColor: "#d1fae5",
    borderColor: "#047857",
    borderWidth: 1.2,
  },
  selectedCorrectOptionText: {
    fontSize: fpx(16),
    color: "#047857",
    fontWeight: "500",
  },
  selectedIncorrectOption: {
    backgroundColor: "#fef2f2",
    borderColor: "#b91c1c",
    borderWidth: 1.2,
  },
  selectedIncorrectOptionText: {
    fontSize: fpx(16),
    color: "#b91c1c",
    fontWeight: "500",
  },
});
