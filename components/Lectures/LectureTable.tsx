import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { GenericTable } from "../Table/GenericTable";
import { formatDistance } from "date-fns";
import { CreatorCell } from "./CreatorCell";
import { RowEntry } from "../../lib";
import { KolegaCountCell } from "./KolegaCountCell";
import { useLectureCount, useLectures } from "../../lib/hooks";
import { Table } from "../Table";

const columnHelper = createColumnHelper<RowEntry<"lecture">>();
function useColumns() {
  return [
    columnHelper.accessor("subject", {
      header: "Subject",
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue()?.slice(0, 20),
      enableSorting: false,
    }),
    columnHelper.accessor("room", {
      header: "Room",
      cell: (info) => info.getValue(),
      enableSorting: false,
    }),
    columnHelper.accessor("updated_at", {
      header: "Last Update",
      cell: (info) =>
        formatDistance(new Date(info.getValue() ?? ""), new Date(), {
          addSuffix: true,
        }),
    }),
    columnHelper.accessor("creator", {
      header: "Creator",
      cell: (info) => <CreatorCell uid={info.getValue()} />,
      enableSorting: false,
    }),
    columnHelper.display({
      header: "Kolegas",
      cell: ({ row }) => <KolegaCountCell lecture={row.original} />,
      enableSorting: false,
    }),
  ];
}

const PAGE_SIZE = 10;

export function LectureTable() {
  const columns = useColumns();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const { data: lectureCount } = useLectureCount();
  const { data: lectures, isValidating } = useLectures(pagination);

  const table = useReactTable<RowEntry<"lecture">>({
    data: lectures || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ id: "updated_at", desc: true }],
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: lectureCount ? Math.ceil(lectureCount / PAGE_SIZE) : undefined,
  });

  return (
    <>
      <GenericTable
        table={table}
        columns={columns}
        loading={!lectures && isValidating}
        pageSize={PAGE_SIZE}
        getLink={(row) => `/lectures/${row.id}`}
      />
      <Table.Paginator
        hasPrev={pagination.pageIndex > 0}
        hasNext={pagination.pageIndex < table.getPageCount() - 1}
        nextDisabled={!lectures && isValidating}
        onPrev={table.previousPage}
        onNext={table.nextPage}
        page={pagination.pageIndex}
        onPage={table.setPageIndex}
        pages={table.getPageCount()}
        pageSize={PAGE_SIZE}
        dataSize={lectureCount ?? undefined}
      />
    </>
  );
}
