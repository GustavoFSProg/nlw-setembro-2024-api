import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import dotenv from 'dotenv'
import { string } from 'zod'
import { createGoalRoute } from './src/http/routes/create-goal'
import { createGoalCompletionRoute } from './src/http/routes/create-goal-completion'
import { getWeekSummaryRoute } from './src/http/routes/get-week-summary'
import { getWeekPendingGoalsRoute } from './src/http/routes/get-week-pending-goals'
import { viewGoals } from './src/http/routes/get-goals'

dotenv.config()

const app = fastify().withTypeProvider<ZodTypeProvider>()

const { PORT } = process.env

// console.log(DATABASE_URL)

app.register(fastifyCors, { origin: '*' })

app.get('/', (request, response) => {
  return response.status(200).send({ msg: 'Api Running Fine!!' })
})
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getWeekSummaryRoute)
app.register(getWeekPendingGoalsRoute)
app.register(viewGoals)

app.listen(PORT as string).then(() => {
  console.log(`💪 HTTP server running!: ${PORT}`)
})

export default app
