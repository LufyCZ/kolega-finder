"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { isRoomName } from "@/lib/rooms";

export async function createLecture(_previous: string, data: FormData): Promise<string> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return "Sign in with Discord first.";

  const name = String(data.get("name") ?? "").trim();
  const subject = String(data.get("subject") ?? "").trim().toUpperCase();
  const room = String(data.get("room") ?? "");
  if (!subject || subject.length > 5 || name.length > 20 || !isRoomName(room)) return "Check the subject, name, and room.";

  const { rows } = await db.query<{ id: string }>(
    "INSERT INTO lectures (subject, name, room, creator_id) VALUES ($1, $2, $3, $4) RETURNING id",
    [subject, name || null, room, session.user.id],
  );
  revalidatePath("/");
  redirect(`/lectures/${rows[0].id}`);
}
