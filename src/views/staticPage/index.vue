<template>
  <div class="static-page">
    <iframe frameborder="0" :src="url" :style="{ width: width, height: height }" />
  </div>
</template>

<script>
// import replace from 'lodash/replace'

export default {
  data() {
    return {
      width: '100%'
    }
  },
  computed: {
    height() {
      const res = global.document.documentElement.clientHeight - 100
      return res + 'px'
    },
    url() {
      return this.$route.meta.url
      // let res = this.$route.query.url
      // res = replace(res, ':/', '://')
      // return res
    }
  },
  created() {
    window.addEventListener('message', this.receiveMessageFromIframePage, false)
  },
  methods: {
    receiveMessageFromIframePage(e) {
      // console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.static-page {
  padding: 5px;
}
</style>
