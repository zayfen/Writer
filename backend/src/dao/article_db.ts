import * as Nedb from 'nedb'
import { pathRelativeRoot } from '../utils/path_utils'
import { throwStatement } from '@babel/types'
import { resolve } from 'url'

interface ArticleMeta {
  title: string,
  author: string,
  publishDate: string,
  tags: string[],
  categories: string[],
  archives: string[],
  url: string,
  path: string // 文件存储路径
}

const db = new Nedb<ArticleMeta>({ filename: pathRelativeRoot('data/articles.db'), autoload: true })

export class ArticleDAO {
  private db: Nedb<ArticleMeta> = null
  constructor () {
    if (this.db === null) {
      this.db = db
    }
  }

  public insertArticle (article: ArticleMeta): Promise<Error | ArticleMeta> {
    return new Promise((resolve, reject) => {
      this.db.insert(article, function (err, newDocs) {
        if (err) {
          reject(err)
        } else {
          resolve(newDocs)
        }
      })   
    })

  }

  public updateArticle (article: ArticleMeta): Promise<Error | ArticleMeta> {
    return new Promise((resolve, reject) => {
      
    })
  }
}
