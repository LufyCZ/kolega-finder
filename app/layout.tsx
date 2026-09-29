import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import "./globals.css";
import { Account } from "@/components/account";

export const metadata: Metadata = {
  title: "Kolega Finder",
  description: "Find classmates and pick a seat together.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <header className="site-header">
      <Link href="/" className="brand"><span className="brand-mark">K</span><span>Kolega Finder</span></Link>
      <nav aria-label="Main navigation"><Link href="/">Lectures</Link><Link href="/lectures/create">Create lecture</Link></nav>
      <Suspense fallback={<span className="account-placeholder" />}><Account /></Suspense>
    </header>
    <main className="site-main">{children}</main>
  </body></html>;
}
