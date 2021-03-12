
import { tabData } from './data.js'

export default {
  data() {
    return {
      tabData
    }
  },
  methods: {
    selected(payload) {
      // console.log('payload=', payload)
      this.$parent.childrenSelected(payload)
    }
  },
  mounted() {

  }
}
