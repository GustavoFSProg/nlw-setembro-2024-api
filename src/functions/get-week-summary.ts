// import { db } from '@/db'
// import { goalCompletions, goals } from '@/db/schema'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { and, desc, eq, sql } from 'drizzle-orm'

dayjs.extend(weekOfYear)

export async function getWeekSummary() {
  const summary = 'Teste - Summary'

  return { summary }
}
