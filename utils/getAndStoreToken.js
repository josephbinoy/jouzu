import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { client_id, client_secret } from  "@env"

export async function getAndStoreToken(code) {
    try {
        const response = await axios.post('https://osu.ppy.sh/oauth/token', {
            client_id: client_id,
            client_secret: client_secret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: 'exp://192.168.1.11:8081/--/(tabs)/me'
        });
        response.data.expires_at = Date.now() + response.data.expires_in*1000;
        const jsonToken = JSON.stringify(response.data);
        await AsyncStorage.setItem('USER_AUTH_TOKEN', jsonToken);
    } catch (error) {
        console.log("error at getAndStoreToken.js")
        console.log(error);
    }

}

export async function refreshToken(){
    try {
        console.log('refresh_token')
        const jsonValue = await AsyncStorage.getItem('USER_AUTH_TOKEN');
        const { refresh_token } = (jsonValue != null) ? JSON.parse(jsonValue) : null;
        const response = await axios.post('https://osu.ppy.sh/oauth/token', {
            client_id: client_id,
            client_secret: client_secret,
            code: code,
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
            redirect_uri: 'exp://192.168.1.11:8081/--/(tabs)/me'
        });
        response.data.expires_at = Date.now() + response.data.expires_in*1000;
        const jsonToken = JSON.stringify(response.data);
        await AsyncStorage.setItem('USER_AUTH_TOKEN', jsonToken);
    } catch (error) {
        console.log("error at refreshtoken")
        console.log(error);
    }
}