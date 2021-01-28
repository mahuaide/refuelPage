<template>
  <div>
      <h1>匿名插槽</h1>
      <single-slot>
          <p>父组件-匿名插槽</p>
      </single-slot>
      <h1 style="margin-top:10px">具名插槽</h1>
      <named-slot>
          <template slot="header">
              <div>
                  <p>header</p>
              </div>
          </template>
           <template slot="section">
              <div>
                  <p>section</p>
              </div>
          </template>
           <template slot="footer">
              <div>
                  <p>footer</p>
              </div>
          </template>
          <div><p>other</p></div>
      </named-slot>
      <scope-slot>
          <template slot-scope="data">
              <div v-for="item in data.data" :key="item" style="display:inline">
                  <span>{{item}}</span>
              </div>
          </template>
      </scope-slot>
       <scope-slot>
          <template slot-scope="data">
              <ul v-for="item in data.data" :key="item">
                  <li>{{item}}</li>
              </ul>
          </template>
      </scope-slot>

  </div>
</template>
<script>
import singleSlot from "@/components/slot/childrenSlot/singleSlot";
import NamedSlot from '@/components/slot/childrenSlot/NamedSlot'
import ScopeSlot from '@/components/slot/childrenSlot/ScopeSlot'
export default {
    components: {
        singleSlot,
        NamedSlot,
        ScopeSlot
    },
};
</script>

<style lang="scss" scoped>
</style>