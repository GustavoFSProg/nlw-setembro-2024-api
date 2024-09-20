import { env } from './src/env'
import { defineConfig } from 'drizzle-kit'

const { DATABASE_URL } = process.env

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './.migrations',
  dbCredentials: {
    url: DATABASE_URL,
  },
  dialect: 'postgresql',
})
