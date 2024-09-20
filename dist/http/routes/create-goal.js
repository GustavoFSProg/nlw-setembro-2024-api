"use strict";Object.defineProperty(exports, "__esModule", {value: true});// import { createGoal } from '@/app/functions/create-goal'

var _zod = require('zod');
var _creategoal = require('../../app/create-goal');

 const createGoalRoute = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: _zod.z.object({
          title: _zod.z.string(),
          desiredWeeklyFrequency: _zod.z.number().int().min(1).max(7),
        }),
      },
    },
    async request => {
      const { title, desiredWeeklyFrequency } = request.body

      const { goal } = await _creategoal.createGoal.call(void 0, {
        title,
        desiredWeeklyFrequency,
      })

      return { goalId: goal.id }
    }
  )
}; exports.createGoalRoute = createGoalRoute
