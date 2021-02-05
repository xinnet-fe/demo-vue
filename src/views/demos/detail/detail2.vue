<template>
  <div class="demo-container">
    <Detail :handle-to-back="handleBack">
      <div slot="tit-center">标题标题</div>
      <div slot="cont">该插槽跟模板的其它地方一样可以访问相同的实例 property (也就是相同的“作用域”)，而不能访问 的作用域。例如 url 是访问不到的：</div>
    </Detail>
  </div>
</template>

<script>
import Detail from '@/components/Detail'
export default {
  components: {
    Detail
  },
  props: {
    a: String
  },
  data() {
    return {

    }
  },
  methods: {
    handleBack() {
      alert('返回')
    }
  }
}
</script>
<style scoped>

</style>
