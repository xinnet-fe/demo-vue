<template>
  <el-dialog custom-class="dialogIssue" :close-on-click-modal="false" :append-to-body="true" :before-close="beforeClose" destroy-on-close title="下发任务" :visible.sync="dialogShow" width="500px">
    <el-form v-if="dialogShow" ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="下发任务有效期:" prop="date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="下发规则:">
        <div class="tips">基于现有的下发机制，分区-分司-部门-商务的下发机制及保护关系，下发到对应的商务。</div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :disabled="loading" @click="dialogSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AchievementHy',
  components: { },
  filters: {
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    ids: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      form: {
        date: ''
      },
      rules: {
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['performance/queryHyDlSalePerformanceData']
    }),
    dialogShow: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  watch: {

  },
  created() {
  },
  mounted() {

  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    beforeClose(done) {
      this.handleClose()
      done()
    },
    dialogSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          const query = {
            ids: this.ids
          }
          console.log(query)
          alert('submit!')
          this.handleClose()
          // 刷新列表
          this.$emit('getList')
        }
      })
    }
  }
}
</script>
<style scoped>
.tips{
  font-size: 12px;
  line-height: 16px;
  margin-top: 10px;
}
</style>
