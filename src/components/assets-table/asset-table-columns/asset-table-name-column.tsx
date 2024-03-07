"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AssetTableRow } from "~/components/assets-table/assets-table";
import { ColumnHeader } from "~/components/boards-table/column-header";

export const ASSET_TABLE_NAME_COLUMN: ColumnDef<AssetTableRow> = {
  accessorKey: "name",
  header: ({ column }) => <ColumnHeader column={column} title="Asset" />,
  cell: ({ row }) => <div className="w-[200px]">{row.getValue("name")}</div>,
  enableSorting: false,
  enableHiding: false,
};

