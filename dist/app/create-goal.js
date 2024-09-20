"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _db = require('../db');
var _schema = require('../db/schema');






 async function createGoal({
  title,
  desiredWeeklyFrequency,
}) {
  const [goal] = await _db.db
    .insert(_schema.goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  return { goal }
} exports.createGoal = createGoal;
