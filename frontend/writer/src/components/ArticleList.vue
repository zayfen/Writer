<template>
  <div class="article-list">
   <el-card>
    <el-row style="margin-bottom: 10px;">
          <el-col :span="2">标题</el-col>
          <el-col :span="2">作者</el-col>
          <el-col :span="2">发布日期</el-col>
          <el-col :span="4">标签</el-col>
          <el-col :span="4">分类</el-col>
          <el-col :span="4">归档</el-col>
          <el-col :span="2">操作</el-col>

    </el-row>

    <template v-if="articles.length > 0" >
      <article-block v-for="(article, index) in articles" :key="index"
                :title="article.title"
                :author="article.author"
                :publishDate="article.publishDate"
                :tags="article.tags"
                :categories="article.categories"
                :archives="article.archives"
                :url="article.url">
      </article-block>      
    </template>

    <router-link v-else to="/publish" style="text-decoration: none; display: inline-block; margin-top: 50px;">去发表第一篇文章吧^_^</router-link>

   </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import ArticleBlock, { ArticleMeta } from './ArticleBlock.vue'

@Component({
  components: {
    ArticleBlock
  }
})
export default class ArticleList extends Vue {
  @Prop({ default: () => [] }) private articles!: ArticleMeta[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
