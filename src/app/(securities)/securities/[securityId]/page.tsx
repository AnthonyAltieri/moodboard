import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "~/features/db";
import {
  SecurityPrice,
  securityPrices,
  securityBenchmarks,
} from "~/features/schema";
import { getSessionUser } from "~/lib/get-session-user";

async function getSecurityPrices(
  securityId: SecurityPrice["id"],
): Promise<SecurityPrice[]> {
  if (securityId == null) return [];

  return await db
    .select()
    .from(securityPrices)
    .where(eq(securityPrices.id, securityId));
}

async function getBenchmarkPrices(
  securityId: SecurityPrice["id"],
): Promise<SecurityPrice[]> {
  if (securityId == null) return [];

  return await db
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
    .where(eq(securityBenchmarks.fromSecurityId, securityId));
}

interface SecuritiesPageProps {
  params: { securityId: string };
}

export default async function SecuritiesPage({ params }: SecuritiesPageProps) {
  const user = await getSessionUser();

  const [securityPrices, benchmarkPrices] = await Promise.all([
    getSecurityPrices(params.securityId),
    getBenchmarkPrices(params.securityId),
  ]);
  if (securityPrices.length === 0) notFound();

  return (
    <div className="flex flex-col">
      <div className="flex">Security Id: {params.securityId}</div>
      <div className="flex">Benchmark Id: {benchmarkPrices[0]?.id}</div>
      <pre className="text-white">
        {JSON.stringify(securityPrices, null, 2)}
      </pre>
    </div>
  );
}
