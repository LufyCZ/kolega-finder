import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../database.types";
import useSWR from "swr";

export function useLecture(lectureId: number) {
  const supabase = useSupabaseClient<Database>();

  const { data } = useSWR(
    lectureId && supabase ? `lecture-${lectureId}` : null,
    async () => await supabase.from("lecture").select("*").eq("id", lectureId)
  );

  return data?.data?.[0];
}
