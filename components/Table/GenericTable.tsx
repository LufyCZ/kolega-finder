import { Table } from "./";
import {
  ColumnDef,
  flexRender,
  Table as TableType,
} from "@tanstack/react-table";
import classNames from "classnames";
import Link from "next/link";

interface GenericTable<T> {
  table: TableType<T>;
  columns: ColumnDef<T, any>[];
  getLink?: (row: T) => string;
}

export function GenericTable<T>({ table, columns, getLink }: GenericTable<T>) {
  return (
    <Table.container>
      <Table.table>
        <Table.thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.thr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.th
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{
                    maxWidth: header.column.getSize(),
                    width: header.column.getSize(),
                  }}
                >
                  <div
                    {...{
                      className: classNames(
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        "h-full flex items-center gap-2"
                      ),
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>
                </Table.th>
              ))}
            </Table.thr>
          ))}
        </Table.thead>
        <Table.tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <Table.tr key={row.id} className="cursor-pointer">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Table.td
                      key={cell.id}
                      style={{
                        maxWidth: columns[0].size,
                        width: columns[0].size,
                      }}
                    >
                      {getLink ? (
                        <Link href={getLink(row.original)} passHref={true}>
                          <a className="flex flex-grow">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </a>
                        </Link>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </Table.td>
                  );
                })}
              </Table.tr>
            );
          })}
        </Table.tbody>
      </Table.table>
    </Table.container>
  );
}
