"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Row } from "@tanstack/react-table";
import { Link } from "lucide-react";
import { AssetTableRow } from "~/components/assets-table/assets-table";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { DropdownMenuShortcut } from "~/components/ui/dropdown-menu";

interface AssetTableRowActionsProps {
  row: Row<AssetTableRow>
}

export function AssetTableRowActions({row}: AssetTableRowActionsProps) {
  const { id } = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Icons.dotsHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Link href={`/assets/${id}`}>
            View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

}