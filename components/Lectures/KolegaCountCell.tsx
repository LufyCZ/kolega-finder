import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database, RowEntry } from "../../lib";

export function KolegaCountCell({ lecture }: { lecture: RowEntry<"lecture"> }) {
  const [count, setCount] = useState<number | "?">();

  const supabase = useSupabaseClient<Database>();

  useEffect(() => {
    supabase
      .from("lectureSeats")
      .select("*", { count: "exact", head: true })
      .eq("lecture", lecture.id)
      .then(({ count }) => setCount(count ?? "?"));
  }, [supabase, lecture]);

  return <>{count}</>;
}
