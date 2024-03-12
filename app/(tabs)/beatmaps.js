import { SafeAreaView} from "react-native";
import { WebView } from 'react-native-webview';
import { COLORS } from "../../constants/";

export default function Details(){
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
                />      
        </SafeAreaView>
    )
}
