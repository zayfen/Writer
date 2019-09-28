<template>
  <div class="home">
    <ArticleList :articles="articleList"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ArticleList from '@/components/ArticleList.vue' // @ is an alias to /src
import { ArticleMeta } from '../components/ArticleBlock.vue'
import { getArticlesList } from '../api/article_api'

@Component({
  components: {
    ArticleList
  }
})
export default class Home extends Vue {
  articleList: ArticleMeta[] = []


  public created () {
    getArticlesList().then(response => {
      if (response.code === 0) {
        response.data.list.forEach(article => {
          this.articleList.push(article)
        })
      } else {
      }
    })
  }


}
</script>
