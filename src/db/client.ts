import { env } from '@/config/env.config.js'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
export const db = drizzle(env.DATABASE_URL)
export type DBExecutor = NodePgDatabase
