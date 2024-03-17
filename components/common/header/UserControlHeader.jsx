import { Image, View,Text} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { COLORS } from '../../../constants';
import { AuthContext } from '../../../app/api/auth/AuthContext';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RCTNetworking = require("react-native/Libraries/Network/RCTNetworking").default;
import { useRouter } from 'expo-router';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import styles from './usercontrolheader.style'

export default function UserControlHeader() {
  const { user, setUser, loggedIn, setLoggedIn, setCanChat } = useContext(AuthContext);
  const router = useRouter();
  handleLogout = async () => {
    try {
      await AsyncStorage.clear()
      setLoggedIn(false);
      setCanChat(false);
      setUser({
        username: 'user',
        avatar_url: 'https://osu.ppy.sh/images/layout/avatar-guest.png',
      });
      RCTNetworking.clearCookies((res)=>{console.log(res)});
    } catch(e) {
      console.log(e)
    }
  }

  handleLogin = () => {
    router.push('/api/login/login');
  }

  return (
    <View style={styles.container}>
        <Menu >
      <MenuTrigger >
      <FontAwesome name='bell' color={COLORS.gray2} size={25} />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{...styles.menuOptions, width: "50%", marginTop: 40, }}>
        <MenuOption style={styles.option}>
          <Text style={styles.title}>no notifications</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
        <Menu style={{marginRight: 20}}>
      <MenuTrigger >
        <Image source={{uri: user.avatar_url}} resizeMode='cover' style={styles.btnImg}   />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.menuOptions}>
        {loggedIn?
        <MenuOption onSelect={() => handleLogout()} style={styles.option}>
          <Text style={styles.title}>logout</Text>
        </MenuOption>:
        <MenuOption onSelect={() => handleLogin()} style={styles.option}>
          {<Text style={styles.title}>login</Text>}
        </MenuOption>}
      </MenuOptions>
    </Menu>
    </View>
    
  )
}
