<template>
  <div class="home" style="margin-top: 20px;">
    <ArticleList :articles="articleList" @deleteArticle="deleteArticle" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ArticleList from "@/components/ArticleList.vue"; // @ is an alias to /src
import { ArticleMeta } from "../components/ArticleBlock.vue";
import { getArticlesList, deleteArticle } from "../api/article_api";

@Component({
  components: {
    ArticleList
  }
})
export default class Home extends Vue {
  articleList: ArticleMeta[] = [];

  public created() {
    this.fetchArticlesList();
  }

  public fetchArticlesList() {
    getArticlesList().then(response => {
      if (response.code === 0) {
        this.articleList.splice(0, this.articleList.length);
        response.data.list.forEach((article: ArticleMeta) => {
          this.articleList.push(article);
        });
      } else {
        this.$notify.warning("拉取文章列表失败，请稍后再试");
      }
    });
  }

  public deleteArticle(data: { id: string; title: string }) {
    let id: string = data.id;
    let title: string = data.title;
    this.$confirm(`确定删除(${title})文章吗？`, "删除", {
      distinguishCancelAndClose: false,
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    }).then(() => {
      deleteArticle(id).then(response => {
        if (response.code === 0) {
          this.$notify.success(`${title}已删除！`);
          this.fetchArticlesList();
        } else {
          this.$notify.error("删除失败：" + response.message);
        }
      });
    });
  }
}
</script>
