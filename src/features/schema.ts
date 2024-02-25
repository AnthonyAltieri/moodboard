import {
  date,
  mysqlEnum,
  mysqlTable,
  text,
  varchar,
  primaryKey,
  index,
  datetime,
} from "drizzle-orm/mysql-core";

export const boardSchema = mysqlTable("board", {
  id: varchar("id", { length: 12 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: datetime("created_at").notNull(),
});
export type Board = typeof boardSchema.$inferSelect;

export const assetSchema = mysqlTable("asset", {
  id: varchar("id", { length: 12 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["text", "image", "video"]),
  location: mysqlEnum("location", ["s3"]),
  locationId: varchar("location_id", { length: 12 }),
  createdAt: date("created_at").notNull(),
})
export type Asset = typeof assetSchema.$inferSelect;

export const locationS3Schema = mysqlTable("location_s3", {
  id: varchar("id", { length: 12 }).primaryKey(),
  // max length of key is 1024 characters (bytes): https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-keys.html
  key: varchar("key", { length: 1024 }).notNull(),
  // max length of bucket is 63 characters: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
  bucket: varchar("bucket", { length: 63 }).notNull()
})
export type LocationS3 = typeof locationS3Schema.$inferSelect;

export const boardAssetSchema = mysqlTable("board_asset", {
  boardId: varchar("board_id", { length: 12 }),
  assetId: varchar("asset_id", { length: 12 }),
}, (table) => {
  return {
    pk: primaryKey(table.boardId, table.assetId),
    ixAssetId: index("ix_board_asset_asset_id").on(table.assetId),
  }
})
export type BoardAsset = typeof boardAssetSchema.$inferSelect;

export const userBoardSchema = mysqlTable("user_board", {
  // I've only seen 32 length ids, we'll increase it if we have to 
  clerkUserId: varchar("clerk_user_id", { length: 32 }),
  boardId: varchar("board_id", { length: 12 }),
  role: mysqlEnum("role", ["owner", "edit", "read"])
}, (table) => {
  return {
    pk: primaryKey(table.clerkUserId, table.boardId),
  }
})
export type UserBoard = typeof userBoardSchema.$inferSelect;
