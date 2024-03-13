import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.small,
    backgroundColor: COLORS.secondary,
    ...SHADOWS.medium,
  },
  logoImage: {
    width: "100%",
    height: 150,
    borderRadius: SIZES.small,
  },
  textContainer: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xLarge,
    color: COLORS.white,
  },
  preview: {
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginTop: 3,
  },
});

export default styles;
