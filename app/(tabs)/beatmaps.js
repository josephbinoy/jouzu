import { View,SafeAreaView, ActivityIndicator } from "react-native";
import { WebView } from 'react-native-webview';
import { useState } from "react";
import { COLORS } from "../../constants/";

export default function Details(){
    const [isLoading, setLoading] = useState(false);
    return(
        <SafeAreaView style = {{flex:1}}>
            <WebView 
                source={{ uri: `https://osu.ppy.sh/beatmapsets` }}
                style={{ backgroundColor: COLORS.bg,
                    flex: 1,
                    width: '100%',
                    height: '200%',
                    position: 'absolute',
                    top: -51,}}    
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
