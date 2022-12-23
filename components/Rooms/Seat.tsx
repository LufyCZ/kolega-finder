import classNames from "classnames";

export enum SeatState {
  Owned = "owned",
  Taken = "taken",
  Free = "free",
}

interface Seat {
  seat: number;
  handleClick(seat: number): void;
  state: SeatState;
  session: boolean;
}

export function Seat({ seat, handleClick, state, session }: Seat) {
  return (
    <div
      className={classNames(
        state === SeatState.Owned &&
          "!border-green-600 border-2 cursor-pointer",
        state === SeatState.Taken && "border-red border-2",
        state === SeatState.Free && session && "cursor-pointer",
        "flex items-center justify-center min-w-[32px] min-h-[32px] text-xs bg-slate-600 text-slate-200 rounded-lg select-none hover:bg-slate-500"
      )}
      onClick={() => handleClick(seat)}
    >
      {seat}
    </div>
  );
}
