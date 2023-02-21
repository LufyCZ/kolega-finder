import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { ROOMS } from "../../components/Rooms/config";
import { Database } from "../../lib";

interface Form {
  name?: string;
  subject: string;
  room: keyof typeof ROOMS;
}

export function Create() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: { room: "D105" },
  });

  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const router = useRouter();

  const onSubmitValid = useCallback<SubmitHandler<Form>>(
    async (data) => {
      if (!session) return;

      const { name, subject, room } = data;

      const { data: res, status } = await supabase
        .from("lecture")
        .insert({
          name: name?.length === 0 ? "-" : name,
          subject,
          creator: session.user.id,
          room,
        })
        .select();

      if (status === 201 && res?.[0]) router.push(`/lectures/${res[0].id}`);
    },
    [session, supabase, router]
  );

  return (
    <div className="flex items-center justify-center text-sm text-slate-200">
      <div className="p-4 flex flex-col rounded-xl min-w-[240px] space-y-4">
        <div className="text-lg">Create Lecture</div>
        <div className="h-[1.2px] bg-slate-800 -mx-1" />
        <div className="grid items-center grid-cols-2">
          <div className="text-md">Name</div>
          <div className="space-y-2">
            <input
              {...(register("name"), { maxLength: 20 })}
              className="p-3 font-medium outline-none rounded-xl bg-slate-900 placeholder:font-normal"
              placeholder="Optional"
            />
            {errors.name && (
              <div className="flex justify-end">
                <div className="text-xs text-red">{errors.name?.message}</div>
              </div>
            )}
          </div>
        </div>
        <div className="grid items-center grid-cols-2">
          <div className="text-md">Subject</div>
          <div className="space-y-2">
            <input
              {...register("subject", {
                maxLength: { value: 5, message: "Max length is 5." },
                required: "Subject is required.",
              })}
              className={classNames(
                "p-3 font-medium outline-none rounded-xl bg-slate-900 placeholder:font-normal",
                errors.subject && "outline-red-600 outline-[1.5px]"
              )}
              placeholder="IEL"
            />
            {errors.subject && (
              <div className="flex justify-end">
                <div className="text-xs text-red">
                  {errors.subject?.message}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="grid items-center grid-cols-2">
          <div className="text-md">Room</div>
          <Controller
            name="room"
            control={control}
            render={({ field }) => (
              <Dropdown
                {...register("subject")}
                selectedEntry={field.value}
                setEntry={(entry) => field.onChange(entry)}
                entries={Object.keys(ROOMS)}
              />
            )}
          />
        </div>
        <div className="h-[1.2px] bg-slate-800 -mx-1" />
        <div className="flex justify-end">
          <div
            onClick={handleSubmit(onSubmitValid)}
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
