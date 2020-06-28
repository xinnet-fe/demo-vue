<template>
  <div class="info-detail">
    <el-dialog :before-close="beforeClose" destroy-on-close title="代理详情" :visible.sync="formVisible">
      <el-row>
        <el-col :span="24">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本信息" name="first">
              <template v-slot:default>
                <el-descriptions
                  :column="2"
                  :labels="basicLabel"
                  :data="basicInfo"
                />
              </template>
            </el-tab-pane>
            <el-tab-pane label="实名制信息" name="second">
              <template v-slot:default>
                <el-descriptions
                  v-if="type==='P'"
                  :column="2"
                  :labels="realNameLabel_P"
                  :data="realNameInfo"
                />
                <el-descriptions
                  v-if="type==='C'"
                  :column="2"
                  :labels="realNameLabel_C"
                  :data="realNameInfo"
                />
                <br>
                <el-row :gutter="10">
                  <el-col
                    class="col-img"
                    v-for="(val, key, i) in realNameImg"
                    :key="key"
                    :span="8"
                    v-if="val"
                  >
                    <el-card :body-style="{ padding:'0px' }">
                      <img width="100%" :src="val" class="image">
                    </el-card>
                  </el-col>
                </el-row>
              </template>
            </el-tab-pane>
            <el-tab-pane label="联系人信息" name="third">
              <template v-slot:default>
                <el-table
                  border
                  tooltip-effect="dark"
                  style="width: 100%"
                  :data="contactsInfo"
                >
                  <el-table-column
                    prop="contactsName"
                    label="姓名"
                  />
                  <el-table-column
                    prop="contactsEmail"
                    label="邮箱"
                  />
                  <el-table-column
                    prop="contactsMobile"
                    label="手机"
                  />
                  <el-table-column
                    prop="remark"
                    label="备注"
                  />
                </el-table>
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'InfoDetail',
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
      activeTab: 'first',
      type: '',
      basicLabel: {
        agentCode: '代理编号',
        company: '所属分公司',
        market: '绑定销售',
        level: '代理级别',
        phone: '手机号码(账号)',
        email: '电子邮箱(账号)',
        province: '所在省份',
        city: '所在城市',
        address: '详细地址'
      },
      basicInfo: {
        agentCode: '',
        company: '',
        phone: '',
        email: '',
        province: '',
        city: '',
        level: '',
        market: '',
        address: ''
      },
      realNameLabel_P: {
        organizeNameCn: '姓名',
        authPersonCardCode: '居民身份证号码'
      },
      realNameLabel_C: {
        organizeNameCn: '企业名称',
        authPersonCardCode: '授权人个人居民身份证号码',
        businessLicenseCode: '社会信用统一编码',
        authPersonName: '经企业授权的个人名称'
      },
      realNameInfo: {
        organizeNameCn: '',
        authPersonCardCode: '',
        businessLicenseCode: '',
        authPersonName: ''
      },
      realNameImg: {
        businessLicensePath: '',
        authPersonCardPath: '',
        authPersonCardbackPath: '',
        grantCertPath: ''
      },
      contactsInfo: [
        // {
        //   name: '陈燕鹏',
        //   email: 'cheng@xinnet.com',
        //   phone: '13899996638',
        //   remark: '负责人联系人'
        // },
        // {
        //   name: '陈鹏',
        //   email: 'peng@xinnet.com',
        //   phone: '13860663831',
        //   remark: '财务联系人'
        // }
      ]
    }
  },
  mounted() {
    this.basicInfo.agentCode = this.row.agentCode
    this.basicInfo.company = this.row.organName
    this.basicInfo.market = this.row.saleName
    this.basicInfo.level = this.row.gradeName
    this.basicInfo.phone = this.row.telenumber
    this.basicInfo.email = this.row.userNameEmail
    this.basicInfo.province = this.row.publicProvinceCn
    this.basicInfo.city = this.row.publicCityCn
    this.basicInfo.address = this.row.publicStreetCn
    // 获取实名信息
    this.queryDlRealInfo({ agentCode: this.row.agentCode }).then(res => {
      if (!res.code) {
        this.realNameInfo.organizeNameCn = res.data.organizeNameCn
        this.realNameInfo.authPersonCardCode = res.data.authPersonCardCode
        this.realNameImg.authPersonCardPath = res.data.authPersonCardPath
        this.realNameImg.authPersonCardbackPath = res.data.authPersonCardbackPath

        if (typeof res.data.authPersonName === 'undefined') {
          this.type = 'P'
        } else {
          this.realNameInfo.businessLicenseCode = res.data.businessLicenseCode
          this.realNameInfo.authPersonName = res.data.authPersonName
          this.realNameImg.businessLicensePath = res.data.businessLicensePath
          this.realNameImg.grantCertPath = res.data.grantCertPath
          this.type = 'C'
        }
        console.log(this.realNameImg)
        let params = {
          agentCode: this.row.agentCode,
          imgUrl: this.realNameImg.authPersonCardPath
        }
        for (let key in this.realNameImg) {
          if (this.realNameImg[key].length) {
            this.realNameImg[key] = `/userManager/echoImage?agentCode=${this.row.agentCode}&imgUrl=${this.realNameImg[key]}`
          }
        }
      }
    }).catch(error => {})
    // 获取联系人信息
    this.queryContactList({ agentCode: this.row.agentCode }).then(res => {
      if (!res.code) {
        this.contactsInfo = [{contactsName: this.row.organizeNameCn, contactsEmail: this.row.userNameEmail, contactsMobile: this.row.telenumber, remark: ''}, ...res.data]
      }
    }).catch(error => {})
  },
  computed: {
    ...mapState({
      loading: state => state.loading.effects['userManager/queryDlRealInfo']
    }),
    formVisible: {
      get() {
        // console.log(this.visible)
        return this.visible
      },
      set(val) {
        // console.log(this.visible)
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    ...mapActions('userManager', ['queryDlRealInfo', 'queryContactList', 'echoImage']),
    closeModal() {
      this.$emit('update:visible', false)
      this.$emit('update:row', {})
    },
    beforeClose(done) {
      this.closeModal()
      done()
    },
    handleClick(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.col-img{
  margin-bottom: 10px;
}
</style>
