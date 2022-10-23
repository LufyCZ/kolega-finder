import classNames from "classnames";

interface Seat {
  seat: number;
  handleClick(seat: number): void;
  type: "owned" | "taken" | "free";
  session: boolean;
}

export function Seat({ seat, handleClick, type, session }: Seat) {
  return (
    <div
      className={classNames(
        type === "owned" && "!border-green-600 border-2 cursor-pointer",
        type === "taken" && "border-red border-2",
        type === "free" && session && "cursor-pointer",
        "flex items-center justify-center min-w-[32px] min-h-[32px] text-xs bg-slate-600 text-slate-200 rounded-lg select-none hover:bg-slate-500"
      )}
      onClick={() => handleClick(seat)}
    >
      {seat}
    </div>
  );
}
