import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useCallback, useEffect, useReducer, useState } from "react";
import { Database } from "../database.types";
import { RowEntry } from "../types";

type Payload =
  | RealtimePostgresChangesPayload<RowEntry<"lectureSeats">>
  | { eventType: "INIT"; new: RowEntry<"lectureSeats">[] };

function update(state: RowEntry<"lectureSeats">[], payload: Payload) {
  switch (payload.eventType) {
    case "INIT": {
      return payload.new;
    }
    case "INSERT": {
      return [...(state || []), payload.new];
    }
    case "UPDATE": {
      const stateWithoutNew = (state || []).filter(
        (entry) => entry.id !== payload.old.id
      );

      return [...stateWithoutNew, payload.new];
    }
    case "DELETE": {
      const stateWithoutOld = (state || []).filter(
        (entry) => entry.id !== payload.old.id
      );
      return stateWithoutOld;
    }
  }
}

export function useLectureSeats(lectureId?: number) {
  const [state, dispatch] = useReducer(update, []);
  const supabase = useSupabaseClient<Database>();

  const fetch = useCallback(async () => {
    if (!lectureId) return;

    const { data, error } = await supabase
      .from("lectureSeats")
      .select("*")
      .eq("lecture", lectureId);

    if (error) {
      throw new Error(error.message);
    }

    if (data) dispatch({ eventType: "INIT", new: data });
  }, [supabase, lectureId]);

  useEffect(() => {
    fetch();
  }, [fetch, lectureId]);

  useEffect(() => {
    const subscription = supabase
      .channel("public:lectureSeats")
      .on<RowEntry<"lectureSeats">>(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "lectureSeats",
          filter: `lecture=eq.${lectureId}`,
        },
        (payload) => dispatch(payload)
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetch, lectureId, state, supabase]);

  return state;
}
