import redis from 'redis'
import { redisConf } from '../config' // 全局配置
import logger from './winston'

// 连接数据库
const dbClient = redis.createClient(redisConf.port, redisConf.host, redisConf.option)

dbClient.on('error', err => {
  logger.debug(`db_error: ${err}`)
})

export default dbClient