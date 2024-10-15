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

    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            {songs.length === 0 && playlists.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-y-2 w-full px-6 py-10 text-neutral-400 bg-neutral-800 rounded-lg shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 00-4-4H3m6 6v2a4 4 0 004 4h2m-6-6h6m0 0v2a4 4 0 004 4h2m-6-6h6m0 0v-2a4 4 0 00-4-4h-2m6 6h-6m0 0v-2a4 4 0 00-4-4H9m6 6h-6" />
                    </svg>
                    <p className="text-lg font-semibold">No liked songs or playlists found</p>
                    <p className="text-sm text-neutral-500">Try adding some more to your playlist.</p>
                </div>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
}

export default LikedContent;