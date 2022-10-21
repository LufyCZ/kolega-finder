import { Database } from "./database.types";

export type RowEntry<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
