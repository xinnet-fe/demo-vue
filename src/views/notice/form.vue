<template>
  <el-dialog :close-on-click-modal="false" :before-close="beforeClose" destroy-on-close title="活动公告" :visible.sync="formVisible" width="800px" custom-class="dialog-notice">
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
      <el-form-item label="置顶图片上传" prop="imageUrl">
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <span v-if="form.imageUrl" class="el-upload-list__item-actions">
            <span>
              <i class="el-icon-upload2" /><br>重新上传
            </span>
          </span>
          <div slot="tip" class="el-upload__tip">仅支持JPG格式图片，1200*800px，小于500K</div>
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
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
        imageUrl: '',
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
        ],
        imageUrl: [
          { required: true, message: '请上传照片', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/openAgentUser']
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

    },
    handleAvatarSuccess(res, file) {
      this.form.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const type = 'image/jpeg,image/jpg'
      const isImg = type.indexOf(file.type)
      const isLt1M = file.size < 5000

      if (isImg < 0) {
        this.$message.error('上传头像格式错误!')
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 500k!')
      }
      return isImg && isLt1M
    }
  }
}
</script>
<style lang="scss">
.dialog-notice .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.dialog-notice .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.dialog-notice .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.dialog-notice .avatar-uploader .el-upload-list__item-actions{
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 178px;
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, .5);
  text-align: center;
  vertical-align: middle;
  display: none;
  font-size: 12px;
  color: #fff;
}
.dialog-notice .avatar-uploader .el-upload-list__item-actions span{
  display: inline-block;
  line-height: 20px;
}
.dialog-notice .avatar-uploader .el-upload-list__item-actions span i{
  font-size: 21px;
}
.dialog-notice .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.dialog-notice .avatar-uploader .el-upload:hover .el-upload-list__item-actions{
  display: block;
}
.dialog-notice .avatar-uploader .el-upload__tip{
  color: #999;
}
</style>

