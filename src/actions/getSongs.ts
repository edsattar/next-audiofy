import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Song } from "@/types";

/**
 * @returns {Promise<Song[]>} A promise that resolves to an array of songs.
 * @description Gets all songs from the database.
 */
const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }
  return (data as any) || [];
};

export default getSongs;
