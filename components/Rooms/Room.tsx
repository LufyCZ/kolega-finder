import { useSession } from "@supabase/auth-helpers-react";
import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import { useLecture } from "../../lib/hooks/useLecture";
import { useLectureSeats } from "../../lib/hooks/useLectureSeats";
import { useRoom } from "../../lib/hooks/useRoom";
import { ConditionalTooltip, Tooltip } from "../Tooltip";
import { ROOMS, SeatType } from "./config";
import { Seat, SeatState } from "./Seat";
import { UserTooltip } from "./UserTooltip";

interface Room {
  lectureId: number;
}

export function Room({ lectureId }: Room) {
  const [isReversed, setReversed] = useState<boolean>(true);

  const session = useSession();

  const {
    data: lectureSeats,
    reserveSeat,
    changeSeat,
    deleteSeat,
  } = useLectureSeats(lectureId);
  const lecture = useLecture(lectureId);
  const room = useRoom(lecture?.room, isReversed);

  const handleClick = useCallback(
    async (seat: number) => {
      if (!session || !lectureId) return;

      const currentUserSeat = lectureSeats?.find(
        (lectureSeat) => lectureSeat.user_id === session.user.id
      );

      if (!currentUserSeat) {
        reserveSeat(seat);
      } else if (currentUserSeat.seat !== seat) {
        changeSeat(currentUserSeat.id, seat);
      } else {
        deleteSeat(currentUserSeat.id);
      }
    },
    [changeSeat, deleteSeat, lectureId, lectureSeats, reserveSeat, session]
  );

  if (!room) return <></>;

  return (
    <div className="space-y-4">
      <div className="flex justify-end md:justify-center">
        <div
          className="px-4 py-2 text-sm font-medium cursor-pointer select-none bg-slate-700 text-slate-200 rounded-xl hover:bg-slate-600"
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex flex-col space-y-1.5 min-w-fit">
          {room.map((row, i) => {
            return (
              <div
                key={i}
                className="flex min-h-[1ch] space-x-1.5 justify-center"
              >
                {row.map((seat, i) => {
                  switch (seat.type) {
                    case SeatType.Seat: {
                      const lectureSeat = lectureSeats?.find(
                        (lectureSeat) => lectureSeat.seat === seat.index
                      );

                      const state: SeatState =
                        session && lectureSeat?.user_id === session.user.id
                          ? SeatState.Owned
                          : lectureSeat
                          ? SeatState.Taken
                          : SeatState.Free;

                      return (
                        <ConditionalTooltip
                          key={i}
                          condition={state === "taken"}
                          placement="top"
                          trigger="hover"
                          mouseEnterDelay={0}
                          button={
                            <div>
                              <Seat
                                key={i}
                                seat={seat.index as number}
                                handleClick={handleClick}
                                state={state}
                                session={!!session}
                              />
                            </div>
                          }
                          panel={<UserTooltip user_id={lectureSeat?.user_id} />}
                        />
                      );
                    }
                    case SeatType.Space:
                      return (
                        <div key={i} className="min-w-[32px] min-h-[32px]" />
                      );
                    case SeatType.Whiteboard:
                      return (
                        <div
                          key={i}
                          className={classNames(
                            "w-1/3 h-px bg-blue-800",
                            isReversed ? "mb-4" : "mt-4"
                          )}
                        />
                      );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
