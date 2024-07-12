import { StyleSheet } from "react-native";
import { fpx, hpx, vpx } from "../../../libraries/responsive-pixels";

export const styles = StyleSheet.create({
  container: {},
  title: {},
  rightIcon: {
    position: "absolute",
    right: hpx(20),
  },
  primaryCta: {
    backgroundColor: "#005055",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vpx(10),
  },
  primaryCtaText: {
    color: "white",
    paddingVertical: vpx(12),
    fontSize: fpx(16),
    fontWeight: "500",
    letterSpacing: 1.5,
  },
  secondaryCta: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#005055",
    borderRadius: vpx(10),
    marginTop: vpx(12),
  },
  secondaryCtaText: {
    color: "#005055",
    paddingVertical: vpx(12),
    fontSize: fpx(16),
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
});
