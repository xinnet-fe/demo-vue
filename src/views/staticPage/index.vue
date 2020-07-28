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
    })
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
</style>
