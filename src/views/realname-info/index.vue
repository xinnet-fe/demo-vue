<template>
  <el-tabs v-model="activeName" class="realname-info" @tab-click="handleClick">
    <el-tab-pane label="身份证信息查询" name="first">
      <el-form ref="formPersonal" :rules="rules1" :model="formPersonal" label-width="130px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formPersonal.name" />
        </el-form-item>
        <el-form-item label="居民身份证号" prop="idcard">
          <el-input v-model="formPersonal.idcard" />
        </el-form-item>
        <el-form-item label="头像照片" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="formPersonal.imageUrl" :src="formPersonal.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <span v-if="formPersonal.imageUrl" class="el-upload-list__item-actions">
              <span>
                <i class="el-icon-upload2" /><br>重新上传
              </span>
            </span>
            <div slot="tip" class="el-upload__tip">支持JPG（JPEG），BMP， PNG， GIF，TIFF,格式，大小不能超过1M</div>
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog> -->
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="handleQuery1">查询</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="企业信息查询" name="second">
      <el-form ref="formBusiness" :rules="rules2" :model="formBusiness" label-width="120px">
        <el-form-item label="企业名称" prop="nameCompany">
          <el-input v-model="formBusiness.name" />
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="creditCode">
          <el-input v-model="formBusiness.name" />
        </el-form-item>
        <el-form-item label="法人姓名" prop="legalPerson">
          <el-input v-model="formBusiness.name" />
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="handleQuery2">查询</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'RealNameInfo',
  components: {},
  data() {
    return {
      activeName: 'first',
      formPersonal: {
        name: '',
        idcard: '',
        imageUrl: 'sadfsadfsdf'
      },
      formBusiness: {
        nameCompany: '',
        creditCode: '',
        legalPerson: ''
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
        imageUrl: [
          { required: true, message: '请上传照片', trigger: 'change' }
        ]
      },
      rules2: {
        nameCompany: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        creditCode: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
          { min: 1, max: 100, message: '格式错误', trigger: 'blur' }
        ],
        legalPerson: [
          { required: true, message: '请输入法人姓名', trigger: 'blur' },
          { min: 1, max: 100, message: '格式错误', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleAvatarSuccess(res, file) {
      this.formPersonal.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const type = 'image/jpeg,image/jpg,image/bmp,image/png,image/gif,image/tiff'
      const isImg = type.indexOf(file.type)
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isImg < 0) {
        this.$message.error('上传头像格式错误!')
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isImg && isLt1M
    },
    handleQuery1() {
      this.$refs.formPersonal.validate((valid) => {
        alert(valid)
        // const { oldpassword, password, confirmPassword, verifcode } = this.form
        // if (valid) {
        //   let validator = true
        //   if (oldpassword === password) {
        //     this.$message.error('新旧密码不能相同')
        //     validator = false
        //   }
        //   if (password !== confirmPassword) {
        //     this.$message.error({ message: '密码不一致', delay: 100 })
        //     validator = false
        //   }

        //   if (validator) {
        //     const obj = {
        //       originalPwd: oldpassword,
        //       newPwd: password,
        //       confirmPwd: confirmPassword,
        //       mobileyzm: verifcode
        //     }
        //     this.resetPwd(obj).then(() => {
        //       this.$message({
        //         type: 'success',
        //         message: '密码修改成功'
        //       })
        //       this.handleClose()
        //     })
        //   }
        // }
      })
    },
    handleQuery2() {

    }
  }
}
</script>

<style>
.el-tabs.realname-info{
  margin-top: -17px;
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
</style>
