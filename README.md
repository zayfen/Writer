# Writer
hexo文章发布系统,基于[zweb框架](https://github.com/zayfen/zweb)打造。 项目地址地址：[Writer Github地址](https://github.com/zayfen/Writer)

## 项目启动

### 一、安装项目依赖，Build前端页面
1. backend 安装依赖
   在Writer/backend/ 目录下，依次执行 `npm install` 和 `pm2 install typescript`, 如果pm2提示找不到，请在Writer/backend/
   目录下执行`./node_modules/.bin/pm2 install typescript`

2. frontend 依赖安装
   在Writer/frontend/writer/目录下，依次执行`npm install` 和 `npm run build`


### 二、配置环境参数
1. 配置Hexo根路径
   Writer/backend/config/{dev.config.ts, production.config.ts}中配置 `hexoRoot` 字段
2. 配置博客URL
   Writer/backend/config/{dev.config.ts, production.config.ts}中配置 `hexoHost`字段’
3. 配置postsPath
   Writer/backend/config/{dev.config.ts, production.config.ts}中配置 `postsPath`字段’。
   `postsPath`是相对于`hexoRoot`的hexo文章存放目录，也就是markdown文件存放的位置，一般为${hexoRoot}/source/_posts
4. 配置cmdsOnUpdateInHexoRoot， 此字段是文章修改更新后，在`hexoRoot`目录下执行的命令
   Writer/backend/config/{dev.config.ts, production.config.ts}中配置 `cmdsOnUpdateInHexoRoot`字段’


配置示例：
```typescript
import { Config } from './config.proto'

const DevConfig: Config = {
  hexoRoot: '/home/zayfen/Github/hexo',
  hexoHost: 'https://www.zayfen.com',
  postsPath: '/source/_posts',
  cmdsOnUpdateInHexoRoot: ['./node_modules/.bin/hexo generate', 
                            './node_modules/.bin/hexo deploy', 
                            './node_modules/.bin/hexo algolia']
}

export default DevConfig

```

### 三、配置账户
账户配置在Writer/data/account.json文件中。

账号分为3中权限，**admin**权限用户可以看到所有的文章，并且可以更新，删除他人文章，新建自己的文章；**writer** 权限用户，只能查看到自己的文章，可以新增，更新，删除自己的文章；
**read** 权限用户，只能查看自己的文章，任何文章修改动作都被禁止。

账户配置原型：
```
{
  ${UserName}: {
    passwd: ${UserPassword},
    aliasName: ${UserAliasName},
    email: ${UserEmail},
    privilege: ["admin" | "write" | "read"]
  },
  ...
}
```


账户配置示例：
```json
{
  "zayfen": {
    "passwd": "xxxxx",
    "aliasName": "张云峰",
    "email": "zhangyunfeng0101@gmail.com",
    "privilege": "admin"
  },
  "writer1": {
    "passwd": "12345678",
    "aliasName": "writer1",
    "email": "zhangyunfeng0101@gmail.com",
    "privilege": "write"
  },
  "reader1": {
    "passwd": "12345678",
    "aliasName": "reader1",
    "email": "zhangyunfeng0101@gmail.com",
    "privilege": "read"
  }
}
```


### 四、启动项目
在Writer/backend/目录下，执行`npm run start`启动production环境的服务，服务启动之后，会自动
解析以及存在的文章（markdown文件），并将数据存储到NeDB中。
   

## 使用
假设writer服务的域名是writer.hexo.com (此域名由用户自己配置)

### 登录
在浏览器中输入 **writer.hexo.com/login** 进入登录页面，用户输入账号名和密码进入Home页面

![登录页面](https://res.cloudinary.com/zayfen/image/upload/v1569845577/img/xat8sp5i7y56xnkcnxav.png)

### Home页面（浏览文章列表数据）
home页面的地址是**writer.hexo.com/**。

用户在已登录的情况下，才能进入home页面，否则会自动跳转到登录页面

![Home页面](https://res.cloudinary.com/zayfen/image/upload/v1569845577/img/qympfyhf8ezciujn4m48.png)

### Publish页面
此页面是更新和新建文章的页面，地址是**writer.hexo.com/publish**,
当地址后面带有`?id=xxx`参数时，表示更新id为xxx的文章，否则即为新建文章。

![发布页面](https://res.cloudinary.com/zayfen/image/upload/v1569845577/img/e4yoozdfivylro4crnes.png)
