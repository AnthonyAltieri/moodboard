import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
import path from "path";

const dotenvPath = path.join(__dirname, ".env");
console.log("before dotenv", dotenvPath);
dotenv.config({ path: dotenvPath, override: true });
console.log("after dotenv");
console.log({
  DATABASE_URL: process.env.DATABASE_URL,
});

// import { env } from "./src/env.mjs";

export default {
  out: "./migrations",
  schema: "./src/features/schema.ts",
  breakpoints: false,
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
