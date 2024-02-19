import { eq } from "drizzle-orm";
import { db } from "~/features/db";
import { Security, securities, securityBenchmarks } from "~/features/schema";

export const getBenchmarkSecurity = async (
  id: NonNullable<Security["id"]>,
): Promise<Security | null> => {
  const [security] = await db
    .select({ security: securities })
    .from(securityBenchmarks)
    .where(eq(securityBenchmarks.fromSecurityId, id))
    .innerJoin(securities, eq(securities.id, securityBenchmarks.toSecurityId))
    .limit(1);

  return security?.security ?? null;
};
