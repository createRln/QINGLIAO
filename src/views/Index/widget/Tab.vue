<!--
 * @Author: renlina
 * @Date: 2022-03-11 10:45:13
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-11 19:16:49
 * @Description: 
-->
<template>
    <div class="tab_box">
        <div class="tab_left">
            <img src="../../../assets/headImg/8.jpeg" alt="">
        </div>
        <div class="tab_center">
             {{$route.meta.title}}
        </div>
        <div class="tab_right">
            <div class="right_search cay-svg-search">

            </div>
            <!-- <div class="right_add cay-svg-bottom-tab1">
                
            </div> -->
            <van-icon size="25" color="#666" name="add-o" />
        </div>
    </div>
</template>

<script setup>
import {ref,toRefs,reactive} from 'vue'
const state = reactive({
    name:'111111'
})
</script>
<style lang="less" scoped>
.tab_box{
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 10;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 20px 30px 20px 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #ededed;
    .tab_left{
        img{
            width: 90px;
            height: 90px;
            border-radius: 50%;
        }
    }
    .tab_center{
        color: #666;
        font-size: 44px;
        font-weight: 500;
        line-height: 34px;
    }
    .tab_right{
        width: 120px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right_search{
            width: 40px;
            height: 40px;
        }
        .right_add{
            width: 64px;
            height: 64px;
        }
        
    }

}
</style>