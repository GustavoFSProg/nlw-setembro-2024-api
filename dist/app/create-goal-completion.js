"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _db = require('../db');
var _schema = require('../db/schema');
var _dayjs = require('dayjs'); var _dayjs2 = _interopRequireDefault(_dayjs);
var _weekOfYear = require('dayjs/plugin/weekOfYear'); var _weekOfYear2 = _interopRequireDefault(_weekOfYear);
var _drizzleorm = require('drizzle-orm');

_dayjs2.default.extend(_weekOfYear2.default)





 async function createGoalCompletion({
  goalId,
}) {
  const currentYear = _dayjs2.default.call(void 0, ).year()
  const currentWeek = _dayjs2.default.call(void 0, ).week()

  const goalCompletionCounts = _db.db.$with('goal_completion_counts').as(
    _db.db
      .select({
        goalId: _schema.goalCompletions.goalId,
        completionCount: _drizzleorm.sql`COUNT(${_schema.goalCompletions.id})`.as(
          'completionCount'
        ),
      })
      .from(_schema.goalCompletions)
      .where(
        _drizzleorm.and.call(void 0, 
          _drizzleorm.eq.call(void 0, _schema.goalCompletions.goalId, goalId),
          _drizzleorm.sql`EXTRACT(YEAR FROM ${_schema.goalCompletions.createdAt}) = ${currentYear}`,
          _drizzleorm.sql`EXTRACT(WEEK FROM ${_schema.goalCompletions.createdAt}) = ${currentWeek}`
        )
      )
      .groupBy(_schema.goalCompletions.goalId)
  )

  const result = await _db.db
    .with(goalCompletionCounts)
    .select({
      isIncomplete: _drizzleorm.sql /*sql*/`
        COALESCE(${_schema.goals.desiredWeeklyFrequency}, 0) > COALESCE(${goalCompletionCounts.completionCount}, 0)
      `,
    })
    .from(_schema.goals)
    .leftJoin(goalCompletionCounts, _drizzleorm.eq.call(void 0, _schema.goals.id, goalCompletionCounts.goalId))
    .where(_drizzleorm.eq.call(void 0, _schema.goals.id, goalId))
    .limit(1)

  const { isIncomplete } = result[0]

  if (!isIncomplete) {
    throw new Error('Goal already completed this week!')
  }

  const [goalCompletion] = await _db.db
    .insert(_schema.goalCompletions)
    .values({
      goalId,
    })
    .returning()

  return {
    goalCompletion,
  }
} exports.createGoalCompletion = createGoalCompletion;
