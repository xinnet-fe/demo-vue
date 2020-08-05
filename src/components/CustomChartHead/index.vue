<template>
  <div class="chart-head block">
    <el-row>
      <el-col :span="16">
        <div class="title">
          {{ title }}
          <el-popover
            placement="top"
            width="320"
            trigger="hover"
            class="item"
          >
            <div>
              <slot name="content" />
            </div>
            <i slot="reference" class="el-icon-warning-outline" />
          </el-popover>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="type">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              阈值参考<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown" class="dapan-chart">
              <el-checkbox-group v-model="checkList">
                <el-dropdown-item v-for="item in options" :key="item.value">
                  <el-checkbox
                    :label="item.value"
                    @click.native.stop.prevent="legendCheckboxChanged($event, item)"
                  >
                    {{ item.label }}
                  </el-checkbox>
                </el-dropdown-item>
              </el-checkbox-group>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import find from 'lodash/find'
import app from '@/main'

export default {
  name: 'CustomChartHead',
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    checkList: {
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    chart: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 阈值下拉列表和图例联动
    legendCheckboxChanged(e, item) {
      // const { checkList } = this
      // const exist = find(checkList, v => v === item.value)
      // if (exist || exist === 0) {
      //   this.checkList = checkList.filter(v => v !== item.value)
      // } else {
      //   checkList.push(item.value)
      // }

      // 图例title和下拉框title不完全相同
      // 上涨 => 上涨线，均值 => 均值线
      const name = item.label.slice(0, 2)
      // this.chart.dispatchAction({
      //   type: 'legendToggleSelect',
      //   name
      // })
      app.$emit('reloadChart', name, this.$parent)
    }
  }
}
</script>

<style scoped lang="scss">
.chart-head {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ededed;

  .title {
    padding-left: 20px;
    font-size: 14px;
  }
  .type {
    text-align: right;
    padding-right: 20px;
  }
  .el-dropdown-link {
    font-size: 12px;
  }
}
</style>
