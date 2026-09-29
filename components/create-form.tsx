"use client";

import { useActionState } from "react";
import { createLecture } from "@/app/lectures/create/actions";
import { ROOMS } from "@/lib/rooms";

export function CreateForm() {
  const [error, action, pending] = useActionState(createLecture, "");
  return <form action={action} className="form-card">
    <label>Subject <input name="subject" maxLength={5} required placeholder="IEL" autoComplete="off" /></label>
    <label>Name <span className="optional">optional</span><input name="name" maxLength={20} placeholder="Monday morning" autoComplete="off" /></label>
    <label>Room <select name="room" defaultValue="D105">{Object.keys(ROOMS).map(room => <option key={room}>{room}</option>)}</select></label>
    {error && <p className="error" role="alert">{error}</p>}
    <button className="button button-primary" type="submit" disabled={pending}>{pending ? "Creating…" : "Create lecture"}</button>
  </form>;
}
