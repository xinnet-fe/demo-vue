export default {
  data() {
    return {
      // 底部按钮工具栏
      bottomTools: {
        show: true
      },
      // 系统推荐 和 自定义模板
      tcrl: {
        activeName: 'systemList',
        options: [
          { label: '系统推荐', valKey: 'systemList' },
          { label: '自定义模板', valKey: 'customList' }
        ],
        systemList: [],
        customList: []
      },
      // 保存窗口
      dialog: {
        visible: false,
        radioValue: '',
        radioOptions: [{
          label: '覆盖已有筛选条件'
        }, {
          label: '创建为新筛选条件'
        }],
        templateName: '',
        rules: {
          radioValue: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          templateName: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { max: 10, message: '长度不能超过 10 个字符', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    // 系统推荐 和 自定义模板
    tcrl_tab(v) {
      console.log('v=', v.name)
    },
    // 获取系统推荐列表
    getSystemList() {
      this.tcrl.systemList = [
        { templateName: '系统推荐模板1' }
      ]
    },
    // 获取自定义模板列表
    getCustomList() {
      this.$refs.tempform1.getCustomList((payload) => {
        // console.log('获取自定义模板列表', payload)
        this.tcrl.customList = payload.list
      })
    },
    // 点击模板列表中的某一个模板，显示该模板的具体信息
    showTemplateDetail(payload) {
      this.$refs.tempform1.showTemplateDetail(payload)
    },
    // 查询
    search() {
      this.$refs.tempform1.search()
    },
    // 清空
    clear() {
      this.$refs.tempform1.clear()
    },
    // 保存模板
    openDialog() {
      this.dialog.visible = true
    },
    closeDialog() {
      this.$refs['dialog'].resetFields()
      this.dialog.visible = false
    },
    closeDialogConfirm() {
      this.$refs['dialog'].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.$refs.tempform1.setTemplate({
            templateName: this.dialog.templateName
          }, () => {
            this.closeDialog()
            this.getCustomList()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted() {
    this.getSystemList()
    this.getCustomList()
  }
}
