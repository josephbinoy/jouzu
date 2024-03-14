import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: SIZES.small,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.small,
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xLarge,
    color: COLORS.white,
  },
  preview: {
    fontFamily: FONT.regular,
    color: COLORS.white,
  },
});

export default styles;
