import { currentUser } from "@clerk/nextjs";
import { MainNav } from "~/components/main-nav";
import { SidePanelLayout } from "~/components/side-panel-layout";
import { SiteFooter } from "~/components/site-footer";
import { UserAccountNav } from "~/components/user-account-nav";

interface AssetsLayoutProps {
  children: React.ReactNode;
}

export default async function AssetsLayout({ children }: AssetsLayoutProps) {

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-col flex-1">
        <SidePanelLayout>
          {children}
        </SidePanelLayout>
      </main>
    </div>
  );
}
