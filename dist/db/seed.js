"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _db = require('../db');
var _schema = require('./schema');
var _faker = require('@faker-js/faker');
var _goalcompletions = require('./schema/goal-completions');
var _dayjs = require('dayjs'); var _dayjs2 = _interopRequireDefault(_dayjs);

async function seed() {
  await _db.db.delete(_goalcompletions.goalCompletions)
  await _db.db.delete(_schema.goals)

  const [goal1, goal2] = await _db.db
    .insert(_schema.goals)
    .values([
      {
        title: _faker.fakerPT_BR.lorem.words(3),
        desiredWeeklyFrequency: 1,
      },
      {
        title: _faker.fakerPT_BR.lorem.words(3),
        desiredWeeklyFrequency: 2,
      },
      {
        title: _faker.fakerPT_BR.lorem.words(3),
        desiredWeeklyFrequency: 1,
      },
    ])
    .returning()

  const startOfWeek = _dayjs2.default.call(void 0, ).startOf('week')

  await _db.db.insert(_goalcompletions.goalCompletions).values([
    { goalId: goal1.id, createdAt: startOfWeek.toDate() },
    { goalId: goal2.id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().then(() => {
  console.log('🌱 Database seeded successfully!')
  _db.client.end()
})
