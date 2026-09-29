import { Suspense } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { CreateForm } from "@/components/create-form";
import { AuthButton } from "@/components/auth-button";

async function FormContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session ? <CreateForm /> : <div className="form-card"><p>Sign in to create a lecture and invite your kolegas.</p><AuthButton signedIn={false} /></div>;
}

export default function CreatePage() {
  return <section className="narrow-page"><p className="eyebrow">New gathering</p><h1>Create a lecture</h1><p className="page-description">Choose the subject and room. Your classmates can pick seats once the lecture is live.</p><Suspense fallback={<div className="form-card">Loading…</div>}><FormContent /></Suspense></section>;
}
