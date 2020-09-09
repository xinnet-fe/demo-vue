<template>
  <div class="agent-notice-detail">
    <Box type="1">
      <div slot="tit-left"><a href="javascript:;" @click="handleBack"> &lt; 返回</a></div>
      <div slot="tit-right" />
      <div slot="cont">
        <div class="cont-tit">
          <h3>{{ title }}</h3>
          <p><span>发布时间：{{ time }}</span><span>发布者：{{ author }}</span></p>
        </div>
        <div class="article" v-html="content" />
      </div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/Box'
export default {
  components: {
    Box
  },
  props: {
  },
  data() {
    return {
      title: '',
      time: '',
      author: '',
      content: ''
    }
  },
  mounted() {
    this.handleShow(this.$route.params.id)
  },
  methods: {
    handleBack() {
      this.$router.push({ path: '/agent-notice/index' })
    },
    handleShow(id) {
      this.showDetail = true
      this.$store.dispatch('announce/queryContentById', { id: id }).then(res => {
        console.log(res.success)
        if (!res.code && res.success) {
          this.title = res.data.title
          this.content = res.data.content.replace(/\/userManager\//, '/agent/api/announce/')
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
.agent-notice-detail .cont-tit{
  padding-bottom: 10px;
  border-bottom: 1px solid #ededed;
}
.agent-notice-detail .cont-tit h3{
  color: #333;
  font-size: 20px;
  text-align: center;
  margin: 0px;
}
.agent-notice-detail .cont-tit p {
  text-align: center;
}
.agent-notice-detail .cont-tit p span{
  color: #333;
}
.agent-notice-detail .article{
  color: #333;
}
.agent-notice-detail .article img{
  width: 100%;
}
</style>
