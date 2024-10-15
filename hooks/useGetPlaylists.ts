// src/hooks/useGetPlaylists.ts
import { useEffect, useState } from "react";
import { Playlist } from "@/types";

const useGetPlaylists = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPlaylists = async () => {
        const response = await fetch('/api/get-playlists');
        const data = await response.json();
        setPlaylists(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    return { playlists, isLoading, fetchPlaylists };
};

export default useGetPlaylists;