import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../database.types";
import useSWR from "swr";
import { PaginationState } from "@tanstack/react-table";

export function useLectureCount() {
  const supabase = useSupabaseClient<Database>();

  return useSWR("lecture-count", async () =>
    supabase
      .from("lecture")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => count)
  );
}

export function useLectures(pagination?: PaginationState) {
  const supabase = useSupabaseClient<Database>();

  const key = supabase
    ? pagination
      ? `lectures-${pagination.pageIndex}-${pagination.pageSize}`
      : `lectures`
    : null;

  const fetcher = pagination
    ? async () =>
        supabase
          .from("lecture")
          .select("*")
          .order("updated_at", { ascending: false })
          .range(
            pagination.pageSize * pagination.pageIndex,
            pagination.pageSize * (pagination.pageIndex + 1) - 1
          )
          .then(({ data }) => data)
    : async () =>
        supabase
          .from("lecture")
          .select("*")
          .order("updated_at", { ascending: false })
          .then(({ data }) => data);

  return useSWR(key, fetcher);
}
