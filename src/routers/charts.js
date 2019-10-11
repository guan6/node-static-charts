import Router from 'koa-router'
import { version } from '../config'
// 所有utils相关控制器中间件
import bus from '../controllers/bus'

const router = new Router({
  prefix: `/${version}`
})

// demo
router.get('demo', '/demo', bus)

// 添加其他图表
// router.get('other', '/other', bus)

export default router