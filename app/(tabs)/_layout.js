import { Tabs } from 'expo-router';
import { Image, Text } from 'react-native';
import { COLORS, SIZES, icons} from '../../constants';
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
          title: 'Home',
          tabBarIcon: ({color}) => (<Image source={icons.home} style={tabStyle.tabIcon(color)}/>),
          headerShadowVisible: false,
          headerStyle: {backgroundColor: COLORS.bg},
          headerRight: () => (
              <ScreenHeaderBtn iconUrl={{uri: user.avatar_url}} dimension='100%' />
          ),
          headerTitle: "jouzu",
          headerTintColor: COLORS.white,
          headerTitleAlign: 'center'
        }}
        
      />
      <Tabs.Screen
        name="beatmaps"
        options={{
          title: 'Beatmaps',
          tabBarIcon: ({color}) => (<Image source={icons.beatmaps} style={tabStyle.tabIcon(color)}/>),
          headerShadowVisible: false,
          headerStyle: {backgroundColor: COLORS.bg},
          headerTitle: "jouzu",
          headerTintColor: COLORS.white,
          headerTitleAlign: 'center',
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: 'Me',
          tabBarIcon: ({color}) => (<Image source={icons.me} style={tabStyle.tabIcon(color)}/>),
          headerShadowVisible: false,
          headerStyle: {backgroundColor: COLORS.bg},
          headerTitle: "jouzu",
          headerTintColor: COLORS.white,
          headerTitleAlign: 'center',
        }}
      />
    </Tabs>
  );
}
