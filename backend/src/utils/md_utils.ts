import { existed, readFile, formatDate, fileModifyDate, writeFile } from './fs_utils'
import { fileName } from './path_utils'
import { ArticleMeta } from '../dao/article_dao'
import { taggedTemplateExpression, blockStatement } from '@babel/types'

interface MarkdownMeta {
  title: string,
  author: string,
  tags?: string[],
  categories?: string[],
  archives?: string[],
}


export function publishDate (mdPath: string): string {
  return fileModifyDate(mdPath)
}


/**
 * markdown markdown文件的url path
 * @param mdPath 
 */
export function mdUriPath (mdPath: string): string {
  let uriPath: string = ''
  let fullFileName: string = fileName(mdPath)
  let _fileName: string = fullFileName.substr(0, fullFileName.length - 3)

  let pdate: string = publishDate(mdPath)
  return ['', pdate, _fileName].join('/')
}

export function parseHexoMd (mdPath: string): MarkdownMeta {
  let info: MarkdownMeta = null
  if (!existed(mdPath)) {
    return info
  }

  info = {
    title: '',
    author: ''
  }

  let content = readFile(mdPath)

  let headers: string[] = content.split('\n').slice(0, 30).filter((line: string) => line.trim() !== '')
  let blockPos: { start: number, end: number } = { start: -1, end: -1 }
  headers.forEach((line: string, index: number) => {
    if (line.trim().split('').every((ch: string) => ch === '-')) {
      blockPos.start === -1 ? blockPos.start = index : (blockPos.end === -1 ? blockPos.end = index : '')
    }
  })
  let step: number = blockPos.start
  while (++step < blockPos.end) {
    let line: string = headers[step]
    let phases: string[] = line.split(':').filter((phase: string) => phase.trim() !== '')

    if (phases.length === 1) { // 内容在下面
      /**
       * e.g.:
       * tags:
       *   - tag1
       *   - tag2
       */
      let key: string = phases[0].trim()
      let value: string[] = []
      // parse( - tag1 )
      while (++step < blockPos.end) {
        let _line: string = headers[step].trim()
        if (_line === '') {
          continue
        }

        if (_line.startsWith('-')) {
          value.push(_line.split('-')[1].trim())
          continue
        }

        step--
        break
      } // while end

      if (key === 'tags' || key === 'categories' || key === 'archives') {
        info[key] = value
      }

    }

    if (phases.length > 1) {
      /**
       * e.g.: 
       * title: abcdef:xyz
       */
      let key: string = phases[0].trim()
      let value: string = phases.slice(1).join(':').trim()
      if (key === 'title' || key === 'author') {
        info[key] = value
      }
      if (key === 'tag') {
        info['tags'] = [value]
      }
      if (key === 'category') {
        info['categories'] = [value]
      }
      if (key === 'archive') {  
        info['archives'] = [value]
      }
    }

  }

  return info
}


export function readHexoFile (mdPath: string): string {
  let content = readFile(mdPath)

  let lines: string[] = content.split('\n').filter((line: string) => line.trim() !== '')

  let blockPos: { start: number, end: number } = { start: -1, end: -1 }
  let len = lines.length
  let index = 0
  while (index < len) {
    if (blockPos.start > -1 && blockPos.end > -1) {
      break
    }

    let line = lines[index++]
    if (line.trim().split('').every((ch: string) => ch === '-')) {
      blockPos.start === -1 ? blockPos.start = index : (blockPos.end === -1 ? blockPos.end = index : '')
    }
  }

  content = lines.slice(blockPos.end+1).join('\n')

  return content
}

export async function writeMdFile (path: string, article: ArticleMeta, content: string) {
  let articleContent: string[] = []
  articleContent.push('------')

  // push title
  articleContent.push('title: ' + article.title)
  // push author
  articleContent.push('author: ' + article.author)

  // push date
  articleContent.push('date: ', article.publishDate || formatDate(new Date(), ':'))

  // push tags
  articleContent.push('tags: ')
  article.tags.forEach(tag => articleContent.push(' - ' + tag))

  // push archives
  articleContent.push('archives: ')
  article.archives.forEach(archive => articleContent.push(' - ' + archive))

  // push categories
  articleContent.push('categories: ')
  article.categories.forEach(category => articleContent.push(' - ' + category))

  articleContent.push('------')

  // push content
  articleContent.push(content)

  writeFile(path, articleContent.join('\n'))
}
