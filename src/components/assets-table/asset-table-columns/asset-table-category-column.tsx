"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AssetTableRow } from "~/components/assets-table/assets-table";
import { ColumnHeader } from "~/components/boards-table/column-header";

export const ASSET_TABLE_CATEGORY_COLUMN: ColumnDef<AssetTableRow> = {
  accessorKey: "category",
  header: ({ column }) => (
    <ColumnHeader column={column} title="Asset Categories" />
  ),
  cell: ({ row }) => {
    const category = row.getValue<AssetTableRow["category"]>("category");

    return (
      <div className="flex items-center space-x-2">
        <p key={category}>{category}</p>
      </div>
    );
  },
};

