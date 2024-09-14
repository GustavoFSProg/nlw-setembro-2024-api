import fastify from 'fastify'
import { createGoal, getGoals } from '../functions/create-goal'
import z from 'zod'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import fastifyCors from '@fastify/cors'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'
import { createGoalCompletion } from '../functions/create-goal-completion'
import { createGoalRoute } from './routes/create-goal'
import { createGoalCompletionRoute } from './routes/create-goal-completion'
import { getWeekPendingGoalsRoute } from './routes/get-week-pending-goals'
import { viewGoals } from './routes/get-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: '*' })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

const { PORT } = process.env

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getWeekPendingGoalsRoute)
app.register(viewGoals)
app.register(getWeekSummaryRoute)

// app.get('/get-goals', async (request, response) => {
//   const { result } = await getGoals()
//   return response.status(201).send({ msg: result })
// })

app.listen({ port: String(`${PORT}`) }).then(() => {
  console.log(` 💪 Server Running: ${PORT}!!`)
})

export default app
