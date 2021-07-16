<template>
  <div :id="idEditor">
  </div>
</template>
<script type="text/ecmascript-6">
  import E from 'wangeditor';
  export default {
    props: {
      Desc: {
        type: String,
        default: '',
      },
      isOpenEditor: {
        type: Boolean,
        default: true
      },
      idEditor: {
        type: String,
        default: 'editor'
      },
      menus: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        editorContent: '',
        editor: {},
      }
    },
    methods: {
      //清空编辑
      clearEditor() {
        this.editor.txt.clear();
      },
      //设置富文本框内容
      setEditorContent(desc) {
        this.editor.txt.html(desc);//设置文本框内容
      },
      //禁止
      disabledEditor(){
        this.editor.disable();
      },
      //启动
      enableEditor(){
        this.editor.enable();
      },
    },
    mounted() {
      this.editor = new E('#' + this.idEditor);
      this.editor.config.uploadImgShowBase64 = true; //图片转换成base64
      this.editor.config.pasteFilterStyle = false;//手动关闭掉粘贴样式的过滤
    //   this.editor.config.onchange = (html) => { // 当富文本框内容改变触发
    //     this.editorContent = html;
    //     this.$emit('clickDesc', this.editorContent);
    //   }
     // this.editor.config.showLinkImg = false
    //   this.editor.config.uploadImgHooks = {
    //     before: function (xhr, editor, files) {
    //     },
    //     success: function (xhr, editor, result) {
    //     },
    //     fail: function (xhr, editor, result) {
    //     },
    //     error: function (xhr, editor) {
    //     },
    //     timeout: function (xhr, editor) {
    //     },
    //   },
      this.editor.config.menus = [
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'image',  // 插入图片
        'table',  // 表格
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]
      if (this.menus.length) {
        this.editor.config.menus = this.menus
      }
      this.editor.create();
      // this.editor.change && this.editor.change();
      this.editor.$textElem.attr('contenteditable', this.isOpenEditor);//控制是否编辑
      //this.setEditorContent(this.Desc);//设置富文本框内容
    },

  }

</script>
<style lang="scss" rel="stylesheet/scss">
//   .w-e-toolbar {
//     flex-wrap: wrap;
//     z-index: 1 !important;
//     border-top-left-radius: 2px;
//     border-top-right-radius: 2px;
//     border:1px solid #E6E6E6 !important;
//     background-color: #E6E6E6 !important;
//     .w-e-menu {
//       padding: 10px 10px !important;
//       z-index: 1 !important;
//     }
//   }
//   .w-e-text{
//     overflow-y: auto !important;
//   }
//   .w-e-text-container{
//     border-color:#E6E6E6 !important;
//     height: 400px !important;
//     z-index: 0 !important;
//     .w-e-text{
//       p{
//         margin: 0px;
//       }
//     }
//   }


</style>
