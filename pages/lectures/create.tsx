import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { ROOMS } from "../../components/Rooms/config";
import { Database } from "../../lib";

export function Create() {
  const [name, setName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [room, setRoom] = useState<string>("D105");

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
    <div className="flex items-center justify-center text-sm text-slate-200">
      <div className="p-4 flex flex-col rounded-xl min-w-[240px] space-y-4">
        <div className="text-lg">Create Lecture</div>
        <div className="h-[1.2px] bg-slate-800 -mx-1" />
        <div className="grid items-center grid-cols-2">
          <div className="text-md">Name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 font-medium outline-none rounded-xl bg-slate-900 placeholder:font-normal"
            placeholder="Optional"
          />
        </div>
        <div className="grid items-center grid-cols-2">
          <div className="text-md">Subject</div>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="p-3 font-medium outline-none rounded-xl bg-slate-900 placeholder:font-normal"
            placeholder="IEL"
          />
        </div>
        <div className="grid items-center grid-cols-2">
          <div className="text-md">Room</div>
          <Dropdown
            selectedEntry={room}
            setEntry={setRoom}
            entries={Object.keys(ROOMS)}
          />
        </div>
        <div className="h-[1.2px] bg-slate-800 -mx-1" />
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
