import path from 'path'
import fs from 'fs'
import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'

const { combine, colorize, timestamp, printf } = format

/**
 * 日志目录
 */
const logDir = `${path.resolve('./')}/logs`

/**
 * 是否需要创建日志目录
 */
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

/**
 * winston 实例
 */
const logger = createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss' // 时间格式
    })
  ),
  /**
   * 定义输出
   */
  transports: [
    // console 输出
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      format: combine(
        colorize(), // 有色输出
        printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    // 按天输出到文件
    new transports.DailyRotateFile({
      level: 'info',
      format: combine(
        printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      filename: `${logDir}/%DATE%-results.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: '7d' //最多保留天的日志
    })
  ]
})

export default logger