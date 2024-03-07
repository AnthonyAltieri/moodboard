"use client";

import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  ColumnDef,
} from "@tanstack/react-table";
import React from "react";
import { DataTable, DataTableProps } from "~/components/data-table";
import { Input } from "~/components/ui/input";
import { type Asset } from "~/features/schema";

export type AssetTableRow = Asset;

export interface AssetTableProps {
  data: AssetTableRow[];
  filterPlaceholder: string;
  columns: ColumnDef<AssetTableRow>[];
  onRowClick?: DataTableProps<AssetTableRow>["onRowClick"];
}


export const AssetTable = ({
  data: data,
  columns,
  filterPlaceholder,
  onRowClick,
}: AssetTableProps) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      <Input
        placeholder={filterPlaceholder}
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="h-8 w-[256px] lg:w-[250px]"
      />
      <DataTable table={table} numberColumns={columns.length} onRowClick={onRowClick} />
    </>
  );
};
