import { env } from '../env'
// import { drizzle } from 'drizzle-orm/postgres-js'
// import { drizzle } from 'drizzle-orm/bun-sqlite'
// import postgres from 'postgres'
import * as schema from './schema'

import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite)

// const { DATABASE_SQLITE } = process.env

// export const client = postgres(DATABASE_SQLITE as string)
// export const db = drizzle(client, { schema })
