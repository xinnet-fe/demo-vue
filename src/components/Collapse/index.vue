<template>
  <div class="custom-collapse">
    <div class="header" @click="goCollapse">
      <span class="title">{{ title }}</span>
      <span class="go-back">
        <transition name="iconrotate">
          <i ref="icon" :class="icon" />
        </transition>
      </span>
    </div>
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div v-if="show">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js'

export default {
  name: 'Collapse',
  props: {
    title: {
      type: String,
      default: ''
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      icon: 'el-icon-arrow-right'
    }
  },
  created() {
    this.show = this.open
  },
  methods: {
    goCollapse() {
      const rotate = !this.show ? 90 : 0
      anime({
        targets: this.$refs.icon,
        rotate
      })
      this.show = !this.show
    },
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      anime({
        targets: el,
        opacity: 1,
        complete() {
          done()
        }
      })
    },
    leave(el, done) {
      anime({
        targets: el,
        opacity: 0,
        duration: 150,
        easings: 'easeOutExpo',
        complete() {
          done()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.custom-collapse {

  .header {
    display: flex;
    margin-bottom: 20px;
    padding: 20px 0;
    align-items: center;
    border-bottom: 1px solid #e6ebf5;
    cursor: pointer;

    .title {
      flex: auto;
      text-align: left;
      font-size: 13px;
      color: #303133;
    }
    .go-back {
      flex: auto;
      text-align: right;
      padding-right: 10px;
      color: #0180cd;
      font-size: 12px;
    }
  }

}

.iconrotate-enter-active {
  transform: rotate(-90deg);
}
.iconrotate-leave-active {
  transform: rotate(90deg);
}
</style>
