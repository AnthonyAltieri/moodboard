import * as React from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { MainNav } from "~/components/main-nav";
import { buttonVariants } from "~/components/ui/button";
import { UserAccountNav } from "~/components/user-account-nav";
import { cn } from "~/lib/utils";

export interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div className={cn("min-h-screen bg-background font-sans antialiased")}>
      <div className="flex min-h-screen flex-col space-y-6">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};
