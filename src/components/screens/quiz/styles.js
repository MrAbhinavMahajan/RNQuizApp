import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "../../../utilities/App";
import { fpx, hpx, vpx } from "../../../libraries/responsive-pixels";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDFEF4",
    flex: 1,
    justifyContent: "space-between",
  },
  headerTitle: {
    textAlign: "center",
    color: "#005055",
    fontSize: fpx(16),
    marginVertical: vpx(16),
  },
  footerCTAPrimary: {
    marginHorizontal: hpx(20),
    backgroundColor: "#005055",
    marginVertical: vpx(16),
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  footerCTAText: {
    color: "white",
    paddingVertical: vpx(20),
    fontSize: fpx(18),
    fontWeight: "500",
    letterSpacing: 1.5,
  },
  questionCardsContainer: {
    flexGrow: 1,
    paddingVertical: vpx(10), // ! To Preserve Shadow Effect
    gap: hpx(14),
    paddingHorizontal: hpx(24),
  },
  questionsContainer: {
    width: SCREEN_WIDTH - hpx(60),
  },
  ctaContainer: {
    marginHorizontal: hpx(20),
  },
  resultCardContainer: {
    width: SCREEN_WIDTH - hpx(40),
    alignSelf: "center",
    marginTop: vpx(50),
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultLabel: {
    fontSize: fpx(18),
    color: "#000000",
    fontWeight: "400",
    lineHeight: fpx(28),
  },
  resultValue: {
    fontSize: fpx(16),
    color: "#005055",
    fontWeight: "800",
  },
  instructionHeaderTitle: {
    marginHorizontal: hpx(20),
    fontSize: fpx(34),
    fontWeight: "700",
  },
  instructionsCardContainer: {
    marginTop: vpx(20),
    width: SCREEN_WIDTH - 40,
    alignSelf: "center",
  },
  resultHeaderTitle: {
    marginHorizontal: hpx(20),
    fontSize: fpx(34),
    fontWeight: "700",
  },
  resultBodyDivider: {
    backgroundColor: "#000000",
    height: StyleSheet.hairlineWidth,
  },
});
