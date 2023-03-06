<!--
 * @Author: RLN
 * @Date: 2023-03-03 11:49:14
 * @LastEditors: RLN
 * @LastEditTime: 2023-03-03 16:27:26
 * @Description: 
-->
<template>
    <div ref="mainBoxRef">
        <n-button class="button" @click="toScroll">点击滚动</n-button>
        <div v-for="(item,index) in myList" :key="index" class="main-box">
            <p>{{item.name}}</p>
            <img :src="item.head_url" class="myimg" alt="">
        </div>
        <div ref="bottomRef">
            <n-button class="button">底部内容</n-button>
        </div>
    </div>
</template>

<script setup >
import { ref } from 'vue'
import Common from '@/utils/common.js'
import {scrollTo} from '@/utils/scrollTo.ts'

const { getImageUrl } = Common
const myList = [
    {
        head_url:getImageUrl('9'),
        name:'太阳1',
        message:'我是大太阳！我是大太阳！我是大太阳！我是大太阳！我是大太阳！我是大太阳！我是大太阳！我是大太阳！我是大太阳！',
        time: new Date('2022/03/11/12:03:59'),
        new_msg:2,
        id:'1'
    },
    {
        head_url:getImageUrl('2'),
        name:'太阳2',
        message:'我是大太阳！',
        time: new Date('2022/03/10/9:5:59'),
        new_msg:1,
        id:'2'
    },
    {
        head_url:getImageUrl('7'),
        name:'太阳3',
        message:'我是大太阳！',
        time: new Date('2022/03/10/12:03:59'),
        new_msg:3,
        id:'3'
    },
    {
        head_url:getImageUrl('4'),
        name:'太4',
        message:'我是大太阳！',
        time:new Date('2022/3/9/12:03:59'),
        new_msg:10,
        id:'4'
    },
    {
        head_url:getImageUrl('5'),
        name:'太阳5',
        message:'我是大太阳！',
        time: new Date('2022/03/11/15:05:59'),
        new_msg:11,
        id:'5'
    },
    {
        head_url:getImageUrl('6'),
        name:'太阳6',
        message:'我是大太阳！',
        time: new Date('2022/03/11/11:10:59'),
        new_msg:12,
        id:'6'
    },
    {
        head_url:getImageUrl('5'),
        name:'太阳5',
        message:'我是大太阳！',
        time: new Date('2022/03/11/15:05:59'),
        new_msg:11,
        id:'5'
    },
    {
        head_url:getImageUrl('6'),
        name:'太阳6',
        message:'我是大太阳！',
        time: new Date('2022/03/11/11:10:59'),
        new_msg:12,
        id:'6'
    },
    {
        head_url:getImageUrl('5'),
        name:'太阳5',
        message:'我是大太阳！',
        time: new Date('2022/03/11/15:05:59'),
        new_msg:11,
        id:'5'
    },
    {
        head_url:getImageUrl('6'),
        name:'太阳6',
        message:'我是大太阳！',
        time: new Date('2022/03/11/11:10:59'),
        new_msg:12,
        id:'6'
    },
    {
        head_url:getImageUrl('5'),
        name:'太阳5',
        message:'我是大太阳！',
        time: new Date('2022/03/11/15:05:59'),
        new_msg:11,
        id:'5'
    },
    {
        head_url:getImageUrl('6'),
        name:'太阳6',
        message:'我是大太阳！',
        time: new Date('2022/03/11/11:10:59'),
        new_msg:12,
        id:'6'
    },
    {
        head_url:getImageUrl('5'),
        name:'太阳5',
        message:'我是大太阳！',
        time: new Date('2022/03/11/15:05:59'),
        new_msg:11,
        id:'5'
    },
    {
        head_url:getImageUrl('6'),
        name:'太阳6',
        message:'我是大太阳！',
        time: new Date('2022/03/11/11:10:59'),
        new_msg:12,
        id:'6'
    },
]
const mainBoxRef = ref(null)
const bottomRef = ref(null)
const toScroll = () => {
    scrollTo(3000, 500, () => {
        console.log('滚动结束啦')
    })
    // mainBoxRef.value.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

// setTimeout(() => {
//     bottomRef.value.scrollIntoViewIfNeeded()
// },1000)

console.log(myList)
</script>

<style lang="less" scoped>
.button{
    width: 100%;
}
.main-box{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.myimg{
    width: 300px;
    height: 300px;
    margin-top: 20px;
}

</style>