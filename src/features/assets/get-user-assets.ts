import { eq } from "drizzle-orm";
import { db } from "~/features/db";
import { type Board, userAssetSchema, assetSchema, Asset } from "~/features/schema";
import { type User } from "~/types/user";

export const getUserAssets = async (id: User["id"]): Promise<Asset[]> => {
  const rows = await db
    .select()
    .from(userAssetSchema)
    .innerJoin(assetSchema, eq(userAssetSchema.assetId, assetSchema.id))
    .where(eq(userAssetSchema.clerkUserId, id));

  return rows.map(row => row.asset);
}
