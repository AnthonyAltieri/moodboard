"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"

import { ReactNode } from "react"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"

interface RowActionsProps {
  children: ReactNode;
}

export function RowActions({ children }: RowActionsProps) {
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
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
