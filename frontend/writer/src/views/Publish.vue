<template>
  <div class="publish">
    <el-row style="margin-bottom: 5px; border: 1px dashed #2c80ff;">
      <!-- 标题 -->
      <el-col :span="1">
        <label>标题：</label>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入标题" v-model="title" size="mini"/>
      </el-col>

      <!-- 标签 -->
      <el-col :span="1">
        <label>标签：</label>
      </el-col>
      <el-col :span="5" style="text-align: left;">
        <el-tag :key="tag" v-for="tag in tags" closable :disable-transitions="false" @close="removeTag">{{tag}}</el-tag>
        <el-input class="input-new-tag" 
          ref="refTagInput"
          v-if="tagInputVisible"
          v-model="tagInputValue"
          size="mini"
          :auto-focus="true"
          @keyup.enter.native="handleTagInputConfirm"
          @blur="handleTagInputConfirm"/>
        <el-button v-if="!tagInputVisible && tags.length < MaxTagNum" class="button-new-tag" size="small" @click="addTag">+新标签</el-button>
      </el-col>

      <!-- 分类 -->
      <el-col :span="1">
        <label>分类：</label>
      </el-col>
      <el-col :span="5" style="text-align: left;">
        <el-tag :key="category" v-for="category in categories" closable :disable-transitions="false" @close="removeCategory">{{category}}</el-tag>
        <el-input class="input-new-category"
          ref="refCategoryInput"
          v-if="categoryInputVisible"
          v-model="categoryInputValue"
          size="mini"
          @keyup.enter.native="handleCategoryInputConfirm"
          @blur="handleCategoryInputConfirm"/>
        <el-button v-if="!categoryInputVisible && categories.length < MaxTagNum" class="button-new-category" size="small" @click="addCategory">+新分类</el-button>
      </el-col>


      <!-- 归档 -->
      <el-col :span="1">
        <label>归档：</label>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入归档" v-model="archive" size="mini"/>
      </el-col>
    </el-row>

    <div id="editor-section" style="width: 100%; text-align: left;">
      <MarkdownEditor :content.sync="content"></MarkdownEditor>
    </div>

    <el-row style="margin-top: 5px;">
      <el-col><el-button type="primary" @click="onPublishButtonClick">发布</el-button></el-col>
    </el-row>
  </div>
</template>


<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import MarkdownEditor from '@/components/MarkdownEditor.vue'

@Component({
  components: {
    MarkdownEditor
  }
})
export default class Publish extends Vue {
  private tagInputVisible: boolean = false
  private tagInputValue: string = ''

  private categoryInputVisible: boolean = false
  private categoryInputValue: string = ''


  private title: string = ''
  private tags: string[] = []
  private categories: string[] = []
  private archive: string = ''
  private content: string = ''

  public get MaxTagNum () {
    return 6
  }


  public removeTag (tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1)
  }

  public addTag () {
    this.tagInputVisible = true
    this.$nextTick(() => {
      this.$refs.refTagInput.$refs.input.focus()
    })
  }

  public removeCategory (category: string) {
    this.categories.splice(this.categories.indexOf(category), 1)
  }

  public addCategory () {
    this.categoryInputVisible = true
    this.$nextTick(() => {
      this.$refs.refCategoryInput.$refs.input.focus()
    })
  }

  public handleTagInputConfirm () {
    if (this.tagInputValue.trim() !== '') {
      this.tags.push(this.tagInputValue)
      this.tagInputValue = ''
    }
    this.tagInputVisible = false    
  }

  public handleCategoryInputConfirm () {
    if (this.categoryInputValue.trim() !== '') {
      this.categories.push(this.categoryInputValue)
      this.categoryInputValue = ''
    }
    this.categoryInputVisible = false
  }


  public onPublishButtonClick () {

  }
}
</script>


<style lang="less" scoped>
.input-new-tag {
  width: 70px;
}

.input-new-category {
  width: 70px;
}

label {
  font-weight: 800;
  color: #2c80ff;
}
</style>