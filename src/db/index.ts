import { env } from '../env'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const { DATABASE_URL } = process.env

export const client = postgres(DATABASE_URL as string)
export const db = drizzle(client, { schema })
