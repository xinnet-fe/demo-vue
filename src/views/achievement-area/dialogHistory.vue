<template>
  <el-dialog custom-class="dialogHistory" :close-on-click-modal="false" :append-to-body="true" :before-close="beforeClose" destroy-on-close title="负责人变更历史" :visible.sync="dialogHistoryVisible" width="600px">
    <el-table
      ref="dragTable"
      v-loading="loading"
      :data="list"
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="负责人" prop="director" />
      <el-table-column label="所属机构" prop="conpany" />
      <el-table-column label="变更时间" prop="createTime" />
      <el-table-column label="操作人" prop="operator" />
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      @pagination="getList"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关 闭</el-button>
      <!-- <el-button type="primary" :disabled="loading" @click="handleSubmit">确定</el-button> -->
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Pagination from '@/components/demos/Pagination' // secondary package based on el-pagination
export default {
  name: 'DialogHistory',
  components: { Pagination },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      list: [],
      page: {
        total: 0,
        page: 0,
        limit: 10
      }
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['region/selectDirectorRecord']
    }),
    dialogHistoryVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    ...mapActions('region', ['selectDirectorRecord']),
    getList(page) {
      const query = {
        id: this.row.id
      }
      console.log(query)
      if (page) {
        query.pageNum = page.page
        query.pageSize = page.limit
      } else {
        query.pageNum = 1
        query.pageSize = this.page.limit
        this.page.page = 1
      }
      this.selectDirectorRecord(query).then((res) => {
        this.list = res.data.list
        this.page.total = res.data.count
      }).catch((error) => {
        this.$message.error('加载失败，请稍后再试或减少查询数据量')
        console.log(error)
      })
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    beforeClose(done) {
      this.handleClose()
      done()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="scss" scoped>

</style>
