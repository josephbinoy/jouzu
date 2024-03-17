import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getGuestToken() {
    try {
        const response = await axios.post('https://osu.ppy.sh/oauth/token', {
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            grant_type: 'client_credentials',
            scope: 'public'
        });
        response.data.expires_at = Date.now() + response.data.expires_in*1000;
        const jsonToken = JSON.stringify(response.data);
        await AsyncStorage.setItem('GUEST_TOKEN', jsonToken);
    } catch (error) {
        console.log(error);
    }

}