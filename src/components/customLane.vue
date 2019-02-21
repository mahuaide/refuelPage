<template>
  <div class="root"
       style="background-image: url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1701/c8ab52d5f2f4372d17e75c4b71ae81de/photo-1549989476-69a92fa57c36');">
    <div class="surface">
      <div class="header">header</div>
      <div class="content">
        <div class="board-wrapper">
          <div class="board-main-content">
            <div class="board-header">tools-bar</div>
            <div class="board-canvas">
              <div id="board">
                <template v-for="(item,index) in list">
                  <div class="list-wrapper" v-if="!item.temp">
                    <div class="list" draggable="true">
                      <div class="list-header">
                        <div class="list-header-target"></div>
                        <textarea class="mod-list-name" >{{item.lane}}</textarea>
                      </div>
                      <div class="list-cards">
                        <a class="list-card" draggable="true" v-for="(card,index) in item.cards">
                          <div class="list-card-details">
                          <span class="list-card-title">
                                {{card.title}}
                          </span>
                          </div>
                        </a>
                      </div>
                      <a class="open-card-composer">
                        <span class="js-add-a-card hide">添加卡片</span>
                      </a>
                    </div>
                  </div>
                  <div v-if="item.temp" class="list-wrapper-temp" style="height: 200px;">1</div>
                </template>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        list: [
          {
            "lane": "开始",
            "cards": [{"title": 11}, {"title": 12}, {"title": 13}, {"title": 14}, {"title": "langlanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglang"}]
          },
          {"temp": true},
          {"lane": "开发", "cards": [{"title": 21}, {"title": 22}, {"title": 23}, {"title": 24}, {"title": 25}]},
          {"lane": "阻塞", "cards": [{"title": 31}, {"title": 32}, {"title": 33}, {"title": 34}, {"title": 35}]},
          {"lane": "测试", "cards": [{"title": 41}, {"title": 42}, {"title": 43}, {"title": 44}, {"title": 45}]},
          {"lane": "完成", "cards": [{"title": 51}, {"title": 52}, {"title": 53}, {"title": 54}, {"title": 55}]},
        ]
      }
    },
    methods: {},
    mounted(){
//      var board = document.getElementById('board')
//      var offset;
//      var last_left = 0;
//      board.onmousedown = function(e){
//         board.onmousemove =function(e){
//           last_left = e.clientX - offset;
//           board.scrollLeft = e.clientX - offset;
//         }
//        if(last_left > 0 ){
//          offset = e.clientX-last_left;
//        }else{
//          offset = e.clientX;
//        }
//      }
//      window.onmouseup = function(e){
//         board.onmousemove = null;
//      }
    },
    computed: {},
    components: {}
  }
</script>
<style>
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:vertical {
    height: 8px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    width: 8px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .root
    font-size 13px
    height 100%
    position relative
    background-position: 50%;
    background-size: cover;
    overflow: hidden;
    .surface
      height 100%
      display: flex;
      flex-direction: column;
      .header
        flex: none;
        background: rgba(0, 0, 0, .35);
        height: 32px;
        position: relative;
        overflow: hidden;
        padding: 4px;
        z-index: 10;
        text-align center
        line-height 32px
        font-size 15px
        color #fff
      .content
        position: relative;
        flex-grow: 1;
        overflow-y: auto;
        outline: none;
        height 100%
        .board-wrapper
          font-size 0
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          height 100%
          .board-main-content
            height: 100%;
            display: flex;
            flex-direction: column;
            margin-right: 0;
            transition: margin .1s ease-in;
            .board-header
              position: relative;
              height: 32px
              background: rgba(0, 0, 0, .24);
              margin-bottom: 8px;
              flex: none;
              color #fff
              font-size 14px
              text-align center
              line-height 32px
              padding: 8px 4px 8px 8px;
              transition: padding .1s ease-in;
            .board-canvas
              position: relative;
              flex-grow: 1;
              #board
                user-select: none;
                white-space: nowrap;
                margin-bottom: 8px;
                overflow-x: auto;
                overflow-y: hidden;
                padding-bottom: 8px;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                .list-wrapper-temp
                  width: 272px;
                  margin: 0 4px;
                  box-sizing: border-box;
                  display: inline-block;
                  vertical-align: top;
                  white-space: nowrap;
                  background-color: rgba(0, 0, 0, .3)
                  border-radius: 3px;
                .list-wrapper:first-child
                  margin-left 8px
                .list-wrapper
                  width: 272px;
                  margin: 0 4px;
                  height: 100%;
                  box-sizing: border-box;
                  display: inline-block;
                  vertical-align: top;
                  white-space: nowrap;
                  .list
                    display: flex;
                    flex-direction: column;
                    background-color: #dfe3e6;
                    border-radius: 3px;
                    box-sizing: border-box;
                    max-height: 100%;
                    position: relative;
                    white-space: normal;
                    .list-header
                      flex: 0 0 auto;
                      padding: 10px 8px 8px;
                      position: relative;
                      min-height: 20px;
                      .list-header-target
                        cursor: pointer;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                      textarea.mod-list-name
                        font-family "Microsoft YaHei"
                        resize: none;
                        background: transparent;
                        border: 1px solid transparent;
                        border-radius: 3px;
                        box-shadow: none;
                        font-weight: 700;
                        margin: -4px 0;
                        height: 20px;
                        min-height: 20px;
                        padding: 4px 7px;
                        resize: none;
                        max-height: 256px;
                        &:focus
                          background-color #fff
                          border none;
                          box-shadow 0 0 2px blue
                    .list-cards
                      flex: 1 1 auto;
                      margin-bottom: 0;
                      overflow-y: auto;
                      overflow-x: hidden;
                      margin: 0 4px;
                      padding: 0 4px;
                      z-index: 1;
                      min-height: 0;
                      .list-card
                        background-color: #fff;
                        border-radius: 3px;
                        box-shadow: 0 1px 0 rgba(9, 45, 66, .25);
                        cursor: pointer;
                        display: block;
                        margin-bottom: 8px;
                        max-width: 300px;
                        min-height: 20px;
                        position: relative;
                        text-decoration: none;
                        z-index: 0;
                        .list-card-details
                          overflow: hidden;
                          padding: 6px 8px 2px;
                          position: relative;
                          z-index: 10;
                          .list-card-title
                            font-size 12px
                            clear: both;
                            display: block;
                            margin: 0 0 4px;
                            overflow: hidden;
                            text-decoration: none;
                            word-wrap: break-word;
                            color: #17394d;
                    .open-card-composer
                      border-radius: 0 0 3px 3px;
                      color: #6b808c;
                      display: block;
                      flex: 0 0 auto;
                      padding: 8px;
                      font-size 14px
                      position: relative;
                      text-decoration: none;
                      -webkit-user-select: none;
                      -moz-user-select: none;
                      -ms-user-select: none;
                      user-select: none;
</style>
