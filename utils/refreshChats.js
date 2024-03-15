import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from "./getAndStoreToken";

export default async function refreshChat(channel_id) {
    try {
        console.log('refreshChat called')
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

        const response = await axios.get(`https://osu.ppy.sh/api/v2/chat/channels/${channel_id}/messages`, config);
        let refreshed_chats=[];
        for (let chat of response.data){
            refreshed_chats.push({
                content: chat.content,
                timestamp: chat.timestamp,
                sender_id: chat.sender_id
            });
        }
        return refreshed_chats

    } catch (e) {
        console.log(e);
        console.log("error at refreshchat.js");
        return [];
    }
}