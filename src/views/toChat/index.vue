<!--
 * @Author: renlina
 * @Date: 2022-03-15 11:04:06
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-16 18:46:32
 * @Description: 
-->
<template>
    <div class="content_box">
        <Tab :type="'person'"></Tab>
        <!-- <QrcodeVue :value="'https://static.rong360.com/upload/png/4d/de/4dde4b7805d208502228b084e4e9bc82.png'" :size="120" level="H" /> -->
        <div class="msg_box">
            <div class="msg_single_time" v-for="(item,index) in messageList" :key="index">
                <div class="msg_time">{{item.time}}</div>
                <div class="msg_item msg_left">
                    <img  alt="">
                    <div class="msg_text">hello你好呀，我是一只喝牛奶的小花牛，希望能和粉色的美羊羊成为一对非常好的朋友。</div>
                </div>
            </div>
            <div class="msg_single_time">
                <div class="msg_time">2022-12-20&nbsp;12:20</div>
                <div class="msg_item msg_right">
                    <img src="../../assets/headImg/9.jpeg" alt="">
                    <div class="msg_text">很高兴认识你，我就是粉色的美羊羊呀</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive} from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'
import Tab from './widget/Tab.vue'
import Common from '@/utils/common.js'
// import QrcodeVue from 'qrcode.vue'
const data = reactive({
    messageList:[]
})
const getImageUrl = Common.getImageUrl
onBeforeMount(()=>{
    init()
    createQrcode()
})
const init = ()=>{
    data.messageList = [
        {
            id:'a',
            imgUrl:'8',
            message:'hello你好呀1，我是一只喝牛奶的小花牛，希望能和粉色的美羊羊成为一对非常好的朋友。',
            types: 0,
            time: new Date()-1000,
            tip:0
        },
        {
            id:'a',
            imgUrl:'8',
            message:'hello你好呀2，我是一只喝牛奶的小花牛，希望能和粉色的美羊羊成为一对非常好的朋友。',
            types: 0,
            time: new Date()-1600,
            tip:1
        },
        {
            id:'b',
            imgUrl:'9',
            message:'很高兴认识你1，我就是粉色的美羊羊呀',
            types: 0,
            time: new Date()-2000,
            tip:3
        },
        {
            id:'b',
            imgUrl:'9',
            message:'很高兴认识你2，我就是粉色的美羊羊呀',
            types: 0,
            time: new Date()-4000,
            tip:4
        },
    ]
}
const createQrcode = ()=>{


}



</script>

<style lang="less" scoped>
.content_box{
    padding-top: 140px;
    min-height: 100vh;
    background: #ededed;
    box-sizing: border-box;
    .msg_box{
        height: calc(100vh - 280px);
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
                &.msg_left{
                    flex-direction: row;
                    img{
                        margin-right: 20px;
                    }
                }
                &.msg_right{
                    flex-direction: row-reverse;
                    img{
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