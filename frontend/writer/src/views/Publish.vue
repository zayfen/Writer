<template>
  <div class="publish" style="overflow: hidden;">
    <el-row style="margin-bottom: 5px; margin-top: 5px;">
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

    <el-button 
      style="position: absolute; left: 610px; top:84px; border: none;border-radius: 0;padding: 9px 12px;background: #2c80ff;"
      type="primary" @click="onPublishButtonClick">
      {{ editType === 'update' ? '更新文章' : '创建文章' }}
    </el-button>
  </div>
</template>


<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import { getArticleById, updateArticle, createArticle } from '@/api/article_api'
import { Input } from 'element-ui'

type PostBody = {
  title: string,
  tags: string[],
  archives: string[],
  categories: string[],
  content: string
}

@Component({
  components: {
    MarkdownEditor
  }
})
export default class Publish extends Vue {
  private editType: "create" | "update" = 'create'
  private tagInputVisible: boolean = false
  private tagInputValue: string = ''

  private categoryInputVisible: boolean = false
  private categoryInputValue: string = ''

  private id: string = ''
  private title: string = ''
  private tags: string[] = []
  private categories: string[] = []
  private archive: string = ''
  private content: string = ''

  public created () {
    let query = this.$route.query
    if (query.id) {
      this.id = query.id as string
      this.editType = 'update'
    }
    console.log("beforeCreate: ", query, "  ;", this.editType)
    this.id && getArticleById(this.id).then(response => {
      console.log("getArticleById: ", response)
      if (response.code === 0) {
        let data = response.data
        this.id = data.meta._id
        this.title = data.meta.title
        this.$set(this, 'tags', data.meta.tags)
        this.$set(this, 'categories', data.meta.categories || [])
        this.archive = (data.meta.archives || []).join(';')
        this.content = data.content
      } else {
        this.$notify.error("获取文章失败")
      }
    })
  }

  public getPostBody (): PostBody {
    let body: PostBody = {
      title: this.title.trim(),
      tags: this.tags.filter(s => s.trim() !== ''),
      archives: this.archive.split(';').filter(s => s.trim() !== ''),
      categories: this.categories.filter(s => s.trim() !== ''),
      content: this.content
    }

    return body
  }

  public validForm (body: PostBody): boolean {
    let pass: boolean = true

    let error: string[] = []
    if (body.title.trim() === '') {
      pass = false
      error.push('标题')
    }
    if (!body.tags || body.tags.length === 0) {
      pass = false
      error.push('标签')
    }
    if (!body.archives || body.archives.length === 0) {
      pass = false
      error.push('归档')
    }
    if (body.content.trim() === '') {
      pass = false
      error.push('文章内容')
    }

    if (!pass) {
      this.$message({
          showClose: true,
          message: '如下内容必填：' + error.join('；'),
          type: 'error'
      }) 
    }

    return pass
  }

  public updateArticle () {
    let body: PostBody = this.getPostBody()
    if (!this.validForm(body)) {
      return -1
    }

    updateArticle(this.id, body).then(response => {
      console.log("updateArticle: ", response)
      if (response.code === 0) {
        this.$notify.success("更新文章成功，预计2分钟后生效")
      } else {
        this.$notify.error("更新文章失败：" + response.message)
      }
    })
  }

  public createArticle () {
    let body: PostBody = this.getPostBody()
    if (!this.validForm(body)) {
      return -1
    }

    createArticle(body).then(response => {
      if (response.code === 0) {
        // 创建文章成功之后，需要变为更新状态
        this.id = response.data._id
        this.editType = 'update'
        this.$notify.success("创建文章成功，预计2分钟后生效")
      } else {
        this.$notify.error("创建文章失败")
      }
    })
  }

  public get MaxTagNum () {
    return 6
  }

  public removeTag (tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1)
  }

  public addTag () {
    this.tagInputVisible = true
    this.$nextTick(() => {
      let refTagInput = (this.$refs.refTagInput as Vue).$refs.input as Input
      refTagInput.focus()
    })
  }

  public removeCategory (category: string) {
    this.categories.splice(this.categories.indexOf(category), 1)
  }

  public addCategory () {
    this.categoryInputVisible = true
    this.$nextTick(() => {
      let refCategoryInput = (this.$refs.refCategoryInput as Vue).$refs.input as Input
      refCategoryInput.focus()
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
    console.log("onPublishButtonClick: ", this.editType)
    if (this.editType === 'update') {
      this.updateArticle()
    } else {
      this.createArticle()
    }
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
