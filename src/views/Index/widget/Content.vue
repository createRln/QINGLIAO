<!--
 * @Author: renlina
 * @Date: 2022-03-11 11:30:49
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-11 16:31:15
 * @Description: 
-->
<template>
    <div class="list_box">
        <div class="list_left">
            <div class="left_pop">{{info.new_msg}}</div>
            <img class="left_head_img" :src="props.info.head_url" alt="">
        </div>
        <div class="list_right">
            <div class="right_name"><span>{{props.info.name}}</span><span>{{CommonDate.dateTime(props.info.time)}}</span></div>
            <div class="right_msg ">{{props.info.message}}</div>
        </div>
    </div>
</template>

<script setup>
import {ref,toRefs,reactive,defineProps} from 'vue'
import CommonDate from '@utils/date.js'

const props = defineProps({
        info:{
            type:Object,
            default:{}
        }
})
// console.log(props.info)
</script>

<style lang="less" scoped>
.list_box{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .list_left{
        position: relative;
        margin-right: 20px;
        .left_head_img{
            width: 120px;
            height: 120px;
            border-radius: 24px;
        }
        .left_pop{
            width: 40px;
            height: 40px;
            position: absolute;
            right: -5px;
            top: -10px;
            background: red;
            color: #fff;
            font-size: 24px;
            line-height: 40px;
            text-align: center;
            border-radius: 50%;
        }
    }
    .list_right{
        width: calc(100% - 140px);
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .right_name{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            span{
                display: block;
                font-size: 44px;
                font-weight: 500;
                line-height: 50px;
                color: #333;
                &:nth-last-of-type(1){
                    color: #666;
                    font-size: 32px;
                }
            }
            
        }
        .right_msg{
            font-size: 32px;
            font-weight: 500;
            line-height: 34px;
            color: #666;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
}
</style>