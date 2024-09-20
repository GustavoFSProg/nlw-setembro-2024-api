"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _pgcore = require('drizzle-orm/pg-core');

var _cuid2 = require('@paralleldrive/cuid2');
var _goals = require('./goals');

 const goalCompletions = _pgcore.pgTable.call(void 0, 'goal_completions', {
  id: _pgcore.text.call(void 0, 'id')
    .primaryKey()
    .$defaultFn(() => _cuid2.createId.call(void 0, )),
  goalId: _pgcore.text.call(void 0, 'goal_id')
    .references(() => _goals.goals.id)
    .notNull(),
  createdAt: _pgcore.timestamp.call(void 0, 'created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
}); exports.goalCompletions = goalCompletions
