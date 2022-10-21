import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import classNames from "classnames";
import { useCallback } from "react";
import { Database, RowEntry } from "../../lib";
import { useLectureSeats } from "../../lib/hooks/useLectureSeats";

interface Room {
  room: string[];
  lectureId?: number;
}

export function Room({ room, lectureId }: Room) {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();

  const lectureSeats = useLectureSeats(lectureId);

  const handleClick = useCallback(
    async (seat: number) => {
      if (!session || !lectureId) return;

      const userSeat = lectureSeats?.find(
        (lectureSeat) => lectureSeat.user_id === session.user.id
      );

      // no previous seat, new seat
      if (!userSeat) {
        await supabase
          .from("lectureSeats")
          .insert({ lecture: lectureId, seat, user_id: session.user.id })
          .then((a) => console.log(a));
      }
      // changed seat
      else if (userSeat.seat !== seat) {
        await supabase
          .from("lectureSeats")
          .update({ ...userSeat, seat })
          .then((a) => console.log(a));
        // delete seat
      } else {
        await supabase
          .from("lectureSeats")
          .delete()
          .eq("id", userSeat.id)
          .then((a) => console.log(a));
      }

      //updateLectureSeats();
    },
    [lectureId, lectureSeats, session, supabase]
  );

  let totalLength = room.reduce(
    (acc, cur) => (acc += cur.match(/o/g)?.length ?? 0),
    0
  );

  return (
    <div className="flex flex-col justify-center space-y-1.5">
      {room.map((row, i) => {
        return (
          <div key={i} className="flex min-h-[1ch] space-x-1.5 justify-center">
            {row.split("").map((place, i) => {
              switch (place) {
                case "o": {
                  const seat = totalLength--;
                  const lectureSeat = lectureSeats?.find(
                    (lectureSeat) => lectureSeat.seat === seat
                  );

                  const type: "owned" | "taken" | "free" =
                    session && lectureSeat?.user_id === session.user.id
                      ? "owned"
                      : lectureSeat
                      ? "taken"
                      : "free";

                  return (
                    <div
                      key={i}
                      className={classNames(
                        type === "owned" &&
                          "!border-green-600 border-2 cursor-pointer",
                        type === "taken" && "border-red border-2",
                        type === "free" && session && "cursor-pointer",
                        "flex items-center justify-center w-8 h-8 text-xs bg-slate-600 text-slate-200 rounded-lg select-none hover:bg-slate-500"
                      )}
                      onClick={() => handleClick(seat)}
                    >
                      {seat}
                    </div>
                  );
                }
                case "-":
                  return <div key={i} className="w-8 h-8" />;
              }
            })}
          </div>
        );
      })}
    </div>
  );
}
