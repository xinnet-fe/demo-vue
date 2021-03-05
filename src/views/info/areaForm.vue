<template>
  <div class="info-business-form">
    <el-dialog :close-on-click-modal="false" :before-close="beforeClose" destroy-on-close title="修改业绩区域" :visible.sync="formVisible" width="500px" @open="open">
      <el-form ref="form" :model="form" label-width="180px" :rules="rules">
        <el-form-item label="选择业绩区域" prop="selectedOptions" required>
          <el-cascader
            v-model="form.selectedOptions"
            placeholder="请选择业绩区域"
            :options="areaList"
            @change="handleChange"
          />
        </el-form-item>
        <!-- <el-form-item label="选择销售" prop="market" required>
          <el-select v-model="form.market" placeholder="请绑定销售">
            <el-option v-for="item in marketOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import clearFormData from '@/utils/clearFormData'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'BusinessForm',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array,
      default() {
        return []
      }
    },
    areaList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      form: {
        selectedOptions: ['', '']
      },
      rules: {
        selectedOptions: [
          { required: true, message: '必须填写！', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
    }),
    formVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const selected = this.$parent.multipleSelection
      if (selected.length === 1) {
        this.setData(selected)
      }
    })
  },
  methods: {
    ...mapActions('agent', ['updateAgentRegion']),
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.form)
          // 列表中选中行数据
          console.log(this.selected)
          // submit
          const params = {
            agentCodes: this.selected.map((v) => {
              return v.agentCode
            }).join(','),
            parentRegionId: this.form.selectedOptions[0],
            regionId: this.form.selectedOptions[1]
          }
          this.updateAgentRegion(params).then(res => {
            if (!res.code) {
              this.$message.success('修改成功!')
              this.closeModal()
              this.$parent.onSearch()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          return false
        }
      })
    },
    handleChange() {

    },
    closeModal() {
      const { form } = this.$refs
      this.$emit('update:visible', false)
      this.$emit('update:row', {})
      form.resetFields()
      form.clearValidate('form')
      clearFormData(this.form)
    },
    beforeClose(done) {
      this.closeModal()
      done()
    },
    setData(selected) {
      this.form.selectedOptions[0] = selected[0].parentRegionId
      this.form.selectedOptions[1] = selected[0].regionId
    },
    open() {
      // const selected = this.$parent.multipleSelection
      // if (selected.length === 1) {
      //   this.setData(selected)
      // }
    }
  }
}
</script>
