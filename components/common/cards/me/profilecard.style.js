import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 0,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.secondary,
    ...SHADOWS.medium,
  },
  banner: {
    width: "100%",
    height: 150,
    borderRadius: SIZES.small,
    overflow: "hidden",
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: SIZES.small,
    position: 'relative',
    bottom: 30,
    },
  outerContainer: {
    width: "100%",
    paddingHorizontal: SIZES.small,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textContainer: {
    paddingHorizontal: SIZES.small,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  countryContainer: {
    gap: 6,
    flexDirection: "row",
  },
  username: {
    fontFamily: FONT.medium,
    fontSize: SIZES.xxLarge,
    color: COLORS.white,
  },
  country: {
    fontFamily: FONT.regular,
    color: COLORS.gray,
    marginTop: 3,
  },
  supporterIcon:(level) => ({
    width: level*10+40,
    height: 30
  }),
  date: {
    alignSelf: 'flex-end',
    marginHorizontal: SIZES.small,
    marginBottom: SIZES.small,
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.gray2,
  },
  preview: {
      fontFamily: FONT.regular,
      fontSize: SIZES.medium,
      color: COLORS.gray2,
      marginTop: 3,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gap: 10,
    width: "100%",
    paddingHorizontal: SIZES.small,
    paddingBottom: SIZES.small,
  }
});

export default styles;
