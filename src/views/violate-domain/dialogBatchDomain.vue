<template>
  <el-dialog
    title="批量操作"
    :close-on-click-modal="false"
    :visible.sync="dialogBatch"
    width="500px"
    :destroy-on-close="true"
    :append-to-body="true"
    :before-close="beforeClose"
  >
    <el-form ref="batchForm" :model="batchForm" label-width="120px">
      <el-form-item label="方式：" prop="mode">
        <el-radio-group v-model="batchForm.mode">
          <el-radio v-for="(item, index) in batchForm.modeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
        <div class="tips" style="color: #aaa;font-size:12px;">*已显示或已隐藏的域名不进行任何操作</div>
      </el-form-item>
      <el-form-item label="批量操作范围：" prop="operationScope">
        <el-radio-group v-model="batchForm.operationScope">
          <el-radio v-for="(item, index) in batchForm.operationScopeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="同模板域名数量：">
        超过800，则1~800随机显示
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="handleClose">关闭</el-button>
      <el-button type="primary" size="medium" @click="handleSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogBatch',
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
      batchForm: {
        mode: '1',
        modeOptions: [{
          label: '批量显示',
          value: '1'
        }, {
          label: '批量隐藏',
          value: '2'
        }],
        operationScope: 'search',
        operationScopeOptions: [{
          label: '全部筛选结果',
          value: 'search'
        }, {
          label: '选中域名',
          value: 'check'
        }],
        templateNum: '1',
        templateNumOptions: [{
          label: '显示全部',
          value: '1'
        }, {
          label: '超过100个则100以内数量随机',
          value: '2'
        }],
        domain: ''
      },
      loading: false
    }
  },
  computed: {
    dialogBatch: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  mounted() {
    console.log(this.$parent.searchForm)
  },
  methods: {
    handleSubmit() {
      const query = {
        type: this.batchForm.operationScope,
        setStatus: this.batchForm.mode,
        ids: ''
      }
      if (this.batchForm.operationScope === 'check' && !this.ids.length) {
        this.$message({
          message: '请选择域名',
          type: 'warning'
        })
      } else {
        if (this.batchForm.operationScope === 'search') {
          query.ids = ''
          query[this.$parent.searchForm.type] = this.$parent.searchForm.word
          query.createTimeBegin = this.$parent.searchForm.createTimeBegin
          query.createTimeEnd = this.$parent.searchForm.createTimeEnd
          query.status = this.$parent.searchForm.status
          query.holdSource = this.$parent.searchForm.holdSource
        } else {
          query.ids = this.ids
        }
        this.$store.dispatch('violateDomain/setViolateDomain', query).then(res => {
          if (res.code === '0') {
            this.$alert(`<p>成功：${res.successCount}个</p><p>失败：${res.faildCount}个</p>`, '提示', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: '确定',
              callback: () => {
                this.$emit('refreshList')
                this.handleClose()
              }
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    beforeClose(done) {
      this.handleClose()
      done()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
