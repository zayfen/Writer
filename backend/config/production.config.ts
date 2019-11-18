import { Config } from './config.proto'

const ProductionConfig: Config = {
  hexoRoot: '/home/zayfen/Github/hexo',
  hexoHost: 'https://www.zayfen.com',
  postsPath: '/source/_posts',
  cmdsOnUpdateInHexoRoot: ['./build_deploy.sh']
}

export default ProductionConfig 
