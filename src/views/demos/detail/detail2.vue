<template>
  <div class="demo-container">
    <Box type="1">
      <div slot="tit-left"><a href="javascript:;" @click="handleBack"> &lt; 返回</a></div>
      <div slot="tit-right">右侧文本</div>
      <div slot="cont">该插槽跟模板的其它地方一样可以访问相同的实例 property (也就是相同的“作用域”)，而不能访问 的作用域。例如 url 是访问不到的：</div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/Box'
export default {
  components: {
    Box
  },
  data() {
    return {

    }
  },
  methods: {
    handleBack() {}
  }
}
</script>
<style scoped>

</style>
