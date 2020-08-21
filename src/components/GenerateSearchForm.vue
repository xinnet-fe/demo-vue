<script>
import map from 'lodash/map'
export default {
  name: 'SearchForm',
  functional: true,
  props: {
    formClass: {
      type: String,
      default: 'search-form'
    },
    formRef: {
      type: String,
      default: 'search-form'
    },
    formModal: {
      type: Object,
      default() {
        return {}
      }
    },
    fields: {
      type: Array,
      default() {
        return []
      }
    }
  },
  render(createElement, context) {
    const { formClass, formRef, formModal, fields } = context.props

    function createVNodes(createElement, nodes) {
      return map(nodes, node => {
        const { el, children, ...restAttrs } = node
        const attrs = { ...restAttrs }
        if (children) {
          return createElement(el, attrs, createVNodes(createElement, children))
        } else {
          return createElement(el, attrs)
        }
      })
    }

    const childNodes = createVNodes(createElement, fields)
    const vnodes = createElement(
      'el-form',
      {
        ref: formRef,
        class: formClass,
        props: {
          modal: formModal,
          inline: true
        }
      },
      childNodes
    )
    return vnodes
  }
}

// --使用

// 模板
// <search-form
//   :form-modal="searchForm"
//   :fields="fields"
// />

// 在created钩子内赋值，因methods,data值已经初始化
// this.fields = [
//   {
//     el: 'el-form-item',
//     props: {
//       label: '名称',
//       prop: 'name'
//     },
//     children: [
//       {
//         el: 'el-input',
//         props: {
//           'v-model': this.searchForm.name,
//           placeholder: '请输入名称',
//           clearable: true
//         }
//       }
//     ]
//   },
//   {
//     el: 'el-form-item',
//     children: [
//       {
//         el: 'el-button',
//         props: {
//           loading: this.loading,
//           type: 'primary'
//         },
//         on: {
//           click: this.onSearch
//         },
//         domProps: {
//           innerHTML: '搜索'
//         }
//       }
//     ]
//   }
// ]
</script>
