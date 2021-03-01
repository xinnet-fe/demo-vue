<template>
  <div class="demo-container" style="padding:20px;">
    <el-divider content-position="left">主按钮</el-divider>
    <div>
      <el-button type="primary">主要按钮</el-button>
    </div>

    <el-divider content-position="left">次按钮</el-divider>
    <div>
      <el-button type="default">次要按钮</el-button>
    </div>
    <el-divider content-position="left">其他按钮</el-divider>
    <div>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button type="text">文字按钮</el-button>
    </div>

    <el-divider content-position="left">禁用状态</el-divider>
    <div>
      <el-button type="primary" disabled>主要按钮</el-button>
      <el-button type="primary" class="red" disabled>主要按钮</el-button>
      <el-button type="default" disabled>次要按钮</el-button>
      <el-button type="success" disabled>成功按钮</el-button>
      <el-button type="info" disabled>信息按钮</el-button>
      <el-button type="warning" disabled>警告按钮</el-button>
      <el-button type="danger" disabled>危险按钮</el-button>
      <el-button type="text" disabled>文字按钮</el-button>
    </div>

    <el-divider content-position="left">加载中</el-divider>
    <div>
      <el-button type="default" :loading="true">加载中</el-button>
    </div>

    <el-divider content-position="left">尺寸</el-divider>
    <table class="demo-table">
      <tr>
        <td><el-button type="default">默认按钮</el-button></td>
        <td><el-button type="default" size="medium">中等按钮</el-button></td>
        <td><el-button type="default" size="small">小型按钮</el-button></td>
        <td><el-button type="default" size="mini">超小按钮</el-button></td>
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
  name: 'Button',
  components: { }
}
</script>

<style scoped>
.demo-table td{
  font-size: 12px;
  text-align: center;
  color: #aaa;
}
</style>

