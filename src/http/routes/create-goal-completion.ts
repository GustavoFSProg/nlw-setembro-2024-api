// import { createGoalCompletion } from '@/app/functions/create-goal-completion'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createGoalCompletion } from '../../functions/create-goal-completion'

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async (request, response) => {
      const { goalId } = request.body

      const result = await createGoalCompletion({
        goalId,
      })
      return response.status(201).send({ msg: result })
    }
  )
}
