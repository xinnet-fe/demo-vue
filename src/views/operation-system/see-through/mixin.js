import { tabData } from './data.js'

export default {
  data() {
    return {
      // 表单六项
      tabForForm: tabData.map(item => {
        return {
          label: item.label, // 客户基本属性标签 or 客户消费类标签 ...
          children: [], // 用户添加了几项
          childrenSource: [] // data.js 中的 children
        }
      })
    }
  },
  methods: {
    // 向表单六项的某一项中，添加一个子项
    createItemForTab(index) {
      // 得到基础数据 {label: "客户基本属性标签", children: Array(17)}
      const payload = tabData[index]
      // console.log('payload=', payload)
      // console.log('this.tabForForm[index].children=', this.tabForForm[index].children)
      // 当前表单数据
      // const tabs = this.tabForForm[index].children
      // 保存来源
      if (this.tabForForm[index].childrenSource.length === 0) {
        this.tabForForm[index].childrenSource = payload.children
      }
      /*
      // 已经存在的
      const arr1 = payload.children.filter(item => {
        let ind = tabs.findIndex(obj => {
          return obj.label === item.label
        })
        return ind > -1 ? true : false
      })
      // 还未存在的
      const arr2 = payload.children.filter(item => {
        let ind = tabs.findIndex(obj => {
          return obj.label === item.label
        })
        return ind === -1 ? true : false
      })
      console.log('arr1=', arr1)
      console.log('arr2=', arr2)
      */

      // 将未存在的，显示到页面上
      this.tabForForm[index].children.push({
        show: true,
        label: '',
        currentPayload: {}
      })
    },
    // 选择项（下拉菜单）
    changeItemCS({ index, label }) {
      // 查找
      const childrenSource = this.tabForForm[index].childrenSource
      const ind = childrenSource.findIndex(item => item.label === label)
      if (ind === -1) {
        console.log('错误：没有找到', label)
      } else {
        // 当前所选项的相关值
        const payload = childrenSource[ind]
        // console.log('payload=', payload)
        // 表单所选项的相关值
        const children = this.tabForForm[index].children
        const ind2 = children.findIndex(item => item.label === payload.label)
        if (ind2 === -1) {
          console.log('错误：没有找到', payload.label)
        } else {
          children[ind2].currentPayload = payload
          // console.log('children[ind2]=', children[ind2])
          // 隐藏
          children[ind2].show = false
        }
      }
    }
  }
}
