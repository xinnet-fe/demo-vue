<template>
  <div ref="box">
    domain
    <!-- <iframe :src="url" width="100%" height="650px" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import find from 'lodash/find'

export default {
  data() {
    return {
      url: 'http://beian.xinnet.com'
    }
  },
  computed: {
    ...mapGetters([
      'visitedViews'
    ])
  },
  watch: {
    $route(val) {
      if (val.name !== 'BossNavDomain' && !find(this.visitedViews, view => view.name === 'BossNavDomain')) {
        this.url = this.url + '?' + new Date().getTime()
      }
    }
  }
}
</script>
