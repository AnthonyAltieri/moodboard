import { BoardAssetsTable } from "~/app/boards/[boardId]/board-assets-table";
import { getBoardWithAssets } from "~/features/boards/get-board-with-assets";

interface BoardSelectedPageProps {
  params: { boardId: string }
}


export default async function BoardSelectedPage({ params: { boardId } }: BoardSelectedPageProps) {
  const data = await getBoardWithAssets(boardId)
  if (data == null) return null;
  if (data.board == null) return null;

  const { board } = data;



  return (
    <div className="text-white">
      <p>{board.name}</p>
      <p>Assets</p>
      <div className="flex flex-1 flex-col">
        <BoardAssetsTable data={data.assets} />
      </div>

    </div>
  )
}
