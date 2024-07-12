import { StyleSheet } from "react-native";
import { fpx, hpx, vpx } from "../../../libraries/responsive-pixels";

export const styles = StyleSheet.create({
  container: {
    marginTop: vpx(16),
    flexDirection: "row",
    alignSelf: "center",
  },
  countdownLabel: {
    color: "#005055",
    textAlign: "center",
    marginTop: vpx(4),
  },
  countdownValue: {
    color: "#005055",
    fontSize: fpx(24),
    fontWeight: "bold",
    textAlign: "center",
  },
  countdownSeparator: {
    color: "#005055",
    fontSize: fpx(24),
    fontWeight: "bold",
    marginHorizontal: hpx(10),
  },
  timeItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
