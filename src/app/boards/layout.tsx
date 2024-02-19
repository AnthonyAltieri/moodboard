import { currentUser } from "@clerk/nextjs";
import { MainNav } from "~/components/main-nav";
import { SiteFooter } from "~/components/site-footer";
import { UserAccountNav } from "~/components/user-account-nav";

interface BoardsLayoutProps {
  children: React.ReactNode;
}

export default async function BoardsLayout({ children }: BoardsLayoutProps) {
  const cu = await currentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav />
          <UserAccountNav />
        </div>
      </header>
      <main className="flex bg-blue-500">
        <div className="flex w-96 grow flex-col bg-red-500 px-4 py-8">
          <div>Boards</div>
          <div>Models</div>
        </div>
        <div className="w-full bg-green-500">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
