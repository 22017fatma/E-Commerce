import dotenv from "dotenv";
dotenv.config({
  path: `${process.cwd()}/.env.dev`,
});
import {
  drizzle,
  MySql2Database,
  MySql2DrizzleConfig,
} from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { schema,users } from "../models/schema";
import { faker } from "@faker-js/faker";

// import { CustomError } from "../middlewares/CustomError";


dotenv.config();


     //User Table
export async function seedUser(count = 10) {
  const usersArray = Array.from({ length: count }).map(() => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
  }));
  await db.insert(users).values(usersArray);
  console.log("Users done");
}

const missingVars = [];

if (!process.env.DB_HOST) missingVars.push("DB_HOST");
if (!process.env.DB_USER) missingVars.push("DB_USER");
if (!process.env.DB_NAME) missingVars.push("DB_NAME");

if (missingVars.length > 0) {
  console.error("Missing environment variables:", missingVars.join(", "));
  throw new Error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
}

function createTimedPool(config: mysql.PoolOptions) {
  const basePool = mysql.createPool(config);

  const wrap = (fn: any) => async (sql: string, params?: any) => {
    const start = Date.now();
    try {
      const result = await fn.call(basePool, sql, params);
      const duration = Date.now() - start;

      if (duration > 500) {
        console.warn(`Slow query (${duration}ms):`, sql, params);
      } else {
        console.log(` Query in ${duration}ms`);
      }

      return result;
    } catch (err) {
      console.error("Query failed:", sql, err);
      throw err;
    }
  };

  (basePool as any).query = wrap(basePool.query);
  (basePool as any).execute = wrap(basePool.execute);

  return basePool;
}

const pool = createTimedPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});
const _getConnection = pool.getConnection.bind(pool);

pool.getConnection = async function patchedGetConnection() {
  const start = Date.now();
  const conn = await _getConnection();
  const wait = Date.now() - start;

  if (wait > 50) {
    console.warn(`⚠️ Took ${wait}ms to acquire a DB connection from pool`);
  }

  return conn;
};
const config: MySql2DrizzleConfig<typeof schema> = {
  schema,
  mode: "default", // Local MySQL / hosted MySQL
};

export const db: MySql2Database<typeof schema> = drizzle(pool, config);

export async function connectDB(): Promise<void> {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL");
    connection.release();
  } catch (err) {
    console.error("Failed to connect to MySQL:", err);
    throw new Error("Database connection failed");
  }
}

export async function closeDB(): Promise<void> {
  await pool.end();
  console.log("MySQL pool closed");
}

