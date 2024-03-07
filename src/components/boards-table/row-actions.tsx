"use client"

import { type Row } from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"

import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import Link from "next/link";
import { deleteAsset } from "~/components/assets-table/delete-asset.action"

interface RowActionsProps<TData> {
  row: Row<TData>;
  toEditHref: (row: Row<TData>) => string;
}

export function RowActions<TData>({ row, toEditHref }: RowActionsProps<TData>) {
  const href = toEditHref(row);

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
          <Link href={href}>
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => {
          await deleteAsset(row.original.id)
        }}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
