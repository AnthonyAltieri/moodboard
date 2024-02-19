import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "~/features/db";
import {
  type Security,
  type SecurityPrice,
  securityBenchmarks,
  securityPrices,
} from "~/features/schema";

const getBenchmarkSecurityPrices = ({
  id,
  start,
  stop,
}: {
  id: NonNullable<Security["id"]>;
  start?: Date;
  stop?: Date;
}): Promise<SecurityPrice[]> => {
  const conditions = [eq(securityBenchmarks.fromSecurityId, id)];
  if (start != null) conditions.push(gte(securityPrices.date, start));
  if (stop != null) conditions.push(lte(securityPrices.date, stop));

  return db
    .select({
      id: securityPrices.id,
      date: securityPrices.date,
      price: securityPrices.price,
    })
    .from(securityBenchmarks)
    .innerJoin(
      securityPrices,
      eq(securityBenchmarks.toSecurityId, securityPrices.id),
    )
    .where(and(...conditions));
};
