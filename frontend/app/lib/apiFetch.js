import { supabase } from "../lib/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function apiFetch(path, options ={}){
    const {
        data: {session}
    } = await supabase.auth.getSession();

    const token = session?.access_token;

    const headers = {
        ...options.headers,
        apikey: supabaseAnonKey,
    }
    if(token){
        headers.Authorization = `Bearer ${token}`
    }
    const url = `${supabaseUrl}${path}`;

    return fetch(url, {...options, headers})
}