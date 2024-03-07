import { eq } from "drizzle-orm";
import { db } from "~/features/db";
import { Asset, Board, assetSchema, boardAssetSchema, boardSchema } from "~/features/schema";

export const getBoardAssets = async (id: Board["id"]): Promise<Asset[]> => {
  const rows = await db
    .select()
    .from(boardAssetSchema)
    .innerJoin(boardSchema, eq(boardAssetSchema.boardId, boardSchema.id))
    .innerJoin(assetSchema, eq(boardAssetSchema.assetId, assetSchema.id))
    .where(eq(boardAssetSchema.boardId, id));

  return rows.map(r => r.asset);
}

