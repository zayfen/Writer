<template>
  <el-card class="article-block" shadow="hover">
    <el-row>
      <el-col :span="5">{{title}}</el-col>
      <el-col :span="2">{{author}}</el-col>
      <el-col :span="2">{{publishDate}}</el-col>
      
      <el-col :span="4">
        <template v-if="tags && tags.length > 0">
          <el-tag v-for="(tag, index) in tags" :key="index"> 
            {{tag}} 
          </el-tag>          
        </template>
        <span v-else>N/A</span>
      </el-col>
      
      <el-col :span="4">
        <template v-if="categories && categories.length > 0">
          <el-tag v-for="(category, index) in categories" :key="index">
            {{ category }}
          </el-tag>          
        </template>
        <span v-else>N/A</span>
      </el-col>

      <el-col :span="3">
        <template v-if="archives && archives.length > 0">
          <el-tag v-for="(archive, index) in archives" :key="index">
            {{ archive }}
          </el-tag>
        </template>
        <span v-else>N/A</span>
      </el-col>

      <el-col :span="3">
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
  @Prop({ default: () => [] }) private tags!: string[]
  @Prop() private url!: string
  @Prop({ default: () => [] }) private categories!: string[]
  @Prop({ default: () => [] }) private archives!: string[]

  public onEditButtonClick (evt: Event) {
    // console.log("onEditButtonClick")
    this.$router.push({
      name: 'publish',
      params: { id: this.id },
      query: { id: this.id }
    })
  }

  public onViewButtonClick (evt: Event) {
    window.open(this.url, "blank")
  }

  public onDeleteButtonClick (evt: Event) {
    this.$emit("delete", { id: this.id, title: this.title })
  }

}
</script>


<style lang="less" scoped>
  .article-block {
    margin-top: 10px;
    text-align: center;

    /deep/ .el-card__body {
      padding: 0px;
      height: 32px;
      line-height: 32px;
    }

    /deep/ .el-row {
      padding: 0;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }

    /deep/ .el-col {
      padding: 0;
      height: 32px;
      line-height: 32px;
    }

    /deep/ .el-button {
      padding: 5px 20px;
    }
  }
</style>