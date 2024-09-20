"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _zod = require('zod');
var _creategoalcompletion = require('../../app/create-goal-completion');

 const createGoalCompletionRoute = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: _zod.z.object({
          goalId: _zod.z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body

      const { goalCompletion } = await _creategoalcompletion.createGoalCompletion.call(void 0, {
        goalId,
      })

      return { goalCompletionId: goalCompletion.id }
    }
  )
}; exports.createGoalCompletionRoute = createGoalCompletionRoute
