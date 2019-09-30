<template>
  <tui-editor 
    v-model="syncedContent" 
    :options="editorOptions"
    height="750px" 
    previewStyle="vertical" 
    mode="markdown">
  </tui-editor>
</template>


<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import 'highlight.js/styles/github.css'

import Editor from '@toast-ui/vue-editor/src/Editor.vue'
import 'tui-editor/dist/tui-editor-extChart'
import 'tui-editor/dist/tui-editor-extColorSyntax.js'
import 'tui-editor/dist/tui-editor-extScrollSync.js'
import 'tui-editor/dist/tui-editor-extTable.js'
import 'tui-editor/dist/tui-editor-extUML.js'

@Component({
  components: {
    'tui-editor': Editor
  }
})
export default class MarkdownEditor extends Vue {
  private editorOptions = {
    minHeight: '700px',
    language: 'zh_CN',
    exts: ['chart', 'uml', 'scrollSync', 'table']
  }

  @PropSync('content', { type: String }) private syncedContent!: string
}
</script>
