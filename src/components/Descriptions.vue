<template>
  <div class="el-descriptions">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" class="el-table__body">
      <thead />
      <tbody>
        <tr v-for="(tr, index) in list" :key="index">
          <td
            v-for="(td, tdIndex) in tr"
            :key="tdIndex"
            :colspan="td.colspan || 1"
          >
            <div class="wrap">
              <div class="label" :style="getStyle(td.colspan)">
                <p>{{ td.label }}</p>
              </div>
              <div class="text">
                <p>{{ data[td.value] }}</p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import forEach from 'lodash/forEach'

export default {
  name: 'ElDescriptions',
  componentName: 'ElDescriptions',
  props: {
    labels: {
      type: Object,
      default() {
        return {}
      }
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    column: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    const { list, column, labels } = this
    let index = 0
    let num = 0
    forEach(labels, (v, k) => {
      index = Math.floor(num / column)
      if (!list[index]) {
        list[index] = []
      }
      list[index].push({
        label: v,
        value: k
      })
      num++
    })

    const last = list[list.length - 1]
    if (last && last.length % column !== 0) {
      const colspan = column + 1 - last.length
      last[last.length - 1]['colspan'] = colspan
    }
  },
  methods: {
    getStyle(colspan) {
      const style = {}
      if (colspan > 1) {
        style['flex-basis'] = 40 / colspan + '%'
      }
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
.el-descriptions {
  table {
    display: table;
    border-collapse: collapse;

    td {
      border: 1px solid #dfe6ec;

      > .wrap {
        display: flex;
        min-height: 48px;
        align-items: center;
        margin: 0;

        > .label {
          flex: 0 0 40% ;
          background: #ededed;
        }
        > .text {
          flex: 1 0 58%;
        }

        > div {
          display: flex;
          align-items: center;
          min-height: 48px;
          > p {
            padding: 0 5px;
            flex-basis: 100%;
            text-align: left;
            margin: 0;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
