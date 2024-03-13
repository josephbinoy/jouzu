import { Keyboard, SafeAreaView} from "react-native";
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, Stack } from "expo-router";
import { COLORS } from "../../../constants";

export default function Details(){
    const params = useLocalSearchParams();

    return(
        <SafeAreaView style = {{flex:1}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.bg},
                    headerShadowVisible: false,
                    headerTransparent: false,
                    headerTitle: "jouzu",
                    headerTintColor: COLORS.white,
                    headerTitleAlign: 'center',
                    }} />
            <WebView 
                source={{ uri: `https://osu.ppy.sh/home/search?mode=all&query=${params.query}` }}
                style={{ backgroundColor: COLORS.bg,
                    flex: 1,
                    width: '100%',
                    height: '200%',
                    position: 'absolute',
                    top: -51,}}
                    />
                    {Keyboard.dismiss()}
        </SafeAreaView>
    )
}