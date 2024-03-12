import {View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { COLORS, SIZES, images } from '../../constants';
import { News, ScreenHeaderBtn, Welcome, Rankings } from '../../components';

export default function Home() {
    const router = useRouter();
    const tabs= ['News', 'Rankings', 'Community', 'Events']
    const[activeTab, setActiveTab] = useState(tabs[0]);

    const displayTab = () => {
        switch(activeTab){
            case 'News':
                return <News />
            case 'Rankings':
                return <Rankings />
            case 'Community':
                return <Community />
            case 'Events':
                return <Events />
        }
    }

  return(
    <SafeAreaView style = {{flex:1, backgroundColor: COLORS.bg}}>
        <ScrollView showsVerticalScrollIndicator={true}>
                <View style = {{
                    flex: 1,
                    padding: SIZES.medium
                }}>
                    <Welcome tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
                    {displayTab()}
                </View>
        </ScrollView>            
    </SafeAreaView>
  )}
