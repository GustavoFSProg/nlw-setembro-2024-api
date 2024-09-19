"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _zod = require('zod');

const envSchema = _zod.z.object({
  DATABASE_URL: _zod.z.string().url(),
})

 const env = envSchema.parse(process.env.DATABASE_URL); exports.env = env
