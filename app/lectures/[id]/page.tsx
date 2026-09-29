import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { isRoomName } from "@/lib/rooms";
import { SeatMap, Occupant } from "@/components/seat-map";

type Lecture = { id: string; subject: string; name: string | null; room: string; creator_name: string };

async function LectureDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();
  const [lectureResult, seatsResult, session] = await Promise.all([
    db.query<Lecture>(`SELECT l.id, l.subject, l.name, l.room, u.name AS creator_name
      FROM lectures l JOIN "user" u ON u.id = l.creator_id WHERE l.id = $1`, [id]),
    db.query<Occupant>(`SELECT s.seat_number, s.user_id, u.name, u.image
      FROM seats s JOIN "user" u ON u.id = s.user_id WHERE s.lecture_id = $1`, [id]),
    auth.api.getSession({ headers: await headers() }),
  ]);
  const lecture = lectureResult.rows[0];
  if (!lecture || !isRoomName(lecture.room)) notFound();

  return <>
    <h1 className="sr-only">{lecture.name || lecture.subject}</h1>
    <dl className="lecture-heading"><div><dt>Subject</dt><dd>{lecture.subject}</dd></div><div><dt>Name</dt><dd>{lecture.name || "-"}</dd></div><div><dt>Kolegas</dt><dd>{seatsResult.rows.length}</dd></div></dl>
    <SeatMap lectureId={lecture.id} room={lecture.room} seats={seatsResult.rows} userId={session?.user.id} />
  </>;
}

export default function LecturePage({ params }: { params: Promise<{ id: string }> }) {
  return <section className="lecture-page"><Link href="/" className="back-link">← Go Back</Link><Suspense fallback={<div className="room-loading" role="status">Loading room…</div>}><LectureDetails params={params} /></Suspense></section>;
}
