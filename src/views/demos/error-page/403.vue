<template>
  <div>
    <Error :text="text" :img-url="imgUrl" />
  </div>
</template>

<script>
import Error from './error'

export default {
  name: 'Page403',
  components: {
    Error
  },
  data() {
    return {
      text: '抱歉，您无权访问该页面',
      imgUrl: require('@/assets/403_images/403.jpg')
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
