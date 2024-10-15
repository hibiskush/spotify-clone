'use client';

import { useEffect, useState } from "react";
import useGetSongsByPlaylistId from "@/hooks/useGetSongsByPlaylistId";
import PlaylistsContent from "../components/PlaylistsContent";

const PlaylistPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const { songs, isLoading } = useGetSongsByPlaylistId(id);
    const [playlistName, setPlaylistName] = useState<string>('');

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            const response = await fetch(`/api/get-playlist-details?playlistId=${id}`);
            const data = await response.json();
            setPlaylistName(data.name);
        };

        fetchPlaylistDetails();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <PlaylistsContent songs={songs} playlistName={playlistName} />
    );
};

export default PlaylistPage;