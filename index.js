'use strict'

require('dotenv').config()

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 5000
const src = env === 'production' ? './build/server' : './src/server'

require('babel-polyfill')
if (env === 'development') {
  // for development use babel/register for faster runtime compilation
  require('babel-register')
} else {
  process.env.DB_LOGGING = false
  process.env.JWT_SECRET = 'akvpwijwoijf'
  process.env.API_PREFIX = '/api'
  process.env.API_PERPAGE = 25
}

const app = require(src).default
app.listen(port)
console.log('Environment: ', env)
console.log('Server is listening @ port ' + port)
