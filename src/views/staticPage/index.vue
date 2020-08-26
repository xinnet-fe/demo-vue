<template>
  <div class="static-page">
    <iframe frameborder="0" :src="url" :style="{ width: width }" />
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
@import '@/styles/variables.scss';

.static-page {
  padding: 20px 20px 0;
  background-color: $appMainBg;
}
.fixed-header+.static-page {
  padding-top: 50px;
}

.hasTagsView {
  .static-page {
    /* 84 = navbar + tags-view = 50 + 34 */
    height: calc(100vh - 91px);
    min-height: calc(100vh - 91px);
    // overflow: auto;
    iframe{
      height: calc(100vh - 130px);
      min-height: calc(100vh - 130px);
    }
  }

  .fixed-header+.static-page {
    padding-top: 91px;
  }
}
.hideLayout {
  .static-page {
    /* 84 = navbar + tags-view = 50 + 34 */
    height: calc(100vh);
    min-height: calc(100vh);
    // overflow: auto;
    iframe{
      height: calc(100vh - 40px);
      min-height: calc(100vh - 40px);
    }
  }
}
</style>
