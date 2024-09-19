"use strict";Object.defineProperty(exports, "__esModule", {value: true});// import { getWeekSummary } from '@/app/functions/get-week-summary'

var _getweeksummary = require('../../app/get-week-summary');

 const getWeekSummaryRoute = async app => {
  app.get('/summary', {}, async () => {
    const { summary } = await _getweeksummary.getWeekSummary.call(void 0, )

    return { summary }
  })
}; exports.getWeekSummaryRoute = getWeekSummaryRoute
