import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.small,
    backgroundColor: COLORS.secondary,
    ...SHADOWS.medium,
  },
  preview: {
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginTop: 3,
  },
  rank: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xLarge,
    color: COLORS.lightWhite,
  },
  rankWrapper: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default styles;
