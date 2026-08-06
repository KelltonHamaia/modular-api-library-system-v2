import { env } from '@/config/env.config.js'
import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle(env.DATABASE_URL)
export type DBExecutor = typeof db
