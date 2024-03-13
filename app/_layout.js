import { Stack } from 'expo-router';
import { useEffect,useContext } from 'react';
import { useFonts, Exo2_700Bold, Exo2_500Medium, Exo2_400Regular } from '@expo-google-fonts/exo-2';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';
import { AuthProvider } from './api/auth/AuthProvider';
import { AuthContext } from './api/auth/AuthContext';
import getAndStoreUser  from '../utils/getAndStoreUser';
import { getAndStoreToken } from '../utils/getAndStoreToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
  
SplashScreen.preventAutoHideAsync();
  
export default function Layout() {
    const [fontsLoaded, fontError] = useFonts({
        ExoRegular: Exo2_400Regular,
        ExoMedium: Exo2_500Medium,
        ExoBold: Exo2_700Bold
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <AuthProvider>
            <AuthHandler />
            <SafeAreaProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
            </SafeAreaProvider>
        </AuthProvider>
    )}

function AuthHandler(){
    const { setLoggedIn, setUser } = useContext(AuthContext);
    const url = Linking.useURL();
    useEffect(() => {
        const handleAuth = async () => {
            if (url && url!='exp://192.168.1.11:8081') {
                console.log(url);
                console.log("AuthHandler if block called");
                const { queryParams } = Linking.parse(url);
                if (queryParams && queryParams.code) {
                    console.log(queryParams.code)
                    await getAndStoreToken(queryParams.code);
                    if(await getAndStoreUser(setUser)){
                        setLoggedIn(true);
                    }
                }
            }
            else{
                console.log("AuthHandler else block called")
                const jsonValue = await AsyncStorage.getItem('USER_PROFILE');
                if(jsonValue){
                    setUser(JSON.parse(jsonValue));
                    setLoggedIn(true);
                }   
            }
        }
        handleAuth();
    }, [url]);
}
