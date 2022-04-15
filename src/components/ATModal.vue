<!--
 * @Author: renlina
 * @Date: 2022-04-13 15:26:19
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-13 17:07:14
 * @Description: 
-->
<template>
    <div class="at_modal" :style="{top:props.Top + 'px',left: Left + 'px'}">
        <p class="item_name" v-for="(item,index) in nameList" :key="index">{{item.name}}</p>
    </div>
    <div class="sanjiao" :style="{top:props.Top + 83 + 'px',left: Left + 40 + 'px'}"></div>
</template>

<script setup>
import { reactive } from "@vue/reactivity"

let props = defineProps({
    Top:{
        type:Number,
        default:0
    },
    Left:{
        type:Number,
        default:0
    },
    
})
let nameList = reactive([
    {
        name:'一号种子',
    },
    {
        name:'二号种子',
    },
    {
        name:'三号种子',
    },
    {
        name:'四号种子',
    },
    {
        name:'五号种子',
    },
])
</script>

<style lang="less" scoped>
.at_modal{
    
    position: absolute;
    z-index: 10;
    padding: 20px;
    box-sizing: border-box;
    width: 240px;
    height: 200px;
    overflow: scroll;
    background: #fff;
    border-radius: 16px;
    border: 1px solid #ededed;
    box-shadow: 0px 10px 10px 0px #e4e4e4;
    .item_name{
        white-space: nowrap;
        line-height: 45px;
        color: #666;
    }
}
.sanjiao{
        content: '';
        z-index: 999;
        position: absolute;
        border-color: #fff;
        border-width: 30px 30px;
        border-style: solid;
        width: 0;
        height: 0;
        // border-top-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
    }
</style>