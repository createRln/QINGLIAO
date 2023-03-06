<!--
 * @Description:
 * @Author: ZY
 * @Date: 2021-01-13 21:28:05
 * @LastEditors: RLN
 * @LastEditTime: 2023-03-06 11:22:26
-->
<template>
  <div class="components-container">
    <aside>测试滚动到顶部</aside>
    <aside>测试滚动到顶部</aside>
    <div class="placeholder-container">
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
      <div>placeholder</div>
    </div>
    <!-- you can add element-ui's tooltip -->
    <BackTop
      :customStyle="myBackToTopStyle"
      :visibilityHeight="300"
      :backPosition="50"
      transitionName="fade"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BackTop from '@components/backtotop/index.vue'

export default defineComponent({
  components: {
    BackTop
  },
  setup() {
    const myBackToTopStyle = {
      right: '50px',
      bottom: '50px',
      width: '40px',
      height: '40px',
      'border-radius': '4px',
      'line-height': '45px', // Please keep consistent with height to make it center vertically
      background: '#e7eaf1'
    }
    return {
      myBackToTopStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.placeholder-container div {
  margin: 10px;
}
</style>
