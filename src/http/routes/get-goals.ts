import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getGoals } from '../../functions/create-goal'
// import { getGoals } from '../../app/create-goal'

export const viewGoals: FastifyPluginAsyncZod = async app => {
  app.get('/get-goals', async (request, response) => {
    const { result } = await getGoals()
    return response.status(201).send({ msg: result })
  })
}
