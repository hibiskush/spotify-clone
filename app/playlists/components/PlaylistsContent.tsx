// app/playlists/components/PlaylistsContent.tsx
"use client";
import useOnPlay from "@/hooks/useOnPlay";
import Header from "@/components/Header";
import MediaItem from "@/components/MediaItem";
import { Song } from "@/types";
import Image from "next/image";

interface PlaylistsContentProps {
    songs: Song[];
    playlistName: string;
}

const PlaylistsContent: React.FC<PlaylistsContentProps> = ({ songs, playlistName }) => {
    const onPlay = useOnPlay(songs);

    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header>
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center gap-x-5">
                        <div className="relative h-32 w-32 lg:h-44 lg:w-44">
                            <Image
                                fill
                                alt="Playlist"
                                className="object-cover"
                                src="/images/liked.png"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                            <p className="hidden md:block font-semibold text-sm">
                                Playlist
                            </p>
                            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                                {playlistName}
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            <div className="flex flex-col gap-y-2 w-full p-6">
                {!Array.isArray(songs) || songs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-y-2 w-full px-6 py-10 text-neutral-400 bg-neutral-800 rounded-lg shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 00-4-4H3m6 6v2a4 4 0 004 4h2m-6-6h6m0 0v2a4 4 0 004 4h2m-6-6h6m0 0v-2a4 4 0 00-4-4h-2m6 6h-6m0 0v-2a4 4 0 00-4-4H9m6 6h-6" />
                        </svg>
                        <p className="text-lg font-semibold">No songs found</p>
                        <p className="text-sm text-neutral-500">Try adding some songs to your playlist.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-2 w-full p-6">
                        {songs.map((song) => (
                            <div key={song.id} className="flex items-center gap-x-4 w-full" onClick={() => onPlay(song.id)}>
                                <div className="flex-1">
                                    <MediaItem data={song} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaylistsContent;