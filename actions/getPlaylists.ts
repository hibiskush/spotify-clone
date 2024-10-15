// actions/getPlaylists.ts
import { Playlist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPlaylists = async (): Promise<Playlist[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: { session },
        error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError) {
        console.log(sessionError);
        return [];
    }

    const { data, error } = await supabase
        .from('playlists')
        .select('*')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.log(error);
        return [];
    }

    return data || [];
};

export default getPlaylists;