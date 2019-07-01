<template>
  <div>
    <div class="tip">
      Fr:
      X:{{from.x}}
      Y:{{from.y}}
      YY:{{from.yy}}
      <br>
      To:
      X:{{to.x}}
      Y:{{to.y}}
      YY:{{to.yy}}
    </div>
    <div class="kanbanContainer" id="board">
      <cx-header></cx-header>
      <div class="content-body" id="cxBody">
        <div class="content-4">
          <div class="content4-up">
            <div class="xuqiu-gaojia">
              <div class="xuqiu-gaojia-left"><span class="text">高价值</span></div>
              <div class="xuqiu-gaojia-xuqiupool">
                <!-- 需求pool 高价值-->
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=0            data-y="0" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==0 && card.y==0"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>

                  </li>
                </ul>
              </div>
              <!-- 需求澄清  高价值-->
              <div class="xuqiu-gaojia-xuqiuchengqing">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=1            data-y="0" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==1 && card.y==0"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="sheji-gaojia">
              <div class="gaojia-fenxi-todo common">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=2            data-y="0" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==2 && card.y==0"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="gaojia-fenxi-doing common">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=3           data-y="0" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==3 && card.y==0"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="gaojia-pinggu-todo common">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=4            data-y="0" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==4 && card.y==0"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="gaojia-pinggu-doing common">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=5            data-y="0" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==5 && card.y==0"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="gaojia-jiuxu common">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=6            data-y="0" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==6 && card.y==0"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="shishi-gaojia">
              <div class="shishi-zhipin">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=7            data-y="0" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==7 && card.y==0"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="shishi-team"><span class="qianduan">前端</span></div>
              <div class="shishi-right">
                <div class="shishi-right-up">
                  <span class="team">APP</span>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=8            data-y="0" data-yy="0"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==8 && card.y==0 && card.yy==0"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=9            data-y="0" data-yy="0"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==9 && card.y==0 && card.yy==0"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=10            data-y="0" data-yy="0"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==10 && card.y==0 && card.yy==0"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=11           data-y="0" data-yy="0"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==11 && card.y==0 && card.yy==0"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=12            data-y="0" data-yy="0"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==12 && card.y==0 && card.yy==0"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=13            data-y="0" data-yy="0"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==13 && card.y==0 && card.yy==0"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="shishi-right-down">
                  <span class="team">Web</span>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=8            data-y="0" data-yy="1"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==8 && card.y==0 && card.yy==1"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=9            data-y="0" data-yy="1"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==9 && card.y==0 && card.yy==1"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=10            data-y="0" data-yy="1"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==10 && card.y==0 && card.yy==1"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=11            data-y="0" data-yy="1"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==11 && card.y==0 && card.yy==1"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=12            data-y="0" data-yy="1"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==12 && card.y==0 && card.yy==1"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=13            data-y="0" data-yy="1"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==13 && card.y==0 && card.yy==1"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="yanshou-gaojia">
              <div class="yanshouleixing-gaojie">
                <span class="text">功能测试</span>
              </div>
              <div class="ceshi-todo-gaojie">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=14            data-y="0" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==14 && card.y==0"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="ceshi-doing-gaojie">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=15            data-y="0" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==15 && card.y==0"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="daishangxian-gaojie">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=16            data-y="0" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==16 && card.y==0"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="content4-down">
            <div class="xuqiu-changgui">
              <div class="xuqiu-changgui-left"><span class="text">常规</span></div>
              <div class="xuqiu-changgui-xuqiupool">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=0            data-y="1" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==0 && card.y==1"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>

                  </li>
                </ul>
              </div>
              <div class="xuqiu-changgui-xuqiuchengqing">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=1            data-y="1" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==1 && card.y==1"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="sheji-changgui">
              <div class="changgui-fenxi-todo common">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=2            data-y="1" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==2 && card.y==1"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="changgui-fenxi-doing common">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=3            data-y="1" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==3 && card.y==1"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="changgui-pinggu-todo common">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=4            data-y="1" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==4 && card.y==1"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="changgui-pinggu-doing common">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=5            data-y="1" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==5 && card.y==1"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="changgui-jiuxu common">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=6            data-y="1" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==6 && card.y==1"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="shishi-changgui">
              <div class="shishi-zhipin">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=7            data-y="1" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==7 && card.y==1"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="shishi-team"><span class="fuwuduan">服务端</span></div>
              <div class="shishi-right">
                <div class="shishi-right-a">
                  <span class="team">A</span>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=8            data-y="1" data-yy="0"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==8 && card.y==1 && card.yy==0"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=9            data-y="1" data-yy="0"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==9 && card.y==1 && card.yy==0"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=10            data-y="1" data-yy="0"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==10 && card.y==1 && card.yy==0"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=11            data-y="1" data-yy="0"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==11 && card.y==1 && card.yy==0"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=12            data-y="1" data-yy="0"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==12 && card.y==1 && card.yy==0"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=13            data-y="1" data-yy="0"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==13 && card.y==1 && card.yy==0"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="shishi-right-b">
                  <span class="team">B</span>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=8        data-y="1" data-yy="1"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==8 && card.y==1 && card.yy==1"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=9            data-y="1" data-yy="1"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==9 && card.y==1 && card.yy==1"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=10            data-y="1" data-yy="1"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==10 && card.y==1 && card.yy==1"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=11            data-y="1" data-yy="1"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==11 && card.y==1 && card.yy==1"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=12            data-y="1" data-yy="1"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==12 && card.y==1 && card.yy==1"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=13            data-y="1" data-yy="1"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==13 && card.y==1 && card.yy==1"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="shishi-right-c">
                  <span class="team">C</span>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=8        data-y="1" data-yy="2"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==8 && card.y==1 && card.yy==2"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=9        data-y="1" data-yy="2"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==9 && card.y==1 && card.yy==2"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=10        data-y="1" data-yy="2"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==10 && card.y==1 && card.yy==2"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=11        data-y="1" data-yy="2"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==11 && card.y==1 && card.yy==2"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=12        data-y="1" data-yy="2"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==12 && card.y==1 && card.yy==2"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=13        data-y="1" data-yy="2"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==13 && card.y==1 && card.yy==2"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="shishi-right-d">
                  <span class="team">D</span>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=8        data-y="1" data-yy="3"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==8 && card.y==1 && card.yy==3"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=9        data-y="1" data-yy="3"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==9 && card.y==1 && card.yy==3"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=10        data-y="1" data-yy="3"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==10 && card.y==1 && card.yy==3"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=11        data-y="1" data-yy="3"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==11 && card.y==1 && card.yy==3"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=12        data-y="1" data-yy="3"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==12 && card.y==1 && card.yy==3"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="shishi-right-up-unit">
                    <ul class="card-list"
                        @drop="drop($event)"
                        @dragover="dragOver($event)"
                        @dragenter="dragEnter"
                        @dragleave="dragLeave"
                        data-x=13        data-y="1" data-yy="3"
                    >
                      <li class="card" draggable="true" v-for="card in datas"
                          v-if="card.x==13 && card.y==1 && card.yy==3"
                          @dragstart="dragStart($event)"
                          :id="card.id"
                          @dragend="dragEnd"
                      >
                        <div>
                          ID:{{card.id}}<br>
                          x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="yanshou-changgui">
              <div class="yanshouleixing-changgui">
                <span class="text">体验测试</span>
              </div>
              <div class="ceshi-todo-changgui">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=14            data-y="1" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==14 && card.y==1"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="ceshi-doing-changgui">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=15            data-y="1" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==15 && card.y==1"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
              <div class="daishangxian-changgui">
                <ul class="card-list"
                    @drop="drop($event)"
                    @dragover="dragOver($event)"
                    @dragenter="dragEnter"
                    @dragleave="dragLeave"
                    data-x=16            data-y="1" data-yy=""
                >
                  <li class="card" draggable="true" v-for="card in datas" v-if="card.x==16 && card.y==1"
                      @dragstart="dragStart($event)"
                      :id="card.id"
                      @dragend="dragEnd"
                  >
                    <div>
                      ID:{{card.id}}<br>
                      x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content-1">
          <div class="huidu">
            <ul class="card-list"
                @drop="drop($event)"
                @dragover="dragOver($event)"
                @dragenter="dragEnter"
                @dragleave="dragLeave"
                data-x=17            data-y="" data-yy=""
            >
              <li class="card" draggable="true" v-for="card in datas" v-if="card.x==17 && card.y==''"
                  @dragstart="dragStart($event)"
                  :id="card.id"
                  @dragend="dragEnd"
              >
                <div>
                  ID:{{card.id}}<br>
                  x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                </div>
              </li>
            </ul>
          </div>
          <div class="shangxian">
            <ul class="card-list"
                @drop="drop($event)"
                @dragover="dragOver($event)"
                @dragenter="dragEnter"
                @dragleave="dragLeave"
                data-x=18            data-y="" data-yy=""
            >
              <li class="card" draggable="true" v-for="card in datas" v-if="card.x==18 && card.y==''"
                  @dragstart="dragStart($event)"
                  :id="card.id"
                  @dragend="dragEnd"
              >
                <div>
                  ID:{{card.id}}<br>
                  x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                </div>
              </li>
            </ul>
          </div>
          <div class="fankui">
            <ul class="card-list"
                @drop="drop($event)"
                @dragover="dragOver($event)"
                @dragenter="dragEnter"
                @dragleave="dragLeave"
                data-x=19            data-y="" data-yy=""
            >
              <li class="card" draggable="true" v-for="card in datas" v-if="card.x==19 && card.y==''"
                  @dragstart="dragStart($event)"
                  :id="card.id"
                  @dragend="dragEnd"
              >
                <div>
                  ID:{{card.id}}<br>
                  x:{{card.x}} y:{{card.y}} yy:{{card.yy}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import  header from './complexKanbanHeader.vue'
  export default{
    data(){
      return {
        dropping: false,
        dragCard: null,
        dragIndex: 0,
        datas: [
          {id: 1, x: 0, y: 0, yy: ''},
          {id: 2, x: 0, y: 0, yy: ''},
          {id: 3, x: 0, y: 0, yy: ''},
          {id: 4, x: 1, y: 0, yy: ''},
          {id: 5, x: 1, y: 0, yy: ''},
          {id: 6, x: 1, y: 0, yy: ''},
          {id: 7, x: 1, y: 0, yy: ''},
          {id: 8, x: 1, y: 0, yy: ''},
          {id: 9, x: 1, y: 0, yy: ''},
          {id: 10, x: 1, y: 0, yy: ''},
        ],
        from: {x: '', y: '', yy: ''},
        to: {x: '', y: '', yy: ''},
      }
    },
    methods: {
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
        if (clientY >= window.innerHeight - 200) {
          setTimeout(() => {
            window.scrollTo(window.pageXOffset, scrollTop + (clientY) / 68)
          }, 1000 / 100)
        }
        if (clientY <= 200) {
          setTimeout(() => {
            window.scrollTo(window.pageXOffset, scrollTop - (window.innerHeight - clientY) / 68)
          }, 0)
        }
      },
      dragStart(ev) {
        $("#" + ev.target.id).css({
          transformOrigin: 'right top',
          transform: 'rotate(-3deg)',
          transition: 'all 0.1s ease-in-out'
        })
        if (!ev.target.id) return;
        ev.dataTransfer.setData("Text", ev.target.id);
        let Ul = $("#" + ev.target.id).parents("UL.card-list")
        this.from.x = Ul.data('x');
        this.from.y = Ul.data('y');
        this.from.yy = Ul.data('yy');
      },
      dragEnd(ev){
        if (!this.dropping) {
          $("#cxBody ul li").css({
            transform: 'rotate(0deg)'
          })
          $("#templateli").remove();
        }
      },
      dragEnter(ev){
        var liText = '<li id="templateli" class="templateli"><div>放这里</div></li>'
        var $target = $(ev.target)
        if ($target[0].id == 'templateli' || ($target.parents('LI')[0] && $target.parents('LI')[0].id == 'templateli')) {
          return;
        }
        this.to.x = $target.parents("UL.card-list").data('x') == undefined ? $target.data('x') : $target.parents("UL.card-list").data('x');
        this.to.y = $target.parents("UL.card-list").data('y') == undefined ? $target.data('y') : $target.parents("UL.card-list").data('y');
        this.to.yy = $target.parents("UL.card-list").data('yy') == undefined ? $target.data('yy') : $target.parents("UL.card-list").data('yy');
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
          var index = $("#templateli").index();
          this.datas.forEach((card, index) => {
            if (card.id == id) {
              this.dragCard = this.datas.splice(index, 1)[0];
              this.dragIndex = index;
            }
          })
          this.dragCard.x = this.to.x;
          this.dragCard.y = this.to.y;
          this.dragCard.yy = this.to.yy;
          if (index == 0) {
            this.datas.splice(index, 0, this.dragCard)
            //如果放到目标用到非首位，先找到上一元素ID和位置，再位置+1后插入
          } else {
            var prvCardId = $("#templateli").prev()[0].id;
            if (id == prvCardId) {
              this.datas.splice(this.dragIndex, 0, this.dragCard)
            } else {
              this.datas.forEach((card, index) => {
                if (card.id == prvCardId) {
                  this.datas.splice(index + 1, 0, this.dragCard)
                }
              })
            }
          }

          $("#templateli").remove();
          this.dropping = false;
          $("#cxBody ul li").css({
            transform: 'rotate(0deg)'
          })
          //浏览器适配,低版本浏览器中，当拖拽到分组横向泳道中时，泳道高度无法撑起，需要每次计算UL下
          //Li的个数和高度，再赋值给UI父级元素
          this.setWEb()
        }, 200)
      },
      setWEb(){
        this.$nextTick(() => {
          $('.shishi-right-up').css('min-height', this.getMaxHeight($('.shishi-right-up ul.card-list')) + 'px')
          $('.shishi-right-down').css('min-height', this.getMaxHeight($('.shishi-right-down ul.card-list')) + 'px')
          $('.shishi-right-a').css('min-height', this.getMaxHeight($('.shishi-right-a ul.card-list')) + 'px')
          $('.shishi-right-b').css('min-height', this.getMaxHeight($('.shishi-right-b ul.card-list')) + 'px')
          $('.shishi-right-c').css('min-height', this.getMaxHeight($('.shishi-right-c ul.card-list')) + 'px')
          $('.shishi-right-d').css('min-height', this.getMaxHeight($('.shishi-right-d ul.card-list')) + 'px')
        })
      },
      getMaxHeight(list){
        var arr = [];
        list.each((index, item) => {
          if (item.children.length <= 2) {
            arr.push(300)
          } else {
            arr.push(130 * item.children.length + 140)
          }
        })
        return Math.max.apply(Math, arr);
      },
      getElementTop(element)
      {
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null) {
          actualTop += current.offsetTop;
          current = current.offsetParent;
        }
        return actualTop;
      }
    },
    mounted(){
    },
    computed: {},
    components: {
      'cx-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .clearfix
    display block
    &:after
      display block
      content "."
      height 0
      line-height 0
      clear both
      visibility hidden

  .tip
    position fixed
    right 0
    bottom 0
    width 100px
    height 32px;
    font-size 12px
    background-color #000000
    color #fff;
    text-align left
    z-index 1000
    padding 2px

  .kanbanContainer
    @media screen and (max-width: 3200px) {
      width 3200px;
    }
    @media screen and (min-width: 3200px) {
      width 100%;
    }
    background-color #fff
    margin-bottom 100px;
    font-family "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif

    .content-body
      display flex
      flex-direction row
      background-color #EAF5F9
      .content-4
        flex 19
        display flex
        flex-direction column
        .content4-up
          min-height 200px
          display flex
          .xuqiu-gaojia
            flex 2
            display flex
            .xuqiu-gaojia-left
              flex 0 0 22px
              position relative
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
              .text
                position absolute
                top 50%
                left 50%
                margin-top -50px;
                margin-left -8px;
                display block;
                width 100%;
                height 100px;
                font-size 16px;
                font-weight bold
            .xuqiu-gaojia-xuqiupool
              flex 1
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
            .xuqiu-gaojia-xuqiuchengqing
              flex 1
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
          .sheji-gaojia
            flex 5
            border-right 1px solid #ddd
            display flex
            .common
              flex 1
              border-bottom 1px solid #ddd;
              border-right 1px solid #ddd;
          .common:last-child
            border-right none;
          .shishi-gaojia
            flex 8
            border-right 1px solid #ddd
            border-bottom 1px solid #ddd
            display flex
            .shishi-zhipin
              flex 1
              border-right 1px solid #ddd
            .shishi-team
              flex 1
              border-right 1px solid #ddd
              position relative
              font-size 16px;
              font-weight bold
              text-align right
              .qianduan
                display block
                width 22px
                height 30px
                position absolute
                top: 50%
                left: 10px
                margin-top -15px;
              .app
                display block
                width 50px
                height 22px;
                position absolute
                top 25%;
                margin-top -11px;
                right 10px;
              .web
                display block
                width 50px
                height 22px;
                position absolute
                bottom 25%;
                margin-top 11px;
                right 10px;
            .shishi-right
              flex 6
              display flex
              flex-direction column
              .shishi-right-up
                flex 1
                border-bottom 1px solid #ddd
                display flex
                position relative
                .team
                  display block
                  width 60px;
                  text-align center
                  position absolute
                  height 20px;
                  line-height 20px;
                  left -60px
                  top 50%
                  margin-top -10px;
                  font-weight bold
                .shishi-right-up-unit
                  flex 1
                  border-right 1px solid #ddd
                  min-height 200px;
                .shishi-right-up-unit:last-child
                  border-right none;
              .shishi-right-down
                flex 1
                display flex
                position relative
                .team
                  display block
                  width 60px;
                  text-align center
                  position absolute
                  height 20px;
                  line-height 20px;
                  left -60px
                  top 50%
                  margin-top -10px;
                  font-weight bold
                .shishi-right-up-unit
                  flex 1
                  border-right 1px solid #ddd
                  min-height 200px;
                .shishi-right-up-unit:last-child
                  border-right none;
          .yanshou-gaojia
            flex 4
            border-right 1px solid #ddd
            border-bottom 1px solid #ddd
            display flex
            .yanshouleixing-gaojie
              flex 1
              border-right 1px solid #ddd;
              position relative;
              .text
                position absolute
                top 50%
                left 50%
                text-align center
                line-height 100px;
                margin-top -50px;
                margin-left -32px
                display block;
                height 100px;
                font-size 16px;
                font-weight bold
            .ceshi-todo-gaojie
              flex 1
              border-right 1px solid #ddd;
            .ceshi-doing-gaojie
              flex 1
              border-right 1px solid #ddd;
            .daishangxian-gaojie
              flex 1
        .content4-down
          min-height 800px
          display flex
          .xuqiu-changgui
            flex 2
            display flex
            .xuqiu-changgui-left
              flex 0 0 22px
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
              position relative
              .text
                position absolute
                top 50%
                left 50%
                margin-top -50px;
                margin-left -8px;
                display block;
                width 100%;
                height 100px;
                font-size 16px;
                font-weight bold
            .xuqiu-changgui-xuqiupool
              flex 1
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
            .xuqiu-changgui-xuqiuchengqing
              flex 1
              border-right 1px solid #dddddd
              border-bottom 1px solid #ddd
          .sheji-changgui
            flex 5
            border-right 1px solid #ddd
            display flex
            .common
              flex 1
              border-bottom 1px solid #ddd;
              border-right 1px solid #ddd;
            .common:last-child
              border-right none;
          .shishi-changgui
            flex 8
            border-right 1px solid #ddd
            border-bottom 1px solid #ddd
            display flex
            .shishi-zhipin
              flex 1
              border-right 1px solid #ddd
            .shishi-team
              flex 1
              border-right 1px solid #ddd
              position relative
              font-size 16px;
              font-weight bold
              text-align right
              .fuwuduan
                display block
                width 22px
                height 30px
                position absolute
                top: 50%
                left: 10px
                margin-top -15px;
            .shishi-right
              flex 6
              display flex
              flex-direction column
              .shishi-right-a
                flex 1
                border-bottom 1px solid #ddd
                display flex
                position relative
                .team
                  display block
                  width 60px;
                  text-align center
                  position absolute
                  height 20px;
                  line-height 20px;
                  left -60px
                  top 50%
                  margin-top -10px;
                  font-weight bold
                .shishi-right-up-unit
                  flex 1
                  min-height 200px
                  border-right 1px solid #ddd
                .shishi-right-up-unit:last-child
                  border-right none;
              .shishi-right-b
                flex 1
                display flex
                border-bottom 1px solid #ddd
                position relative
                .team
                  display block
                  width 60px;
                  text-align center
                  position absolute
                  height 20px;
                  line-height 20px;
                  left -60px
                  top 50%
                  margin-top -10px;
                  font-weight bold
                .shishi-right-up-unit
                  flex 1
                  border-right 1px solid #ddd
                  min-height 200px
                .shishi-right-up-unit:last-child
                  border-right none;
              .shishi-right-c
                flex 1
                display flex
                border-bottom 1px solid #ddd
                position relative
                .team
                  display block
                  width 60px;
                  text-align center
                  position absolute
                  height 20px;
                  line-height 20px;
                  left -60px
                  top 50%
                  margin-top -10px;
                  font-weight bold
                .shishi-right-up-unit
                  flex 1
                  border-right 1px solid #ddd
                  min-height 200px
                .shishi-right-up-unit:last-child
                  border-right none;
              .shishi-right-d
                flex 1
                display flex
                position relative
                .team
                  display block
                  width 60px;
                  text-align center
                  position absolute
                  height 20px;
                  line-height 20px;
                  left -60px
                  top 50%
                  margin-top -10px;
                  font-weight bold
                .shishi-right-up-unit
                  flex 1
                  border-right 1px solid #ddd
                  min-height 200px
                .shishi-right-up-unit:last-child
                  border-right none;

          .yanshou-changgui
            flex 4
            border-right 1px solid #ddd
            border-bottom 1px solid #ddd
            display flex
            .yanshouleixing-changgui
              flex 1
              border-right 1px solid #ddd;
              position relative;
              .text
                position absolute
                top 50%
                left 50%
                text-align center
                line-height 100px;
                margin-top -50px;
                margin-left -32px
                display block;
                height 100px;
                font-size 16px;
                font-weight bold
            .ceshi-todo-changgui
              flex 1
              border-right 1px solid #ddd;
            .ceshi-doing-changgui
              flex 1
              border-right 1px solid #ddd;
            .daishangxian-changgui
              flex 1
      .content-1
        flex 3
        border-right 1px solid #ddd
        border-bottom 1px solid #ddd
        display flex
        .huidu
          flex 1
          border-right 1px solid #ddd;
        .shangxian
          flex 1
          border-right 1px solid #ddd;
        .fankui
          flex 1

    .card-list
      margin 0;
      padding: 0
      box-sizing border-box
      list-style none
      width 100%;
      height: 100%;
      padding 10px;
      .card
        height 120px
        width 100%;
        box-sizing border-box
        border 1px solid #ddd
        border-radius 10px
        margin-top 10px;
        text-align center
        background-color #fff;
        &:hover
          cursor move
        > div
          padding 8px
          width 100%;
          height 100%;
          border-radius 10px
          box-sizing border-box
      .card:first-child
        margin-top 0px
</style>
<style>
  .templateli {
    width: 100%;
    height: 120px;
    background-color: #ddd;
    border-radius: 8px;
    text-align: center;
    line-height: 120px;
    margin-top: 10px;
  }

  .templateli:first-child {
    margin-top: 0px;
  }
</style>
