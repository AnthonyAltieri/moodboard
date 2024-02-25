import { faker } from "@faker-js/faker";
import { connect } from "@planetscale/database";
import process from "process";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { nanoid } from "nanoid";
import {
  assetSchema,
  boardSchema,
  locationS3Schema,
  type Asset,
  type Board,
  type LocationS3,
  userBoardSchema,
  boardAssetSchema
} from "~/features/schema";

dotenv.config({ debug: true });

const DATABASE_URL = process.env.DATABASE_URL;
const CLERK_SEED_USER_ID = process.env.CLERK_SEED_USER_ID;

if (!DATABASE_URL) {
  console.log("ERROR: Missing DATABASE_URL environment variable")
  process.exit(1)
}
if (!CLERK_SEED_USER_ID) {
  console.log("ERROR: Missing CLERK_ID_SEED_USER environment variable")
  process.exit(1)
}

// ts-node doesn't like .mjs files so we have to make the db here
const connection = connect({ url: DATABASE_URL });
const db = drizzle(connection);


const main = async () => {
  console.log(`seeding with user_id=${CLERK_SEED_USER_ID}`);
  await seed();
};

const fakerBoard = (overrides: Partial<Board> = {}): Board => {
  return {
    id: nanoid(12),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    createdAt: faker.date.past(),
    ...overrides,
  }
}

const fakerLocationS3 = (overrides: Partial<LocationS3> = {}): LocationS3 => {
  return {
    id: nanoid(12),
    key: faker.string.uuid(),
    bucket: faker.string.uuid(),
    ...overrides,
  }
}

const fakerAsset = (overrides: Partial<Asset> = {}): Asset => {
  return {
    id: nanoid(12),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    location: "s3",
    locationId: nanoid(12),
    category: faker.helpers.arrayElement(["image" as const, "text" as const, "video" as const]),
    createdAt: faker.date.past(),
    ...overrides,
  }
}

const seed = async () => {
  const boards: Board[] = [
    fakerBoard(),
    fakerBoard(),
    fakerBoard(),
    fakerBoard(),
    fakerBoard(),
  ]
  console.log(`created ${boards.length} boards`)

  let has0AssetBoard = false;
  for (const board of boards) {
    await db.insert(boardSchema).values(board)
    await db.insert(userBoardSchema).values({ clerkUserId: CLERK_SEED_USER_ID, boardId: board.id })

    // Seed Assets
    // ensure that there is one 0 asset board for testing purposes
    const N = has0AssetBoard ? faker.number.int({ min: 1, max: 5 }) : 0;
    for (let i = 0; i < N; i++) {
      const location = fakerLocationS3();
      const asset = fakerAsset({ locationId: location.id });
      await db.insert(locationS3Schema).values(location)
      await db.insert(assetSchema).values(asset)
      await db.insert(boardAssetSchema).values({ boardId: board.id, assetId: asset.id });
    }
    if (!has0AssetBoard) {
      has0AssetBoard = true;
    }


    console.log(`created ${N} assets for board ${board.id}`)
  }

  console.log("");
  console.log("done");
};


void main().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1)
})
