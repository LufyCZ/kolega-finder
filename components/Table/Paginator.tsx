import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { FC } from "react";

export interface PaginatorProps {
  hasPrev: boolean;
  hasNext: boolean;
  page: number;
  onPrev(): void;
  onNext(): void;
  onPage(page: number): void;
  pages?: number;
  pageSize: number;
  nextDisabled?: boolean;
  dataSize?: number;
}

export const Paginator: FC<PaginatorProps> = ({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  page,
  onPage,
  pages,
  nextDisabled,
  pageSize,
  dataSize,
}) => {
  return (
    <div className="flex items-center justify-between px-2 select-none h-14 text-slate-200">
      <div className="text-sm">
        Showing <b>{page * pageSize + 1}</b> to {""}
        <b>
          {pages && page < pages - 1 ? (page + 1) * pageSize : dataSize}
        </b>{" "}
        {pages ? (
          <>
            of <b>{dataSize}</b>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <div
            className={classNames(
              hasPrev ? "" : "pointer-events-none opacity-40",
              "p-1"
            )}
            onClick={onPrev}
          >
            <ChevronLeftIcon
              className={classNames(
                "text-slate-200",
                hasPrev && "cursor-pointer"
              )}
              width={20}
              height={20}
            />
          </div>
        </div>
        {pages ? (
          <div className="text-base text-slate-200">
            <b>{page + 1}</b> of <b>{pages}</b>
          </div>
        ) : (
          ""
        )}
        <div className="flex items-center">
          <div
            className={classNames(
              !hasNext || (!pages && nextDisabled)
                ? "pointer-events-none opacity-40"
                : "",
              "p-1"
            )}
            onClick={onNext}
          >
            <ChevronRightIcon
              className={classNames(
                "text-slate-200",
                hasNext && "cursor-pointer"
              )}
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
