<template>
  <div>
    <Error :text="text" :img-url="imgUrl" />
  </div>
</template>
<script>
import Error from './error'

export default {
  name: 'Page500',
  components: {
    Error
  },
  data() {
    return {
      text: '抱歉，服务器出错了',
      imgUrl: require('@/assets/500_images/500.jpg')
    }
  }
}
</script>
<style></style>
