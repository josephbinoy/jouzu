import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from "./getAndStoreToken";

export default async function getChats(id) {
    try {
        console.log('getChat called')
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

        const response = await axios.post('https://osu.ppy.sh/api/v2/chat/channels', {
            target_id: id,
            type: 'PM'
        }, config);
        let recent_messages=[];
        for (let chat of response.data.recent_messages){
            recent_messages.push({
                content: chat.content,
                timestamp: chat.timestamp,
                sender_id: chat.sender_id
            });
        }
        return { channel_id: response.data.channel_id, recent_messages: recent_messages}

    } catch (e) {
        console.log(e);
        console.log("error at getChat.js");
        return { channel_id: null, recent_messages: []};
    }
}