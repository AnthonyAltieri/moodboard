import Link from "next/link";

import { MainNav } from "~/components/main-nav";
import { SiteFooter } from "~/components/site-footer";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { UserAccountNav } from "~/components/user-account-nav";
import { currentUser } from "@clerk/nextjs";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const cu = await currentUser();
  const isLoggedIn = cu != null;
  // const isLoggedIn = false;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav />
          {!isLoggedIn ? (
            <nav className="flex space-x-4">
              <Link
                href="/sign-in"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "whitespace-nowrap px-4",
                )}
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "whitespace-nowrap px-4",
                )}
              >
                Sign Up
              </Link>
            </nav>
          ) : (
            <UserAccountNav />
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
