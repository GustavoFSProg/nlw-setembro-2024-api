"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dayjs = require('dayjs'); var _dayjs2 = _interopRequireDefault(_dayjs);
var _db = require('../db');
var _schema = require('../db/schema');
var _drizzleorm = require('drizzle-orm');

 async function getWeekPendingGoals() {
  const firstDayOfWeek = _dayjs2.default.call(void 0, ).startOf('week').toDate()
  const lastDayOfWeek = _dayjs2.default.call(void 0, ).endOf('week').toDate()

  console.log(lastDayOfWeek.toISOString())

  const goalsCreatedUpToWeek = _db.db.$with('goals_created_up_to_week').as(
    _db.db
      .select({
        id: _schema.goals.id,
        title: _schema.goals.title,
        desiredWeeklyFrequency: _schema.goals.desiredWeeklyFrequency,
        createdAt: _schema.goals.createdAt,
      })
      .from(_schema.goals)
      .where(_drizzleorm.lte.call(void 0, _schema.goals.createdAt, lastDayOfWeek))
  )

  const goalCompletionCounts = _db.db.$with('goal_completion_counts').as(
    _db.db
      .select({
        goalId: _schema.goalCompletions.goalId,
        completionCount: _drizzleorm.count.call(void 0, _schema.goalCompletions.id).as('completionCount'),
      })
      .from(_schema.goalCompletions)
      .where(
        _drizzleorm.and.call(void 0, 
          _drizzleorm.gte.call(void 0, _schema.goalCompletions.createdAt, firstDayOfWeek),
          _drizzleorm.lte.call(void 0, _schema.goalCompletions.createdAt, lastDayOfWeek)
        )
      )
      .groupBy(_schema.goalCompletions.goalId)
  )

  const pendingGoals = await _db.db
    .with(goalsCreatedUpToWeek, goalCompletionCounts)
    .select({
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      createdAt: goalsCreatedUpToWeek.createdAt,
      desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
      completionCount: _drizzleorm.sql /*sql*/`
        COALESCE(${goalCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(
      goalCompletionCounts,
      _drizzleorm.eq.call(void 0, goalCompletionCounts.goalId, goalsCreatedUpToWeek.id)
    )

  return { pendingGoals }
} exports.getWeekPendingGoals = getWeekPendingGoals;
