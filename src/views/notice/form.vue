<template>
  <el-dialog :close-on-click-modal="false" :before-close="beforeClose" destroy-on-close title="活动公告" :visible.sync="formVisible" width="800px">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="tag">
        <el-select v-model="form.tag" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布者" prop="author">
        <el-select v-model="form.author" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="置顶有效期" prop="date">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="开关">
        <el-switch v-model="form.top" />
      </el-form-item>
      <el-form-item label="上传">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
        >
          <i slot="default" class="el-icon-plus" />
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download" />
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete" />
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogViewImgVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="closeModal">取 消</el-button>
      <el-button size="medium" type="primary" @click="onSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AgentNoticeForm',
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
      form: {
        title: '',
        type: '',
        tag: '',
        author: '',
        date: '',
        top: false,
        file: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请填写！', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择！', trigger: 'change' }
        ],
        tag: [
          { required: true, message: '请选择！', trigger: 'change' }
        ],
        author: [
          { required: true, message: '请选择！', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请选择！', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/openAgentUser'],
      // queryOrganSaleList (state) {
      //   // console.log(JSON.stringify(state.userManager.queryOrganSaleList).replace(/(orgCode|ptid)/g, 'value'))
      //   // return JSON.parse(JSON.stringify(state.userManager.queryOrganSaleList).replace(/(orgCode|ptid)/g, 'value').replace(/(name)/g, 'label'))
      //   return state.userManager.queryOrganSaleList.map((v) => {
      //     const item = {
      //       label: v.name,
      //       value: v.orgCode
      //     }
      //     if (v.salemans && v.salemans.length) {
      //       item.children = []
      //       item.children = v.salemans.map((v2) => {
      //         return {
      //           label: v2.name,
      //           value: v2.ptid
      //         }
      //       })
      //     }
      //     return item
      //   })
      // },
      allGrade(state) {
        return state.userManager.allGrade
      }
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
  methods: {
    ...mapActions('userManager', ['openAgentUser']),
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.form)
          const params = {
            agentCode: this.row.agentCode,
            organCode: this.form.selectedOptions[0],
            gradeCode: this.form.level,
            saleCode: this.form.selectedOptions[1]
          }
          // submit
          this.openAgentUser(params).then(res => {
            if (!res.code) {
              if (res.data.isSuccess === '1') {
                this.$message.success('处理成功!')
                this.closeModal()
                this.$parent.onSearch()
              } else {
                this.$message.error('处理失败!')
              }
            } else {
              this.$message.error(res.msg)
            }
          }).catch(error => {
            this.$message.error(error)
          })
        } else {
          return false
        }
      })
    },
    closeModal() {
      const { form } = this.$refs
      this.$emit('update:visible', false)
      this.$emit('update:row', {})
      form.resetFields()
      form.clearValidate('form')
    },
    beforeClose(done) {
      this.closeModal()
      done()
    },
    handleChange() {

    }
  }
}
</script>
