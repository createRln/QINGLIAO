<!--
 * @Author: renlina
 * @Date: 2022-03-15 11:04:06
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-25 16:27:02
 * @Description: 
-->
<template>
    <div class="content_box">
        <Tab :type="'person'"></Tab>
        <div class="msg_box" ref="msg_box" @click="hiddenOtherTools = false">
            <div class="msg_single_time" v-for="(item,index) in data.messageList" :key="index" v-viewer :ref="setRef">
                <div class="msg_time" v-if="item.time">{{CommonDate.dateTime(item.time)}}</div>
                <div class="msg_item " :class="{msg_left:item.id == 'a',msg_right:item.id == 'b'}">
                    <img class="headerimg" :src="getImageUrl(item.imgUrl)"  alt="">
                    <div  class="msg_text">
                        <div v-if="item.types == 0">{{item.message}}</div>
                        <img  class="msgimg"  v-if="item.types == 1" :src="getImageUrl(item.message)"  alt="" >
                    </div>
                </div>
            </div>
        </div>
        <FooterTools :hiddenOtherTools="hiddenOtherTools"></FooterTools>
    </div>
</template>

<script setup>
import {ref , reactive} from 'vue'
import { nextTick, onBeforeMount } from '@vue/runtime-core'
import Tab from './widget/Tab.vue'
import Common from '@/utils/common.js'
import CommonDate from '@/utils/date.js'
import FooterTools from '@/components/footerChatTools.vue'
const data = reactive({
    messageList:[],
    imgs:[],
    nowDate:new Date()
})
const getImageUrl = Common.getImageUrl
let hiddenOtherTools = ref(false)
onBeforeMount(()=>{
    init()
})
let msg_box = ref(null)
let msg_item = ref([])
const setRef = (el)=>{
    msg_item.value.push(el)
}
const init = ()=>{
    data.messageList = [
        {
            id:'a',
            imgUrl:'8',
            message:'4',
            types: 1,
            time: new Date()-1000000,
            tip:0
        },
        {
            id:'a',
            imgUrl:'8',
            message:'2',
            types: 1,
            time: new Date()-10000,
            tip:1
        },
        {
            id:'b',
            imgUrl:'9',
            message:'7',
            types: 1,
            time: new Date()-888880,
            tip:3
        },
        {
            id:'b',
            imgUrl:'9',
            message:'很高兴认识你2，我就是粉色的美羊羊呀',
            types: 0,
            time: new Date()-9999900,
            tip:4
        },
        {
            id:'a',
            imgUrl:'8',
            message:'7差不多创建和编辑百分点',
            types: 0,
            time: new Date()-888880,
            tip:3
        },
        {
            id:'a',
            imgUrl:'8',
            message:'很高兴认识你2，我就是粉色的美羊羊呀',
            types: 0,
            time: new Date()-99900,
            tip:4
        },
        {
            id:'b',
            imgUrl:'9',
            message:'6',
            types: 1,
            time: new Date()-8888888,
            tip:3
        },
        {
            id:'a',
            imgUrl:'8',
            message:'8',
            types: 1,
            time: new Date()-10000000,
            tip:4
        },
        {
            id:'a',
            imgUrl:'8',
            message:'8',
            types: 1,
            time: new Date()-180000,
            tip:4
        },
    ]
    data.messageList = data.messageList.sort((a,b)=>{ // 按照时间倒序排序
        return a.time - b.time
    })
    data.messageList.forEach((item,index)=>{ //设置时间间隔，时间与当前时间小于5分钟的隐藏时间展示
        let curT = CommonDate.spaceTime(data.nowDate,item.time)
        item.time = curT
    })

}
nextTick(()=>{
    let lastIndexTop = msg_item.value[data.messageList.length - 1]
    console.log(lastIndexTop)
    // lastIndexTop.scrollIntoView()
    // msg_box.value.scrollTop = 2000
})





</script>

<style lang="less" scoped>
.content_box{
    padding-top: 140px;
    background: #ededed;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100vh;
    .msg_box{
        flex: 1;
        // height: calc(100vh - 280px);
        // background: rgb(133, 228, 240);
        box-sizing: border-box;
        padding: 30px 40px;
        overflow: hidden;
        overflow-y: scroll;
        // display: flex;
        // flex-direction: column;
        // justify-content: flex-end;
        .msg_single_time{
            margin-bottom: 40px;
            .msg_time{
                color: #999;
                font-size: 24px;
                text-align: center;
                margin-bottom: 40px;
            }
            .msg_item{
                width: 100%;
                display: flex;
                justify-content: flex-start;
                margin-bottom: 20px;
                .msgimg{
                    width: 400px;
                    height: auto;
                }
                &.msg_left{
                    flex-direction: row;
                    .headerimg{
                        margin-right: 20px;
                    }
                }
                &.msg_right{
                    flex-direction: row-reverse;
                    .headerimg{
                        margin-left: 20px;
                    }
                    .msg_text{
                        background: #fff;
                        
                    }
                }
                img{
                    width: 80px;
                    height: 80px;
                    border-radius: 16px;
                }
                .msg_text{
                    font-size: 28px;
                    color: #666;
                    line-height: 44px;
                    border-radius: 16px;
                    background: rgba(111,198,238, 0.7);
                    // background-image: linear-gradient(90deg, #6fc6ee 0%, #a388b3 100%);
                    max-width: calc(100% - 200px);
                    box-sizing: border-box;
                    padding: 12px 16px;
                }

            }
        }
    }
}
</style>