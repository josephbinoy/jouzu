import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 200,
    borderRadius: SIZES.medium,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  authorContainer: {
    padding: SIZES.small,
    flexDirection: "row",
    position: "absolute",
    gap: 5,
    bottom: 0,
    right: 0,
  },
  author: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.gray2,
    alignSelf: "center",
  },
  pfp: {
    width: 40,
    height: 40,
    borderRadius: SIZES.small,
  },
});

export default styles;
