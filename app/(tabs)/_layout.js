import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { COLORS, FONT, icons} from '../../constants';
import { StyleSheet } from "react-native";
import { ScreenHeaderBtn } from '../../components';
import { useContext } from 'react';
import { AuthContext } from '../api/auth/AuthContext';

const tabStyle = StyleSheet.create({
    tabIcon: (color) => ({
        tintColor: color,
        height: 25,
        width: 25,
    })
})

export default function TabLayout() {
  const { user } = useContext(AuthContext);
  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: COLORS.white,
        tabBarStyle: {
            backgroundColor: COLORS.bg,
            borderTopWidth: 0
        },
        tabBarLabelPosition: 'beside-icon',
        }}

        >
      <Tabs.Screen
        name="index"
        options={{
          title: 'home',
          tabBarIcon: ({color}) => (<Image source={icons.home} style={tabStyle.tabIcon(color)}/>),
          headerShadowVisible: false,
          headerStyle: {backgroundColor: COLORS.bg},
          headerRight: () => (
              <ScreenHeaderBtn iconUrl={{uri: user.avatar_url}} />
          ),
          headerTitle: "jouzu",
          headerTintColor: COLORS.white,
          headerTitleAlign: 'left'
        }}
        
      />
      <Tabs.Screen
        name="beatmaps"
        options={{
          title: 'beatmaps',
          tabBarIcon: ({color}) => (<Image source={icons.beatmaps} style={tabStyle.tabIcon(color)}/>),
          headerShadowVisible: false,
          headerStyle: {backgroundColor: COLORS.bg},
          headerTitle: "beatmaps listing",
          headerTintColor: COLORS.white,
          headerTitleAlign: 'left',
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: 'me',
          tabBarIcon: ({color}) => (<Image source={icons.me} style={tabStyle.tabIcon(color)}/>),
          headerShadowVisible: false,
          headerStyle: {backgroundColor: COLORS.bg,},
          headerTitle: "my profile",
          headerTitleStyle: {fontFamily: FONT.medium},
          headerTintColor: COLORS.white,
          headerTitleAlign: 'left',
        }}
      />
    </Tabs>
  );
}
