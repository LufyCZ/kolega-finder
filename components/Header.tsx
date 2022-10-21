import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Account } from "./Auth/Account";

export function Header() {
  const router = useRouter();

  return (
    <div className="grid items-center grid-cols-3 p-4">
      <div>
        {router.asPath.startsWith("/lectures") && (
          <div className="flex">
            <Link href="/">
              <div className="flex items-center space-x-1 text-sm cursor-pointer text-slate-100 hover:font-medium">
                <ArrowLeftIcon width={16} height={16} />
                <div>Go Back</div>
              </div>
            </Link>
          </div>
        )}
      </div>
      <div></div>
      <div className="flex justify-end">
        <Account />
      </div>
    </div>
  );
}
