import * as path from 'path'
import config from '../../config'
import { ArticleDAO, ArticleMeta } from '../dao/article_dao'
import { publishDate, mdUriPath, writeMdFile, readHexoFile } from '../utils/md_utils'
import { listDirectoryFiles, deleteFile, formatDate, readFile } from '../utils/fs_utils'
import { md5 } from '../utils/crypt_utils'

/**
 * 业务层
 */
class ArticlService {
  private db: ArticleDAO = null
  constructor() {
    if (this.db === null) {
      this.db = new ArticleDAO()
    }
  }

  public getArticlesByUser(author: string): Promise<ArticleMeta[]> {
    return new Promise((resolve, reject) => {
      this.db.findArticleByAuthor(author).then(articles => resolve(articles))
    })
  }

  // create new article
  public createArticle(article: ArticleMeta, content: string): Promise<ArticleMeta> {
    return new Promise((resolve, reject) => {
      // generate file path e.g.: /source/_posts/hello-123343242532.md
      let fileName = md5(article.author + article.title + Date.now())
      article.path = path.join(config.postsPath, fileName + '.md') // e.g.:
      article.publishDate = formatDate(new Date(), '/')
      article.url = [article.publishDate, fileName].join('/')

      console.log("createArticle: ", article)
      let realFilePath: string = path.resolve(path.join(config.hexoRoot, article.path))
      this.db.insertArticle(article).then(newDocs => {
        writeMdFile(realFilePath, article, content)
        resolve(newDocs)
      })
    })
  }


  public getArticleById(id: string): Promise<{ meta: ArticleMeta, content: string }> {
    return new Promise((resolve, rejects) => {
      this.db.findArticleById(id).then(doc => {
        let filePath: string = path.join(config.hexoRoot, doc.path)
        let content: string = readHexoFile(filePath)
        resolve({ meta: doc, content: content })
      })
    })
  }


  public updateArticle(id: string, article: ArticleMeta, content: string): Promise<{ numberOfUpdated: Number, upsert: boolean }> {
    return new Promise((resolve, reject) => {
      this.db.updateArticle(id, article).then(res => {
        let realArticlePath: string = path.join(config.hexoRoot, article.path)
        writeMdFile(realArticlePath, article, content)
        resolve(res)
      })
    })
  }

  public async deleteArticleById(id: string): Promise<boolean> {
    console.log("deleteArticleById(", id, ")")
    try {
      let article: ArticleMeta = await this.db.findArticleById(id)
      if (!article) {
        return false
      }

      let deletedCount = await this.db.deleteArticle(id)
      if (deletedCount > 0) {
        let filePath: string = path.join(config.hexoRoot, article.path)
        await deleteFile(filePath)
      }
      return true

    } catch (err) {
      console.error("deleteArticleById(", id, "): Error: ", err)
      return false
    }
  }
}

export default ArticlService

