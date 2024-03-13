import { useState, useEffect } from "react";
import axios from "axios";

export default function getNews() {
    const [news, setNews] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://osu.ppy.sh/api/v2/news');
            setNews(response.data.news_posts);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    return {news, isLoading, error};
}