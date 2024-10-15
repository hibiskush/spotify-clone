// actions/createPlaylist.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Playlist } from "@/types";

const createPlaylist = async (name: string): Promise<Playlist | null> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: { session },
        error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError) {
        console.log(sessionError);
        return null;
    }

    const { data, error } = await supabase
        .from('playlists')
        .insert([{ name, user_id: session?.user?.id }])
        .single();

    if (error) {
        console.log(error);
        return null;
    }

    return data;
};

export default createPlaylist;