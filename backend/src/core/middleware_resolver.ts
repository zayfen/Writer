import { MiddleWare, Decorators } from './types'
import * as path from 'path'
import { rejects } from 'assert'

const MiddlewareDir = path.resolve(__dirname, "../middlewares")

export function middlewareFilePath(middleware: string): string {
  let filePath: string = path.resolve(MiddlewareDir + '/' + middleware + '.ts')
  return filePath
}

export async function middlewaresFromDecorators(decorators: Decorators): Promise<Array<MiddleWare>> {
  let middlewares: Array<MiddleWare> = []

  for (let i = 0; i < decorators.length; i++) {
    let decorator = decorators[i]
    if (decorator.callee === 'MIDDLEWARE') {
      middlewares.push(await findMiddleware(decorator.args[0]))
    }
  }

  return middlewares
}

export async function resolveMixMiddlewares(middlewares: Array<MiddleWare | string>): Promise<MiddleWare[]> {
  let ret: MiddleWare[] = []
  for (let i = 0; i < middlewares.length; i++) {
    let item = middlewares[i]
    if (typeof item === 'string') {
      ret.push(await findMiddleware(item))
      continue
    }
    ret.push(item)
  }
  return ret
}

export function findMiddleware(middleware: string): Promise<MiddleWare> {
  return new Promise<MiddleWare>((resolve, reject) => {
    let mwPath: string = middlewareFilePath(middleware)
    import(mwPath).then(obj => {
      resolve(obj.default)
    })
  })
}
