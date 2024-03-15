import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from "./getAndStoreToken";

export default async function sendChat(channel_id, message) {
    try {
        console.log('sendChat called')
        const jsonValue = await AsyncStorage.getItem('USER_AUTH_TOKEN');
        const USER_AUTH_TOKEN = (jsonValue != null) ? JSON.parse(jsonValue) : null;

        if (USER_AUTH_TOKEN === null) {
            return;
        }

        if (Date.now() > USER_AUTH_TOKEN.expires_at) {
            await refreshToken();
        }

        const config={
            headers: {
                'Authorization': `Bearer ${USER_AUTH_TOKEN.access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        await axios.post(`https://osu.ppy.sh/api/v2/chat/channels/${channel_id}/messages`, {
            message: message
        }, config);

        return true;

    } catch (e) {
        console.log(e);
        console.log("error at sendChat.js");
        return false;
    }
}