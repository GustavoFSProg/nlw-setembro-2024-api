"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _db = require('../db');
var _schema = require('../db/schema');






 async function createGoal({
  title,
  desiredWeeklyFrequency,
}) {
  const result = await _db.db
    .insert(_schema.goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
} exports.createGoal = createGoal;

 async function getGoals() {
  const result = await _db.db.select().from(_schema.goals)

  return {
    result,
  }
} exports.getGoals = getGoals;

// export default { createGoal, getGoals }
