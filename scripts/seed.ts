import { nanoid } from "nanoid";
import {
  type Security,
  type SecurityBenchmark,
  type SecurityPrice,
  securities,
  securityBenchmarks,
  securityPrices,
} from "~/features/schema";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import dotenv from "dotenv";

dotenv.config({ debug: true });

// ts-node doesn't like .mjs files so we have to make the db here
const connection = connect({
  url: process.env.DATABASE_URL,
});
const db = drizzle(connection);

const SECTORS = [
  "Energy" as const,
  "Materials" as const,
  "Industrials" as const,
  "Consumer Discretionary" as const,
  "Consumer Staples" as const,
  "Health Care" as const,
  "Financials" as const,
  "Information Technology" as const,
  "Communication Services" as const,
  "Utilities" as const,
  "Real Estate" as const,
];

const main = async () => {
  await seed({
    numberSecurities: 10,
    numberSecurityPrices: 100,
  });
};

const seed = async ({
  numberSecurities,
  numberSecurityPrices,
}: {
  numberSecurities: number;
  numberSecurityPrices: number;
}) => {
  const createdSecurities: Security[] = [];
  for (let i = 0; i < numberSecurities; i++) {
    const security = {
      id: nanoid(12),
      name: faker.company.name(),
      ticker: faker.string.alpha(4).toUpperCase(),
      sector: faker.helpers.arrayElement(SECTORS),
      isGroup: false,
      description: null,
    };
    await db.insert(securities).values(security);
    createdSecurities.push(security);
    console.log(`created security ${security.id} ${security.ticker}`);

    const prices: SecurityPrice[] = [];
    let price = faker.number.int({ min: 100, max: 1000 });
    let date = getPreviousWeekday(DateTime.now());
    while (true) {
      if (prices.length >= numberSecurityPrices) break;
      prices.push({ id: security.id, date: date.toJSDate(), price });
      price = generateNextPrice(price, 0.02);
      date = getPreviousWeekday(date);
    }
    await db.insert(securityPrices).values(prices);
    console.log(
      `created ${prices.length} prices for security ${security.id} ${security.ticker}`,
    );
  }

  if (createdSecurities.length > 1) {
    const [benchmark, ...rest] = createdSecurities;
    const benchmarks: SecurityBenchmark[] = rest.map((security) => ({
      fromSecurityId: security.id,
      toSecurityId: benchmark!.id,
    }));
    await db.insert(securityBenchmarks).values(benchmarks);
    console.log(`created benchmarks with ${rest.length} securities`);
  }
};

const getPreviousWeekday = (focus: DateTime) => {
  let date = focus;
  while (true) {
    date = date.minus({ days: 1 });
    if (date.weekday < 6) return date;
  }
};

const generateNextPrice = (price: number, volatility = 0.2) => {
  let percentChange = 2 * volatility * Math.random();
  if (percentChange > volatility) {
    percentChange -= 2 * volatility;
  }
  return price + price * percentChange;
};

void main();
