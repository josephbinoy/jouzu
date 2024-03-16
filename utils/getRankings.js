import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getGuestToken from "./getGuestToken";

export default function getRankings() {
    const [rankings, setRankings] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRanks = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('GUEST_TOKEN');
            let GUEST_TOKEN = (jsonValue != null) ? JSON.parse(jsonValue) : null;
        
            if (GUEST_TOKEN === null) {
                return;
            }
        
            if (Date.now() > GUEST_TOKEN.expires_at) {
                await getGuestToken();
                const updatedJsonValue = await AsyncStorage.getItem('GUEST_TOKEN');
                GUEST_TOKEN = (updatedJsonValue != null) ? JSON.parse(updatedJsonValue) : null;
            }
            const config={
                headers: {
                    'Authorization': `Bearer ${GUEST_TOKEN.access_token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
            setLoading(true);
            const response = await axios.get('https://osu.ppy.sh/api/v2/rankings/osu/performance', config);
            setRankings(response.data.ranking);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRanks();
    }, []);

    return {rankings, isLoading, error};
}