import type { Metadata } from "next";
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
      <Suspense fallback={<span className="account-placeholder" />}><Account /></Suspense>
    </header>
    <main className="site-main">{children}</main>
  </body></html>;
}
