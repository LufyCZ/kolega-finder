import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useCallback } from "react";
import useSWR from "swr";
import { Database } from "../database.types";

export function useLectureSeats(lectureId?: number) {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const fetcher = useCallback(async () => {
    if (!lectureId) return;

    const { data, error } = await supabase
      .from("lectureSeats")
      .select("*")
      .eq("lecture", lectureId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }, [lectureId, supabase]);

  const { data, mutate } = useSWR(
    lectureId ? ["lecture-seats", lectureId] : null,
    fetcher,
    { refreshInterval: 10000, refreshWhenHidden: false }
  );

  const reserveSeat = useCallback(
    (seatNumber: number) => {
      if (!lectureId || !session) return;

      const newEntry = {
        lecture: lectureId,
        seat: seatNumber,
        user_id: session.user.id,
      };

      const mutation = async () => {
        await supabase.from("lectureSeats").insert(newEntry);
        return fetcher();
      };

      mutate(mutation, {
        optimisticData: [...(data ?? []), { ...newEntry, id: -1 }],
        rollbackOnError: true,
      });
    },
    [data, fetcher, lectureId, mutate, session, supabase]
  );

  const changeSeat = useCallback(
    (rowId: number, newSeatNumber: number) => {
      if (!lectureId || !session) return;

      const updatedEntry = {
        id: rowId,
        lecture: lectureId,
        seat: newSeatNumber,
        user_id: session.user.id,
      };

      const mutation = async () => {
        await supabase.from("lectureSeats").update(updatedEntry);
        return fetcher();
      };

      mutate(mutation, {
        optimisticData: [
          ...(data?.filter((e) => e.id !== rowId) ?? []),
          updatedEntry,
        ],
      });
    },
    [data, fetcher, lectureId, mutate, session, supabase]
  );

  const deleteSeat = useCallback(
    (rowId: number) => {
      if (!lectureId || !session) return;

      const mutation = async () => {
        await supabase.from("lectureSeats").delete().eq("id", rowId);
        return fetcher();
      };

      mutate(mutation, {
        optimisticData: [...(data?.filter((e) => e.id !== rowId) ?? [])],
      });
    },
    [data, fetcher, lectureId, mutate, session, supabase]
  );

  return { data, reserveSeat, changeSeat, deleteSeat };
}
