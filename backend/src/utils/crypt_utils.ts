import * as crypto from 'crypto'


export function md5 (text: string): string {
  const md5Generator = crypto.createHash('md5');
  return md5Generator.update(text).digest('hex')
}
