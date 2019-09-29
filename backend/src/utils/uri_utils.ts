import { normalize } from "path"

// 规范化url path, make // => /
export function normalizePath (path: string): string {
  let slash = normalize('/')
  let doubleSlash = slash + slash
  if (path.indexOf(doubleSlash) === -1) {
    return path
  }

  return normalizePath(path.replace(doubleSlash, slash))
}
