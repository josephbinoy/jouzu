import { SafeAreaView} from "react-native";
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, Stack } from "expo-router";
import { COLORS } from "../../../constants";

export default function Details(){
    const params = useLocalSearchParams();

    return(
        <SafeAreaView style = {{flex:1, backgroundColor: COLORS.bg}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.bg},
                    headerShadowVisible: true,
                    headerTransparent: true,
                    navigationBarColor: COLORS.bg,
                    headerTitle: "jouzu",
                    headerTintColor: COLORS.white,
                    headerTitleAlign: 'center',
                    }} />
            <WebView 
                source={{ uri: `https://osu.ppy.sh/home/news/${params.slug}` }}
                style={{ backgroundColor: COLORS.bg }}    
                />      
        </SafeAreaView>
    )
}