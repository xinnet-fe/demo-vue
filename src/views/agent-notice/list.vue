<template>
  <div>
    <ul class="el-list el-list-style2">
      <li v-for="(item, i) in list" :key="i" class="el-list-item clearfix">
        <strong class="tit"><a :href="'#/agent-detail/index/'+item.id" target="_blank">{{ item.title }}<span v-if="item.preType === '1' && item.placedTop === '1'" class="icon-important" /><span v-if="item.preType === '2' && item.placedTop === '1'" class="icon-hot" /></a><br><span class="time">{{ item.updateTime }}</span></strong>
        <p class="desc">{{ item.label }}</p>
      </li>
    </ul>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="onSearch"
    />
  </div>
</template>

<script>
import Pagination from '@/components/demos/Pagination'

export default {
  name: 'Notice',
  components: { Pagination },
  props: {
    // list: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      page: {
        page: 1,
        total: 0,
        limit: 10
      },
      list: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.onSearch()
    })
  },
  methods: {
    // handleShow(item) {
    //   this.$emit('showDetail', item)
    // },
    onSearch(page) {
      const query = {
        preType: this.type
      }
      if (page) {
        query.pageNum = page.page
      } else {
        query.pageNum = 1
      }
      query.pageSize = this.page.limit
      this.$store.dispatch('announce/queryDlActivityOrAnnounce', query).then(res => {
        console.log(res.success)
        if (!res.code && res.success) {
          this.list = res.data.list
          this.page.total = res.data.count
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped lang="scss">
.el-list-style2 .time{
  font-size: 12px;
  color: #999999;
  font-weight: 200;
}
.el-list-style2 .desc{
  color: #333;
}
.el-list-style2 .icon-important{
  margin-left: 5px;
  display: inline-block;
  width: 16px;
  height: 13px;
  background: url("/static/img/icon_01.png") no-repeat;
}
.el-list-style2 .icon-hot{
  margin-left: 5px;
  display: inline-block;
  width: 19px;
  height: 11px;
  background: url("/static/img/icon_02.png") no-repeat;
}
</style>
