"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Playlist, Song } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface LikedContentProps {
    songs: Song[];
    playlists: Playlist[];
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs,
    playlists
}) => {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    if (songs.length === 0 && playlists.length === 0) {
        return (
            <div className="
             flex
             flex-col
             gap-y-2
             w-full
             px-6
             text-neutral-400
            ">
                No liked songs or playlists.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            {songs.length > 0 && (
                <>
                    <h2 className="text-white text-2xl mb-4">Liked Songs</h2>
                    {songs.map((song) => (
                        <div
                            key={song.id}
                            className="flex items-center gap-x-4 w-full"
                        >
                            <div className="flex-1">
                                <MediaItem 
                                    onClick={(id: string) => onPlay(id)}
                                    data={song}
                                />
                            </div>
                            <LikeButton songId={song.id} />
                        </div>
                    ))}
                </>
            )}
            {playlists.length > 0 && (
                <>
                    <h2 className="text-white text-2xl mb-4">Playlists</h2>
                    {playlists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="flex items-center gap-x-4 w-full cursor-pointer"
                            onClick={() => router.push(`/playlists/${playlist.id}`)}
                        >
                            <div className="relative h-16 w-16">
                                <Image 
                                    fill
                                    alt="Playlist"
                                    className="object-cover"
                                    src="/images/liked.png"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="text-white">{playlist.name}</div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default LikedContent;