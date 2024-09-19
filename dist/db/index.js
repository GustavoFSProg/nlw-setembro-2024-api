"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _postgresjs = require('drizzle-orm/postgres-js');
var _postgres = require('postgres'); var _postgres2 = _interopRequireDefault(_postgres);
var _schema = require('./schema'); var schema = _interopRequireWildcard(_schema);

const { DATABASE_URL } = process.env

console.log(DATABASE_URL)

 const client = _postgres2.default.call(void 0, DATABASE_URL); exports.client = client
 const db = _postgresjs.drizzle.call(void 0, exports.client, { schema }); exports.db = db
