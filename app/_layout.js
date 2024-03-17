import { Stack } from 'expo-router';
import { useEffect,useContext } from 'react';
import { useFonts, Exo2_700Bold, Exo2_500Medium, Exo2_400Regular } from '@expo-google-fonts/exo-2';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Linking from 'expo-linking';
import { AuthProvider } from './api/auth/AuthProvider';
import { AuthContext } from './api/auth/AuthContext';
import getAndStoreUser  from '../utils/getAndStoreUser';
import getGuestToken from '../utils/getGuestToken';
import { getAndStoreToken } from '../utils/getAndStoreToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as NavigationBar from 'expo-navigation-bar';
import { MenuProvider } from 'react-native-popup-menu';
  
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
            NavigationBar.setVisibilityAsync("hidden");
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <AuthProvider>
            <AuthHandler />
            <MenuProvider>
                <SafeAreaProvider>
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </SafeAreaProvider>
            </MenuProvider>
        </AuthProvider>
    )}

function AuthHandler(){
    const { setLoggedIn, setUser, loggedIn, setCanChat } = useContext(AuthContext);
    const url = Linking.useURL();
    useEffect(() => {
        const handleAuth = async () => {
            if (url && url!='exp://192.1.6.8081') {
                const { queryParams } = Linking.parse(url);
                if (queryParams && queryParams.code) {
                    if (loggedIn){
                        await getAndStoreToken(queryParams.code);
                        await AsyncStorage.setItem('CHAT_PERMSSION', 'true');
                        setCanChat(true);
                    }
                    else {
                        await getAndStoreToken(queryParams.code);
                        const success = await getAndStoreUser(setUser);
                        if (success){
                            setLoggedIn(true);
                        }
                    }
                }
            }
            else{
                const jsonValue = await AsyncStorage.getItem('USER_PROFILE');
                if(jsonValue){
                    setUser(JSON.parse(jsonValue));
                    setLoggedIn(true);
                }
                const chatPermission = await AsyncStorage.getItem('CHAT_PERMSSION');
                if(chatPermission=='true'){
                    setCanChat(true);
                }
                await refreshExpiredGuestToken();
            }
        }
        handleAuth();
    }, [url]);
}

async function refreshExpiredGuestToken(){
    const jsonValue = await AsyncStorage.getItem('GUEST_TOKEN');
    let GUEST_TOKEN = (jsonValue != null) ? JSON.parse(jsonValue) : null;
    if(GUEST_TOKEN){
        if (Date.now() > GUEST_TOKEN.expires_at) {
            await getGuestToken();
        }
    }
    else{
        await getGuestToken();
    }
}