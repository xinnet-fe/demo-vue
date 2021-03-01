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
  padding: 20px 0;
  align-items: center;

  .title {
    flex: auto;
    text-align: left;
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
