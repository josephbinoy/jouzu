import { useState, useEffect } from "react";
import axios from "axios";

export default function getSeasonalBg() {
    const [backgrounds, setBackgrounds] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBackgrounds = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://osu.ppy.sh/api/v2/seasonal-backgrounds');
            setBackgrounds(response.data.backgrounds);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBackgrounds();
    }, []);

    return {backgrounds, isLoading, error};
}