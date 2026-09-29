import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { CreateForm } from "@/components/create-form";
import { AuthButton } from "@/components/auth-button";

async function FormContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session ? <CreateForm /> : <div className="form-card"><p>Sign in to create a lecture and invite your kolegas.</p><AuthButton signedIn={false} /></div>;
}

export default function CreatePage() {
  return <section className="narrow-page"><Link href="/" className="back-link">← Go Back</Link><h1 className="form-title">Create Lecture</h1><Suspense fallback={<div className="form-card">Loading…</div>}><FormContent /></Suspense></section>;
}
