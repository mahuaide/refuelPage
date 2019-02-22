<template>
  <div class="root"
       @dragover="dragLaneOver($event)"
       @dragenter="dragLaneEnter($event)"
       @drop="dropLane($event)"
       @dragleave="dragLaneLeave($event)"
       style="background-image: url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1701/c8ab52d5f2f4372d17e75c4b71ae81de/photo-1549989476-69a92fa57c36');">
    <div class="surface">
      <div class="header">header</div>
      <div class="content">
        <div class="board-wrapper">
          <div class="board-main-content">
            <div class="board-header">tools-bar</div>
            <div class="board-canvas">
              <div id="board">
                <template v-for="(item,index) in list" :keys="item.id">
                  <div class="list-wrapper"
                       v-if="!item.temp"
                       :id="item.id">
                    <div class="list" :id="item.id"
                         :draggable="islaneDrag"
                         @dragstart="dragLaneStart($event,index)"
                         @dragend="dragLaneEnd($event)">
                      <div class="list-header">
                        <div class="list-header-target"></div>
                        <textarea class="mod-list-name">{{item.lane}}</textarea>
                      </div>
                      <div class="list-cards"
                      >
                        <template v-for="(card,indexCard) in item.cards">
                          <div class="list-card"
                               draggable="true"
                               @dragstart="dragCardStart($event,item.cards,indexCard)"
                               @dragend="dragCardEnd($event)"
                               v-if="!card.temp"
                               :cardId="card.title"
                          >
                            <div class="list-card-details">
                          <span class="list-card-title">
                                {{card.title}}
                          </span>
                            </div>
                          </div>
                          <div class="list-card-temp" v-if="card.temp" :style="{height: tempHeight}"></div>
                        </template>
                      </div>
                      <a class="open-card-composer">
                        <span class="js-add-a-card hide" @click.stop="addCard(item)">添加卡片</span>
                      </a>
                    </div>
                  </div>
                  <div v-if="item.temp" class="list-wrapper-temp" :style="{height: tempHeight}"></div>
                </template>
                <div class="list-wrapper mod-add" @click="addLane">添加泳道</div>
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
        islaneDrag: true,
        tempHeight: 200,
        dragLane: null,
        dragCard: null,
        list: [
          {
            "id": 1,
            "lane": "开始",
            "cards": [{"title": 11}, {"title": 12}, {"title": 13}, {"title": 14}, {"title": "langlanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglanglang"}]
          },
          {
            "id": 2,
            "lane": "开发",
            "cards": [{"title": 21}, {"title": 22}, {"title": 23}, {"title": 24}, {"title": 25}]
          },
          {"id": 3, "lane": "阻塞", "cards": [{"title": 31}, {"title": 32}, {"title": 33}, {"title": 34}, {"title": 35}]},
          {"id": 4, "lane": "测试", "cards": [{"title": 41}, {"title": 42}, {"title": 43}, {"title": 44}, {"title": 45}]},
          {"id": 5, "lane": "完成", "cards": [{"title": 51}, {"title": 52}, {"title": 53}, {"title": 54}, {"title": 55}]},
        ]
      }
    },
    methods: {
      addCard(lane){
        var id = Math.random();
        lane.cards.push({"title": id})
      },
      addLane(){
        var id = Math.random();
        this.list.push(
          {"id": id, "lane": id, "cards": []},
        )
      },
//      卡片拖拽
      dragCardStart(ev, cards, index){
        console.log("Card---Start");
        if (navigator.userAgent.indexOf("MSIE") == -1 && navigator.userAgent.indexOf("Trident") == -1) {
          ev.dataTransfer.setData("cardId", ev.target.cardId);
        }
        this.tempHeight = getComputedStyle(ev.target).height;
        this.dragCard = cards.splice(index, 1, {"temp": true})[0]
      },
      dragCardEnd(ev){
        if (this.dragCard == null) {
          return;
        }
        console.log("Card---End");
        this.list.forEach((item, laneIndex) => {
          item.cards.forEach((card, cardIndex) => {
            if (card.temp) {
              item.cards.splice(cardIndex, 1, this.dragCard);
              this.dragCard = null;
            }
          })
        })
      },
      dragCardOver(ev, index){
        this._preventDefault(ev)
        if (this.dragCard == null) {
          return
        }
        console.log("Card---Over");
        //先清除其他泳道的temp
        this.list.forEach((item, laneIndex) => {
          if (index != laneIndex) {
            item.cards.forEach((card, cardIndex) => {
              if (card.temp) {
                item.cards.splice(cardIndex, 1);
              }
            })
          }
        })
        //当前泳道清除temp，同时指定新temp位置
        this.list[index].cards.forEach((card, tempindex) => {
          if (card.temp) {
            this.list[index].cards.splice(tempindex, 1);
          }
        })
        this.list[index].cards.push({"temp": true})
      },
      dragCardEnter(ev){
        if (this.dragCard == null) {
          return;
        }
        console.log("Card---Enter");
      },
      dropCard(ev){
        if (this.dragCard == null) {
          return;
        }
        ev.preventDefault();
        console.log("drop---Card");
        this.list.forEach((item, laneIndex) => {
          item.cards.forEach((card, cardIndex) => {
            if (card.temp) {
              item.cards.splice(cardIndex, 1, this.dragCard);
              this.dragCard = null;
            }
          })
        })
      },
      dragCardLeave(ev){
        if (this.dragCard == null) {
          return;
        }
        console.log("Card---Leave");
      },

//      泳道拖拽
      dragLaneStart(ev, index){
        if(this.dragCard == null) {
          console.log('start');
          if (navigator.userAgent.indexOf("MSIE") == -1 && navigator.userAgent.indexOf("Trident") == -1) {
            ev.dataTransfer.setData("laneId", ev.target.id);
          }
          this.tempHeight = getComputedStyle(ev.target).height;
          this.dragLane = this.list.splice(index, 1, {"temp": true})[0];
        }
      },
      dragLaneEnd(ev){
        console.log("end")
        this.list.forEach((item, index) => {
          if (item.temp) {
            this.list.splice(index, 1, this.dragLane);
            this.dragLane = null;
          }
        })
        if (this.dragCard != null) {
          this.list.forEach((item, laneIndex) => {
            item.cards.forEach((card, cardIndex) => {
              if (card.temp) {
                item.cards.splice(cardIndex, 1, this.dragCard);
                this.dragCard = null;
              }
            })
          })
        }
      },
      dragLaneOver(ev){
        this._preventDefault(ev);
        console.log('over')
        let scrollLeft = document.getElementById('board').scrollLeft
        let offsetX = Math.floor((ev.clientX + scrollLeft) / 280);
        this.list.forEach((item, index) => {
          if (item.temp && offsetX != index) {
            this.list.splice(index, 1)
            this.list.splice(offsetX, 0, {"temp": true})
          }
        })
        if (this.dragCard != null) {
          this.list.forEach((item, laneIndex) => {
            item.cards.forEach((card, cardIndex) => {
              if (card.temp) {
                item.cards.splice(cardIndex, 1);
              }
            })
          })
          this.list[offsetX].cards.forEach((card, tempindex) => {
            if (card.temp) {
              this.list[offsetX].cards.splice(tempindex, 1);
            }
          })
          this.list[offsetX].cards.push({"temp": true})
        }
      },
      dragLaneEnter(ev){
        this._preventDefault(ev);
        console.log("enter");
      },
      dropLane(ev){
        this._preventDefault(ev);
        console.log("drop");
        this.list.forEach((item, index) => {
          if (item.temp) {
            this.list.splice(index, 1, this.dragLane);
            this.dragLane = null;
          }
        })
        if (this.dragCard != null) {
          this.list.forEach((item, laneIndex) => {
            item.cards.forEach((card, cardIndex) => {
              if (card.temp) {
                item.cards.splice(cardIndex, 1, this.dragCard);
                this.dragCard = null;
              }
            })
          })
        }
      },
      dragLaneLeave(ev){
        this._preventDefault(ev);
        console.log("leave");
      },
      _preventDefault(ev){
        if (ev.preventDefault) {
          ev.preventDefault();
        } else {
          window.event.returnValue = false;
        }
        if (ev.stopPropagation) {
          ev.stopPropagation()
        } else {
          window.event.cancelBubble = true;
        }
      },
    },
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
                .list-wrapper-temp:first-child
                  margin-left 8px
                .list-wrapper-temp
                  width: 272px;
                  margin: 0 4px;
                  box-sizing: border-box;
                  display: inline-block;
                  vertical-align: top;
                  white-space: nowrap;
                  background-color: rgba(0, 0, 0, .4)
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
                        font-size 14px
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
                      .list-card-temp
                        background-color: #999;
                        border-radius: 3px;
                        box-shadow: 0 1px 0 rgba(9, 45, 66, .25);
                        display: block;
                        margin-bottom: 8px;
                        max-width: 300px;
                        min-height: 28px;
                        position: relative;
                        z-index: 0;
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
                            font-family "Microsoft YaHei"
                            font-size 12px
                            clear: both;
                            display: block;
                            margin: 0 0 4px;
                            overflow: hidden;
                            text-decoration: none;
                            word-wrap: break-word;
                            color: #17394d;
                    .open-card-composer
                      cursor pointer
                      border-radius: 0 0 3px 3px;
                      color: #6b808c;
                      display: block;
                      flex: 0 0 auto;
                      padding: 8px;
                      font-family "Microsoft YaHei"
                      font-size 14px
                      position: relative;
                      text-decoration: none;
                      -webkit-user-select: none;
                      -moz-user-select: none;
                      -ms-user-select: none;
                      user-select: none;
                .mod-add
                  cursor pointer
                  background-color: rgba(0, 0, 0, .3)
                  border-radius: 3px;
                  height 36px
                  padding 0 20px
                  font-family "Microsoft YaHei"
                  font-size 14px
                  line-height 36px
                  color #fff
                  &:hover
                    background-color: rgba(0, 0, 0, .5)
</style>
