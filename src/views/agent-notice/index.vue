<template>
  <div class="notice-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="通知公告" name="first">
        <List type="1" @showDetail="handleShow" />
      </el-tab-pane>
      <el-tab-pane label="精选活动" name="second">
        <List type="2" @showDetail="handleShow" />
      </el-tab-pane>
    </el-tabs>
    <el-drawer
      :title="title"
      size="50%"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div slot="title">
        <h3>{{ title }}</h3>
        <p><span>发布时间：{{ time }}</span><span>发布者：{{ author }}</span></p>
      </div>
      <div class="article" v-html="content" />
    </el-drawer>
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
    handleClick() {},
    handleClose() {
      this.drawer = false
    },
    handleShow(param) {
      this.drawer = true
      this.$store.dispatch('announce/queryContentById', { id: param.id }).then(res => {
        console.log(res.success)
        if (!res.code && res.success) {
          this.title = res.data.title
          this.content = res.data.content
          this.time = res.data.updateTime
          this.author = res.data.publisher
        } else {
          this.$message.error(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    }
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
