<template>
  <div class="agent-footer">
      Copyright © 1993-{{currentYear}} 北京新网数码信息技术有限公司 版权所有
  </div>
</template>

<script>
export default {
    name: 'agent-footer',
  data() {
    return {
        currentYear: (new Date()).getFullYear()
    }
  },
  computed: {
  },
  watch: {
  }
}
</script>
<style scoped>
    .agent-footer{
        color: #fff;
        font-size: 12px;
        text-align: center;
        padding: 40px 0;
    }
</style>
