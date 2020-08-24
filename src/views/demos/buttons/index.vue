<template>
  <div class="demo-container">
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
    <table class="demo-table">
      <tr>
        <td><el-button type="primary">默认按钮</el-button></td>
        <td><el-button type="primary" size="medium">中等按钮</el-button></td>
        <td><el-button type="primary" size="small">小型按钮</el-button></td>
        <td><el-button type="primary" size="mini">超小按钮</el-button></td>
      </tr>
      <tr>
        <td><el-button>默认按钮</el-button></td>
        <td><el-button size="medium">中等按钮</el-button></td>
        <td><el-button size="small">小型按钮</el-button></td>
        <td><el-button size="mini">超小按钮</el-button></td>
      </tr>
      <tr>
        <td>高：40px</td>
        <td>高：38px</td>
        <td>高：32px</td>
        <td>高：28px</td>
      </tr>
    </table>

  </div>
</template>

<script>

export default {
  name: 'LineChart',
  components: {}
}
</script>

<style scoped>
.demo-table td{
  font-size: 12px;
  text-align: center;
  color: #aaa;
}
</style>

