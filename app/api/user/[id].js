import { View,SafeAreaView, ActivityIndicator } from "react-native";
import { WebView } from 'react-native-webview';
import { useState } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import { COLORS } from "../../../constants";


export default function Details(){
    const params = useLocalSearchParams();
    const [isLoading, setLoading] = useState(false);
    console.log("user page called")
    return(
        <SafeAreaView style = {{flex:1, backgroundColor: COLORS.bg}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.bg},
                    headerShadowVisible: true,
                    headerTransparent: true,
                    headerTitle: "jouzu",
                    headerTintColor: COLORS.white,
                    headerTitleAlign: 'center',
                    }}/>
            <WebView 
                source={{ uri: `https://osu.ppy.sh/users/${params.id}` }}
                style={{ backgroundColor: COLORS.bg }}    
                onLoadProgress={({nativeEvent}) => {
                    if (nativeEvent.progress != 1 && isLoading == false ) {
                        setLoading(true)
                    } else if (nativeEvent.progress == 1 ) {
                        setLoading(false)
                    }
                }}     
                />
            {isLoading && 
                <View style={{position: 'absolute', top: 100, width: "100%"}}>
                    <ActivityIndicator color= {COLORS.primary} size="large"/>
                </View>}  
        </SafeAreaView>
    )
}