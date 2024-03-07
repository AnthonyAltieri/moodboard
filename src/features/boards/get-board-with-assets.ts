import { eq, and } from "drizzle-orm";
import { db } from "~/features/db";
import { type Board, boardSchema, type Asset, boardAssetSchema, assetSchema, locationS3Schema } from "~/features/schema";

interface AssetWithLocation extends Omit<Asset, "location" | "locationId"> {
  location: { type: "s3", key: string; bucket: string }
}

export const getBoardWithAssets = async (
  id: NonNullable<Board["id"]>,
): Promise<{ board: Board; assets: AssetWithLocation[] } | { board: null; assets: null }> => {
  const rows = await db
    .select()
    .from(boardSchema)
    .leftJoin(boardAssetSchema, eq(boardAssetSchema.boardId, boardSchema.id))
    .leftJoin(assetSchema, eq(boardAssetSchema.assetId, assetSchema.id))
    // only support s3 locations for now
    .leftJoin(locationS3Schema, and(eq(assetSchema.location, "s3"), eq(assetSchema.locationId, locationS3Schema.id)))
    .where(eq(boardSchema.id, id))
    .where(eq(assetSchema.location, "s3"));

  if (rows.length === 0) return { board: null, assets: null };

  const head = rows[0]!

  const board: Board = head.board;
  const assets: AssetWithLocation[] = [];
  for (const { asset, location_s3: locationS3 } of rows) {
    if (asset == null) continue;
    if (locationS3 == null) continue;

    const { bucket, key } = locationS3;

    assets.push({ ...asset, location: { type: "s3", key, bucket } })
  }


  return { board, assets };

};
