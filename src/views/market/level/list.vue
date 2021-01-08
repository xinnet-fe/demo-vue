<template>
  <div>
    <el-table
      v-loading="loading"
      highlight-current-row
      :data="queryGradePromotionsRelation.data.list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55" />
      <el-table-column label="代理级别">
        <template v-slot="scope">
          <span v-if="len(scope.row.gradeName) < 36">{{ scope.row.gradeName }}</span>
          <el-tooltip v-else :content="scope.row.gradeName" placement="top">
            <span>{{ scope.row.gradeName.subCHStr(0, 34) + '..' }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="关联活动">
        <template v-slot="scope">
          <span v-if="len(scope.row.promotionName) < 36">{{ scope.row.promotionName }}</span>
          <el-tooltip v-else :content="scope.row.promotionName" placement="top">
            <span>{{ scope.row.promotionName.subCHStr(0, 34) + '..' }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="updateName" label="更新人" width="135" />
      <el-table-column prop="updateTime" label="更新时间" width="135" />
    </el-table>
    <pagination
      :total.sync="queryGradePromotionsRelation.data.count"
      :limit.sync="levelQueryWhere.pageSize"
      :page.sync="levelQueryWhere.pageNum"
      :page-sizes="[10, 20, 30, 50, 100, 200]"
      @pagination="queryGradePromotionsRelation_handle"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pagination from '@/components/Pagination'
import '@/utils/stringLen'

export default {
  components: {
    pagination
  },
  data() {
    return {
      // 多选
      multipleSelection: []
    }
  },
  computed: {
    ...mapState({
      // loading
      loading: state => state.loading.effects['promotion/queryGradePromotionsRelation'],
      // 查询条件
      levelQueryWhere: state => state.promotion.levelQueryWhere,
      // 列表
      queryGradePromotionsRelation: state => state.promotion.queryGradePromotionsRelation
    }),
    len() {
      return str => {
        if (typeof (str) !== 'string') {
          str = ''
        }
        return str.strLen2()
      }
    }
  },
  watch: {
    levelQueryWhere() {
      // 显示列表
      this.queryGradePromotionsRelation_handle()
    }
  },
  created() {
    // 初始化，显示列表
    this.queryGradePromotionsRelation_handle()
  },
  methods: {
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$store.dispatch('promotion/level_multipleSelection', this.multipleSelection)
    },
    // 等级关联活动
    // 列表
    queryGradePromotionsRelation_handle() {
      // 活动列表
      this.$store.dispatch('promotion/queryGradePromotionsRelation', this.levelQueryWhere)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
