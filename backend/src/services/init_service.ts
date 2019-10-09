
import config from '../../config'
import { ArticleDAO, ArticleMeta } from '../dao/article_dao'
import { parseHexoMd, publishDate, mdUriPath } from '../utils/md_utils'
import { listDirectoryFiles, existed, readFile } from '../utils/fs_utils'
import { cutPath, pathRelativeRoot } from '../utils/path_utils'
import * as path from 'path'


/**
 * 业务层
 */
class InitService {
  private db: ArticleDAO = null
  private initialized: boolean = false
  private dbFilePath: string =  pathRelativeRoot('data/articles.db')
  constructor() {
    console.log("dbFilePath: ", this.dbFilePath)
    if (existed(this.dbFilePath) && readFile(this.dbFilePath).trim() !== '') {
      this.initialized = true
    }

    if (this.db === null) {
      this.db = new ArticleDAO()
    }
  }

  public async init () {
    if (!existed(this.dbFilePath)) {
      this.initialized = false
    }
    
    if (this.initialized) {
      console.log("Already Initialized!")
      return 'success'
    }

    try {
      await this.db.clearCollection()
      let result = await this.initArticlesDb()
      console.log('initArticlesDb Success: ', result)
      this.initialized = true
      return 'success'
    } catch (error) {
      console.error("initArticlesDb Error: ", error)
      return 'failed'
    }
  }

  /* 初始化articles database */
  public async initArticlesDb () {
    let absPostsDirPath = path.normalize(config.hexoRoot + config.postsPath)
    console.log("initArticleDb absPostsDirPath: ", absPostsDirPath, " hexoRoot: ", config.hexoRoot, " ;postsPath: ", config.postsPath)
    let files: string[] = listDirectoryFiles(absPostsDirPath)
    files.forEach((md: string, index: number) => {
      let mdInfo = parseHexoMd(md)
      let article: ArticleMeta = {
        title: mdInfo.title,
        author: mdInfo.author,
        tags: mdInfo.tags,
        categories: mdInfo.categories,
        archives: mdInfo.archives,
        publishDate: publishDate(md),
        path: cutPath(md, config.hexoRoot),
        url: mdUriPath(md)
      }

      return this.db.insertArticle(article)
    })
  }

  /* @Deprecated: initAccountDb() */
  public initAccountDb () {

  }

}

export default InitService
