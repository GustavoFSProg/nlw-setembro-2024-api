import fastify from 'fastify'
import { createGoal, getGoals } from '../functions/create-goal'
import z from 'zod'

const app = fastify()

const { PORT } = process.env

app.post('/goals', async (request, response) => {
  const createGoalSchema = z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
  })

  const body = createGoalSchema.parse(request.body)

  const { goal } = await createGoal({
    title: body.title,
    desiredWeeklyFrequency: body.desiredWeeklyFrequency,
  })
  return response.status(201).send({ msg: goal })
})

app.get('/get-goals', async (request, response) => {
  const { result } = await getGoals()
  return response.status(201).send({ msg: result })
})

app.listen({ port: String(`${PORT}`) }).then(() => {
  console.log(` 💪 Server Running: ${PORT}!!`)
})

export default app
