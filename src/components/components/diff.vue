<template>
  <div id="app">
    <div v-html="html" v-highlight></div>
  </div>
</template>

<script>
import { Diff2Html } from 'diff2html'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
import 'diff2html/dist/diff2html.css'
export default {
  name: 'code-diff',
  props: {
    diffString: {
      type: String,
      default: ''
    },
    outputFormat: {
      type: String,
      default: 'line-by-line'
    }
  },
  directives: {
    highlight: function (el) {
      let blocks = el.querySelectorAll('code')
      blocks.forEach((block) => {
        hljs.highlightBlock(block)
      })
    }
  },
  computed: {
    html() {
      return this.createdHtml(this.diffString, this.outputFormat)
    }
  },
  methods: {
    createdHtml(content, outputFormat) {
      function hljs(html) {
        return html.replace(/<span class="d2h-code-line-ctn">(.+?)<\/span>/g, '<span class="d2h-code-line-ctn"><code>$1</code></span>')
      }
      console.log(content)
      let outStr = Diff2Html.getJsonFromDiff(content, { inputFormat: 'diff', outputFormat: outputFormat, showFiles: false, matching: 'lines' })
      let html = Diff2Html.getPrettyHtml(outStr, { inputFormat: 'json', outputFormat: outputFormat, showFiles: false, matching: 'lines' })
      console.log(hljs(html))
      return hljs(html)
    }
  }
}
</script>

<style>
.hljs {
  display: inline-block;
  padding: 0;
  background: transparent;
  vertical-align: middle;
}
.d2h-file-header {
  display: none;
}
</style>
