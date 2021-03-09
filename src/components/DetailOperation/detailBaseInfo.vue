<template>
  <div class="">
    基本信息1
  </div>
</template>

<script>
export default {
  name: 'DetailOperation',
  components: {
  },
  props: {
    handleToBack: {
      type: Function
    },
    showLeft: {
      type: Boolean,
      default: true
    },
    showRight: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
