import Image from "next/image";
import { useUser } from "../../lib/hooks/useUser";

export function UserTooltip({ user_id }: { user_id?: string }) {
  const { data: user } = useUser(user_id);

  if (!user) return <></>;

  return (
    <div className="flex flex-col items-center justify-center space-y-2 min-w-[64px]">
      <div className="flex border rounded-lg border-slate-600 min-w-[56px]">
        <Image
          src={user?.avatarUrl ?? ""}
          height={56}
          width={56}
          objectFit="cover"
          alt="avatar"
          className="rounded-lg"
        />
      </div>
      <div className="font-medium text-md text-slate-200">{user?.fullName}</div>
    </div>
  );
}
