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
  loading?: boolean;
  pageSize: number;
  columns: ColumnDef<T, any>[];
  getLink?: (row: T) => string;
}

export function GenericTable<T>({
  table,
  loading,
  pageSize,
  columns,
  getLink,
}: GenericTable<T>) {
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
          {!loading &&
            table.getRowModel().rows.map((row) => {
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
          {!loading &&
            table.getRowModel().rows.length !== 0 &&
            Array.from(
              Array(Math.max(pageSize - table.getRowModel().rows.length, 0))
            ).map((el, index) => (
              <Table.tr key={index}>
                {table.getVisibleFlatColumns().map((column) => (
                  <Table.td
                    key={column.id}
                    style={{
                      ...(column.columnDef.maxSize && {
                        maxWidth: column.columnDef.maxSize,
                      }),
                      ...(column.columnDef.size && {
                        maxWidth: column.columnDef.size,
                      }),
                      ...(column.columnDef.minSize && {
                        maxWidth: column.columnDef.minSize,
                      }),
                    }}
                  />
                ))}
              </Table.tr>
            ))}
          {loading &&
            Array.from(Array(pageSize)).map((el, index) => (
              <Table.tr key={index}>
                {table.getVisibleFlatColumns().map((column) => (
                  <Table.td
                    key={column.id}
                    style={{
                      ...(column.columnDef.maxSize && {
                        maxWidth: column.columnDef.maxSize,
                      }),
                      ...(column.columnDef.size && {
                        maxWidth: column.columnDef.size,
                      }),
                      ...(column.columnDef.minSize && {
                        maxWidth: column.columnDef.minSize,
                      }),
                    }}
                  />
                ))}
              </Table.tr>
            ))}
        </Table.tbody>
      </Table.table>
    </Table.container>
  );
}
