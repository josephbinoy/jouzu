import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAndStoreToken(code) {
    try {
        const response = await axios.post('https://osu.ppy.sh/oauth/token', {
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: 'jouzu://(tabs)/me'
        });
        response.data.expires_at = Date.now() + response.data.expires_in*1000;
        const jsonToken = JSON.stringify(response.data);
        await AsyncStorage.setItem('USER_AUTH_TOKEN', jsonToken);
    } catch (error) {
        console.log(error);
    }

}

export async function refreshToken(){
    try {
        const jsonValue = await AsyncStorage.getItem('USER_AUTH_TOKEN');
        const { refresh_token } = (jsonValue != null) ? JSON.parse(jsonValue) : null;
        const chatPermission = await AsyncStorage.getItem('CHAT_PERMSSION');
        const response = await axios.post('https://osu.ppy.sh/oauth/token', {
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
            scope: (chatPermission=='true')?'friends.read public chat.read chat.write chat.write_manage':'friends.read public'
        });
        response.data.expires_at = Date.now() + response.data.expires_in*1000;
        const jsonToken = JSON.stringify(response.data);
        await AsyncStorage.setItem('USER_AUTH_TOKEN', jsonToken);
    } catch (error) {
        console.log(error);
    }
}