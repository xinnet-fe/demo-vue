<template>
  <div>
    <table>
      <tr>
        <td class="col1">
          <i class="dot" />
          <img src="static/img/xls.png" alt="">
          <span class="title">爱上对方就流口水大解放路口撒地方撒大家分开来说</span>
        </td>
        <td class="col2">2020-02-02 12:12:12</td>
        <td class="col3">
          <el-link type="primary" href="http://" target="_blank">点击下载</el-link>
          <span class="invalid">已失效</span>
        </td>
      </tr>
      <tr>
        <td class="col1">
          <i class="dot" />
          <img src="static/img/xls.png" alt="">
          <span class="title">爱上对方就流口水大解放路口撒地方撒大家分开来说</span>
        </td>
        <td class="col2">2020-02-02 12:12:12</td>
        <td class="col3">
          <el-link type="primary" href="http://" target="_blank">点击下载</el-link>
          <span class="invalid">已失效</span>
        </td>
      </tr>
    </table>
    <div class="null">
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
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      page: {
        total: 100,
        limit: 10
      }
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  watch: {
  },
  methods: {
    getList() {
      alert('export')
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
