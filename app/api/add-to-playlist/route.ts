import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const { playlistId, songId } = await request.json();
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    // Retrieve the user session
    const {
        data: { session },
        error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError) {
        console.log(sessionError);
        return NextResponse.json({ error: sessionError.message }, { status: 500 });
    }

    const { error } = await supabase
        .from('playlist_songs')
        .insert([{ playlist_id: playlistId, song_id: songId, user_id: session?.user?.id }]);

    if (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Song added to playlist successfully!" });
}