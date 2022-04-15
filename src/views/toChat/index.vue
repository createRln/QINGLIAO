<!--
 * @Author: renlina
 * @Date: 2022-03-15 11:04:06
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-06 17:23:06
 * @Description: 
-->
<template>
    <div class="content_box">
        <Tab :type="'person'"></Tab>
        <div class="msg_box" ref="msg_box" @click="hiddenOtherTools = false">
            <MsgItem class="msg_single_time" v-for="(item,index) in data.messageList" :key="index" :item="item">
            </MsgItem>
        </div>
        <FooterTools @tosend="tosend" @toScrollBottom="scrollBottom" :hiddenOtherTools="hiddenOtherTools"></FooterTools>
    </div>
</template>

<script setup>
import {ref , reactive} from 'vue'
import { nextTick, onBeforeMount } from '@vue/runtime-core'
import Tab from './widget/Tab.vue'
// import Common from '@/utils/common.js'
import CommonDate from '@/utils/date.js'
import FooterTools from '@/components/footerChatTools.vue'
import MsgItem from './widget/msgItem.vue'
const data = reactive({
    messageList:[],
    imgs:[],
    nowDate:new Date()
})
// const getImageUrl = Common.getImageUrl
let hiddenOtherTools = ref(false)
onBeforeMount(()=>{
    init()
})
let msg_box = ref(null)
let msg_item = ref([])
const scrollBottom = ()=>{
    if(!msg_box.value) return
    console.log(1111)
    msg_box.value.scrollTop =  msg_box.value.scrollHeight  //滚动到最底部
}
const setRef = (el)=>{
    msg_item.value.push(el)
}
const init = ()=>{
    data.messageList = [
        {
            id:'a',
            imgUrl:'8',
            message:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.touxiangwu.com%2Fuploads%2Fallimg%2F2021090510%2F2k204d1r5ed.jpg&refer=http%3A%2F%2Fimg.touxiangwu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651459257&t=7c6e5fa7e61b5d86f48d379446d478f2',
            types: 1,
            time: new Date()-1000000,
            tip:0
        },
        {
            id:'a',
            imgUrl:'8',
            message:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.touxiangwu.com%2Fuploads%2Fallimg%2F2021090514%2Fwwzg10iaegt.jpg&refer=http%3A%2F%2Fimg.touxiangwu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651459579&t=6348694bf7dbd8f167c9f2fa78d35cd4',
            types: 1,
            time: new Date()-10000,
            tip:1
        },
        {
            id:'b',
            imgUrl:'1',
            message:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.touxiangwu.com%2Fuploads%2Fallimg%2F2021090420%2F1bmuak35s1f.jpg&refer=http%3A%2F%2Fimg.touxiangwu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651459579&t=3399d78f2be4575713d582107e51177c',
            types: 1,
            time: new Date()-888880,
            tip:3
        },
        {
            id:'b',
            imgUrl:'1',
            message:'74873hbchjbhcv h才不会变的机会成本价',
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
            imgUrl:'1',
            message:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.touxiangwu.com%2Fuploads%2Fallimg%2F2021090420%2Fsiz2fsvza2u.jpg&refer=http%3A%2F%2Fimg.touxiangwu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651459579&t=ad4e7e9cf61d3b5b621493c9483859a8',
            types: 1,
            time: new Date()-8888888,
            tip:3
        },
        {
            id:'a',
            imgUrl:'8',
            message:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.touxiangwu.com%2Fuploads%2Fallimg%2F2021090422%2F5vhz14ol2qb.jpg&refer=http%3A%2F%2Fimg.touxiangwu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651459579&t=925e24301d6780b8a1af812488d65e2e',
            types: 1,
            time: new Date()-10000000,
            tip:4
        },
        {
            id:'a',
            imgUrl:'8',
            message:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.duote.com%2Fduoteimg%2Fdtnew_newsup_img%2F202104%2F20210402115004_46788.jpg&refer=http%3A%2F%2Fimg1.duote.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651459579&t=48257a9f4e946f0f326842da4175df38',
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
    nextTick(()=>{
        setTimeout(()=>{ //初始化的时候好像有问题，此时还没渲染好页面，拿到的元素滚动高度太小了，需要延时一下在滚动，还不知道为啥，之后有时间再解决

            scrollBottom()
        },10)
    })
}

const tosend = (value,types)=>{
    // console.log(value,'收到啦收到了',data.messageList)
    let newMsg = {}
    switch (types){
        case 0:
        case 1:
            newMsg = {
                    id:'b',
                    imgUrl:'1',
                    message:value,
                    types: types,
                    time: new Date(),
                    tip:0
                }
            break;
        case 2:
            newMsg = {
                    id:'b',
                    imgUrl:'1',
                    href:value.src,
                    size:value.size,
                    name:value.name,
                    message:'',
                    types: types,
                    time: new Date(),
                    tip:0
                } 
            break;
        case 3:
            newMsg = {
                    id:'b',
                    imgUrl:'1',
                    href:value,
                    message:'',
                    types: types,
                    time: new Date(),
                    tip:0
                } 
            break;


    }
    data.messageList.push(newMsg)
    
   
    nextTick(()=>{
        scrollBottom()
    })
}






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
        // height: 1200px;
        // height: calc(100vh - 280px);
        // background: rgb(133, 228, 240);
        box-sizing: border-box;
        padding: 30px 40px;
        overflow: hidden;
        overflow-y: scroll;
        // display: flex;
        // flex-direction: column;
        // justify-content: flex-end;
        
    }
}
</style>