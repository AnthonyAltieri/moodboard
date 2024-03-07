"use server";

import { db } from "~/features/db";
import { Asset, assetSchema } from "~/features/schema";
import { deleteAsset as deleteOneAsset } from "~/features/assets/delete-asset"
import { revalidatePath } from "next/cache";

export async function deleteAsset(id: Asset["id"]) {
  try {
    await deleteOneAsset(id)
    revalidatePath("/assets")
    console.log(`!!!!!!!!!!!!  DELETED Asset(${id})`)
  } catch (error) {
    throw new Error("Failed to delete Asset.")
  }
}