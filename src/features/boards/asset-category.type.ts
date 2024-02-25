import { z } from "zod";

export const AssetCategorySchema = z.union([
  z.literal("text"),
  z.literal("video"),
  z.literal("image"),
])

export type AssetCategory = z.infer<typeof AssetCategorySchema>;

export const ASSET_CATEGORIES: AssetCategory[] = ["text", "video", "image"]
