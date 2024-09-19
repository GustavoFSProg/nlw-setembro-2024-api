"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _drizzleorm = require('drizzle-orm');
var _db = require('../db');
var _schema = require('../db/schema');
var _dayjs = require('dayjs'); var _dayjs2 = _interopRequireDefault(_dayjs);

 async function getWeekSummary() {
  const firstDayOfWeek = _dayjs2.default.call(void 0, ).startOf('week').toDate()
  const lastDayOfWeek = _dayjs2.default.call(void 0, ).endOf('week').toDate()

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

  const goalsCompletedInWeek = _db.db.$with('goals_completed_in_week').as(
    _db.db
      .select({
        id: _schema.goalCompletions.id,
        title: _schema.goals.title,
        completedAt: _schema.goalCompletions.createdAt,
        completedAtDate: _drizzleorm.sql /*sql*/`
          DATE(${_schema.goalCompletions.createdAt})
        `.as('completedAtDate'),
      })
      .from(_schema.goalCompletions)
      .innerJoin(_schema.goals, _drizzleorm.eq.call(void 0, _schema.goals.id, _schema.goalCompletions.goalId))
      .where(
        _drizzleorm.and.call(void 0, 
          _drizzleorm.gte.call(void 0, _schema.goalCompletions.createdAt, firstDayOfWeek),
          _drizzleorm.lte.call(void 0, _schema.goalCompletions.createdAt, lastDayOfWeek)
        )
      )
      .orderBy(_drizzleorm.desc.call(void 0, _schema.goalCompletions.createdAt))
  )

  const goalsCompletedByWeekDay = _db.db.$with('goals_completed_by_week_day').as(
    _db.db
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: _drizzleorm.sql /*sql*/`
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', ${goalsCompletedInWeek.id},
              'title', ${goalsCompletedInWeek.title},
              'completedAt', ${goalsCompletedInWeek.completedAt}
            )
          )
        `.as('completions'),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
      .orderBy(_drizzleorm.desc.call(void 0, goalsCompletedInWeek.completedAtDate))
  )

  








  const result = await _db.db
    .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
    .select({
      completed:
        _drizzleorm.sql /*sql*/`(SELECT COUNT(*) FROM ${goalsCompletedInWeek})`.mapWith(
          Number
        ),
      total:
        _drizzleorm.sql /*sql*/`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
          Number
        ),
      goalsPerDay: _drizzleorm.sql /*sql*/`
        JSON_OBJECT_AGG(
          ${goalsCompletedByWeekDay.completedAtDate},
          ${goalsCompletedByWeekDay.completions}
        )
      `,
    })
    .from(goalsCompletedByWeekDay)

  return {
    summary: result[0],
  }
} exports.getWeekSummary = getWeekSummary;