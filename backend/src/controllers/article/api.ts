/**
   This is index router
 */
import * as Koa from 'koa'
import { GET, POST, MIDDLEWARE } from '../../core/decorators'
import { BaseRouter, MiddleWare } from '../../core/types'

class Index implements BaseRouter {
  prefix: string = '/api/article'

  public classMiddlewares(): Array<MiddleWare | string> {
    return ['auth']
  }

  @GET('/list')
  public getArticleList (ctx: Koa.Context) {
    
  }
}

/**
   export: Index Router
*/

export default Index
