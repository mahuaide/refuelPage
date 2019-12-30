<template>
  <div>
    <div class="header">header</div>
  <div class="container" id="board">
    <template v-for="lane in laneCards">
      <div class="lane">
        <p class="lane-name">{{lane.laneName}}</p>
        <ul class="card-list"
            @drop="drop($event)"
            @dragover="dragOver($event)"
            @dragenter.stop="dragEnter"
            @dragleave="dragLeave"
            :data-lane="lane.laneId"
        >
          <li class="card" draggable="true" v-for="card in lane.cards"
              @dragstart="dragStart($event)"
              :id="card.cardId"
              @dragend="dragEnd"
          >
            <div class="card-detail">
              ID:{{card.cardId}}<br>
              Name:{{card.cardName}}
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        from:'',
        to:'',
        dropping:false,
        dragCard:null,
        laneCards: [
          {
            "laneId": 1,
            "laneName": "初始",
            "cards": [{"cardId": 1000, "cardName": "第一个卡片"}, {"cardId": 1001, "cardName": "第二个卡片"}, {
              "cardId": 1002,
              "cardName": "第三个卡片"
            }, {
              "cardId": 1003,
              "cardName": "第四个卡片"
            }, {
              "cardId": 1004,
              "cardName": "第五个卡片"
            }, {
              "cardId": 1005,
              "cardName": "第六个卡片"
            }]
          },
          {
            "laneId": 2,
            "laneName": "开发",
            "cards": []
          },
          {
            "laneId": 3,
            "laneName": "阻塞",
            "cards": []
          },
          {
            "laneId": 4,
            "laneName": "完成",
            "cards": []
          },
          {
            "laneId": 5,
            "laneName": "发布测试",
            "cards": []
          },
          {
            "laneId": 6,
            "laneName": "测试中",
            "cards": []
          },
          {
            "laneId": 7,
            "laneName": "测试完成",
            "cards": []
          },
          {
            "laneId": 8,
            "laneName": "发版",
            "cards": []
          }
        ]
      }
    },
    mounted () {
      //将高度设置为一屏
      var offset = 120; //顶部header，导航，以及baord的padding-top求和
      document.getElementById('board').style.height =document.body.clientHeight-offset+'px'
      //计算每个泳道的高度和内部UL的高度，将所有泳道高度设置为卡片最多的那个
      this.computedHeight()
    },
    methods:{
      dragOver(ev){
        if (ev.preventDefault) {
          ev.preventDefault();
        } else {
          window.event.returnValue = false;
        }
        //视口移动
        let clientX = ev.clientX;
        let clientY = ev.clientY;
        let scrollLeft = window.pageXOffset;
        let scrollTop = window.pageYOffset;
        if (clientX >= window.innerWidth - 200) {
          setTimeout(() => {
            window.scrollTo(scrollLeft + (clientX) / 68, window.pageYOffset)
          }, 1000 / 100)
        }
        if (clientX <= 200) {
          setTimeout(() => {
            window.scrollTo(scrollLeft - (window.innerWidth - clientX) / 68, window.pageYOffset)
          }, 1000 / 100)
        }
        if (clientY >= window.innerHeight - 100) {
          setTimeout(() => {
            window.scrollTo(window.pageXOffset, scrollTop + (clientY) / 68)
          }, 1000 / 100)
        }
        if (clientY <= 120) {
          setTimeout(() => {
            window.scrollTo(window.pageXOffset, scrollTop - (window.innerHeight - clientY) / 68)
          }, 0)
        }
        this.computedHeight()
      },
      computedHeight(){
        this.$nextTick(() => {
          var arr = [];
          $('.lane>.card-list').each((index, item) => {
            if (item.children.length <= 2) {
              arr.push(400)
            } else {
              arr.push(130 * item.children.length + 140)
            }
          })
          $('.lane>ul').css('height', Math.max(...arr) + 'px')
          $('.lane').css('height', Math.max(...arr) + 'px')
        })

      },
      dragStart(ev) {
        if (!ev.target.id) return;
        ev.dataTransfer.setData("Text", ev.target.id);
        let Ul = $("#" + ev.target.id).parents("UL.card-list")
        this.from = Ul.data('lane');
      },
      dragEnd(ev){
        if (!this.dropping) {
          $("#templateli").remove();
        }
      },
      dragEnter(ev){
        var liText = '<li id="templateli" class="templateli"><div>放这里</div></li>'
        var $target = $(ev.target)
        if ($target[0].id == 'templateli' || ($target.parents('LI')[0] && $target.parents('LI')[0].id == 'templateli')) {
          return;
        }
        this.to = $target.parents("UL.card-list").data('lane') == undefined ? $target.data('lane') : $target.parents("UL.card-list").data('lane');
        $("#templateli").remove();
        if ($target[0].tagName == 'UL') {
          $target.append(liText)
        } else if ($target[0].tagName == 'LI') {
          $target.after(liText)
        } else if ($target.parents("LI") != undefined) {
          $target.parents("LI").before(liText)
        }
      },
      dragLeave(ev){
      },
      drop(ev) {
        this.dropping = true;
        if (ev.preventDefault) {
          ev.preventDefault();
          ev.stopPropagation();
        } else {
          window.event.cancelBubble = true;
          window.event.returnValue = false;
        }
        var id = ev.dataTransfer.getData("Text");
        $("#templateli").text('同步中... ').append('<i class="el-icon-loading"></i>')
        setTimeout(() => {
          //找到占位元素在目标泳道的位置
          var index = $("#templateli").index();

          //先将拖拽card在源泳道中删除，并保存起来
          this.laneCards.forEach((lane) => {
            lane.cards.forEach((card, cardIndex) => {
              if (card.cardId == id) {
                this.dragCard = lane.cards.splice(cardIndex, 1)[0];
              }
            })
          })

          //如果是放入目标泳道的首位
          if (index == 0) {
            this.laneCards.forEach((lane) => {
              if (lane.laneId == this.to) {
                lane.cards.splice(index, 0, this.dragCard)
              }
            })
            //如果放到目标用到非首位，先找到上一元素ID和位置，再位置+1后插入
          } else {
            var prvCardId = $("#templateli").prev()[0].id;
            if (id == prvCardId) {
              this.laneCards.forEach((lane) => {
                if (lane.laneId == this.to) {
                  lane.cards.splice(index, 0, this.dragCard)
                }
              })
            } else {
              this.laneCards.forEach((lane) => {
                if (lane.laneId == this.to) {
                  lane.cards.splice(index+1, 0, this.dragCard)
                }
              })
            }
          }

          $("#templateli").remove();
          this.dropping = false;
          this.this.computedHeight();
        }, 200)
      },
    },
    computed: {},
    components: {}
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .header
    width: 100%;
    height: 60px;
    background-color: #000;
    position: fixed;
    z-index: 999;
    top:0;
    left: 0;
    color #fff
    text-align center
    line-height 60px
  .container
    position relative
    margin-top: 60px
    width 100%
    display flex
    padding 10px 10px 50px 10px
    .lane
      flex 0 0 270px
      width 270px;
      border-radius 10px
      background-color #F4F5F7
      margin-right 10px
      padding 10px 0
      min-height 300px
      .lane-name
        padding 0 10px
        height 25px;
        line-height 25px
        overflow hidden
        white-space nowrap
        text-overflow:ellipsis
      .card-list
        box-sizing border-box
        width 100%;
        height 100%;
        padding 0 10px
        .card
          list-style none
          width 100%
          height 136px
          box-sizing border-box
          padding 5px;
          border-radius 5px
          border 1px solid #ddd
          margin-top 10px
          background-color #fff
          .card-detail
            box-sizing border-box
            width 100%
            height 100%
</style>
<style>
  .templateli {
    list-style: none;
    height: 136px;
    background-color: #ddd;
    border-radius: 8px;
    text-align: center;
    line-height: 136px;
    margin-top: 10px;
    border: 1px dashed red;
  }
</style>
