"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _fastify = require('fastify'); var _fastify2 = _interopRequireDefault(_fastify);
var _cors = require('@fastify/cors'); var _cors2 = _interopRequireDefault(_cors);




var _fastifytypeproviderzod = require('fastify-type-provider-zod');
var _creategoal = require('./http/routes/create-goal');
var _creategoalcompletion = require('./http/routes/create-goal-completion');
var _getweeksummary = require('./http/routes/get-week-summary');
var _getweekpendinggoals = require('./http/routes/get-week-pending-goals');
var _getgoals = require('./http/routes/get-goals');
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2.default.config()

const app = _fastify2.default.call(void 0, ).withTypeProvider()

const { PORT } = process.env

app.register(_cors2.default, { origin: '*' })

app.get('/', (request, response) => {
  return response.status(200).send({ msg: 'Api Running Fine!!' })
})
app.setValidatorCompiler(_fastifytypeproviderzod.validatorCompiler)
app.setSerializerCompiler(_fastifytypeproviderzod.serializerCompiler)

app.register(_creategoal.createGoalRoute)
app.register(_creategoalcompletion.createGoalCompletionRoute)
app.register(_getweeksummary.getWeekSummaryRoute)
app.register(_getweekpendinggoals.getWeekPendingGoalsRoute)
app.register(_getgoals.viewGoals)

app.listen({ port: PORT }).then(() => {
  console.log(`💪 HTTP server running!: ${PORT}`)
})

exports. default = app
