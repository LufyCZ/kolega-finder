import { useUser } from "../../lib/hooks/useUser";

export function CreatorCell({ uid }: { uid: string }) {
  const { data: user } = useUser(uid);

  return <div>{user?.fullName}</div>;
}
