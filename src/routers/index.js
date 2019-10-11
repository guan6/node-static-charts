import routesLoader from '../utils/routesLoader'

/**
 * 
 * @param {*} app Koa app 实例
 */
export default function (app) {
  routesLoader(`${__dirname}`).then(files => {
    files.forEach(route => {
      app.use(route.routes()).use(
        route.allowedMethods({
          throw: true
        })
      )
    })
  })
}