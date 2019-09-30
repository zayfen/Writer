import { Config } from './config.proto'

const ProductionConfig: Config = {
  hexoRoot: '/home/zayfen/Github/hexo',
  hexoHost: 'https://www.zayfen.com',
  postsPath: '/source/_posts',
  cmdsOnUpdateInHexoRoot: ['./node_modules/.bin/hexo generate', 
  './node_modules/.bin/hexo deploy', 
  './node_modules/.bin/hexo algolia']
}

export default ProductionConfig 
