<template>
  <div class="data-view">
    <el-table
      :data="chartData"
      border
      class="data-table"
    >
      <template v-slot="scope">
        <slot :default="scope" />
      </template>
    </el-table>
    <div class="chart-bread">
      <span class="clickable" @click="backView">{{ chartData[0].occurDate && chartData[0].occurDate.slice(0, 10) }}</span> /
      <span>明细</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChartDetail',
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    backView() {
      this.$emit('update:step', 1)
    }
  }
}

</script>

<style scoped lang="scss">
.data-view {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  height: calc(100% - 40px);
  overflow: scroll;

  > .data-table {
    width: 94%;
    margin-left: 3%;
    margin-top: 42px;
  }
}
.chart-bread {
  color: #333;
  margin: 20px;

  .clickable {
    cursor: pointer;
  }
}
</style>
