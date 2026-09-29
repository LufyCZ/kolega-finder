"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { isRoomName, seatsInRoom } from "@/lib/rooms";

export async function selectSeat(_previous: string, data: FormData): Promise<string> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return "Sign in with Discord to choose a seat.";

  const lectureId = Number(data.get("lectureId"));
  const seat = Number(data.get("seat"));
  if (!Number.isSafeInteger(lectureId) || lectureId < 1 || !Number.isSafeInteger(seat) || seat < 1) return "Invalid seat.";

  const { rows } = await db.query<{ room: string }>("SELECT room FROM lectures WHERE id = $1", [lectureId]);
  if (!rows[0] || !isRoomName(rows[0].room) || seat > seatsInRoom(rows[0].room)) return "Invalid seat.";

  const deleted = await db.query(
    "DELETE FROM seats WHERE lecture_id = $1 AND seat_number = $2 AND user_id = $3",
    [lectureId, seat, session.user.id],
  );
  if (!deleted.rowCount) {
    try {
      await db.query(`INSERT INTO seats (lecture_id, seat_number, user_id) VALUES ($1, $2, $3)
        ON CONFLICT (lecture_id, user_id) DO UPDATE SET seat_number = EXCLUDED.seat_number`,
      [lectureId, seat, session.user.id]);
    } catch (error) {
      if ((error as { code?: string }).code === "23505") return "That seat was just taken. Choose another.";
      throw error;
    }
  }
  await db.query("UPDATE lectures SET updated_at = now() WHERE id = $1", [lectureId]);
  revalidatePath("/");
  revalidatePath(`/lectures/${lectureId}`);
  return "";
}
