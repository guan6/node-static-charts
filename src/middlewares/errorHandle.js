import logger from '../utils/winston'

/**
 * 错误处理
 */
export default (ctx, next) => {
  // 客户端IP
  const ip = ctx.request.headers['x-real-ip'] || ctx.request.headers['x-forwarded-for'] || ctx.ip

  return next().then(() => {
    // 记录访问日志
    logger.info(`${ctx.status} - ${ctx.method} - ${ctx.originalUrl} - ${ctx.request.headers['user-agent']} - ${ip}`)
  }).catch((err) => {
    ctx.response.status = err.statusCode || err.status || 500
    // 记录错误日志
    logger.error(`${ctx.response.status} - ${ctx.method} - ${ctx.originalUrl} - ${err.message} - ${ip}`)

    console.log(err)

    ctx.response.body = `message: ${err.message}`
  })
}