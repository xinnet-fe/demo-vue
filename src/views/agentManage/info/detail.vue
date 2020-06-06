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
                  :column="2"
                  :labels="realNameLabel"
                  :data="realNameInfo"
                />
                <br>
                <el-row>
                  <el-col
                    v-for="(o, index) in 3"
                    :key="o"
                    :span="7"
                    :offset="index > 0 ? 1 : 0"
                  >
                    <el-card :body-style="{ padding: '0px' }">
                      <img width="100%" src="/static/img/test.jpg" class="image">
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
                    prop="name"
                    label="姓名"
                  />
                  <el-table-column
                    prop="email"
                    label="邮箱"
                  />
                  <el-table-column
                    prop="phone"
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
        agentCode: 'agent35133',
        company: '北京分公司',
        phone: 19488851118,
        email: 'chengyanpeng@xinnet.com',
        province: '北京',
        city: '北京',
        level: '白金代理',
        market: '复兴',
        address: '北京大兴区经济开发区'
      },
      realNameLabel: {
        type: '实名制类型',
        state: '实名制状态',
        companyName: '企业名称',
        code: '社会信用统一编码'
      },
      realNameInfo: {
        type: '企业认证',
        state: '已认证',
        companyName: '北京新网信息技术有限公司',
        code: '911008288989497'
      },
      contactsInfo: [
        {
          name: '陈燕鹏',
          email: 'cheng@xinnet.com',
          phone: '13899996638',
          remark: '负责人联系人'
        },
        {
          name: '陈鹏',
          email: 'peng@xinnet.com',
          phone: '13860663831',
          remark: '财务联系人'
        }
      ]
    }
  },
  computed: {
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
