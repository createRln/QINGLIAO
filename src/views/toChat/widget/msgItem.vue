<!--
 * @Author: renlina
 * @Date: 2022-04-06 17:15:43
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-06 17:21:05
 * @Description: 
-->
<template>
    <div class="msg_single_time"  v-viewer >
        <div class="msg_time" v-if="item.time">{{CommonDate.dateTime(item.time)}}</div>
        <div class="msg_item " :class="{msg_left:item.id == 'a',msg_right:item.id == 'b'}">
            <img class="headerimg" :src="Common.getImageUrl(item.imgUrl)"  alt="">
            <div  class="msg_text">
                <div v-if="item.types == 0">{{item.message}}</div>
                <img  class="msgimg"  v-if="item.types == 1" :src="item.message"  alt="" >
                <a :href="item.href" v-if="item.types == 2">
                    <div class="file" >
                        <img class="file_icon" src="../../../assets/文件.png" alt="">
                        <div class="file_content">
                            <p>{{item.name}}</p>
                            <p>size:{{item.size}}</p>
                        </div>
                    </div>
                </a>
                <div  class="audio"  v-if="item.types == 3" @click="audioClick">
                    <van-icon class="playicon" size="20px" name="volume-o" />
                    <audio id="audioRef" >
                        <source :src="item.href" type="video/mp4">
                        <source :src="item.href" type="video/webm">
                        <source :src="item.href" type="video/ogg">
                    </audio>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import CommonDate from '@/utils/date.js'
import Common from '@/utils/common.js'

let props = defineProps({
    item:{
        type:Object,
        default:{}
    }
})
const item = props.item
const audioClick = ()=>{
    let audioRef = document.getElementById('audioRef')
    if(audioRef){
        audioRef.play()
    }
}

</script>

<style lang="less" scoped>
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
                    max-width: 400px;
                    height: auto;
                    width: auto;
                    border-radius: 0px;
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
                    .file{
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: flex-start;
                        width: 500px;
                        .file_icon{
                            width: 160px;
                            height: 160px;
                            margin-right: 20px;
                        }
                        .file_content{
                            p{
                                font-size: 24px;
                                color: #999;
                                line-height: 40px;
                            }
                        }
                    }
                    .audio{
                        width: 300px;
                        height: 40px;
                        position: relative;
                        .playicon{
                            position: absolute;
                            left: 12px;
                            top: 50%;
                            transform: translateY(-40%);
                        }
                        // audio{
                        //     width: 100%;
                        //     height: 40px;
                        // }
                    }
                }

            }
        }
</style>