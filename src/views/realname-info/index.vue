<template>
  <div>
    <el-tabs v-model="activeName" class="realname-info" @tab-click="handleClick">
      <el-tab-pane label="身份证信息查询" name="first">
        <el-form ref="formPersonal" :rules="rules1" :model="formPersonal" label-width="130px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formPersonal.name" />
          </el-form-item>
          <el-form-item label="居民身份证号" prop="idcard">
            <el-input v-model="formPersonal.idcard" />
          </el-form-item>
          <el-form-item label="头像照片" prop="imageId">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/realnamequery/upload"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove"
              :before-upload="handleBeforeUpload"
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">支持JPG（JPEG），BMP， PNG， GIF，TIFF,格式，大小不能超过1M</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" :loading="loading1" @click="handleQuery1">查询</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="企业信息查询" name="second">
        <el-form ref="formBusiness" :rules="rules2" :model="formBusiness" label-width="130px">
          <el-form-item label="企业名称" prop="entname">
            <el-input v-model="formBusiness.entname" />
          </el-form-item>
          <el-form-item label="统一社会信用代码" prop="creditcode">
            <el-input v-model="formBusiness.creditcode" />
          </el-form-item>
          <el-form-item label="法人姓名" prop="frname">
            <el-input v-model="formBusiness.frname" />
          </el-form-item>
          <el-form-item>
            <el-button size="medium" type="primary" :loading="loading2" @click="handleQuery2">查询</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      custom-class="realnamereslut"
      width="500px"
    >
      <span><i v-if="code==='10000'" class="el-icon-success" /><i v-if="code!=='10000'" class="el-icon-error" /> {{ msg }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'RealNameInfo',
  components: {},
  data() {
    return {
      msg: '',
      dialogVisible: false,
      activeName: 'first',
      code: '',
      formPersonal: {
        name: '',
        idcard: '',
        imageId: ''
      },
      formBusiness: {
        entname: '',
        creditcode: '',
        frname: ''
      },
      rules1: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 1, max: 18, message: '格式错误', trigger: 'blur' }
        ],
        imageId: [
          { required: true, message: '请上传照片', trigger: 'change' }
        ]
      },
      rules2: {
        entname: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        creditcode: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
          { min: 1, max: 100, message: '格式错误', trigger: 'blur' }
        ],
        frname: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' },
          { min: 1, max: 100, message: '格式错误', trigger: 'blur' }
        ]
      },
      fileList: []
    }
  },
  computed: {
    ...mapState({
      loading1: state => state.loading.effects['realnamequery/comparePortrait'],
      loading2: state => state.loading.effects['realnamequery/compareEnterpriseInfo']
    })
  },
  watch: {
    activeName(val) {
      // this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {

  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleAvatarSuccess(res, file) {
      if (res.code === '10000' && res.success) {
        this.formPersonal.imageId = res.data
      } else {
        this.$message.warning(res.msg)
      }
    },
    handleRemove(file, fileList) {
      if (!fileList.length) {
        this.formPersonal.imageId = ''
      }
    },
    handleBeforeUpload(file) {
      const type = 'image/jpeg,image/jpg,image/bmp,image/png,image/gif,image/tiff'
      const isImg = type.indexOf(file.type)
      const isLt = file.size / 1024 / 1024 < 1
      let format = true

      if (isImg < 0) {
        format = false
        this.$message.error('上传头像格式错误!')
      }
      if (!isLt) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return format && isLt
    },
    handleQuery1() {
      this.$refs.formPersonal.validate((valid) => {
        const { name, idcard, imageId } = this.formPersonal
        if (valid) {
          const data = {
            name,
            idcard,
            imageId
          }
          this.$store.dispatch('realnamequery/comparePortrait', data).then(res => {
            this.code = res.code
            this.msg = res.message
            if (res.code === '10000') {
              if ((res.data * 1) > 0.7) {
                this.msg = '身份证信息验证通过'
              } else {
                this.code = '10000000'
                this.msg = '身份证信息验证不通过'
              }
            } else if (res.code === '10014' || res.code === '10015') {
              this.msg = '照片质量不合格'
            } else {
              this.msg = res.message
            }
            this.dialogVisible = true
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    handleQuery2() {
      this.$refs.formBusiness.validate((valid) => {
        const { entname, creditcode, frname } = this.formBusiness
        if (valid) {
          const data = {
            entname,
            creditcode,
            frname
          }
          this.$store.dispatch('realnamequery/compareEnterpriseInfo', data).then(res => {
            this.msg = res.message
            this.dialogVisible = true
          }).catch(error => {
            console.log(error)
          })
        }
      })
    }
  }
}
</script>

<style>
.el-tabs.realname-info{
  padding: 0 20px;
}
.realname-info .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.realname-info .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.realname-info .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.realname-info .avatar-uploader .el-upload-list__item-actions{
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
.realname-info .avatar-uploader .el-upload-list__item-actions span{
  display: inline-block;
  line-height: 20px;
}
.realname-info .avatar-uploader .el-upload-list__item-actions span i{
  font-size: 21px;
}
.realname-info .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.realname-info .avatar-uploader .el-upload:hover .el-upload-list__item-actions{
  display: block;
}
.realname-info .avatar-uploader .el-upload__tip{
  color: #999;
}
.realnamereslut .el-icon-error:before{
  font-size: 20px;
  color: #f56c6c;
  position: relative;
  top: 2px;
}
.realnamereslut .el-icon-success:before{
  font-size: 20px;
  color: #67c23a;
  position: relative;
  top: 2px;
}
</style>
