import { eq } from "drizzle-orm";
import { db } from "~/features/db";
import { Security, securities } from "~/features/schema";

export const getSecurity = async (
  id: NonNullable<Security["id"]>,
): Promise<Security | null> => {
  const [security] = await db
    .select()
    .from(securities)
    .where(eq(securities.id, id))
    .limit(1);

  return security ?? null;
};
