import * as Koa from 'koa'

export default async function (ctx: Koa.Context, next: () => Promise<any>) {
  if (ctx.session === null || ctx.session.user) {
    console.log("用户已登录：", ctx.session.user)
    if ("admin" === ctx.session.userInfo.privilege) {
      await next()
    } else {
      // return ctx.body = { code: -2, message: "no privilege" }
      ctx.throw("no admin privilege", 403)
    }
  } else {
    console.error("用户未登录")
    ctx.throw("Please Login First", 403)
  }

}