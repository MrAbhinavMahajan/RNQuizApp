import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../../utilities/App";
import { fpx, hpx, vpx } from "../../../libraries/responsive-pixels";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: vpx(40),
    paddingHorizontal: hpx(20),
    borderRadius: vpx(20),

    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: vpx(2),
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    gap: vpx(20),
    width: SCREEN_WIDTH,
    flex: 1,
  },
  title: {
    fontSize: fpx(18),
    fontWeight: "500",
  },
});
