import { type User } from "@clerk/nextjs/dist/types/server";
import { sql } from "drizzle-orm";
import { DateTime } from "luxon";
import { BoardsTable, type BoardTableRow } from "~/components/boards-table/boards-table";
import { db } from "~/features/db";
import { type Asset } from "~/features/schema";
import { getSessionUser } from "~/lib/get-session-user";

interface BoardsPageProps {
  // params: { securityId: string };
}

const getData = async (id: User["id"]): Promise<BoardTableRow[]> => {
  const result = await db.execute(sql`
      SELECT
          MAX(b.id) AS id
        , MAX(b.name) AS name
        , MAX(b.description) AS description
        , MAX(b.created_at) AS createdAt
        , SUM(CASE WHEN ba.board_id IS NULL THEN 0 ELSE 1 END) AS numberAssets
        , GROUP_CONCAT(DISTINCT a.category) AS categories
      FROM
        user_board AS ub
        INNER JOIN board AS b ON ub.board_id = b.id
        LEFT JOIN board_asset AS ba ON ba.board_id = b.id
        LEFT JOIN asset as a on a.id = ba.asset_id
      WHERE
        ub.clerk_user_id = ${id}
      GROUP BY
        b.id;
  `)

  const rows = result.rows as {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
    categories: string | null;
    numberAssets: number;
  }[];

  return rows.map((row) => {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      numberAssets: row.numberAssets,
      categories: row.categories?.split(",") as Asset["category"][] ?? [],
      createdAt: DateTime.fromISO(row.createdAt).toJSDate()
    } satisfies BoardTableRow
  })
}



export default async function BoardsPage({ }: BoardsPageProps) {
  const user = await getSessionUser();
  const data = await getData(user.id);

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Boards</h2>
          </div>
        </div>
        <BoardsTable data={data} filterPlaceholder="Filter Boards..." />
      </div>
    </>
  );
}
