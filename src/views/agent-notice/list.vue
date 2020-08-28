<template>
  <div>
    <ul class="el-list el-list-style2">
      <li v-for="(item, i) in list" :key="i" class="el-list-item clearfix">
        <strong class="tit"><a @click="handleShow(item)">{{ item.address }}</a><br><span class="time">{{ item.date }}</span></strong>
        <p class="desc">{{ item.date }}</p>
      </li>
    </ul>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
    />
  </div>
</template>

<script>
import Pagination from '@/components/demos/Pagination'

export default {
  name: 'Notice',
  components: { Pagination },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      page: {
        page: 1,
        total: 20,
        limit: 10
      }
    }
  },
  created() {
  },
  methods: {
    handleShow(item) {
      this.$emit('showDetail', item)
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
</style>
