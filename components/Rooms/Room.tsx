import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import classNames from "classnames";
import { useCallback } from "react";
import { Database, RowEntry } from "../../lib";
import { useLectureSeats } from "../../lib/hooks/useLectureSeats";
import { Tooltip } from "../Tooltip";
import { Seat } from "./Seat";
import { UserTooltip } from "./UserTooltip";

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
    <div className=" min-w-fit">
      <div className="flex flex-col space-y-1.5">
        {room.map((row, i) => {
          return (
            <div
              key={i}
              className="flex min-h-[1ch] space-x-1.5 justify-center"
            >
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
                      <>
                        {type === "taken" ? (
                          <Tooltip
                            key={i}
                            placement="top"
                            trigger="hover"
                            mouseEnterDelay={0}
                            button={
                              <div>
                                <Seat
                                  key={i}
                                  seat={seat}
                                  handleClick={handleClick}
                                  type={type}
                                  session={!!session}
                                />
                              </div>
                            }
                            panel={
                              <UserTooltip user_id={lectureSeat!.user_id} />
                            }
                          />
                        ) : (
                          <Seat
                            key={i}
                            seat={seat}
                            handleClick={handleClick}
                            type={type}
                            session={!!session}
                          />
                        )}
                      </>
                    );
                  }
                  case "-":
                    return (
                      <div key={i} className="min-w-[32px] min-h-[32px]" />
                    );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
