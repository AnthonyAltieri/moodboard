import { AssetTable } from "~/components/assets-table/assets-table";
import { deleteAsset } from "~/components/assets-table/delete-asset.action";
import { getUserAssets } from "~/features/assets/get-user-assets";
import { getSessionUser } from "~/lib/get-session-user";

interface BoardsPageProps {
  // params: { securityId: string };
}

export default async function BoardsPage({}: BoardsPageProps) {
  const user = await getSessionUser();
  const assets = await getUserAssets(user.id);

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Assets</h2>
          </div>
        </div>
        <AssetTable data={assets} filterPlaceholder="Filter Assets..." />
      </div>
    </>
  );
}
