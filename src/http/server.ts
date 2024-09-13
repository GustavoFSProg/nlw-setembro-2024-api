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

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: '*' })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

const { PORT } = process.env

app.post(
  '/goals',
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async (request, response) => {
    const { title, desiredWeeklyFrequency } = request.body

    const { goal } = await createGoal({
      title,
      desiredWeeklyFrequency,
    })
    return response.status(201).send({ msg: goal })
  }
)

app.get('/get-goals', async (request, response) => {
  const { result } = await getGoals()
  return response.status(201).send({ msg: result })
})

app.get('/pending-goals', async () => {
  const { pendingGoals } = await getWeekPendingGoals()

  return { pendingGoals }
})

app.listen({ port: String(`${PORT}`) }).then(() => {
  console.log(` 💪 Server Running: ${PORT}!!`)
})

export default app
