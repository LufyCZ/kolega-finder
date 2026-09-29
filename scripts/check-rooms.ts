import assert from "node:assert/strict";
import { ROOMS, roomRows, seatsInRoom, SeatType } from "../lib/rooms";

for (const room of Object.keys(ROOMS) as (keyof typeof ROOMS)[]) {
  const normal = roomRows(room, false).flat().filter(item => item.type === SeatType.Seat).map(item => item.number);
  const reversed = roomRows(room, true).flat().filter(item => item.type === SeatType.Seat).map(item => item.number);
  assert.equal(normal.length, seatsInRoom(room));
  assert.deepEqual([...normal].sort((a, b) => a! - b!), Array.from({ length: normal.length }, (_, i) => i + 1));
  assert.deepEqual([...reversed].sort((a, b) => a! - b!), [...normal].sort((a, b) => a! - b!));
}

console.log("Room numbering check passed.");
