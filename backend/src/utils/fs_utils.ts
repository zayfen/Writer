import * as fs from 'fs'
import * as readline from 'readline'
import { pathToFileURL } from 'url'

// transform path to absolutepath
export function absolutePath(path: string): string {
  return fs.realpathSync(path)
}


export function readLines(path: string) {

  return new Promise((resolve, reject) => {
    let rl = readline.createInterface({
      input: fs.createReadStream(path),
      output: null // process.stdout,
    })

    let lines: string[] = []

    rl.on('line', (line: string) => lines.push(line))

    rl.on('close', () => resolve(lines))
  })
}
