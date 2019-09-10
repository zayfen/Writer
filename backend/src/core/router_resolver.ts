
import * as KoaRouter from 'koa-router'
import * as fs from 'fs'

import { absolutePath, readLines } from '../utils/fs_utils'


export interface BaseRouter {
  prefix: string
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


function resolveRoutes(tsFile: string): Array<Router<BaseRouter>> {
  let result: Array<Router<BaseRouter>> = []

  let code = simplifyCode(readFile(tsFile))

  console.log(code)

  return result
}


/*
  * read ts file
*/
function readFile(tsFile: string): string {
  tsFile = absolutePath(tsFile)

  if (!fs.existsSync(tsFile)) {
    throw new Error('File not found!: ' + tsFile)
  }

  const content = fs.readFileSync(tsFile, { encoding: 'utf8' })
  return content
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
  return !trimedLine || trimedLine.startsWith('\\\\')
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
  return lines.filter(line => line !== '').join('')
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



resolveRoutes('../controller/index/index.ts')
