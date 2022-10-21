import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export function CreateButton() {
  return (
    <Link href="/lectures/create">
      <div className="flex flex-row items-center px-4 py-2 space-x-1 text-sm font-medium cursor-pointer bg-slate-700 text-slate-200 rounded-xl hover:bg-slate-600">
        <div>Create</div>
        <PlusIcon width={18} height={18} />
      </div>
    </Link>
  );
}
