import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useCallback } from "react";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

export function Account() {
  const supabase = useSupabaseClient();
  const session = useSession();

  const logIn = useCallback(() => {
    supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: window.location.href,
      },
    });
  }, [supabase]);

  const logOut = useCallback(() => {
    supabase.auth.signOut();
  }, [supabase]);

  return (
    <div className="flex items-center justify-center h-12 p-3 rounded-xl min-w-[168px] bg-slate-700 hover:bg-slate-600">
      <div className="flex flex-row items-center justify-between w-full space-x-2 font-medium text-slate-200">
        {!session ? (
          <div
            className="flex justify-between w-full cursor-pointer"
            onClick={logIn}
          >
            <div>Login</div>
            <ArrowRightOnRectangleIcon width={24} height={24} />
          </div>
        ) : (
          <>
            <div className="flex flex-row items-center justify-center space-x-2 select-none">
              <Image
                src={session.user.user_metadata.avatar_url}
                width={32}
                height={32}
                alt="avatar"
                className="rounded-lg"
              />
              <div>{session.user.user_metadata.full_name}</div>
            </div>
            <ArrowLeftOnRectangleIcon
              width={24}
              height={24}
              onClick={logOut}
              className="cursor-pointer"
            />
          </>
        )}
      </div>
    </div>
  );
}
