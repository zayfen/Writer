import * as path from 'path'

/**
 * 获取相对于路径根路径的绝对路径
 * @param path 相对于项目根目录下的路径
 */
export function pathRelativeRoot (_path: string): string {
  let rootPath: string = path.resolve(__dirname, '../../') 
  return path.resolve(rootPath, _path)
}