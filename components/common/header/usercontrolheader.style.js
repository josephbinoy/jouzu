import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  btnImg: {
    width: 40,
    height: 40,
    borderRadius: SIZES.small / 1.25,
  },
  bellIcon: {
    objectFit: 'contain',
    width: 40,
    height: 40,
    tintColor: COLORS.lightWhite,
  },
  title: {
    color: COLORS.gray2,
    fontSize: SIZES.large,
    fontFamily: FONT.medium
  },
  menuOptions: {
    marginTop: 45, 
    backgroundColor: COLORS.secondary, 
    width: "30%",
    borderRadius: SIZES.small,
    shadowColor: 'transparent'
  },
  option: {
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'flex-start',
    padding: 10
  }
});

export default styles;
