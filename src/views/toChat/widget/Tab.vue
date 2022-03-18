<!--
 * @Author: renlina
 * @Date: 2022-03-11 10:45:13
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-15 11:37:47
 * @Description: 
-->
<template>
    <div class="tab_box">
        <div class="tab_left" @click="()=>$router.go(-1)">
            <!-- &lt;&nbsp;返回 -->
            <van-icon :size="24" name="arrow-left" />
            <!-- <img src="../../../assets/headImg/8.jpeg" alt=""> -->
        </div>
        <div class="tab_center">
            {{$route.meta.title}}
        </div>
        <div class="tab_right" >
            <div v-if="props.type == 'person'" @click="()=>$router.push('/register')" class="right_text">
                <img src="../../../assets/headImg/8.jpeg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref,toRefs,reactive} from 'vue'
const state = reactive({
    name:'111111'
})
const props = defineProps({
    type:{
        type:String,
        default:''
    }
})
console.log(props.type)
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
    background: rgba(244, 244, 244, 0.96);
    padding: 20px 10px 20px 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #ededed;
    .tab_left{
        // width: 90px;
        height: 90px;
        font-size: 36px;
        line-height: 90px;
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
        font-size: 36px;
        .right_text{
            img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
            }
        }
        
    }

}
</style>