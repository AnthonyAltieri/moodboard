import { eq } from "drizzle-orm";
import { db } from "~/features/db";
import { boardSchema, type Board } from "~/features/schema";

export const getBoard = async (
  id: NonNullable<Board["id"]>,
): Promise<Board | null> => {
  const [board] = await db
    .select()
    .from(boardSchema)
    .where(eq(boardSchema.id, id))
    .limit(1);

  return board ?? null;
};
