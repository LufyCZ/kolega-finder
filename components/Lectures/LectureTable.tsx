import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { GenericTable } from "../Table/GenericTable";
import { formatDistance } from "date-fns";
import { CreatorCell } from "./CreatorCell";
import { Database, RowEntry } from "../../lib";
import { KolegaCountCell } from "./KolegaCountCell";

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
      cell: (info) => info.getValue(),
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

export function LectureTable() {
  const [classes, setClasses] = useState<RowEntry<"lecture">[]>();

  const supabase = useSupabaseClient<Database>();

  const columns = useColumns();
  const table = useReactTable<RowEntry<"lecture">>({
    data: classes || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ id: "updated_at", desc: true }],
    },
  });

  useEffect(() => {
    (async function () {
      const { data, error } = await supabase.from("lecture").select("*");
      if (data) setClasses(data);
      if (error) throw new Error(`${error.code} - ${error.message}`);
    })();
  }, [supabase]);

  return (
    <GenericTable
      table={table}
      columns={columns}
      getLink={(row) => `/lectures/${row.id}`}
    />
  );
}
