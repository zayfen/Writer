
import config from '../../config'
import { ArticleDAO, ArticleMeta } from '../dao/article_dao'
import { parseHexoMd, publishDate, mdUriPath } from '../utils/md_utils'
import { listDirectoryFiles, existed } from '../utils/fs_utils'
import { cutPath, pathRelativeRoot } from '../utils/path_utils'
import * as path from 'path'


/**
 * 业务层
 */
class InitService {
  private db: ArticleDAO = null
  constructor() {
    if (this.db === null) {
      this.db = new ArticleDAO()
    }
  }

  public async init () {
    if (existed(pathRelativeRoot('data/articles.db'))) {
      return 'success'
    }

    try {
      let result = await this.initArticlesDb()
      console.log('initArticlesDb Success: ', result)
      return 'success'
    } catch (error) {
      console.error("initArticlesDb Error: ", error)
      return 'failed'
    }
  }

  /* 初始化articles database */
  public initArticlesDb () {
    let files: string[] = listDirectoryFiles(path.resolve(config.hexoRoot, config.postsPath))
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
