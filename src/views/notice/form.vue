<template>
  <el-dialog :close-on-click-modal="false" :before-close="beforeClose" destroy-on-close title="活动公告" :visible.sync="formVisible" width="850px" custom-class="dialog-notice">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" :maxlength="50" />
      </el-form-item>
      <el-form-item label="类型" prop="preType">
        <el-select v-model="form.preType" placeholder="请选择活动区域">
          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-select v-model="form.label" placeholder="请选择活动区域">
          <el-option v-for="item in tagList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布者" prop="publisher">
        <el-select v-model="form.publisher" placeholder="请选择活动区域">
          <el-option v-for="item in authorList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="置顶有效期" prop="date" :required="isHaveTo">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="开关">
        <el-switch v-model="form.placedTop" active-value="1" inactive-value="0" />
      </el-form-item>
      <el-form-item label="置顶图片上传" prop="topTitlePathForView" :required="isHaveTo">
        <el-upload
          class="avatar-uploader"
          action="/userManager/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.topTitlePath" :src="form.topTitlePathForView" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <span v-if="form.topTitlePath" class="el-upload-list__item-actions">
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
      <el-form-item label="内容" prop="content">
        <!-- <vue-editor v-model="form.content" use-custom-image-handler @image-added="handleImageAdded" /> -->
        <editor
          id="editor_id"
          height="400px"
          width="680px"
          :content.sync="form.content"
          :after-change="afterChange()"
          plugins-path="/static/kindeditor/plugins/"
          upload-json="/userManager/upload?type=kindeditor"
          :fill-desc-after-upload-image="false"
          file-post-name="file"
          :items="editorItems"
          :load-style-mode="false"
          :after-upload="afterUpload"
          @on-content-change="onContentChange"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="medium" @click="closeModal">取 消</el-button>
      <el-button size="medium" type="primary" :loading="(loading || loading2)" @click="onSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AgentNoticeForm',
  components: {
  },
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
  // 验证活动名称的函数
    const validateName = (rule, value, callback) => {
      // 当活动名称为空值且为必填时，抛出错误，反之通过校验
      console.log(rule)
      if (this.form.date === '' && this.isHaveTo) {
        callback(new Error('请选择日期'))
      } else {
        callback()
      }
    }
    const validateName2 = (rule, value, callback) => {
      // 当活动名称为空值且为必填时，抛出错误，反之通过校验
      console.log(rule)
      if (this.form.date === '' && this.isHaveTo) {
        callback(new Error('请上传图片'))
      } else {
        callback()
      }
    }
    return {
      form: {
        title: '',
        preType: '',
        label: '',
        publisher: '',
        date: '',
        placedTop: 0,
        topTitlePath: '',
        topTitlePathForView: '',
        content: ''
      },
      typeList: [
        { label: '公告', value: '1' },
        { label: '活动', value: '2' }
      ],
      tagList: [
        { label: '域名', value: '域名' },
        { label: '代理商', value: '代理商' },
        { label: '企业邮件', value: '企业邮件' },
        { label: '企业建站', value: '企业建站' },
        { label: '云产品', value: '云产品' },
        { label: '虚拟主机', value: '虚拟主机' }
      ],
      authorList: [
        { label: '新网小新', value: '新网小新' },
        { label: '新网', value: '新网' },
        { label: '新网代理', value: '新网代理' }
      ],
      rules: {
        title: [
          { required: true, message: '请填写！', trigger: 'blur' }
        ],
        preType: [
          { required: true, message: '请选择！', trigger: 'change' }
        ],
        label: [
          { required: true, message: '请选择！', trigger: 'change' }
        ],
        publisher: [
          { required: true, message: '请选择！', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请填写！', trigger: 'change' }
        ],
        date: [
          { validator: validateName }
        ],
        topTitlePathForView: [
          { validator: validateName2 }
        ]
      },
      editorItems: [
        'source', '|', 'undo', 'redo', '|', 'cut', 'copy', 'paste',
        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', '|', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'table', 'hr', 'pagebreak', 'anchor', 'link', 'unlink'
      ]
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/addActivityAnnounce'],
      loading2: state => state.loading.effects['userManager/updateActivityAnnounce']
    }),
    formVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    isHaveTo: function() {
      return this.form.placedTop !== '0'
    }
  },
  mounted() {
    console.log(this.row)
    this.$nextTick(function() {
      console.error(this)
      if (this.row.id) {
        this.form.title = this.row.title
        this.form.preType = this.row.preType
        this.form.label = this.row.label
        this.form.publisher = this.row.publisher
        this.form.date = [this.row.topStartDate, this.row.topEndDate]
        this.form.placedTop = this.row.placedTop
        this.form.topTitlePath = this.row.topTitlePath
        this.form.topTitlePathForView = '/userManager/echoImage?imgUrl=' + this.row.topTitlePath
        this.form.content = this.row.content
      }
    })
  },
  methods: {
    ...mapActions('userManager', ['addActivityAnnounce', 'updateActivityAnnounce', 'upload']),
    onSubmit() {
      this.$refs.form.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.form)
          const params = this.form
          params.topStartDate = this.form.date && this.form.date[0] ? `${this.form.date[0]} 00:00:00` : ''
          params.topEndDate = this.form.date && this.form.date[1] ? `${this.form.date[1]} 23:59:59` : ''
          // submit
          if (!this.row.id) {
            this.addActivityAnnounce(params).then(res => {
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
            params.id = this.row.id
            this.updateActivityAnnounce(params).then(res => {
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
          }
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
      console.log(res)
      if (res.success) {
        this.form.topTitlePath = res.data.ftpPath
        this.form.topTitlePathForView = URL.createObjectURL(file.raw)
      } else {
        this.$message.error(res.msg)
      }
    },
    beforeAvatarUpload(file) {
      const type = 'image/jpeg,image/jpg'
      const isImg = type.indexOf(file.type)
      const isLt1M = file.size < 500000

      if (isImg < 0) {
        this.$message.error('上传头像格式错误!')
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 500k!')
      }
      return isImg && isLt1M
    },
    onContentChange(val) {
      console.log(val)
      this.form.content = val
    },
    afterChange(v) {
    },
    afterUpload(res) {
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      console.log(file)
      formData.append('file', file) // 这里的image是请求参数
      this.upload(formData).then(res => {
        const url = '/userManager/echoImage?imgUrl=' + res.data.ftpPath // Get url from response
        // 往编辑器中添加刚刚上传成功的图片，第一个参数是编辑器获得焦点的地方，第三个是图片路径（需加上基准路径$axios.defaults.baseURL）
        Editor.insertEmbed(cursorLocation, 'image', url)
        resetUploader()
      }).catch(error => {
        console.log(error)
        this.$message.error('文件大小超出范围')
      })
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
.dialog-notice .ql-picker-label{
  line-height: 20px;
}
</style>

