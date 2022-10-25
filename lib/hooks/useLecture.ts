import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../database.types";
import { RowEntry } from "../types";

export function useLecture(lectureId: number) {
  const [lecture, setLecture] = useState<RowEntry<"lecture">>();
  const supabase = useSupabaseClient<Database>();

  useEffect(() => {
    (async function () {
      const { data } = await supabase
        .from("lecture")
        .select("*")
        .eq("id", lectureId);

      if (data) setLecture(data[0]);
    })();
  }, [lectureId, supabase]);

  return lecture;
}
