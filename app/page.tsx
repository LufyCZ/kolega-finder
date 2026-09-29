import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";

type Lecture = { id: string; subject: string; name: string | null; room: string; creator_name: string; kolegas: number };

async function LectureList({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: rawPage } = await searchParams;
  const parsed = Number(rawPage);
  const page = Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
  const { rows } = await db.query<Lecture>(`
    SELECT l.id, l.subject, l.name, l.room, u.name AS creator_name,
      (SELECT COUNT(*)::int FROM seats s WHERE s.lecture_id = l.id) AS kolegas
    FROM lectures l JOIN "user" u ON u.id = l.creator_id
    ORDER BY l.updated_at DESC, l.id DESC LIMIT 11 OFFSET $1
  `, [(page - 1) * 10]);
  const hasNext = rows.length > 10;

  return <>
    {rows.length === 0 ? <div className="empty">{page === 1 ? "No lectures yet. Create the first one." : "No lectures on this page."}</div> :
      <div className="lecture-list">{rows.slice(0, 10).map((lecture) =>
        <Link href={`/lectures/${lecture.id}`} className="lecture-card" key={lecture.id}>
          <span className="subject-badge">{lecture.subject}</span>
          <span className="lecture-title">{lecture.name || "Untitled lecture"}<small>Created by {lecture.creator_name}</small></span>
          <span className="lecture-meta">{lecture.room}<small>{lecture.kolegas} {lecture.kolegas === 1 ? "kolega" : "kolegas"}</small></span>
          <span className="lecture-arrow" aria-hidden="true">↗</span>
        </Link>)}</div>}
    <div className="pagination">
      {page > 1 && <Link href={page === 2 ? "/" : `/?page=${page - 1}`}>← Previous</Link>}
      <span>Page {page}</span>
      {hasNext && <Link href={`/?page=${page + 1}`}>Next →</Link>}
    </div>
  </>;
}

export default function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  return <>
    <section className="hero"><p className="eyebrow">Better together</p><h1>Find your kolega.<br /><em>Pick your place.</em></h1><p>See who is heading to class, choose a seat, and meet up in the lecture hall.</p><Link className="button button-primary" href="/lectures/create">Create a lecture <span aria-hidden="true">↗</span></Link></section>
    <section className="content-section"><div className="section-heading"><div><p className="eyebrow">Explore</p><h2>Recent lectures</h2></div></div>
      <Suspense fallback={<div className="empty">Loading lectures…</div>}><LectureList searchParams={searchParams} /></Suspense>
    </section>
  </>;
}
