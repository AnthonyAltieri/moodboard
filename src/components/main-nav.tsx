"use client";

import { useUser } from "@clerk/nextjs";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import Link from "next/link";
import * as React from "react";

import { Icons } from "~/components/icons";
import { HoverCard } from "~/components/ui/hover-card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import { SITE_CONFIG } from "~/config/site";
import { cn } from "~/lib/utils";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

interface MainNavProps {
  children?: React.ReactNode;
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    isAccountRequired: boolean;
    isUserLoggedIn: boolean;
  }
>(
  (
    {
      className,
      title,
      children,
      isAccountRequired,
      isUserLoggedIn,
      href,
      ...props
    },
    ref,
  ) => {
    const disabled = isAccountRequired && !isUserLoggedIn;

    console.log(title + " disabled=" + disabled);
    return (
      <li>
        <NavigationMenuLink asChild aria-disabled={disabled}>
          <a
            aria-disabled={disabled}
            ref={ref}
            className={cn(
              disabled
                ? "cursor-default"
                : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
              className,
            )}
            href={disabled ? undefined : href}
            {...props}
          >
            <div
              className="flex items-center"
              title={disabled ? "You must log in to view this" : undefined}
            >
              <div
                className={cn(
                  disabled ? "opacity-50" : "",
                  "whitespace-nowrap text-sm font-medium leading-none",
                )}
              >
                {title}
              </div>
              {disabled ? (
                <Icons.lock className="mb-0.5 ml-4 h-4 w-4 opacity-50" />
              ) : undefined}
            </div>
            {/* <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children} */}
            {/* </p> */}
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export function MainNav({ children }: MainNavProps) {
  const clerk = useUser();
  // const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const isUserLoggedIn =
    clerk.isLoaded && clerk.isSignedIn && clerk.user != null;

  return (
    <div className="flex w-full gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.brain />
        <span className="hidden font-bold sm:inline-block">
          {SITE_CONFIG.name}
        </span>
      </Link>
      <nav className="relative z-10 flex max-w-max flex-1 items-center justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Boards</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <ListItem
                    href="/boards"
                    title="My Boards"
                    isAccountRequired={true}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Funds</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <ListItem
                    href="/fund-groups/total-universe"
                    title="Total Universe"
                    isAccountRequired={false}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                  <ListItem
                    href="/fund-groups/equity-funds"
                    title="Equity Funds"
                    isAccountRequired={false}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Education</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <ListItem
                    href="/blog"
                    title="Blog"
                    isAccountRequired={false}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                  <ListItem
                    href="/about-13fs"
                    title="About 13Fs"
                    isAccountRequired={false}
                    isUserLoggedIn={isUserLoggedIn}
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
    </div>
  );
}
