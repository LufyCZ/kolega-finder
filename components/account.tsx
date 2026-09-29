import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { AuthButton } from "@/components/auth-button";

export async function Account() {
  const session = await auth.api.getSession({ headers: await headers() });
  return <div className="account">
    {session?.user.image && <Image src={session.user.image} alt="" width={32} height={32} className="avatar" />}
    {session && <span className="account-name">{session.user.name}</span>}
    <AuthButton signedIn={!!session} />
  </div>;
}
