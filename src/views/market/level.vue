<template>
  <div class="container">
    <Search />
    <div class="activity_button">
      <el-button size="mini" @click="showModalJoin">关联活动</el-button>
      <el-button size="mini" @click="showModalRemove">解除活动</el-button>
    </div>
    <List />
    <el-dialog custom-class="customWidthRefundDialog" :before-close="beforeClose_Join" :close-on-click-modal="false" destroy-on-close title="关联活动" :visible.sync="formVisible_Join">
      <Join v-if="formVisible_Join" />
    </el-dialog>
    <el-dialog custom-class="customWidthRefundDialog" :before-close="beforeClose_Remove" :close-on-click-modal="false" destroy-on-close title="解除活动" :visible.sync="formVisible_Remove">
      <Remove v-if="formVisible_Remove" />
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Search from './level/search'
import List from './level/list'
import Join from './level/join'
import Remove from './level/remove'

export default {
  components: {
    Search,
    List,
    Join,
    Remove
  },
  data() {
    return {
      // 【关联活动】浮层
      formVisible_Join: false,
      // 【解除活动】浮层
      formVisible_Remove: false
    }
  },
  computed: {
    ...mapState({
      // 等级关联活动（列表页 多选）
      level_multipleSelection: state => state.promotion.level_multipleSelection,
      // 查询等级活动交集
      queryGradePromotionsIntersection: state => state.promotion.queryGradePromotionsIntersection
    })
  },
  methods: {
    // 显示【关联活动】浮层
    showModalJoin() {
      this.formVisible_Join = true
    },
    // 关闭【关联活动】浮层
    beforeClose_Join(done) {
      done()
    },
    // 显示【解除活动】浮层
    showModalRemove() {
      // console.log('level_multipleSelection = ', this.level_multipleSelection)
      if (this.level_multipleSelection.length === 0) {
        this.$alert('请至少选择1个等级', { callback: () => {} })
      } else {
        // 查询等级活动交集
        const gradeCodes = []
        this.level_multipleSelection.forEach(item => {
          gradeCodes.push(item.gradeCode)
        })
        this.$store.dispatch('promotion/queryGradePromotionsIntersection', {
          gradeCodes: gradeCodes.join(',')
        }).then(_ => {
          // console.log('queryGradePromotionsIntersection = ', this.queryGradePromotionsIntersection)
          if (this.queryGradePromotionsIntersection.data.agentGradeList.length === 0) {
            this.$alert('所选等级没有公共活动不能进行批量解除操作', { callback: () => {} })
          } else {
            this.formVisible_Remove = true
          }
        })
      }
    },
    // 关闭【解除活动】浮层
    beforeClose_Remove(done) {
      console.log('关闭【解除活动】浮层')
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