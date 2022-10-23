import { useUser } from "../../lib/hooks/useUser";

export function CreatorCell({ uid }: { uid: string }) {
  const user = useUser(uid);

  return <div>{user?.full_name}</div>;
}
