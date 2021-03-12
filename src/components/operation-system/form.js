export default {
  data() {
    return {
      // 客户运营管理，表单项是否只有1行
      onceCss: '',
      operationOptions: [
        { label: '包含任一' },
        { label: '都不包含' }
      ],
      selectOptions: [
        { label: '全部条件' },
        { label: '任一条件' }
      ],
      form: {
        ac: '全部条件',
        list: []
      },
      // 当前选择项
      currentPlaneItem: {},
      // 运营客户跟进（表单的遮罩层）
      onlyread: false, // 为true时表示只读
      orlStyle: {
        width: '0px',
        height: '0px'
      }
    }
  },
  methods: {
    syncOrlStyle() {
      this.$nextTick(() => {
        this.orlStyle.width = this.$refs.formTable.scrollWidth + 'px'
        this.orlStyle.height = this.$refs.formTable.scrollHeight + 'px'
      })
    },
    syncOnlyread(val) {
      if (!val) {
        this.onlyread = false
      } else {
        this.onlyread = true
        this.syncOrlStyle()
      }
    },
    newItem(payload) {
      return {
        label: payload.label || '',
        state: payload.state || 0, // 0 只显示label； 1 完整显示
        value: payload.value || '',
        showPlane: payload.showPlane || false,
        result: {}
      }
    },
    addItem() {
      this.form.list.push(this.newItem({}))
      this.onceCss = ''
    },
    addItem2(index) {
      this.form.list[index].list.push(this.newItem({}))
    },
    newGroup() {
      return {
        ac: '全部条件',
        list: [this.newItem({})]
      }
    },
    addGroup() {
      this.form.list.push(this.newGroup())
    },
    delItem(payload) {
      if (payload.index2 === undefined) {
        this.form.list.splice(payload.index, 1)
        if (this.form.list.length === 0) {
          this.onceCss = 'once'
        } else {
          this.onceCss = ''
        }
      } else {
        this.form.list[payload.index].list.splice(payload.index2, 1)
        if (this.form.list[payload.index].list.length === 0) {
          this.form.list.splice(payload.index, 1)
        }
      }
    },
    stopPropagation(event) {
      event.stopPropagation()
    },
    showPlane(payload) {
      this.hidePlane()
      if (payload.index2 === undefined) {
        payload.item.showPlane = true
        this.currentPlaneItem = payload.item
      } else {
        payload.item2.showPlane = true
        this.currentPlaneItem = payload.item2
      }
    },
    hidePlane() {
      this.currentPlaneItem.showPlane = false
    },
    childrenSelected(payload) {
      this.currentPlaneItem.label = payload.obj.label
      this.currentPlaneItem.state = 1 // 显示
      this.currentPlaneItem.value = undefined
      this.currentPlaneItem.result = payload.obj
      this.hidePlane()
    },
    clear() {
      this.onceCss = 'once'
      this.form.list = []
    },
    search() {
      console.log('this.form=', this.form)
    },
    filterForm() {
      return this.form
    },
    setTemplate(payload, callback) {
      // console.log('payload=', payload.templateName)
      const result = this.filterForm()
      // 模拟，添加模板
      let sthPayload = {
        list: []
      }
      const searchTemplateHigh = localStorage.getItem('searchTemplateHigh')
      if (searchTemplateHigh) {
        try {
          sthPayload = JSON.parse(searchTemplateHigh)
        } catch (e) {
          console.log('模拟添加模板错误')
        }
      }
      sthPayload.list.push({
        id: new Date().getTime(),
        templateName: payload.templateName,
        result
      })
      localStorage.setItem('searchTemplateHigh', JSON.stringify(sthPayload))

      callback()
    },
    getCustomList(callback) {
      const searchTemplateHigh = localStorage.getItem('searchTemplateHigh')
      if (searchTemplateHigh) {
        try {
          const sthPayload = JSON.parse(searchTemplateHigh)
          callback(sthPayload)
        } catch (e) {
          console.log('模拟获取模板错误')
        }
      }
    },
    showTemplateDetail(payload) {
      // console.log(payload.result)
      // console.log(this.form)
      this.form = payload.result
      this.syncOrlStyle()
    }
  },
  mounted() {
    this.form.list.push(this.newItem({}))

    document.getElementsByTagName('body')[0].addEventListener('click', () => {
      this.hidePlane()
    })
  }
}
