<template>
  <div v-if="open" v-show="show" class="static-page">
    <iframe frameborder="0" :src="url" :style="{ width: width, height: height }" />
  </div>
</template>

<script>
import find from 'lodash/find'
import { mapGetters } from 'vuex'

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
      width: '100%',
      open: false,
      show: false
    }
  },
  computed: {
    ...mapGetters(['visitedViews']),
    height() {
      const res = global.document.documentElement.clientHeight - 100
      return res + 'px'
    }
  },
  created() {
    window.addEventListener('message', this.receiveMessageFromIframePage, false)
  },
  mounted() {
    this.$watch('$route', route => {
      this.loadPage(route)
    })
    this.loadPage(this.$route)
  },
  methods: {
    receiveMessageFromIframePage(e) {
      // console.log(e)
    },
    loadPage(route) {
      const { meta } = route
      const visitedView = find(this.visitedViews, o => o.meta && o.meta.url === this.url)
      // visitedViews打开状态open是true
      if (visitedView && visitedView.title) {
        // 切换到当前标签
        if (meta && meta.url === this.url) {
          this.show = true
        } else {
          this.show = false
        }
        this.open = true
      } else {
        this.open = false
      }
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
