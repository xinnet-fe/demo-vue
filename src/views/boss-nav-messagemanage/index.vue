<template>
  <div ref="box" class="container-msg">
    <div class="tool">
      <el-button size="mini" @click="handleAll">全部标记已读</el-button>
      <el-button size="mini" @click="handleClear">清空</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="tabTitleAll" name="all">
        <tab-all ref="panelAll" />
      </el-tab-pane>
      <el-tab-pane :label="tabTitleExport" name="export">
        <tab-export ref="panelExport" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tabAll from './all'
import tabExport from './export'
export default {
  components: {
    tabAll,
    tabExport
  },
  data() {
    return {
      activeName: 'all',
      tabTitleAll: '全部(0)',
      tabTitleExport: '导出(0)',
      url: 'http://beian.xinnet.com'
    }
  },
  computed: {
    ...mapGetters([
      'visitedViews'
    ])
  },
  watch: {
    $route(val) {
      if (val.name !== 'BossNavDomain' && !find(this.visitedViews, view => view.name === 'BossNavDomain')) {
        this.url = this.url + '?' + new Date().getTime()
      }
    }
  },
  methods: {
    handleClick(v) {
      console.log(v)
      if (v.name === 'all') {
        this.$refs.panelAll.getList()
      } else {
        this.$refs.panelExport.getList()
      }
    },
    handleAll() {
      alert('all')
    },
    handleClear() {
      alert('clear')
    }
  }
}
</script>

<style scoped>
.container-msg{
  padding: 0 20px;
}
.container-msg .tool{
  text-align: right;
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 1;
}
</style>
