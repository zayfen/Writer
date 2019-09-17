

import  { ArticleDAO } from '../dao/article_dao'


/**
 * 业务层
 */
class ArticlService {
  private db: ArticleDAO = null
  constructor () {
    if (this.db === null) {
      this.db = new ArticleDAO()
    }
  }

  

}

export default ArticlService

