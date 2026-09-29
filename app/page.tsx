import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";

type Lecture = { id: string; subject: string; name: string | null; room: string; updated_at: Date; creator_name: string; kolegas: number };
const columns = ["Subject", "Name", "Room", "Last Update", "Creator", "Kolegas"];

function LectureSkeleton() {
  return <>
    <div className="lecture-table-wrap" role="status" aria-label="Loading lectures"><table className="lecture-table" aria-hidden="true">
      <thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead>
      <tbody>{Array.from({ length: 10 }, (_, index) => <tr key={index}>{columns.map(column => <td key={column}><span className="skeleton-line" /></td>)}</tr>)}</tbody>
    </table></div>
    <div className="pagination"><span className="skeleton-line skeleton-pagination" /></div>
  </>;
}

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
      <thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead>
      <tbody>{rows.length === 0 ? <tr><td colSpan={6} className="empty">{page === 1 ? "No lectures yet. Create the first one." : "No lectures on this page."}</td></tr> : rows.slice(0, 10).map((lecture) => {
        const href = `/lectures/${lecture.id}?room=${encodeURIComponent(lecture.room)}`;
        return <tr key={lecture.id}>
          <td><Link href={href}>{lecture.subject}</Link></td>
          <td><Link href={href}>{lecture.name || "-"}</Link></td>
          <td><Link href={href}>{lecture.room}</Link></td>
          <td><Link href={href}><time dateTime={lecture.updated_at.toISOString()}>{lecture.updated_at.toLocaleDateString("en-GB", { timeZone: "UTC" })}</time></Link></td>
          <td><Link href={href}>{lecture.creator_name}</Link></td>
          <td><Link href={href}>{lecture.kolegas}</Link></td>
        </tr>})}</tbody>
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
    <Suspense fallback={<LectureSkeleton />}><LectureList searchParams={searchParams} /></Suspense>
  </section>;
}
