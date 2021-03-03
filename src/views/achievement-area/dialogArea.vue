<template>
  <el-dialog custom-class="dialogArea" :close-on-click-modal="false" :append-to-body="true" :before-close="beforeClose" destroy-on-close :title="title" :visible.sync="dialogAreaVisible" width="600px">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="上级区域：" prop="superId">
        <el-select v-model="form.superId" placeholder="请选择" :disabled="disabled" @change="changeOption">
          <el-option v-for="item in regionList" :key="item.id" :label="item.regionName" :value="item.id" />
          <!-- <el-option :key="1" label="001" value="001" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="区域名称：" prop="regionName">
        <el-input v-model="form.regionName" placeholder="请输入区域名称，限20个字符" maxlength="20" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关 闭</el-button>
      <el-button type="primary" :disabled="loading || loading2" @click="handleSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'DialogSubmitMaterial',
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
      title: '添加区域',
      form: {
        superId: '',
        level: '',
        regionName: ''
      },
      rules: {
        superId: [
          { required: true, message: '必须填写！', trigger: 'change' }
        ],
        regionName: [
          { required: true, message: '必须填写！', trigger: 'blur' }
        ]
      },
      regionList: [],
      disabled: false
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.effects['region/addRegionData'],
      loading2: (state) => state.loading.effects['region/updateRegionNameById']
    }),
    dialogAreaVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    ...mapActions('region', ['addRegionData', 'selectRegionDataDropDown', 'updateRegionNameById']),
    handleClose() {
      this.$emit('update:visible', false)
    },
    beforeClose(done) {
      this.handleClose()
      done()
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.row.id) {
            const query = {
              regionName: this.form.regionName,
              id: this.row.id
            }
            this.updateRegionNameById(query).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.handleClose()
                this.$emit('getList')
              } else {
                this.$message.error(res.msg)
              }
            }).catch((error) => {
              this.$message.error(error)
            })
          } else {
            const query = {
              ...this.form
            }
            this.addRegionData(query).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.handleClose()
                this.$emit('getList')
              } else {
                this.$message.error(res.msg)
              }
            }).catch((error) => {
              this.$message.error(error)
            })
          }
        }
      })
    },
    handleSelectRegionDataDropDown() {
      this.selectRegionDataDropDown().then((res) => {
        this.regionList = res.data
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    changeOption() {
      let obj = {}
      obj = this.regionList.find(
        item => {
          console.log(item.id + '===' + this.form.superId)
          return item.id === this.form.superId // 筛选出对应数据
        }
      )
      this.form.level = obj.level
    }
  },
  created() {
    this.handleSelectRegionDataDropDown()
  },
  mounted() {
    if (this.row.id) {
      this.title = '修改区域'
      this.form.superId = this.row.superId
      this.form.level = this.row.level
      this.form.regionName = this.row.regionName
      this.disabled = true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
