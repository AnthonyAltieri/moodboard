import { eq } from "drizzle-orm";
import { db } from "~/features/db";
import { type Board, boardSchema, userBoardSchema, type Asset } from "~/features/schema";
import { type User } from "~/types/user";

export const getUserBoardsWithAssetInformation = async (id: User["id"]): Promise<
  (Board & { categories: Set<Asset["category"]>; numberAssets: number } )
> => {
  const rows = await db
    .select()
    .from(userBoardSchema)
    .innerJoin(boardSchema, eq(userBoardSchema.boardId, boardSchema.id))
    .where(eq(userBoardSchema.clerkUserId, id));

  return rows.map(row => row.board);
}
