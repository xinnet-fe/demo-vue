<template>
  <div class="static-page">
    <iframe frameborder="0" :src="url" :style="{ width: width, height: height }" />
  </div>
</template>

<script>
export default {
  name: 'StaticPage',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      width: '100%'
    }
  },
  computed: {
    height() {
      const res = global.document.documentElement.clientHeight - 100
      return res + 'px'
    }
  },
  created() {
    console.log('created')
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
