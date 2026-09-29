"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function AuthButton({ signedIn }: { signedIn: boolean }) {
  const [error, setError] = useState("");

  async function click() {
    setError("");
    if (signedIn) {
      const result = await authClient.signOut();
      if (result.error) setError(result.error.message ?? "Could not sign out.");
      else window.location.reload();
    } else {
      const result = await authClient.signIn.social({ provider: "discord", callbackURL: window.location.href });
      if (result.error) setError(result.error.message ?? "Could not sign in.");
    }
  }

  return <>
    <button type="button" className="button button-secondary" onClick={click}>{signedIn ? "Sign out" : "Sign in with Discord"}</button>
    {error && <span role="alert" className="error">{error}</span>}
  </>;
}
