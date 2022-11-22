import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";
import { Database } from "../database.types";

export function useKolegas(lectureId: number) {
  const supabase = useSupabaseClient<Database>();

  const { data, mutate } = useSWR(
    lectureId && supabase ? `kolegas-${lectureId}` : null,
    async () =>
      await supabase
        .from("lectureSeats")
        .select("*", { count: "exact", head: true })
        .eq("lecture", lectureId)
  );

  const { data: t } = useSWR(
    lectureId && supabase ? `kolegas-${lectureId}` : null
  );
  console.log(t);

  return 1;
}
