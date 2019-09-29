import { Context } from 'koa'
import InitService from '../../services/init_service'

const initService = new InitService()

export default async function (ctx: Context, next: () => Promise<any>) {
  await initService.init()
  await next()
}