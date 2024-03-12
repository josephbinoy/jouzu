import { useState, useEffect } from "react";
import axios from "axios";
import { API_TOKEN_NEW } from "@env";

export default function getRankings() {
    const [rankings, setRankings] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const config={
        headers: {
            'Authorization': `Bearer ${API_TOKEN_NEW}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    const fetchRanks = async () => {
        try {
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