import { useMemo } from "react";
import { ROOMS, SeatType } from "../../components/Rooms/config";

export function useRoom(roomId: string | undefined, reverse: boolean) {
  return useMemo(() => {
    const room =
      roomId && Object.keys(ROOMS).includes(roomId)
        ? ROOMS[roomId as keyof typeof ROOMS]
        : [];

    // starts with the total number of seats, goes down to 1
    let counter = room.reduce(
      (acc, cur) => (acc += cur.match(/o/g)?.length ?? 0),
      0
    );
    const roomWithNumbers = (room ?? []).map((row) =>
      row.split("").map((type) => ({
        type,
        index: type === SeatType.Seat ? counter-- : null,
      }))
    );

    return reverse
      ? roomWithNumbers.map((row) => row.reverse()).reverse()
      : roomWithNumbers;
  }, [roomId, reverse]);
}
