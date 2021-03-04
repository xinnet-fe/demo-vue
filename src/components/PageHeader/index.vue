<template>
  <div class="page-header">
    <span class="title">{{ title }}</span>
    <span class="go-back">
      <a @click="goBack">返回</a>
    </span>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: ''
    },
    goBack: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.page-header {
  display: flex;
  margin-bottom: 20px;
  padding: 20px 0;
  align-items: center;
  border-bottom: 1px solid #e6ebf5;

  .title {
    flex: auto;
    text-align: left;
    font-size: 13px;
    color: #303133;
  }
  .go-back {
    flex: auto;
    text-align: right;
    padding-right: 10px;
    color: #0180cd;
    font-size: 12px;
  }
}
</style>
