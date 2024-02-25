import { eq } from "drizzle-orm";
import { db } from "~/features/db";
import { type Board, boards } from "~/features/schema";

export const getBoard = async (
  id: NonNullable<Board["id"]>,
): Promise<Board | null> => {
  const [board] = await db
    .select()
    .from(boards)
    .where(eq(boards.id, id))
    .limit(1);

  return board ?? null;
};
