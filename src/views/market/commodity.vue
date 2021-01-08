<template>
  <div class="container">
    <Search />
    <div class="activity_button">
      <el-button size="mini" @click="showModalJoin">关联活动</el-button>
      <el-button size="mini" @click="showModalRemove">解除活动</el-button>
      <el-button size="mini" @click="showModalAdd">添加商品</el-button>
    </div>
    <List />
    <el-dialog custom-class="customWidthRefundDialog" :before-close="beforeClose_Join" :close-on-click-modal="false" destroy-on-close title="关联活动" :visible.sync="formVisible_Join">
      <Join />
    </el-dialog>
    <el-dialog custom-class="customWidthRefundDialog" :before-close="beforeClose_Remove" :close-on-click-modal="false" destroy-on-close title="解除活动" :visible.sync="formVisible_Remove">
      <Remove />
    </el-dialog>
    <el-dialog custom-class="customWidthRefundDialog" :before-close="beforeClose_Add" :close-on-click-modal="false" destroy-on-close title="添加商品" :visible.sync="formVisible_Add">
      <Add />
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Search from './commodity/search'
import List from './commodity/list'
import Join from './commodity/join'
import Remove from './commodity/remove'
import Add from './commodity/add'

export default {
  components: {
    Search,
    List,
    Join,
    Remove,
    Add
  },
  data() {
    return {
      // 【关联活动】浮层
      formVisible_Join: false,
      // 【解除活动】浮层
      formVisible_Remove: false,
      // 【添加商品】浮层
      formVisible_Add: false
    }
  },
  computed: {
    ...mapState({
      // 商品关联活动（列表页 多选）
      commodity_multipleSelection: state => state.promotion.commodity_multipleSelection,
      // 查询多商品活动交集
      queryGoodsPromotionsIntersection: state => state.promotion.queryGoodsPromotionsIntersection
    })
  },
  methods: {
    // 显示【关联活动】浮层
    showModalJoin() {
      if (this.commodity_multipleSelection.length === 0) {
        this.$alert('请至少选择1个商品', { callback: () => {} })
      } else {
        this.formVisible_Join = true
      }
    },
    // 关闭【关联活动】浮层
    beforeClose_Join(done) {
      done()
    },
    // 显示【解除活动】浮层
    showModalRemove() {
      if (this.commodity_multipleSelection.length === 0) {
        this.$alert('请至少选择1个商品', { callback: () => {} })
      } else {
        // 查询多商品活动交集
        const priceCodes = []
        this.commodity_multipleSelection.forEach(item => {
          priceCodes.push(item.priceCode)
        })
        // console.log('数量：', priceCodes.length, '； 总字符：', priceCodes.join(',').length)
        this.$store.dispatch('promotion/queryGoodsPromotionsIntersection', {
          priceCodes: priceCodes.join(',')
        }).then(_ => {
          if (!this.queryGoodsPromotionsIntersection.code) {
            if (this.queryGoodsPromotionsIntersection.data.intersectPromotList.length === 0) {
              this.$alert('所选商品没有公共活动不能进行批量解除操作', { callback: () => {} })
            } else {
              this.formVisible_Remove = true
            }
          } else {
            this.$alert(this.queryGoodsPromotionsIntersection.msg, { callback: () => {} })
          }
        })
      }
    },
    // 关闭【解除活动】浮层
    beforeClose_Remove(done) {
      done()
    },
    // 显示【添加商品】浮层
    showModalAdd() {
      this.formVisible_Add = true
    },
    // 关闭【添加商品】浮层
    beforeClose_Add(done) {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 20px;
  overflow: hidden;
}
.activity_button {
  text-align: right;
  margin-bottom: 10px;
  padding-right: 10px;
}
</style>

<style lang="scss">
.customWidthRefundDialog{
  width: 50%;
  min-width: 720px;
}
</style>