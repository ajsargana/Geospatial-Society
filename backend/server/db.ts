import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@shared/schema";

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});

// Create Drizzle database instance
export const db = drizzle(pool, { schema });

// Test the connection
pool.on("connect", () => {
  console.log("[Database] Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("[Database] Unexpected error on idle client", err);
  process.exit(-1);
});
