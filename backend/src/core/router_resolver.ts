
import * as Router from 'koa-router'


interface Router<T extends BaseRouter> {
  filePath: string,
  instance: T,
  routers: Array<
}
