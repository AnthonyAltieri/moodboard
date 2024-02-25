"use client";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "lucide-react";
import { type BoardTableRow } from "~/components/boards-table/boards-table";
import { ColumnHeader } from "~/components/boards-table/column-header";
import { RowActions } from "~/components/boards-table/row-actions";
import { Checkbox } from "~/components/ui/checkbox";
import { type Board } from "~/features/boards/board";



export const columns: ColumnDef<BoardTableRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Board" />
    ),
    cell: ({ row }) => <div className="w-[200px]">{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "categories",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Asset Categories" />
    ),
    cell: ({ row }) => {
      const categories = row.getValue<BoardTableRow["categories"]>("categories")

      return (
        <div className="flex items-center space-x-2">
          {categories.map((category) => (
            <p key={category}>{category}</p>
          ))}
          {
            //priority.icon && ( ?? <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />)
          }
        </div>
      )
    },
  },
  {
    accessorKey: "numberAssets",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Number Assets" />
    ),
    cell: ({ row }) => {
      const numberAssets = row.getValue<Board["numberAssets"]>("numberAssets")

      return (
        <div className="flex items-center space-x-2">
          {numberAssets}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      // eslint-disable-next-line
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions
      row={row}
      toEditHref={(row) => {
        const id = row.original.id
        return `/boards/${id}`
      }}
    />,
  },
]
