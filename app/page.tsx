import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";

type Lecture = { id: string; subject: string; name: string | null; room: string; updated_at: Date; creator_name: string; kolegas: number };

async function LectureList({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: rawPage } = await searchParams;
  const parsed = Number(rawPage);
  const page = Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
  const { rows } = await db.query<Lecture>(`
    SELECT l.id, l.subject, l.name, l.room, l.updated_at, u.name AS creator_name,
      (SELECT COUNT(*)::int FROM seats s WHERE s.lecture_id = l.id) AS kolegas
    FROM lectures l JOIN "user" u ON u.id = l.creator_id
    ORDER BY l.updated_at DESC, l.id DESC LIMIT 11 OFFSET $1
  `, [(page - 1) * 10]);
  const hasNext = rows.length > 10;

  return <>
    <div className="lecture-table-wrap"><table className="lecture-table">
      <thead><tr><th>Subject</th><th>Name</th><th>Room</th><th>Last Update</th><th>Creator</th><th>Kolegas</th></tr></thead>
      <tbody>{rows.length === 0 ? <tr><td colSpan={6} className="empty">{page === 1 ? "No lectures yet. Create the first one." : "No lectures on this page."}</td></tr> : rows.slice(0, 10).map((lecture) =>
        <tr key={lecture.id}>
          <td><Link href={`/lectures/${lecture.id}`}>{lecture.subject}</Link></td>
          <td><Link href={`/lectures/${lecture.id}`}>{lecture.name || "-"}</Link></td>
          <td><Link href={`/lectures/${lecture.id}`}>{lecture.room}</Link></td>
          <td><Link href={`/lectures/${lecture.id}`}><time dateTime={lecture.updated_at.toISOString()}>{lecture.updated_at.toLocaleDateString("en-GB", { timeZone: "UTC" })}</time></Link></td>
          <td><Link href={`/lectures/${lecture.id}`}>{lecture.creator_name}</Link></td>
          <td><Link href={`/lectures/${lecture.id}`}>{lecture.kolegas}</Link></td>
        </tr>)}</tbody>
    </table></div>
    <div className="pagination">
      {page > 1 && <Link href={page === 2 ? "/" : `/?page=${page - 1}`}>← Previous</Link>}
      <span>Page {page}</span>
      {hasNext && <Link href={`/?page=${page + 1}`}>Next →</Link>}
    </div>
  </>;
}

export default function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return <section className="home-page">
    <div className="home-actions"><Link className="button button-primary" href="/lectures/create">Create <span aria-hidden="true">＋</span></Link></div>
      <Suspense fallback={<div className="empty">Loading lectures…</div>}><LectureList searchParams={searchParams} /></Suspense>
  </section>;
}
