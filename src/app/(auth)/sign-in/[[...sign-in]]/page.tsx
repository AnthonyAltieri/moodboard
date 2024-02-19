import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Icons } from "~/components/icons";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export default function Page() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="flex w-screen flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">StockSage</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </div>
        <div className="flex w-full justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: "right-10",
                card: "mx-auto",
                headerSubtitle: "hidden",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
