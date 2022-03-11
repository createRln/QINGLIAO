<!--
 * @Author: renlina
 * @Date: 2022-03-10 14:08:58
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-10 16:44:32
 * @Description: 
-->


<template>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"/>
    </router-view>
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
