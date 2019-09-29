import * as Koa from 'koa'

export default async function (ctx: Koa.Context, next: () => Promise<any>) {
  if (ctx.session === null || ctx.session.user) {
    if (["admin", "write"].indexOf(ctx.session.userInfo.privilege) > -1) {
      await next()
    } else {
      // return ctx.body = { code: -2, message: "no write privilege" }
      ctx.throw("no write privilege", 403)
    }
  } else {
    console.error("用户未登录")
    ctx.throw("Please Login First", 403)
  }

}