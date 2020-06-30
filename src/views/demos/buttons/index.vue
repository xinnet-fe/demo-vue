<template>
  <div class="buttons-container">
    <h3>基础状态</h3>
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
    <h3>禁用状态</h3>
    <el-button disabled>默认按钮</el-button>
    <el-button type="primary" disabled>主要按钮</el-button>
    <el-button type="success" disabled>成功按钮</el-button>
    <el-button type="info" disabled>信息按钮</el-button>
    <el-button type="warning" disabled>警告按钮</el-button>
    <el-button type="danger" disabled>危险按钮</el-button>
    <h3>文字按钮</h3>
    <el-button type="text">文字按钮</el-button>
    <el-button type="text" disabled>文字按钮</el-button>
    <h3>加载中</h3>
    <el-button type="primary" :loading="true">加载中</el-button>
    <h3>不同尺寸</h3>
    <el-button>默认按钮</el-button>
    <el-button size="medium">中等按钮</el-button>
    <el-button size="small">小型按钮</el-button>
    <el-button size="mini">超小按钮</el-button>
  </div>
</template>

<script>
// import Chart from '@/components/demos/Charts/LineMarker'

export default {
  name: 'LineChart'
  // components: { Chart }
}
</script>

<style scoped>

</style>

