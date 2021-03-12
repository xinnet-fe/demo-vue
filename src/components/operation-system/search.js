import { tabData } from './data.js'
// import { fmtIndustry } from './industry.js'
// import { fmtCity } from './city.js'

export default {
  data() {
    return {
      // 表单六项
      tabForForm: tabData.map(item => {
        return {
          label: item.label, // 客户基本属性标签 or 客户消费类标签 ...
          children: [], // 用户添加了几项
          childrenSource: item.children, // [], // data.js 中的 children
          validNum: item.children.length,
          totalNum: item.children.length
        }
      }),
      // 常用筛选
      template: {
        labelName: '', // 显示到页面上的名称
        show: true, // 是否显示
        list: []
      },
      // 已选条件
      selected: {
        show: true
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
  computed: {
    // 页面 已选条件 显示的 tabs
    fmtValue() {
      return v => {
        if (Array.isArray(v)) {
          return v.join('、')
        } else {
          return v
        }
      }
    }
  },
  methods: {
    // 新建的标签，下拉菜单的有效的（未使用）所选项
    filterValid({ index, ind, childrenSource }) {
      const children = this.tabForForm[index].children
      const newArr = childrenSource.filter(item => {
        return children.every(obj => obj.label !== item.label)
      })
      return newArr
    },
    // 所选条件
    filterSelected() {
      const tabForForm = this.tabForForm
      const arr = []
      tabForForm.forEach((item1, index) => {
        item1.children.forEach((item2, ind) => {
          const arr2 = {
            label: item2.currentPayload.label,
            value: item2.currentPayload.value,
            parentLabel: item2.parentLabel,
            index,
            ind
          }
          switch (typeof (arr2.value)) {
            case 'undefined':
              break
            case 'object':
              if (arr2.value === null) {

              } else if (Array.isArray(arr2.value)) {
                if (arr2.value.length > 0) {
                  arr.push(arr2)
                }
              } else {
                const dt = new Date(arr2.value)
                if (dt === 'Invalid Date') {

                } else {
                  arr2.value = dt.toLocaleDateString()
                  arr.push(arr2)
                }
              }
              break
            case 'string':
              if (arr2.value) {
                arr.push(arr2)
              }
              break
            default:
              console.log('出错了')
          }
        })
      })
      return arr
    },
    // 所选条件的逆向
    // 右侧常用筛选中某一个模板，点击时，根据过滤后的值，逆向出过滤前的值
    filterSelectedFrom(payload) {
      const tabForForm = this.tabForForm
      payload.currentTabs.forEach(item => {
        const il = this.getIndexforLabel(item)
        if (il) {
          const newTabItem = this.newTabItem({
            index: il.index,
            ind: il.ind,
            label: item.label,
            parentLabel: item.parentLabel,
            value: item.value,
            currentPayload: tabForForm[il.index].childrenSource[il.ind]
          })
          tabForForm[il.index].children.push(newTabItem)
          tabForForm[il.index].validNum--
        }
      })
    },
    // 常用筛选-某一个模板-值的逆向
    newTabItem(payload) {
      const item = {
        show: false,
        label: payload.label,
        currentPayload: {
          ...payload.currentPayload,
          value: payload.value // 解开此注释，得带有之前所保存的值
        },
        parentLabel: payload.parentLabel
      }
      return item
    },
    // 根据 label 求得 index
    // 不要用之前保存时的 index，要每次使用时现获取 index，因为可能会发生，保存数据后，开发人员修改了源，再用之前的index就会出错。
    getIndexforLabel(payload) {
      const tabForForm = this.tabForForm
      const index = tabForForm.findIndex(item => item.label === payload.parentLabel)
      if (index === -1) {
        console.log('getIndexforLabel -> 找不到一级：', payload.parentLabel)
      } else {
        const ind = tabForForm[index].childrenSource.findIndex(item => item.label === payload.label)
        if (ind === -1) {
          console.log('getIndexforLabel -> 找不到二级：', payload.label)
        } else {
          return {
            index,
            ind
          }
        }
      }
    },
    // 向表单六项的某一项中，添加一个子项
    createItemForTab(index) {
      // 得到基础数据 {label: "客户基本属性标签", children: Array(17)}
      const payload = tabData[index]
      // 修正数据
      /*
      payload.children.forEach(item => {
        if (item.label === '所属行业') {
          item.valueOptions = fmtIndustry
        }
        if (item.label === '注册地址') {
          item.valueOptions = fmtCity
        }
      })
      */
      // 将未存在的，显示到页面上
      this.tabForForm[index].children.push({
        show: true,
        label: '',
        currentPayload: {},
        parentLabel: payload.label
      })
      this.tabForForm[index].validNum--
    },
    // 删除标签
    delItemForTab({ index, ind }) {
      this.tabForForm[index].children.splice(ind, 1)
      this.tabForForm[index].validNum++
      this.changeTab()
    },
    // 选择项（下拉菜单）
    changeItemCS({ index, label }) {
      // 查找
      const childrenSource = this.tabForForm[index].childrenSource
      const ind = childrenSource.findIndex(item => item.label === label)
      if (ind === -1) {
        console.log('错误：a没有找到', label)
      } else {
        // 当前所选项的相关值
        const payload = childrenSource[ind]
        // 表单所选项的相关值
        const children = this.tabForForm[index].children
        const ind2 = children.findIndex(item => item.label === payload.label)
        if (ind2 === -1) {
          console.log('错误：b没有找到', payload.label)
        } else {
          children[ind2].currentPayload = payload
          // 隐藏
          children[ind2].show = false
        }
      }
    },
    // 标签项的值发生变化时
    asyncValue(v) {
      // console.log('v=', v)

      this.changeTab()
    },
    // 清空所选
    clearItemForTab() {
      this.tabForForm.forEach(item => {
        item.children = []
        item.validNum = item.totalNum
      })
      this.changeTab()
    },
    // 保存常用（打开保存窗口）
    openDialogSaveTab() {
      this.dialog.radioValue = ''
      this.dialog.templateName = ''
      this.dialog.visible = true
    },
    // 关闭保存常用穿口
    closeDialog() {
      this.$refs['dialog'].resetFields()
      this.dialog.visible = false
    },
    // 保存常用 - 表单提交
    closeDialogConfirm() {
      this.$refs['dialog'].validate((valid) => {
        if (valid) {
          // alert('submit!');
          const payload = {
            radio: this.dialog.radioValue,
            name: this.dialog.templateName,
            currentTabs: this.getCurrentTabs()
          }
          this.setSearchTemplateList(payload, () => {
            this.getSearchTemplateList()
            // 关闭
            this.closeDialog()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 设置模板列表
    setSearchTemplateList(payload, callback) {
      // 假的，先模拟一下
      const item = { ...payload, id: new Date().getTime() }
      const searchTemplate = localStorage.getItem('searchTemplate')
      if (searchTemplate) {
        try {
          const list = JSON.parse(searchTemplate).list
          list.push(item)
          localStorage.setItem('searchTemplate', JSON.stringify({
            list
          }))
        } catch (err) {
          console.log('setSearchTemplateList -> 格式化Storage数据失败')
        }
      } else {
        localStorage.setItem('searchTemplate', JSON.stringify({
          list: [item]
        }))
      }
      callback()
    },
    // 获取模板列表
    getSearchTemplateList() {
      const searchTemplate = localStorage.getItem('searchTemplate')
      try {
        const list = JSON.parse(searchTemplate).list
        this.template.list = list
        // console.log('list=', list)
      } catch (err) {
        console.log('getSearchTemplateList -> 格式化Storage数据失败')
      }
    },
    // 获取当前所选标签
    getCurrentTabs() {
      return this.filterSelected()
    },
    // 删除某模板
    delSearchTemplate(item) {
      // console.log('模拟删除效果')
      const searchTemplate = localStorage.getItem('searchTemplate')
      try {
        const list = JSON.parse(searchTemplate).list
        const ind = list.findIndex(obj => obj.id === item.id)
        if (ind === -1) {
          console.log('删除失败', item)
        } else {
          list.splice(ind, 1)
          this.template.list = list
          // console.log('list=', list)
          localStorage.setItem('searchTemplate', JSON.stringify({
            list
          }))
        }
      } catch (err) {
        console.log('getSearchTemplateList -> 格式化Storage数据失败')
      }
      // this.getSearchTemplateList()
    },
    // 显示某模板
    showSearchTemplate(payload) {
      // 清空
      const tabForForm = this.tabForForm
      tabForForm.forEach(item => {
        item.children = []
        item.validNum = item.childrenSource.length
      })
      // 不应该在存储时记录完整 tabForForm，因为可能用户在保存模板后，开发人员修改了基本项，导致页面渲染错误
      // 所以应开发 filterSelected 的逆向函数，用户每一个所选的 tab，都应该检查
      this.filterSelectedFrom(payload)

      this.template.labelName = payload.name

      this.changeTab()
    },
    // 抛给组件外部的事件
    changeTab() {
      this.$emit('changeTab', {
        tabForForm: this.tabForForm,
        currentTabs: this.getCurrentTabs()
      })
    }
  },
  mounted() {
    // 显示模板列表
    this.getSearchTemplateList()
    // 显示模板列表中最后一个模板的详细信息
    const payload = this.template.list.slice(-1)[0]
    if (payload) {
      this.showSearchTemplate(payload)
    }
  }
}
