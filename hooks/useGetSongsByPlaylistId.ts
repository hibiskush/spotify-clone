// hooks/useGetSongsByPlaylistId.ts
import { useEffect, useState } from "react";
import { Song } from "@/types";

const useGetSongsByPlaylistId = (playlistId: string) => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSongs = async () => {
            const response = await fetch(`/api/get-songs-by-playlist-id?playlistId=${playlistId}`);
            const data = await response.json();
            setSongs(data);
            setIsLoading(false);
        };

        fetchSongs();
    }, [playlistId]);

    return { songs, isLoading };
};

export default useGetSongsByPlaylistId;