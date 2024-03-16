import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from "./getAndStoreToken";

export default async function getFriends() {
    try {
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

        const response = await axios.get('https://osu.ppy.sh/api/v2/friends', config);
        let friends = [];
        for ( let friend of response.data){
            let friendData = {
                avatar_url: friend.avatar_url,
                username: friend.username,
                id: friend.id,
                country: friend.country,
                is_online: friend.is_online,
                is_supporter: friend.is_supporter,
                last_online: friend.last_visit,
                cover: friend.cover,
                global_rank: friend.statistics.global_rank
            }
            friends.push(friendData);
        }
        friends.sort((a, b) => new Date(b.last_online) - new Date(a.last_online));
        return friends;

    } catch (e) {
        console.log(e);
        return [];
    }
}