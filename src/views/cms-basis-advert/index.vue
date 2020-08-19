<template>
  <div class="cms-basis-advert">
    <el-tabs v-model="activeName" @tab-click="changeTabs">
      <el-tab-pane label="广告组" name="group">
        <advert-group ref="group" :active-name.sync="activeName" />
      </el-tab-pane>
      <el-tab-pane label="广告列表" name="list">
        <advert-list ref="list" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AdvertGroup from './advertGroup'
import AdvertList from './advertList'

export default {
  name: 'CmsBasisAdvert',
  components: {
    AdvertGroup,
    AdvertList
  },
  data() {
    return {
      activeName: 'group'
    }
  },
  methods: {
    changeTabs() {}
  }
}
</script>
<style lang="scss" scoped>
.cms-basis-advert {
  padding: 20px;
}
</style>

