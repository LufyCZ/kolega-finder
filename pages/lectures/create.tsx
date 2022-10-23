import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { Database } from "../../lib";

export function Create() {
  const [name, setName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [room, setRoom] = useState<"D105">("D105");

  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const router = useRouter();

  const onCreate = useCallback(async () => {
    if (!session || !subject) return;

    const { data, status } = await supabase
      .from("lecture")
      .insert({
        name: name.length === 0 ? "-" : name,
        subject,
        creator: session.user.id,
        room,
      })
      .select();

    if (status === 201 && data?.[0]) router.push(`/lectures/${data[0].id}`);
  }, [session, subject, supabase, name, room, router]);

  return (
    <div className="flex items-center justify-center text-slate-200">
      <div className="p-4 flex flex-col bg-slate-800 rounded-xl min-w-[240px] space-y-4">
        <div className="text-lg font-medium">Create lecture</div>
        <div className="h-0.5 bg-slate-600 -mx-4" />
        <div className="grid items-center grid-cols-2">
          <div>Name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 outline-none rounded-xl bg-slate-900 placeholder:text-sm"
            placeholder="Optional"
          />
        </div>
        <div className="grid items-center grid-cols-2">
          <div>Subject</div>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="p-2 outline-none rounded-xl bg-slate-900 placeholder:text-sm"
            placeholder="IEL"
          />
        </div>
        <div className="grid items-center grid-cols-2">
          <div>Room</div>
          <div className="p-2 cursor-not-allowed bg-slate-900 rounded-xl">
            D105
          </div>
        </div>
        <div className="h-0.5 bg-slate-600 -mx-4" />
        <div className="flex justify-end">
          <div
            onClick={onCreate}
            className={classNames(
              session
                ? "cursor-pointer hover:bg-slate-600"
                : "cursor-not-allowed",
              "px-4 py-2 text-sm font-medium cursor-pointer bg-slate-700 rounded-xl "
            )}
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
