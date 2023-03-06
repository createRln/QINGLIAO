<!--
 * @Description:
 * @Author: ZY
 * @Date: 2021-01-14 09:11:22
 * @LastEditors: RLN
 * @LastEditTime: 2023-03-06 11:25:49
-->

<template>
  <transition :name="transitionName">
    <div
      v-show="visible"
      :style="customStyle"
      class="back-to-ceiling"
      @click="backToTop"
    >
        <svg t="1678073129605" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1715" width="20" height="20"><path d="M539.927273 386.327273l-4.654546-4.654546-4.654545-4.654545h-9.309091-4.654546H502.690909l-4.654545 4.654545s-4.654545 0-4.654546 4.654546l-186.181818 195.490909c-13.963636 13.963636-13.963636 37.236364 0 51.2 9.309091 4.654545 18.618182 9.309091 27.927273 9.309091 9.309091 0 18.618182-4.654545 27.927272-9.309091l158.254546-167.563637 158.254545 167.563637c9.309091 9.309091 18.618182 9.309091 27.927273 9.309091 9.309091 0 18.618182-4.654545 27.927273-9.309091 13.963636-13.963636 13.963636-37.236364 0-51.2l-195.490909-195.490909z" p-id="1716"></path><path d="M512 55.854545c-251.345455 0-456.145455 204.8-456.145455 456.145455s204.8 456.145455 456.145455 456.145455 456.145455-204.8 456.145455-456.145455-204.8-456.145455-456.145455-456.145455z m0 837.818182c-209.454545 0-381.672727-172.218182-381.672727-381.672727s172.218182-381.672727 381.672727-381.672727 381.672727 172.218182 381.672727 381.672727-172.218182 381.672727-381.672727 381.672727z" p-id="1717"></path></svg>
      <!-- <svg
        class="icon"
        aria-hidden="true"
        font-size="20px"
      >
        <use xlink:href="#iconbacktotop" />
      </svg> -->
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue'

export default defineComponent({
  props: {
    // eslint-disable-next-line vue/require-default-prop
    customStyle: Object,
    visibilityHeight: {
      type: Number,
      default: 400
    },
    transitionName: {
      type: String,
      default: 'fade'
    },
    backPosition: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const state = reactive({
      visible: false,
      isMoving: false,
      interval: 0
    })
    const handleScroll = () => {
      state.visible = window.pageYOffset > props.visibilityHeight
    }

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b
      return (-c / 2) * (--t * (t - 2) - 1) + b
    }

    const backToTop = () => {
      if (state.isMoving) return
      const start = window.pageYOffset
      let i = 0
      state.isMoving = true
      const interval = setInterval(() => {
        const next = Math.floor(easeInOutQuad(10 * i, start, -start, 500))
        if (next <= props.backPosition) {
          window.scrollTo(0, props.backPosition)
          clearInterval(interval)
          state.isMoving = false
        } else {
          window.scrollTo(0, next)
        }
        i++
      }, 16.7)
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      backToTop,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.back-to-ceiling {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  :hover {
    background: #d5dbe7;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.back-to-ceiling .backTopIcon {
  fill: #9aaabf;
  background: none;
}
</style>
