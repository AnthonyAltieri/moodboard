import { eq } from "drizzle-orm";
import { db } from "~/features/db";
import { Asset, assetSchema, boardAssetSchema, userAssetSchema } from "~/features/schema";

export const deleteAsset = (id: Asset["id"])  => {
  return Promise.all([
    removeAllBoardAssociations(id),
    removeAllUserAssociations(id),
    deleteOne(id)
  ])
}

const removeAllUserAssociations = (id: Asset["id"]) => {
  return db.delete(userAssetSchema).where(eq(userAssetSchema.assetId, id))
}
const removeAllBoardAssociations = (id: Asset["id"]) => {
  return db.delete(boardAssetSchema).where(eq(boardAssetSchema.assetId, id))
}
const deleteOne = (id: Asset["id"]) => {
  return db.delete(assetSchema).where(eq(assetSchema.id, id))
}