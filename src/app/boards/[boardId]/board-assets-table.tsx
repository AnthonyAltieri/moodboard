"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { ASSET_TABLE_CATEGORY_COLUMN } from "~/components/assets-table/asset-table-columns/asset-table-category-column";
import { ASSET_TABLE_NAME_COLUMN } from "~/components/assets-table/asset-table-columns/asset-table-name-column";
import { AssetTable, AssetTableRow } from "~/components/assets-table/assets-table";
import { RowActions } from "~/components/row-actions";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

export const ASSET_ROW_ACTIONS: ColumnDef<AssetTableRow> = {
  id: "actions",
  cell: ({ row }) => {
    const { id } = row.original;

    return (
      <RowActions>
        <>
          <DropdownMenuItem>Preview</DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              // TODO: Remove Asset from Board
            }}
          >
            Remove
          </DropdownMenuItem>
        </>
      </RowActions>
    )
  },
}

interface BoardAssetsTableProps {
  data: AssetTableRow[];
}

export const BoardAssetsTable = ({ data }: BoardAssetsTableProps) => {
  const [preview, setPreview] = useState<{ [id: string]: boolean }>(() => ({}))

  return (
    <>
      <pre>{JSON.stringify(preview, null, 2)}</pre>

      <AssetTable
        filterPlaceholder="Filter assets..."
        data={data}
        onRowClick={(row) => {
          const { id } = row.original;
          if (preview[id]) {
            setPreview({ ...preview, [id]: false })
          } else {
            setPreview({ ...preview, [id]: true })
          }
        }}
        columns={[
          ASSET_TABLE_NAME_COLUMN,
          ASSET_TABLE_CATEGORY_COLUMN,
          ASSET_ROW_ACTIONS,
        ]}
      />
    </>
  )
}

