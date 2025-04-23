"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import debounce from "lodash/debounce";

interface Data<T> {
  items?: T[];
  total?: number;
}

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  skeletonColumns?: ColumnDef<TData, TValue>[];
  data: Data<TData>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaginationChange: (pageIndex: number) => void;
  pageIndex?: number;
  pageSize?: number;
  isFetching?: boolean;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 4,
  pageIndex = 1,
  onPaginationChange,
  handleSearch,
  isFetching,
  skeletonColumns,
}: Props<TData, TValue>): React.JSX.Element {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { items = [], total = 1 } = data;

  const activeColumns = useMemo(() => {
    return isFetching && skeletonColumns ? skeletonColumns : columns;
  }, [columns, isFetching, skeletonColumns]);

  const tableData = useMemo(() => {
    if (isFetching && skeletonColumns) {
      return Array(pageSize).fill({});
    }
    return items;
  }, [isFetching, items, pageSize, skeletonColumns]);

  const table = useReactTable({
    data: tableData,
    columns: activeColumns,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
    state: {
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    onPaginationChange: updater => {
      const newPagination =
        typeof updater === "function" ? updater({ pageIndex, pageSize }) : updater;
      onPaginationChange(newPagination.pageIndex);
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn("rounded-md border")}>
      <div className={cn("flex items-center p-4")}>
        <Input
          placeholder="Nome do produto..."
          onChange={debounce(handleSearch, 500)}
          className={cn("max-w-sm")}
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead
                  key={header.id}
                  className={cn("px-4 text-sm")}
                  style={{
                    width: header.getSize(),
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className={cn("p-4 whitespace-normal")}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className={cn("h-24 text-center")}>
                Sem resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className={cn("flex items-center justify-between py-4 px-4 border-t")}>
        <div className={cn("text-sm text-muted-foreground")}>
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount() === 0 ? 1 : table.getPageCount()}
        </div>
        <div className={cn("flex space-x-2")}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
