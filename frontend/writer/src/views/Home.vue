<template>
  <div class="home">
    <ArticleList :articles="articleList"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ArticleList from '@/components/ArticleList.vue' // @ is an alias to /src
import { ArticleMeta } from '../components/ArticleBlock.vue'

@Component({
  components: {
    ArticleList
  }
})
export default class Home extends Vue {
  articleList: ArticleMeta[] = []

  public created () {
    this.articleList.push({
      title: "Hello World",
      author: "zayfen",
      publishDate: "2019/07/07",
      tags: ['tag1', 'tag2', 'tag3', 'tag4'],
      archives: ['web', 'archives1'],
      categories: ['front', 'categories1'],
      url: 'https://www.zayfen.com/'
    })

    this.articleList.push({
      title: "Hello World",
      author: "zayfen",
      publishDate: "2019/07/07",
      tags: ['tag1', 'tag2', 'tag3', 'tag4'],
      archives: ['web', 'archives1'],
      categories: ['front', 'categories1'],
      url: 'https://www.zayfen.com/'
    })
  }

}
</script>
