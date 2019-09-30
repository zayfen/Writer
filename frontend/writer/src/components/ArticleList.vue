<template>
  <el-card style="border: none; box-shadow: none;">
  <div class="article-list" style="width: 90%; text-align: center; margin: 0 auto;">
   <el-card>
    <el-row style="font-weight: 700; border-bottom: 1px solid #2c80ff; margin-bottom: 20px;">
          <el-col :span="5">标题</el-col>
          <el-col :span="2">作者</el-col>
          <el-col :span="2">发布日期</el-col>
          <el-col :span="4">标签</el-col>
          <el-col :span="4">分类</el-col>
          <el-col :span="3">归档</el-col>
          <el-col :span="3">操作</el-col>

    </el-row>

    <template v-if="articles.length > 0" >
      <article-block v-for="(article, index) in articles" :key="index"
                :id="article._id"
                :title="article.title"
                :author="article.author"
                :publishDate="article.publishDate"
                :tags="article.tags"
                :categories="article.categories"
                :archives="article.archives"
                :url="article.url"
                @delete="deleteArticle">
      </article-block>      
    </template>

    <router-link v-else to="/publish" style="text-decoration: none; display: inline-block;">去发表第一篇文章吧^_^</router-link>

   </el-card>
  </div>
  </el-card>
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

  public deleteArticle (data: { [key: string]: any }) {
    this.$emit("deleteArticle", data)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
