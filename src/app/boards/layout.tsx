import { SidePanelLayout } from "~/components/side-panel-layout";

interface BoardsLayoutProps {
  children: React.ReactNode;
}

export default async function BoardsLayout({ children }: BoardsLayoutProps) {

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
