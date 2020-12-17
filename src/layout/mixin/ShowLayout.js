export default {
  watch: {
    $route(route) {
      this.handleLayout(route)
    }
  },
  created() {
    this.handleLayout(this.$route)
  },
  methods: {
    handleLayout(route) {
      if (route.query.showLayout === 'false') {
        this.showLayout = false
      } else {
        this.showLayout = false// true
      }
    }
  }
}
