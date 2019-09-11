import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as parser from '@babel/parser'

import { absolutePath, readLines, readFile } from '../utils/fs_utils'


interface RouterPrefix {
  prefix: string
}

export interface BaseRouter extends RouterPrefix {
  [key: string]: any
}

interface RouteMeta {
  path: string,
  params: Array<string>
}

interface Router<T extends BaseRouter> {
  filePath: string,
  prefix: string,
  instance: T,
  routers: Array<RouteMeta>
}

interface Method {
  method: string,
  decorators: Array<{ callee: string, args: string[] }>
}

type Methods = Array<Method>


async function resolveRoutes(tsFile: string): Promise<KoaRouter> {

  let code = simplifyCode(readFile(tsFile))

  console.log(code)


  // resolve methods
  let methods: Methods = resolveMethods(code)

  let clazz: any = await import(tsFile)
  console.log("clazz: ", clazz)
  let instance: BaseRouter = new clazz.default()

  let router: KoaRouter = new KoaRouter()

  let prefix: string = instance.prefix || ''
  router = router.prefix(prefix)

  methods.forEach((method: Method) => {
    let httpMethod: string = method.decorators[0].callee.toLowerCase()
    let args: string[] = method.decorators[0].args
    console.log("args: ", args)
    // let params: string[] = parseParams(args[0])
    let methodName: string = method.method

    let path: string = normalizePath(prefix + args[0])
    console.log("path: ", path, " ;httpMethod: ", httpMethod)
    switch (httpMethod) {
      case 'get':
        router.get(path, function (ctx: Koa.Context) {
          console.log("enter... ", path)
          instance[methodName].bind(instance)(ctx)
        })
    }

  })

  return router
}

function normalizePath(path: string): string {
  if (path.indexOf('\/\/') === -1) {
    return path
  }

  return normalizePath(path.replace('\/\/', '\/'))
}


// 解析请求path中的param
function parseParams(path: string): string[] {
  let params: string[] = []
  if (!path) {
    return []
  }

  let seperator: string = '/:'
  let _paramPos: number = 0
  let positions: number[] = []
  while ((_paramPos = path.indexOf(seperator, _paramPos)) > -1) {
    positions.push(_paramPos)
    _paramPos += seperator.length
  }

  positions.forEach((pos, index) => {
    let begin: number = pos + seperator.length
    if (index === positions.length - 1) {
      params.push(path.slice(begin))
    } else {
      let len: number = positions[index + 1] - pos + 1 - seperator.length
      params.push(path.substr(pos + 2, len))
    }
  })

  return params
}



function resolveMethods(simplifiedCode: string): Methods { // 

  let ast = parser.parse(simplifiedCode, {
    // parse in strict mode and allow module declarations
    sourceType: 'module',
    plugins: [
      'typescript',
      'classProperties',
      'classPrivateProperties',
      'classPrivateMethods',
      ['decorators', { decoratorsBeforeExport: true }]
    ],

  })

  let classBody = ast.program.body.filter((node: any) => node.type === 'ClassDeclaration')[0].body.body
  //   console.log("resolveMethods classBody: ", classBody)

  let _methods = classBody.filter((node: any) => node.type === 'ClassMethod' && node.accessibility === 'public')

  let _methodsWithDecorators = _methods.filter((methodNode: any) => true === !!methodNode.decorators)
  console.log(_methodsWithDecorators)

  let methods: Methods = _methodsWithDecorators.map((methodNode: any) => {
    let methodName: string = methodNode.key.name
    let decorators: Array<{ callee: string, args: string[] }> = methodNode.decorators.map((decoratorNode: any) => {
      return { callee: decoratorNode.expression.callee.name, args: decoratorNode.expression.arguments.map((node: any) => node.value) }
    })

    return { method: methodName, decorators: decorators }
  })

  return methods
}


// 简化代码，去掉注释 和 空格， 和回车
function simplifyCode(code: string): string {

  // remove single line comments and blank lines
  code = removeSingleLineComments(code)

  // remove multi lines comments like /**/
  code = removeMultiLineComments(code)

  return code
}

function isSingleLineCommentOrBlankLine(line: string): boolean {
  let trimedLine = line.trim()
  return !trimedLine || trimedLine.startsWith('\/\/')
}


function removeSingleLineComments(code: string): string {
  // find //
  let lines = code.split('\n')
  let step = 0
  while (step < lines.length) {
    if (isSingleLineCommentOrBlankLine(lines[step])) {
      lines[step] = ''
    }

    step++
  }
  return lines.filter(line => line !== '').join('\n')
}


// remove comments link /**/
function removeMultiLineComments(code: string): string {
  // find /*

  let commentStart = '/*'
  let commentStartPos = code.indexOf(commentStart)
  if (commentStartPos === -1) {
    return code
  }

  let commentEnd = '*/'
  let commentEndPos = code.indexOf(commentEnd, commentStartPos + 1)
  if (commentEndPos === -1) {
    throw new Error('broken comments')
  }

  code = [code.slice(0, commentStartPos), code.slice(commentEndPos + commentEnd.length)].join('')
  return removeMultiLineComments(code)
}

// Just a mark
function GET(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // pass
  }
}


export { resolveRoutes, simplifyCode, resolveMethods, GET }
