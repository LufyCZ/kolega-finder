import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Database } from "../lib/database.types";
import Head from "next/head";
import { Header } from "../components/Header";

import "./../components/Dropdown/Dropdown.css";
import "./../components/Tooltip/Tooltip.css";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <div className="min-h-screen p-4 min-w-screen bg-gradient-radial">
        <Head>
          <title>Kolega Finder</title>
          <meta title="Kolega Finder" />
        </Head>
        <div className="space-y-6">
          <Header />
          <Component {...pageProps} />
        </div>
      </div>
    </SessionContextProvider>
  );
}

export default MyApp;
