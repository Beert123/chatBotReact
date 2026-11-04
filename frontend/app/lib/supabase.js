import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if(!supabaseAnonKey || !supabaseUrl){
    throw new Error("couldnt connect to db");
}

export const supabase = createClient(supabaseUrl,supabaseAnonKey);