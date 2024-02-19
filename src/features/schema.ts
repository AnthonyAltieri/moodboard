import {
  boolean,
  date,
  float,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  smallint,
  text,
  tinyint,
  double,
  varchar,
  index,
} from "drizzle-orm/mysql-core";

export const securities = mysqlTable("securities", {
  id: varchar("id", { length: 12 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  ticker: varchar("ticker", { length: 10 }).notNull(),
  sector: varchar("sector", { length: 100 }).notNull(),
  isGroup: boolean("is_group").notNull(),
});
export type Security = typeof securities.$inferSelect;

export const securityLinks = mysqlTable(
  "security_links",
  {
    id: int("id").autoincrement().primaryKey(),
    securityId: varchar("security_id", { length: 12 }),
    name: varchar("name", { length: 512 }).notNull(),
    url: varchar("url", { length: 512 }).notNull(),
  },
  (table) => ({
    securityIdIndex: index("security_links_security_id").on(table.securityId),
  }),
);
export type SecurityLink = typeof securityLinks.$inferSelect;

export const funds = mysqlTable("funds", {
  id: varchar("id", { length: 12 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  sector: varchar("sector", { length: 100 }).notNull(),
  isGroup: boolean("is_group").notNull(),
});
export type Fund = typeof securities.$inferSelect;

export const fundLinks = mysqlTable(
  "fund_links",
  {
    id: int("id").autoincrement().primaryKey(),
    fundId: varchar("fund_id", { length: 12 }).notNull(),
    name: varchar("name", { length: 512 }).notNull(),
    url: varchar("url", { length: 512 }).notNull(),
  },
  (table) => ({
    fundIdIndex: index("fund_links_fund_id").on(table.fundId),
  }),
);
export type FundLink = typeof fundLinks.$inferSelect;

export const securityPrices = mysqlTable(
  "security_prices",
  {
    id: varchar("securtiy_id", { length: 12 }).notNull(),
    date: date("date").notNull(),
    price: float("price").notNull(),
  },
  (table) => ({
    pk: primaryKey(table.id, table.date),
  }),
);
export type SecurityPrice = typeof securityPrices.$inferSelect;

export const securityBenchmarks = mysqlTable(
  "security_benchmarks",
  {
    fromSecurityId: varchar("from_security_id", { length: 12 }).notNull(),
    toSecurityId: varchar("to_security_id", { length: 12 }).notNull(),
  },
  (table) => ({
    pk: primaryKey(table.fromSecurityId),
  }),
);
export type SecurityBenchmark = typeof securityBenchmarks.$inferSelect;

export const securityQuarterlyStats = mysqlTable(
  "security_quarterly_stats",
  {
    securityId: varchar("security_id", { length: 12 }).notNull(),
    quarter: mysqlEnum("quarter", ["1", "2", "3", "4"]),
    year: smallint("year").notNull(),
    stat: varchar("stat_name", { length: 200 }).notNull(),
    type: mysqlEnum("stat_type", ["string", "number"]).notNull(),
    value: json("stat_value"),
  },
  (table) => ({
    pk: primaryKey(table.securityId, table.year, table.quarter),
  }),
);
export type SecurityQuarterlyStat = typeof securityQuarterlyStats.$inferSelect;

export const securityQuarterlyHolders = mysqlTable(
  "security_quarterly_holders",
  {
    securityId: varchar("security_id", { length: 12 }).notNull(),
    fundId: varchar("security_id", { length: 12 }).notNull(),
    quarter: mysqlEnum("quarter", ["1", "2", "3", "4"]),
    year: smallint("year").notNull(),
    positionValue: int("position_value"),
    fundPercentage: float("fund_percentage"),
    fundAveragePositionSize: float("fund_average_position_size"),
    fundShares: int("fund_shares"),
    quarterOverQuarterShareChange: int("quarter_over_quarter_share_change"),
    fundQuartile: tinyint("manager_quartile"),
    holdingPeriodInQuarters: smallint("holding_period_in_quarters"),
    fundWeightedAverageHoldingPeriodInQuarters: smallint(
      "fund_weighted_average_holding_period_in_quarters",
    ),
    quarterFirstOwned: mysqlEnum("quarter", ["1", "2", "3", "4"]),
    yearFirstOwned: smallint("year_first_owned"),
    currentHoldingPeriodInQuarters: smallint(
      "current_holding_period_in_quarters",
    ),
  },
  (table) => ({
    pk: primaryKey(table.securityId, table.year, table.quarter, table.fundId),
  }),
);
export type SecurityQuarterlyHolders =
  typeof securityQuarterlyHolders.$inferSelect;

export const securityTrailing3MStats = mysqlTable(
  "security_trailing_3m_stats",
  {
    securityId: varchar("security_id", { length: 12 }).notNull(),
    date: date("date"),
    annualizedReturn: float("annualized_return"),
    standardDeviation: float("standard_deviation"),
    statisticalAlpha: float("statistical_alpha"),
    informationRatio: float("information_ratio"),
    sharpe: float("sharpe"),
    calmar: float("calmar"),
    downsideDeviation: float("downside_deviation"),
  },
  (table) => ({
    pk: primaryKey(table.securityId, table.date),
  }),
);
export type SecurityTrailing3MStat =
  typeof securityTrailing3MStats.$inferSelect;

export const securityGroupQuarterlyWeights = mysqlTable(
  "security_group_quarterly_weights",
  {
    securityId: varchar("security_id", { length: 12 }).notNull(),
    quarter: mysqlEnum("quarter", ["1", "2", "3", "4"]).notNull(),
    year: smallint("year_first_owned").notNull(),

    componentSecurityId: varchar("component_security_id", {
      length: 12,
    }).notNull(),
    weight: float("weight").notNull(),
    quarterOverQuarterShareChange: int("quarter_over_quarter_share_change"),
    quarterOverQuarterWeightChange: float("quarter_over_quarter_weight_change"),
    holders: int("hodlers"),
    entries: int("entries"),
    exits: int("adds"),
    trims: int("trims"),
    averageSkillQuartile: tinyint("average_skill_quartile"),
    crowdingQuartile: tinyint("crowding_quartile"),
  },
  (table) => ({
    pk: primaryKey(
      table.securityId,
      table.year,
      table.quarter,
      table.componentSecurityId,
    ),
  }),
);
export type SecurityGroupQuarterlyWeight =
  typeof securityGroupQuarterlyWeights.$inferSelect;

export const fundBenchmarks = mysqlTable(
  "fund_benchmarks",
  {
    fromFundId: varchar("from_fund_id", { length: 12 }).notNull(),
    toSecurityId: varchar("to_security_id", { length: 12 }).notNull(),
  },
  (table) => ({
    pk: primaryKey(table.fromFundId),
  }),
);
export type FundBenchmark = typeof fundBenchmarks.$inferSelect;

export const fundTrailing3MStats = mysqlTable(
  "fund_trailing_3m_stats",
  {
    fundId: varchar("fund_id", { length: 12 }).notNull(),
    date: date("date"),
    annualizedReturn: float("annualized_return"),
    standardDeviation: float("standard_deviation"),
    statisticalAlpha: float("statistical_alpha"),
    informationRatio: float("information_ratio"),
    sharpe: float("sharpe"),
    calmar: float("calmar"),
    downsideDeviation: float("downside_deviation"),
  },
  (table) => ({
    pk: primaryKey(table.fundId, table.date),
  }),
);
export type FundTrailing3MStat = typeof fundTrailing3MStats.$inferSelect;

export const fundQuarterlyWeights = mysqlTable(
  "fund_quarterly_weights",
  {
    fundId: varchar("fund_id", { length: 12 }).notNull(),
    quarter: mysqlEnum("quarter", ["1", "2", "3", "4"]).notNull(),
    year: smallint("year").notNull(),
    componentSecurityId: varchar("component_security_id", {
      length: 12,
    }).notNull(),
    weight: float("weight").notNull(),
    quarterOverQuarterShareChange: int("quarter_over_quarter_share_change"),
    quarterOverQuarterWeightChange: float("quarter_over_quarter_weight_change"),
    averageSkillQuartile: tinyint("average_skill_quartile"),
    crowdingQuartile: tinyint("crowding_quartile"),
    quarterFirstOwned: mysqlEnum("quarter_first_owned", [
      "1",
      "2",
      "3",
      "4",
    ]).notNull(),
    yearFirstOwned: tinyint("year_first_owned").notNull(),
    currentHoldingPeriodInQuarters: tinyint(
      "current_holding_period_in_quarters",
    ).notNull(),
  },
  (table) => ({
    pk: primaryKey(
      table.fundId,
      table.year,
      table.quarter,
      table.componentSecurityId,
    ),
  }),
);
export type FundQuarterlyWeight = typeof fundQuarterlyWeights.$inferSelect;

export const fundGroupQuarterlyWeights = mysqlTable(
  "fund_group_quarterly_weights",
  {
    fundId: varchar("fund_id", { length: 12 }).notNull(),
    quarter: mysqlEnum("quarter", ["1", "2", "3", "4"]).notNull(),
    year: smallint("year").notNull(),
    componentFundId: varchar("component_fund_id", {
      length: 12,
    }).notNull(),

    reportedValue: double("reported_value"),
    quarterOverQuarterValueChange: double("quarter_over_quarter_value_change"),
    simulatedQuarterToDatePerformance: float(
      "simulated_quarter_to_date_performance",
    ),
    weight: float("weight").notNull(),
    topPositionSecurityId: varchar("top_position_security_id", { length: 12 }),
    biggestEntrySecurityId: varchar("biggest_entry_security_id", {
      length: 12,
    }),
    biggestExitSecurityId: varchar("biggest_exit_security_id", { length: 12 }),
    biggestAddSecurityId: varchar("biggest_add_security_id", { length: 12 }),
    biggestTrimSecurityId: varchar("biggest_trim_security_id", { length: 12 }),
  },
  (table) => ({
    pk: primaryKey(
      table.fundId,
      table.year,
      table.quarter,
      table.componentFundId,
    ),
  }),
);
export type FundGroupQuarterlyWeight =
  typeof fundGroupQuarterlyWeights.$inferSelect;
