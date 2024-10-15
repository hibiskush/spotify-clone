// app/api/get-songs-by-playlist-id/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { URLSearchParams } from 'url';

const getSongsByPlaylistId = async (req: NextRequest) => {
    const queryParams = new URLSearchParams(req.url?.split('?')[1]);
    const playlistId = queryParams.get('playlistId');

    if (!playlistId || typeof playlistId !== 'string') {
        return NextResponse.json({ error: 'Invalid playlist ID' }, { status: 400 });
    }

    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase
        .from('playlist_songs')
        .select('song_id')
        .eq('playlist_id', playlistId);

    if (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
        return NextResponse.json({ error: 'No songs found for this playlist' }, { status: 404 });
    }

    const songIds = data.map((item) => item.song_id);
    const { data: songs, error: songsError } = await supabase
        .from('songs')
        .select('*')
        .in('id', songIds);

    if (songsError) {
        console.log(songsError);
        return NextResponse.json({ error: songsError.message }, { status: 500 });
    }

    return NextResponse.json(songs, { status: 200 });
};

export { getSongsByPlaylistId as GET };