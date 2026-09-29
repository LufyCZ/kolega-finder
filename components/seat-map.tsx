"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { selectSeat } from "@/app/lectures/[id]/actions";
import { roomRows, RoomName, SeatType } from "@/lib/rooms";

export type Occupant = { seat_number: number; user_id: string; name: string; image: string | null };

export function SeatMap({ lectureId, room, seats, userId }: { lectureId: string; room: RoomName; seats: Occupant[]; userId?: string }) {
  const [reversed, setReversed] = useState(true);
  const [error, action, pending] = useActionState(selectSeat, "");
  const occupied = new Map(seats.map((seat) => [seat.seat_number, seat]));

  return <section className="room-section">
    <div className="room-toolbar"><div className="legend"><span><i className="legend-dot free" />Available</span><span><i className="legend-dot mine" />Your seat</span><span><i className="legend-dot taken" />Taken</span></div><button type="button" className="button button-secondary" onClick={() => setReversed(!reversed)}>Reverse room</button></div>
    {!userId && <p className="seat-note">Sign in with Discord to choose a seat.</p>}
    {error && <p className="error" role="alert">{error}</p>}
    <form action={action} className="room-scroll"><input type="hidden" name="lectureId" value={lectureId} /><div className="room-map">
      {roomRows(room, reversed).map((row, rowIndex) => <div className="room-row" key={rowIndex}>{row.map(({ type, number }, index) => {
        if (type === SeatType.Whiteboard) return <span key={index} className="whiteboard" aria-label="Whiteboard" />;
        if (type === SeatType.Space) return <span key={index} className="seat-space" />;
        const occupant = occupied.get(number!);
        const mine = occupant?.user_id === userId;
        const label = mine ? `Seat ${number}, yours; click to leave` : occupant ? `Seat ${number}, taken by ${occupant.name}` : `Seat ${number}, available`;
        return <button type="submit" name="seat" value={number!} key={index} className={`seat ${mine ? "seat-mine" : occupant ? "seat-taken" : "seat-free"}`} disabled={pending || !userId || (!!occupant && !mine)} title={label} aria-label={label}>
          {number}{occupant && <span className="seat-tooltip">{occupant.image && <Image src={occupant.image} alt="" width={28} height={28} className="avatar" />}{occupant.name}</span>}
        </button>;
      })}</div>)}
    </div></form>
  </section>;
}
