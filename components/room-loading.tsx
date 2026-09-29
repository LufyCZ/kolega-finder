import { isRoomName, roomRows, SeatType } from "@/lib/rooms";

export function RoomLoading({ room }: { room: string | string[] | undefined }) {
  if (typeof room !== "string" || !isRoomName(room)) return <div className="room-loading" role="status">Loading room…</div>;

  return <div role="status" aria-label={`Loading room ${room}`}>
    <dl className="lecture-heading" aria-hidden="true">{["Subject", "Name", "Kolegas"].map(label =>
      <div key={label}><dt>{label}</dt><dd><span className="skeleton-line skeleton-detail" /></dd></div>)}</dl>
    <section className="room-section" aria-hidden="true">
      <div className="room-toolbar"><div className="legend"><span><i className="legend-dot free" />Available</span><span><i className="legend-dot mine" />Your seat</span><span><i className="legend-dot taken" />Taken</span></div><span className="button button-secondary">Reverse room</span></div>
      <p className="seat-note">{"\u00a0"}</p>
      <div className="room-scroll"><div className="room-map">
        {roomRows(room, true).map((row, rowIndex) => <div className="room-row" key={rowIndex}>{row.map(({ type }, index) =>
          type === SeatType.Whiteboard ? <span key={index} className="whiteboard" /> :
          type === SeatType.Space ? <span key={index} className="seat-space" /> :
          <span key={index} className="seat seat-skeleton" />)}</div>)}
      </div></div>
    </section>
  </div>;
}
