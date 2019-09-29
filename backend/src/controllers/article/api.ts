/**
   This is index router
 */
import 'koa-body'
import * as Koa from 'koa'
import { GET, POST, MIDDLEWARE } from '../../core/decorators'
import { BaseRouter, MiddleWare } from '../../core/types'
import ArticleService from '../../services/article_service'
import { ArticleMeta } from '../../dao/article_dao'
import { UserInfo } from '../../services/account_service'
import config from '../../../config'
import { normalizePath } from '../../utils/uri_utils'

type BodyType = {
  title: string,
  tags: string[],
  archives: string[],
  categories: string[],
  publishDate?: '',
  path?: '',
  url?: '',
  content: string
}

class Index implements BaseRouter {
  prefix: string = '/api/article'
  articleService = new ArticleService()

  public classMiddlewares (): Array<MiddleWare | string> {
    return ['auth']
  }

  @GET('/list')
  public async getArticleList (ctx: Koa.Context) {
    let user: string = ctx.session.user
    console.log("getArticleList: ", user)
    let articles = await this.articleService.getArticlesByUser(user)
    // change uri field, prepend with hexoHost
    articles.forEach(article => {
      article.url = normalizePath(config.hexoHost + '/' + article.url)
    })
    console.log("getArticleList Articles: ", articles)
    ctx.body = { code: 0, message: 'success', data: { list: articles } }
  }

  // 创建文章
  @POST('/create')
  public async addArticle (ctx: Koa.Context) {
    let user: string = ctx.session.user
    let userInfo: UserInfo = ctx.session.userInfo
    console.log("addArticle: ", user)
    let body: BodyType = ctx.request.body

    let article: ArticleMeta = {
      title: body.title,
      author: userInfo.aliasName,
      tags: body.tags,
      archives: body.archives,
      categories: body.categories,
      publishDate: '',
      path: '',
      url: ''
    }

    let content: string = body.content
    try {
      let result = await this.articleService.createArticle(article, content)
      ctx.body = { code: 0, message: 'success', data: result }
    } catch (err) {
      ctx.body = { code: -1, message: err || '创建文章失败' }
    }
  }

  // 更新文章
  @POST('/update/:id')
  public async updateArticle (ctx: Koa.Context) {
    let user: string = ctx.session.user
    let userName: string = ctx.session.userInfo.aliasName
    let id: string = ctx.params.id
    let body: BodyType = ctx.request.body
    console.log("updateArticle: id: ", id, '  ;body: ', ctx.request.body)

    let article: ArticleMeta = {
      author: userName,
      title: body.title,
      tags: body.tags,
      archives: body.archives,
      categories: body.categories
    }
    let content: string = ctx.request.body.content
    try {
      let result = await this.articleService.updateArticle(id, article, content)
      console.log("updateArticle: ", result)
      ctx.body = { code: 0, message: 'success', data: result }
    } catch (err) {
      ctx.body = { code: -1, message: err || '更新文章失败' }
    }
  }

  // 获取文章详情
  @GET('/:id')
  public async getArticle (ctx: Koa.Context) {
    let id: string = ctx.params.id
    try {
      let article = await this.articleService.getArticleById(id)
      article.meta.url = normalizePath(config.hexoHost + '/' + article.meta.url)
      console.log("getArticle: ", article)
      ctx.body = { code: 0, message: 'success', data: article }
    } catch (err) {
      ctx.body = { code: -1, message: err || '获取文章失败' }
    }
  }


  @POST('/delete/:id')
  public async deleteArticle (ctx: Koa.Context) {
    let id: string = ctx.params.id
    let result: boolean = await this.articleService.deleteArticleById(id)
    if (result) {
      ctx.body = { code: 0, message: 'success' }
    } else {
      ctx.body = { code: -1, message: '删除文章失败' }
    }
  }
}

/**
   export: Index Router
*/

export default Index
