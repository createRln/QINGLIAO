<!--
 * @Author: RLN
 * @Date: 2023-03-03 16:27:56
 * @LastEditors: RLN
 * @LastEditTime: 2023-03-03 17:37:50
 * @Description: 
-->
<template>
    <div>
        <div class="mainsteps">
            <div id="hamburger-container"><n-button>第一步</n-button></div>
            <div id="breadcrumb-container"><n-button>第二步</n-button></div>
        </div>
        <n-button class="btn"  @click.prevent.stop="guide">点击触发新人引导</n-button>
    </div>
</template>

<script setup>
import { ref, defineComponent, onMounted } from 'vue'
import Driver from 'driver.js' 
import 'driver.js/dist/driver.min.css'
// https://www.npmjs.com/package/driver.js

const steps = [
  {
     element: '#hamburger-container',
     popover: {
       title: '侧边栏按钮',
       description: '打开或者关闭侧边栏',
       position: 'bottom'
    }
  },
  {
     element: '#breadcrumb-container',
     popover: {
       title: 'Breadcrumb',
       description: 'Indicate the current page location',
       position: 'left'
    }
  }
 ]
let driver = null
onMounted(() => {
    driver = new Driver()
})

const guide = () => {
    if (driver) {
    driver.defineSteps(steps)
    driver.start()
    }
}

</script>

<style lang="less" scoped>
.mainsteps{
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0px;
}
.btn{
    width: 100%;
}
</style>