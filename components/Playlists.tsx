// components/Playlists.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Playlist } from '@/types';

interface PlaylistsProps {
    playlists: Playlist[];
}

const Playlists: React.FC<PlaylistsProps> = ({ playlists }) => {
    const router = useRouter();

    if (playlists.length === 0) {
        return <div>No playlists found.</div>;
    }

    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
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
        </div>
    );
};

export default Playlists;