/**
   This is index router
 */
import { BaseRouter } from '../../core/router_resolver'
import * as Koa from 'koa'


class Index extends BaseRouter {
  prefix: string = '/'

  // 获取name
  // Method: GET
  public GetName(ctx: Koa.Context) {
    ctx.body = "GetName: Hello World"
  }
}

/**
   export: Index Router
*/

export default Index
