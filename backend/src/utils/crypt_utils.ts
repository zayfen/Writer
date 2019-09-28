import * as crypto from 'crypto'

const md5Generator = crypto.createHash('md5');

export function md5(text: string): string {
  return md5Generator.update(text).digest('hex')
}
