import { SafeAreaView} from "react-native";
import { WebView } from 'react-native-webview';
import { Stack } from "expo-router";
import { COLORS } from "../../../constants";

export default function Login(){
    return(
        <SafeAreaView style = {{flex:1}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.bg},
                    headerShadowVisible: true,
                    headerTitle: "jouzu",
                    headerBackVisible: false,
                    headerTintColor: COLORS.white,
                    headerTitleAlign: 'center',
                    }} />
            <WebView 
                source={{ uri: `https://osu.ppy.sh/oauth/authorize?client_id=30906&redirect_uri=exp://192.168.1.9:8081/--/(tabs)/me&response_type=code&scope=friends.read` }}
                style={{ backgroundColor: COLORS.bg }}    
                />      
        </SafeAreaView>
    )
}