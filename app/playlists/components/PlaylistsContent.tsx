// app/playlists/components/PlaylistsContent.tsx
"use client";
import { useRouter } from "next/navigation";
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

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs found.
            </div>
        );
    }

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
                {songs.map((song) => (
                    <div key={song.id} className="flex items-center gap-x-4 w-full" onClick={() => onPlay(song.id)}>
                        <div className="flex-1">
                            <MediaItem data={song} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaylistsContent;