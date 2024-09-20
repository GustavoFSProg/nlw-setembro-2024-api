"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _getweekpendinggoals = require('../../app/get-week-pending-goals');


 const getWeekPendingGoalsRoute = async app => {
  app.get('/pending-goals', {}, async () => {
    const { pendingGoals } = await _getweekpendinggoals.getWeekPendingGoals.call(void 0, )

    return { pendingGoals }
  })
}; exports.getWeekPendingGoalsRoute = getWeekPendingGoalsRoute
