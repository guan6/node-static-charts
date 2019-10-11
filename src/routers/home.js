import Router from 'koa-router'
import { version } from '../config'

const router = new Router()

router.get('home', '/', (ctx, next) => {
  ctx.body = `
    <h3>测试</h3>
    <ul>
      <li>
        <a href="${version}/demo?c=demo">查看演示</a>
      </li>
    </ul>
  `
})

export default router