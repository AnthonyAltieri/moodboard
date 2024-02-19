import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "~/features/db";
import { Security, SecurityPrice, securityPrices } from "~/features/schema";

const getSecurityPrices = ({
  id,
  start,
  stop,
}: {
  id: NonNullable<Security["id"]>;
  start?: Date;
  stop?: Date;
}): Promise<SecurityPrice[]> => {
  const conditions = [eq(securityPrices.id, id)];
  if (start != null) conditions.push(gte(securityPrices.date, start));
  if (stop != null) conditions.push(lte(securityPrices.date, stop));

  return db
    .select()
    .from(securityPrices)
    .where(and(...conditions));
};
