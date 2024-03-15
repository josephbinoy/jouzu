import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../../constants";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: SIZES.small,
  },
  container: {
    width: "48%",
    borderRadius: SIZES.small,
    backgroundColor: COLORS.secondary,
    ...SHADOWS.medium,
    overflow: "hidden",
  },
  bg: {
    padding: SIZES.small,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 7
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusRing: (isOnline) => ({
    borderWidth: 4,
    borderRadius: 50,
    borderColor: isOnline?'#b3d944':COLORS.gray,
    width: 25,
    height: 25,
  }),
  title: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
  },
  preview: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.gray2,
  },
  chatButton: {
    alignItems:'center',
    justifyContent:'center',
    width:40,
    height:40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 25
  }
});

export default styles;
