import path from 'path'
import Koa from 'koa'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'
import routing from './routers' // 路由
import { errorHandle } from './middlewares' // 自定义中间件
import { port } from './config' // 全局配置
import logger from './utils/winston' // 日志工具

// 保存项目根目录
global.rootPath = __dirname

const app = new Koa()

app
  // 错误处理中间件
  .use(errorHandle)
  // 解析post
  .use(bodyParser())
  // 静态资源
  .use(serve(path.join(__dirname)))

// 路由
routing(app)

// Start
app.listen(port, () => logger.info(`服务已启动 http://localhost:${port}/`))