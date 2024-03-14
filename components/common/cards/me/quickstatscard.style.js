import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.secondary,
    ...SHADOWS.medium,
  },
  statWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  statContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.white,
  },
  preview: {
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginTop: 3,
  },
  stats: {
    fontFamily: FONT.medium,
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },
  rankWrapper: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default styles;
