export default {
  data() {
    return {
      List: []
    }
  },
  methods: {
    // 获取模板列表
    getList() {
      this.$refs.tempform1.getCustomList((payload) => {
        //console.log('获取自定义模板列表', payload)
        this.List = payload.list
      })
    },
    // 点击模板列表中的某一个模板，显示该模板的具体信息
    showTemplateDetail(payload) {
      this.$refs.tempform1.showTemplateDetail(payload)
    },
  },
  mounted() {
    // 获取列表
    this.getList()
    // 显示第一个列表的内容
    this.showTemplateDetail(this.List[0])
    // 锁定内容容器（不需要操作表单）
    this.$refs.tempform1.syncOnlyread(true)
  }
}