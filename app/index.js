import {View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, SIZES, images } from '../constants';
import { News, ScreenHeaderBtn, Welcome} from '../components';

export default function Home() {
    const router = useRouter();
  return(
    <SafeAreaView style = {{flex:1, backgroundColor: COLORS.bg}}>
        <Stack.Screen
            options={{
                headerStyle: {backgroundColor: COLORS.bg},
                headerShadowVisible: false,
                headerRight: () => (
                    <ScreenHeaderBtn iconUrl={images.profile} dimension='100%'/>
                ),
                headerTitle: "jouzu",
                headerTintColor: COLORS.white,
                headerTitleAlign: 'center',
                }} />
        <ScrollView showsVerticalScrollIndicator={true}>
                <View style = {{
                    flex: 1,
                    padding: SIZES.medium
                }}>
                    <Welcome />
                    <News />
                </View>
        </ScrollView>            
    </SafeAreaView>
  )}
