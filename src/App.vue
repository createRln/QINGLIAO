<!--
 * @Author: renlina
 * @Date: 2022-03-10 14:08:58
 * @LastEditors: renlina
 * @LastEditTime: 2022-05-15 17:21:47
 * @Description: 
-->


<template>
    <div class="app">
      <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
    </router-view> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" />
    </keep-alive>
    <router-view  v-if="!$route.meta.keepAlive" :key="$route.fullPath" />

    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'App'
})
</script>
<style lang="less">
@import '@styles/common.less';
@import '@styles/normalize.less';
@import '@styles/variable.less';
@import '@styles/svg.scss';
</style>
