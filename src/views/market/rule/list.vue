<template>
  <div>
    <el-table
      v-loading="loading"
      highlight-current-row
      :data="queryPromotionsRules.data.list"
    >
      <el-table-column label="活动名称">
        <template v-slot="scope">
          <span v-if="len(scope.row.promotionName) < 36">{{ scope.row.promotionName }}</span>
          <el-tooltip v-else :content="scope.row.promotionName" placement="top">
            <span>{{ scope.row.promotionName.subCHStr(0, 34) + '..' }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="活动类型" width="70">
        <template v-slot="scope">
          <span>{{ scope.row.preferentialForm | preferentialFormFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动时间" width="200">
        <template v-slot="scope">
          <el-tooltip :content="scope.row.eventStartTime + ' 至 ' + scope.row.eventEndTime" placement="top">
            <span>
              {{ formatTime(scope.row.eventStartTime, scope.row.eventEndTime) }}
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template v-slot="scope">
          <span v-if="len(scope.row.remark) < 36">{{ scope.row.remark }}</span>
          <el-tooltip v-else :content="scope.row.remark" placement="top">
            <span>{{ scope.row.remark.subCHStr(0, 34) + '..' }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="updateName" label="更新人" width="100" />
      <el-table-column prop="updateTime" label="更新时间" width="135" />
      <el-table-column label="操作" fixed="right" width="80">
        <template v-slot="scope">
          <el-button size="mini" @click="showActivityModal(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total.sync="queryPromotionsRules.data.count"
      :limit.sync="ruleQueryWhere.pageSize"
      :page.sync="ruleQueryWhere.pageNum"
      :page-sizes="[10, 20, 30, 50, 100, 200]"
      @pagination="queryPromotionsRules_handle"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import pagination from '@/components/Pagination'
import formatTime from '@/utils/formatTime'
import '@/utils/stringLen'

export default {
  components: {
    pagination
  },
  filters: {
    preferentialFormFormat(v) {
      if (v === '1') {
        return '折扣'
      } else if (v === '2') {
        return '立减'
      }
      return v
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      // loading
      loading: state => state.loading.effects['promotion/queryPromotionsRules'],
      // 查询活动的查询条件
      ruleQueryWhere: state => state.promotion.ruleQueryWhere,
      // 活动列表
      queryPromotionsRules: state => state.promotion.queryPromotionsRules
    }),
    len() {
      return str => {
        if (typeof (str) !== 'string') {
          str = ''
        }
        return str.strLen2()
      }
    },
    formatTime() {
      return (begin, end) => {
        return formatTime(new Date(begin).getTime(), 'YYYY-MM-DD') + ' 至 ' + formatTime(new Date(end).getTime(), 'YYYY-MM-DD')
      }
    }
  },
  watch: {
    ruleQueryWhere() {
      // console.log('ruleQueryWhere 发生了变化')
      // 显示列表
      this.queryPromotionsRules_handle()
    }
  },
  created() {
    // 初始化，显示列表
    this.queryPromotionsRules_handle()
  },
  methods: {
    // 活动规则设置
    // 活动列表
    queryPromotionsRules_handle() {
      // console.log('ruleQueryWhere=', this.ruleQueryWhere)
      // vuex 活动列表
      this.$store.dispatch('promotion/queryPromotionsRules', this.ruleQueryWhere).then(_ => {
        if (this.queryPromotionsRules.code) {
          this.$alert(this.queryPromotionsRules.msg, { callback: () => {} })
        }
      })
    },
    showActivityModal(row) {
      // 显示【修改活动】弹出框
      this.$parent.formVisible_updateActivityForm = true
      // 修改了哪条数据
      this.$parent.row = row
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
