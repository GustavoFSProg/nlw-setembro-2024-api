"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _creategoal = require('../../functions/create-goal');
// import { getGoals } from '../../app/create-goal'

 const viewGoals = async app => {
  app.get('/get-goals', async (request, response) => {
    const { result } = await _creategoal.getGoals.call(void 0, )
    return response.status(201).send({ msg: result })
  })
}; exports.viewGoals = viewGoals
