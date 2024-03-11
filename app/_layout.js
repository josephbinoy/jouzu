import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useFonts, Exo2_700Bold, Exo2_500Medium, Exo2_400Regular } from '@expo-google-fonts/exo-2';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
  
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
        <SafeAreaProvider>
            <Stack />
        </SafeAreaProvider>
    )}
  