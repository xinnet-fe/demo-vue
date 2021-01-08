<template>
  <div class="dlyx">
    <el-table
      v-loading="loading"
      highlight-current-row
      :data="queryGoodsPromotionsList.data.list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="55" />
      <el-table-column label="商品名称">
        <template v-slot="scope">
          <span v-if="len(scope.row.goodsName) < 23">{{ scope.row.goodsName }}</span>
          <el-tooltip v-else :content="scope.row.goodsName" placement="top">
            <span>{{ scope.row.goodsName.subCHStr(0, 21) + '..' }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="goodsCode" label="商品编号" width="150" />
      <el-table-column label="产品类别" width="190">
        <template v-slot="scope">
          <span v-if="len(scope.row.productClassName) < 23">{{ scope.row.productClassName }}</span>
          <el-tooltip v-else :content="scope.row.productClassName" placement="top">
            <span>{{ scope.row.productClassName.subCHStr(0, 21) + '..' }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="规格" width="80">
        <template v-slot="scope">
          <span>{{ scope.row.timeAmount | amount_format(scope.row.timeUnit) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格（元）" width="80" />
      <el-table-column label="关联活动">
        <template v-slot="scope">
          <span v-if="len(scope.row.promotionName) < 22">{{ scope.row.promotionName }}</span>
          <el-tooltip v-else :content="scope.row.promotionName" placement="top">
            <span>{{ scope.row.promotionName.subCHStr(0, 20) + '..' }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="updateName" label="更新人" width="80" />
      <el-table-column prop="updateTime" label="更新时间" width="135" />
    </el-table>
    <pagination
      :total.sync="queryGoodsPromotionsList.data.count"
      :limit.sync="commodityQueryWhere.pageSize"
      :page.sync="commodityQueryWhere.pageNum"
      :page-sizes="[10, 20, 30, 50, 100, 200]"
      @pagination="queryGoodsPromotionsList_handle"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import '@/utils/stringLen'

export default {
  components: {
    Pagination
  },
  filters: {
    amount_format(v, unit) {
      return v + {
        Y: '年',
        M: '月',
        D: '日',
        C: '次'
      }[unit]
    }
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
      loading: state => state.loading.effects['promotion/queryGoodsPromotionsList'],
      // 查询条件
      commodityQueryWhere: state => state.promotion.commodityQueryWhere,
      // 列表
      queryGoodsPromotionsList: state => state.promotion.queryGoodsPromotionsList
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
    commodityQueryWhere() {
      // console.log('watch -> commodityQueryWhere')
      // 显示列表
      this.queryGoodsPromotionsList_handle()
    }
  },
  created() {
    // 初始化，显示列表
    this.queryGoodsPromotionsList_handle()
  },
  methods: {
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$store.dispatch('promotion/commodity_multipleSelection', this.multipleSelection)
    },
    // 列表  商品关联活动分页列表
    queryGoodsPromotionsList_handle() {
      // console.log('commodityQueryWhere = ', this.commodityQueryWhere)
      this.$store.dispatch('promotion/queryGoodsPromotionsList', this.commodityQueryWhere)
    }
  }
}
</script>

<style lang="scss">
.dlyx{
  .el-table-column--selection .cell {
    padding-left: 15px !important;
  }
}
</style>
