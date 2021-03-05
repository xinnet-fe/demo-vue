<template>
  <div>
    <table v-if="listMsg.length">
      <tr v-for="(item, idx) in listMsg" :key="idx" @click="updateStatus(item.id, '1')">
        <td class="col1">
          <i :class="'dot' + (item.status === '01' ? ' unread' : '')" />
          <img src="static/img/xls.png" alt="">
          <span class="title">{{ item.name }}</span>
        </td>
        <td class="col2">{{ item.createTime }}</td>
        <td class="col3">

          <el-link v-if="(item.status!=='03' && item.downloadUrl && item.downloadUrl.length)" type="primary" :href="item.downloadUrl" target="_blank" @click.native="updateStatus(item.id, '1')">点击下载</el-link>
          <span v-if="item.status==='03'" class="invalid">已失效</span>
        </td>
      </tr>
    </table>
    <div v-else class="null">
      <img src="static/img/null.png" alt="">
    </div>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      listMsg: [],
      page: {
        total: 0,
        limit: 30,
        page: 1
      }
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['msg/list']
    })
  },
  watch: {
  },
  mounted() {
    this.getList()
  },
  methods: {
    ...mapActions('msg', ['list']),
    getList(page) {
      const query = {
        msgType: '',
        isShow: '',
        pageNum: 1,
        pageSize: 30
      }
      if (page) {
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
        query.pageSize = this.page.limit
        this.page.page = 1
        // this.page.limit = 20;
      }
      this.list(query).then((res) => {
        this.listMsg = res.list
        this.page.total = res.count
      }).catch((error) => {
        // this.$message.error('加载失败，请稍后再试或减少查询数据量')
        console.log(error)
      })
    },
    updateStatus(ids, type) {
      const query = {
        ids: ids,
        updateType: type
      }
      this.$store.dispatch('msg/updateStatus', query).then((res) => {
        if (res.isSuccess === 1) {
          if (ids.length) { // 单条数据更新
            this.listMsg.map((v) => {
              if (v.id === ids) {
                v.status = '02'
              }
            })
          } else { // 全部更新
            this.$emit('loadingFalse')
            this.getList()
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch((error) => {
        // this.$message.error('加载失败，请稍后再试或减少查询数据量')
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
.container-msg table{
  width: 100%;
}
.container-msg table td{
  font-size: 12px;
  color: #333;
  padding: 20px 0;
  border-bottom: 1px solid #ededed;
  vertical-align: middle;
}
.container-msg table td .dot{
  display: inline-block;
  vertical-align: middle;
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background: #ebebeb;
  margin: 0 10px;
}
.container-msg table td .dot.unread{
  background: #f00;
}
.container-msg table td img{
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.container-msg table td .title{
  display: inline-block;
  vertical-align: middle;
}
.container-msg table td.col1{
}
.container-msg table td.col2{
  width: 150px;
}
.container-msg table td a{
  font-size: 12px;
}
.container-msg table td .invalid{
  color: #999999;
  display: inline-block;
}
.container-msg table td.col3{
  width: 60px;
  text-align: right;
  padding-right: 10px;
}
.container-msg .null{
  text-align: center;
  padding: 100px 0;
}
</style>
