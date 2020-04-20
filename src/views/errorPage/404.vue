<template>
  <div>
    <Error :text="text" :img-url="imgUrl" />
  </div>
</template>

<script>
import Error from './error'

export default {
  name: 'Page404',
  components: {
    Error
  },
  data() {
    return {
      text: '抱歉，您访问的页面不存在！',
      imgUrl: require('@/assets/404_images/404.jpg')
    }
  }
}
</script>

<style lang="scss" scoped></style>
