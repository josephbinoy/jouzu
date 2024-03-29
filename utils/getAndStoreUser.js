import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from "./getAndStoreToken";

export default async function getAndStoreUser(setUser) {
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

        const response = await axios.get('https://osu.ppy.sh/api/v2/me', config);
        const user = {
            avatar_url: response.data.avatar_url,
            id: response.data.id,
            is_supporter: response.data.is_supporter,
            support_level: response.data.support_level,
            username: response.data.username,
            interests: response.data.interests,
            join_date: response.data.join_date,
            occupation: response.data.occupation,
            country: response.data.country,
            cover: response.data.cover,
            play_count: response.data.statistics.play_count,
            max_combo: response.data.statistics.maximum_combo,
            peak: response.data.rank_highest.rank,
            session_verified: response.data.session_verified,
            global_rank: response.data.statistics.global_rank,
            pp: response.data.statistics.pp,
            hit_accuracy: response.data.statistics.hit_accuracy,
            play_time: response.data.statistics.play_time,
            country_rank: response.data.statistics.country_rank,
        }
        setUser(user);
        const jsonUser = JSON.stringify(user);
        await AsyncStorage.setItem('USER_PROFILE', jsonUser);
        return true;

    } catch (e) {
        console.log(e);
        return false;
    }
}