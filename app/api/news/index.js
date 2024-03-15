import { View,SafeAreaView, ActivityIndicator } from "react-native";
import { WebView } from 'react-native-webview';
import { useState } from "react";
import { Stack } from "expo-router";
import { COLORS } from "../../../constants";

export default function Details(){
    const [isLoading, setLoading] = useState(false);
    return(
        <SafeAreaView style = {{flex:1}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.bg},
                    headerShadowVisible: false,
                    headerTransparent: true,
                    headerTitle: "jouzu",
                    headerTintColor: COLORS.white,
                    headerTitleAlign: 'center',
                    }} />
            <WebView 
                source={{ uri: `https://osu.ppy.sh/home/news` }}
                style={{ backgroundColor: COLORS.bg,
                    flex: 1,}}
                onLoadProgress={({nativeEvent}) => {
                    if (nativeEvent.progress != 1 && isLoading == false ) {
                        setLoading(true)
                    } else if (nativeEvent.progress == 1 ) {
                        setLoading(false)
                    }
                }} 
            />
            {isLoading && 
                <View style={{position: 'absolute', width: "100%"}}>
                    <ActivityIndicator color= {COLORS.primary} size="large"/>
                </View>}
        </SafeAreaView>
    )
}