// app/api/get-playlist-details/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { URLSearchParams } from 'url';

const getPlaylistDetails = async (req: NextRequest) => {
    const queryParams = new URLSearchParams(req.url?.split('?')[1]);
    const playlistId = queryParams.get('playlistId');

    if (!playlistId || typeof playlistId !== 'string') {
        return NextResponse.json({ error: 'Invalid playlist ID' }, { status: 400 });
    }

    const supabase = createServerComponentClient({ cookies });
    const { data: playlist, error: playlistError } = await supabase
        .from('playlists')
        .select('name')
        .eq('id', playlistId)
        .single();

    if (playlistError) {
        console.log(playlistError);
        return NextResponse.json({ error: playlistError.message }, { status: 500 });
    }

    return NextResponse.json({ name: playlist.name }, { status: 200 });
};

export { getPlaylistDetails as GET };