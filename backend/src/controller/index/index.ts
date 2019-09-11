/**
   This is index router
 */
import { BaseRouter, GET } from '../../core/router_resolver'
import * as Koa from 'koa'


class Index implements BaseRouter {
  prefix: string = '/'
  name: string = '张云峰'
  // 获取name
  // Method: GET
  @GET("/")
  public GetRoot(ctx: Koa.Context) {
    ctx.body = "GetName: Hello World"
  }

  @GET("/name")
  public GetName(ctx: Koa.Context) {
    ctx.body = this.name
  }

  @GET("/:name/:age")
  public GetNameAndAge(ctx: Koa.Context) {
    ctx.body = JSON.stringify(ctx.params)
  }


  private _GetAge(ctx: Koa.Context) {
    ctx.body = "_GetAge"
  }
}

/**
   export: Index Router
*/

export default Index
