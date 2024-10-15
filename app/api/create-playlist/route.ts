import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const { name } = await request.json();
        console.log("Received request to create playlist with name:", name);

        const supabase = createServerComponentClient({
            cookies: cookies
        });

        const {
            data: { session },
            error: sessionError
        } = await supabase.auth.getSession();

        if (sessionError) {
            console.log("Session error:", sessionError);
            return NextResponse.json({ error: sessionError.message }, { status: 500 });
        }

        if (!session || !session.user) {
            console.log("No active session or user found.");
            return NextResponse.json({ error: "No active session or user found." }, { status: 401 });
        }

        const { data, error } = await supabase
            .from('playlists')
            .insert([{ name, user_id: session.user.id }])
            .select()
            .single();

        if (error) {
            console.log("Insert error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(data);
    } catch (error) {
        console.log("Unexpected error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}