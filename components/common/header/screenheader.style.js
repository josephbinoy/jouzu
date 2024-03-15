import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: 40,
    height: 40,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SIZES.small,
  },
  bellContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SIZES.small,
  },
  btnImg: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.small / 1.25,
  },
  bellIcon: {
    objectFit: 'contain',
    width: "75%",
    height: "75%",
    tintColor: COLORS.lightWhite,
  },
});

export default styles;
