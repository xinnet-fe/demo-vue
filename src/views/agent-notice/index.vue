<template>
  <div class="notice-container">
    <el-tabs v-show="!showDetail" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="通知公告" name="first">
        <List type="1" />
      </el-tab-pane>
      <el-tab-pane label="精选活动" name="second">
        <List type="2" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import List from './list'
export default {
  name: 'Notice',
  components: { List },
  data() {
    return {
      activeName: 'first',
      drawer: false,
      showDetail: false,
      direction: 'rtl',
      title: '',
      time: '2020-05-05',
      author: '新网',
      content: ''
    }
  },
  created() {
  },
  methods: {
    handleClick() {}
  }
}
</script>
<style lang="scss">
.notice-container{
  padding: 0 20px;
  .el-drawer{
    .el-drawer__header {
      margin-bottom: 0px;
      border-bottom: 1px solid #e5e5e5;
      padding-top: 27px;
      padding-bottom: 27px;
      *{
        outline: none;
      }
      h3{
        margin-top: 0px;
        font-size: 16px;
        line-height: 24px;
        color: #333;
        font-weight: normal;
      }
      p{
        margin: 0px;
      }
      p span{
        font-size: 12px;
        display: inline-block;
        margin-right: 20px;
      }
    }
    .el-drawer__body {
      overflow: auto;
      /* overflow-x: auto; */
    }
    .article {
      font-size: 12px;
      line-height: 24px;
      padding: 0 20px;
    }
  }
}
</style>
