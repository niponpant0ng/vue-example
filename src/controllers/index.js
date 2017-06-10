import fs from 'fs'
import path from 'path'
import KoaRouter from 'koa-router'
import jwt from 'koa-jwt'

const routeConfigs = fs.readdirSync(__dirname)
  .reduce((current, next) => {
    if (next.indexOf('.route') !== -1 && (next.indexOf('.') !== 0) && (next !== 'index.js')) {
      let config = require(path.join(__dirname, next)).default
      let configName = next.split('.')[0]

      current[configName] = config
    }
    return current
  }, {})

let routerObject = new KoaRouter()
routerObject.options('*', function () {})

for (let key in routeConfigs) {
  let routeConfig = routeConfigs[key]
  let routes = routeConfig.routes
  let controller = routeConfig.controller

  if (!routeConfig) {
    continue
  }

  routes.forEach((route) => {
    let middlewares = []
    middlewares.push(controller[route.handler])
    routerObject[route.method.toLowerCase()](route.url, ...middlewares)
  })
}

// console.log('wat')
routerObject['get']('/test', function (ctx) {
  ctx.body = 'ok'
})

console.log(JSON.stringify(routerObject, null, 2))

export default routerObject
