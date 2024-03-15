import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
    messageWrapper: (sender, user)=>({
        alignSelf: (sender==user)?'flex-end':'flex-start',
        maxWidth: '80%',
        justifyContent: 'center',
        alignItems: (sender==user)?'flex-end':'flex-start',
        margin: 10,
    }),
    messageBox: {
        backgroundColor: COLORS.dark,
        borderRadius: 5,
        padding: 10,
    },
    message: {
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        color: COLORS.lightWhite,
    },
    header: {
        fontSize: SIZES.large,
        fontFamily: FONT.medium,
        color: COLORS.lightWhite,
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 10,
    },
    inputBox: {
        backgroundColor: COLORS.dark,
        padding: 5,
        borderRadius: 5,
        width: '70%',
        height: 50,
        color: COLORS.gray,
        fontFamily: FONT.regular,
    },
    sendBtn: {
        backgroundColor: '#ac396d',
        borderRadius: 25,
        width: '20%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendContainer: {
        flexDirection: 'row',
        gap: 5,
        padding: 10,
        alignItems: 'center',
    },
    sendText: {
        fontSize: SIZES.medium,
        fontFamily: FONT.medium,
        color: COLORS.lightWhite,
    },
    timestamp: {
        fontSize: SIZES.small,
        fontFamily: FONT.medium,
        color: COLORS.gray,
    }
});

export default styles;
