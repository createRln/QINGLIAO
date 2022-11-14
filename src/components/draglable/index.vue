<!--
 * @Author: renlina
 * @Date: 2022-09-19 17:42:53
 * @LastEditors: renlina
 * @LastEditTime: 2022-09-27 11:24:25
 * @Description: 
-->
<template>
    <div ref="RefDraglable" class="main_box">
        <div class="content" @mousedown.stop="itemMouseDown" @mouseover="itemMouseMove" v-for="datainfo in myData.list" :key="datainfo.imgUrl" :ref="handleRef">
            <img class="item" :src="datainfo.imgUrl" alt="">
            <p class="title">{{datainfo.imgTitle}}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import Common from '@/utils/common.js'
import { watch, ref,onBeforeUpdate, onUpdated, reactive, onMounted } from 'vue'
import func from '../../../vue-temp/vue-editor-bridge'

type mydataList = {
    imgUrl?: string,
    imgTitle?: string,
}
type mydataType = {
    type: string,
    list: Array<mydataList>
}
type PropsType = {
    myData: mydataType
}
const props = withDefaults(defineProps<PropsType>(),{})

const DeepData = ref(null)
DeepData.value = props.myData
const Imgs = DeepData.value.list

const refItems = ref([])
const handleRef = (el, index) => {
    if(el) {
        refItems.value.push(el)
    }
}

setTimeout(() => {
  toPositionAb()
},0)
const state = reactive({
    offsetLT: []
})
function toPositionAb() {
    refItems.value.forEach((item, index) => {
        let L = item.offsetLeft
        let T = item.offsetTop
        state.offsetLT.push({
            L, T
        })
    })
    refItems.value.forEach((item, index) => {
        item.style.position = 'absolute'
        item.style.left = state.offsetLT[index].L + 'px'
        item.style.top = state.offsetLT[index].T + 'px'
        
        toBindMove(item, index)
    })
}
const itemMouseDown = (event) => {
    console.log(11111,event)
        
}
const itemMouseMove = (event) => {
    
}

const toBindMove = (item: any, index: number) => {
    // item.onmousedown = function(event) {
    //     let _this = this
    //     event = event || window.event
    //     let event_cur_X = event.clientX,
    //         event_cur_Y = event.clientY

    //     let tag_cur_L = this.offsetLeft,
    //         tag_cur_T = this.offsetTop
    //     window.addEventListener('mousemove', function(moveEvent) {
    //         console.log(moveEvent, event)
    //         let need_move_l = event.clientX - event_cur_X,
    //             need_move_y = event.clientY - event_cur_Y
    //         _this.style.left = tag_cur_L + need_move_l + 'px'
    //         _this.style.top = tag_cur_T + need_move_y + 'px'
            
    //         let needChangeTag:any =  toCheckCollide(_this)
    //         refItems.value.forEach(item => {
    //             item.style.border = "1px solid transparent"
    //         })
    //         needChangeTag && (needChangeTag.style.border = "1px solid red")
    //     })
    //     // document.onmousemove = function(moveEvent) {
    //     //     // moveEvent = moveEvent || window.event
            

    //     // }

    //     document.onmouseup = function(event){
    //         document.onmousemove = null
    //         document.onmouseup = null
    //             // 交换
    //         let nearTag =  toCheckCollide(_this)
    //         toChangeAdress(_this, nearTag, index)

    //     }

    //     return false //组织默认

    // }
}
function toChangeAdress(curTag, nearTag, index) {

    if(!nearTag) {

        curTag.style.left = state.offsetLT[index].L + 'px'
        curTag.style.top = state.offsetLT[index].T + 'px'
        return
    }
    // 交换位置
    nearTag.style.left = state.offsetLT[curTag.cur_index].L + 'px'
    nearTag.style.top = state.offsetLT[curTag.cur_index].T + 'px'
    
    curTag.style.left = state.offsetLT[nearTag.cur_index].L + 'px'
    curTag.style.top = state.offsetLT[nearTag.cur_index].T + 'px'

    // 替换位置offset
    let tempOffsetLT = state.offsetLT[curTag.cur_index]
    state.offsetLT[curTag.cur_index] = state.offsetLT[nearTag.cur_index]
    state.offsetLT[nearTag.cur_index] = tempOffsetLT
    nearTag.style.border = "1px solid transparent"

    // 替换原始数据
    let tempImgs = Imgs[curTag.cur_index]
    Imgs[curTag.cur_index] = Imgs[nearTag.cur_index]
    Imgs[nearTag.cur_index] = tempImgs

}

function toCheckCollide(cur_tag){
    let temp = 1000000
    let needChangeTag = ''
    refItems.value.forEach((oth_tag, index) => {
        if(oth_tag == cur_tag) return
        let cur_L = cur_tag.offsetLeft,
            cur_T = cur_tag.offsetTop,
            cur_R = cur_tag.offsetLeft + cur_tag.offsetWidth,
            cur_B = cur_tag.offsetTop + cur_tag.offsetHeight
        let oth_L = oth_tag.offsetLeft,
            oth_T = oth_tag.offsetTop,
            oth_R = oth_tag.offsetLeft + oth_tag.offsetWidth,
            oth_B = oth_tag.offsetTop + oth_tag.offsetHeight
        
        if(cur_R < oth_L || cur_B < oth_T || oth_R < cur_L || oth_B < cur_T) {
        } else {
            console.log('pengzhuang ')
            let diffLength = findNeerMostTag(cur_tag, oth_tag)
            if(diffLength < temp) {
                temp = diffLength
                needChangeTag = oth_tag
            }
            // console.log(cur_tag,oth_tag,'cue---')
        }

    })
    return needChangeTag

}
function findNeerMostTag(cur_tag, oth_tag){
    let diffWidth = oth_tag.offsetLeft - cur_tag.offsetLeft,
        diffHeight = oth_tag.offsetHeight - cur_tag.offsetHeight
    let diffSquare = Math.pow(diffWidth, 2) + Math.pow(diffHeight, 2)
    return Math.sqrt(diffSquare)
}



onBeforeUpdate(() => {
    refItems.value = []
})
onUpdated(() => {
    // console.log(refItems.value)
})



// let listTag = document.getElementsByClassName('.item')

</script>

<style lang="less" scoped>
.main_box{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    height: 1100px;
    border: 1px solid #666;
    background: linear-gradient(90deg, #67cfda, #41c1f4, #66abe8, #648de6);
    position: relative;

}
.content {
    width: 30%;
    height: 260px;
    border: 1px solid transparent;
}
.item{
    width: 100%;
    height: 100%;
}
.title{
    text-align: center;
    line-height: 34px;
    color: #fff;
}
</style>