import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as path from 'path'
import { boot } from './core/boot'

const app = new Koa()
const router = new Router()

// initialized global

boot(router)

// core.resolveRoutes(path.resolve(__dirname, './controller/index/index.ts')).then(_r => router.use('', _r.routes()))


// router.get('/*', async (ctx: Koa.Context) => {
//   ctx.body = "Hello World!"
// })


app.use(router.routes())

app.listen(3000);

console.log("Server Running On Port 3000")


