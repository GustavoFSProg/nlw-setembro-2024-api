"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _pgcore = require('drizzle-orm/pg-core');

var _cuid2 = require('@paralleldrive/cuid2');


 const goals = _pgcore.pgTable.call(void 0, 'goals', {
  id: _pgcore.text.call(void 0, 'id')
    .primaryKey()
    .$defaultFn(() => _cuid2.createId.call(void 0, )),
  title: _pgcore.text.call(void 0, 'title').notNull(),
  desiredWeeklyFrequency: _pgcore.integer.call(void 0, 'desired_weekly_frequency').notNull(),
  createdAt: _pgcore.timestamp.call(void 0, 'created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
}); exports.goals = goals
