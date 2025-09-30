import { sql } from "drizzle-orm";
import { db } from "../../db/client";

const DB_NAME = "e_commerce";

export async function dropAndRecreateDB() {
  try {
    console.log(`Dropping and recreating database: ${DB_NAME}...`);

    await db.execute(sql.raw(`DROP DATABASE IF EXISTS \`${DB_NAME}\`;`));
    await db.execute(sql.raw(`CREATE DATABASE \`${DB_NAME}\`;`));

    console.log("Database recreated.");

    process.exit(0);
  } catch (error) {
    console.error("Failed to reset DB:", error);
    process.exit(1);
  }
}

dropAndRecreateDB();
