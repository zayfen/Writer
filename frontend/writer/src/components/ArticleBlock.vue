<template>
  <el-card class="article-block" shadow="hover">
    <el-row>
      <el-col :span="2">{{title}}</el-col>
      <el-col :span="2">{{author}}</el-col>
      <el-col :span="2">{{publishDate}}</el-col>
      
      <el-col :span="4">
        <el-tag v-for="(tag, index) in tags" :key="index"> 
          {{tag}} 
        </el-tag>
      </el-col>
      
      <el-col :span="4">
        <el-tag v-for="(category, index) in categories" :key="index">
          {{ category }}
        </el-tag>
      </el-col>

      <el-col :span="4">
        <el-tag v-for="(archive, index) in archives" :key="index">
          {{ archive }}
        </el-tag>
      </el-col>

      <el-col :span="4">
        <el-button-group>
          <el-button type="primary" icon="el-icon-view" @click="onViewButtonClick"></el-button>
          <el-button type="primary" icon="el-icon-edit"  @click="onEditButtonClick"></el-button>
          <el-button icon="el-icon-delete" @click="onDeleteButtonClick"></el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

export interface ArticleMeta {
  title: string,
  author: string,
  publishDate: string,
  tags: string[],
  categories: string[],
  archives: string[],
  url: string
}

@Component
export default class ArticleBlock extends Vue {
  @Prop() private id!: string
  @Prop() private title!: string
  @Prop() private author!: string
  @Prop() private publishDate!: string
  @Prop() private tags!: string[]
  @Prop() private url!: string
  @Prop({ default: [] }) private categories!: string[]
  @Prop({ default: [] }) private archives!: string[]

  public onEditButtonClick (evt: Event) {
    // console.log("onEditButtonClick")
    this.$router.push({
      name: 'publish',
      params: { id: this.id }
    })
  }

  public onViewButtonClick (evt: Event) {
    window.open(this.url, "blank")
  }

  public onDeleteButtonClick (evt: Event) {

  }

}
</script>


<style lang="less" scoped>
  .article-block {
    margin-top: 10px;

    /deep/ .el-card__body {
      padding: 5px;
      line-height: 39.8px;
    }
  }
</style>