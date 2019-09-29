/**
   This is Account router
 */
import * as Koa from 'koa'
import 'koa-body'
import { GET, POST, MIDDLEWARE } from '../../core/decorators'
import { BaseRouter, MiddleWare } from '../../core/types'
import AccountService from '../../services/account_service'

class Account implements BaseRouter {
  prefix: string = '/api/account'

  public classMiddlewares(): Array<MiddleWare | string> {
    return []
  }

  @POST('/login')
  public login (ctx: Koa.Context) {
    console.log("ctx: ", ctx.request.body)

    let userName: string = ctx.request.body.userName
    let passwd: string = ctx.request.body.passwd
    console.log("account: ", account)
    
    // ctx.set('Access-Control-Allow-Origin', '*')
    
    if (!AccountService.validAccount(userName, passwd)) {
      console.log("账号或者密码不对")
      ctx.type = 'json'
      ctx.body = { code: -1, message: '账号或者密码不对' }
    } else {
      console.log("登录成功")
      // write session data
      ctx.session.user = userName
      ctx.session.userInfo = AccountService.getUserInfo(userName)
      ctx.type = 'json'
      ctx.body = JSON.stringify({ code: 0, message: 'success' })      
    }
  }


  @POST('/alreadyLogin')
  public alreadyLogin (ctx: Koa.Context) {
    let alreadyLogin: true = (ctx.session && ctx.session.user)
    if (alreadyLogin) {
      console.log("/api/account/alreadyLogin: ", alreadyLogin)
      ctx.body = { code: 0, message: '已经登录' }
    } else {
      ctx.body = { code: -1, message: '未登录或登录已失效' }
    }
  }


  @POST('/logout')
  public logout (ctx: Koa.Context) {
    // remove session data
    ctx.session = null
    ctx.body = { code: 0, message: 'success' }
  }
}

/**
   export: Index Router
*/

export default Account
