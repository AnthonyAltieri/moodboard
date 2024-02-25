import { connect } from "@planetscale/database";
import process from "process";
import dotenv from "dotenv";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";

dotenv.config({ debug: true });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.log("ERROR: Missing DATABASE_URL environment variable")
  process.exit(1)
}

// ts-node doesn't like .mjs files so we have to make the db here
const connection = connect({ url: DATABASE_URL });
const db = drizzle(connection);


const main = async () => {
  await wipe()
};

const wipe = async () => {
  const {rows} = await db.execute(sql.raw(`SHOW TABLES`)) 
  for (const obj of rows) {
    const table = Object.values(obj)[0]; 
    await db.execute(sql.raw(`truncate table ${table}`))
    console.log(`truncated ${table}`);
  }
  
  console.log("");
  console.log("done");
};


void main().then(() => process.exit(0)).catch(() => process.exit(1))
