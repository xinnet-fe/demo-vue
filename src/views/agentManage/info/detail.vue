<template>
  <div class="info-detail">
    <el-dialog :before-close="beforeClose" destroy-on-close title="代理详情" :visible.sync="formVisible">
      <el-row>
        <el-col :span="24">
          <div>
            <el-tabs>
              <el-tab-pane label="基本信息" name="first">
                1111111
              </el-tab-pane>
              <el-tab-pane label="实名制信息" name="second">
                配置管理
              </el-tab-pane>
              <el-tab-pane label="联系人信息" name="third">
                角色管理
              </el-tab-pane>
            </el-tabs>
          </div>
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
  name: 'AgentManageInfoDetail',
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
      infoTab: 'first',
      data: [
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
        console.log(this.visible)
        return this.visible
      },
      set(val) {
        console.log(this.visible)
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
    }
  }
}
</script>
