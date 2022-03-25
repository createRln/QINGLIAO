<!--
 * @Author: renlina
 * @Date: 2022-03-25 13:43:33
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-25 17:54:58
 * @Description: 
-->
<template>
    <div class="chat_tools ">
        <div class="top onepxBorder" >
            <van-icon v-if="showSound" @click="showSound = !showSound" name="volume-o" :size="20"/>
            <van-icon v-else @click="showSound = !showSound" name="font-o" :size="20" />
            <div class="center_input">
                <textarea v-model="data.inputFile" v-if="showSound" class="input"></textarea>
                <div v-else @touchstart="gotouchstart" @touchmove="gotouchmove" @touchend="gotouchend">长按录音</div>
            </div>
            <van-icon name="smile-o" @click="toChangeType('emoji')" :size="25"/>
            <van-icon v-if="!data.inputFile" name="add-o" :size="25" @click="toChangeType('add')"/>
            <div class="send"  v-if="data.inputFile"> 发送</div>
        </div>
        <div class="other_box" v-if="showOtherTools">
            <template v-if="data.type == 'add'">
                <div class="logo_box">
                    <van-icon name="phone-o" color="#999" :size="40"/>     
                </div>
                <div  class="logo_box" >
                    <van-icon name="location-o" color="#999" :size="40"/>  
                </div>
                <div  class="logo_box">
                    <van-icon name="setting-o" color="#999" :size="40" />
                </div>
                <div  class="logo_box">
                    <van-icon name="credit-pay" color="#999" :size="40"/>
                </div>
                <div  class="logo_box" >
                    <van-icon name="apps-o" color="#999" :size="40"/>
                </div>
                <div class="logo_box">
                    <van-icon name="phone-o" color="#999" :size="40"/>     
                </div>
                <div  class="logo_box" >
                    <van-icon name="location-o" color="#999" :size="40"/>  
                </div>
                <div  class="logo_box">
                    <van-icon name="setting-o" color="#999" :size="40" />
                </div>
                <div  class="logo_box">
                    <van-icon name="credit-pay" color="#999" :size="40"/>
                </div>
                <div  class="logo_box" >
                    <van-icon name="apps-o" color="#999" :size="40"/>
                </div>
            </template>
            <template v-if="data.type == 'emoji'">
                <Emoji @emojiclick="emojiClick"></Emoji>
            </template>
            
        </div>
    </div>
</template>

<script setup>
import {nextTick, reactive, ref} from 'vue'
import Recorder from 'js-audio-recorder';
import Emoji from './emoji.vue'



let showSound = ref(true)
let showOtherTools = ref(false)
let data = reactive({
    recorder:null,
    type:'',
    inputFile:''
})
let  timeOut = null

const gotouchstart = () =>{
    clearTimeout(timeOut)
    timeOut = null
    timeOut = setTimeout(()=>{
        console.log('你现在长按呢')
        data.recorder = new Recorder({
          sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
          sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
          numChannels: 1 // 声道，支持 1 或 2， 默认是1
        })
        Recorder.getPermission().then(() => {
            console.log('开始录音')
          data.recorder.start() // 开始录音
        }, (error) => {
            console.log(`${error.name} : ${error.message}`)
        })

    },500)

}
const gotouchmove= ()=>{
    clearTimeout(timeOut);//清除定时器
    timeOut = null
    console.log('你现在移动呢')
}
const gotouchend= ()=>{
    clearTimeout(timeOut);//清除定时器
    timeOut = null
    data.recorder.pause() // 暂停录音

    console.log('你现在松手呢')
    let formData = new FormData()
    let blob = data.recorder.getWAVBlob()//获取wav格式音频数据
    console.log(1111,blob)
    let newblob = new Blob([blob],{type:'audio/wav'})
    console.log(222,newblob)

    let fileOfBlob = new File([newblob],new Date().getTime() + '.wav')
    console.log(3333,fileOfBlob)

    formData.append('file',fileOfBlob)
    formData.file = fileOfBlob
    console.log(formData,'formData====')
    data.recorder.play() // 播放录音
    data.recorder.destroy() // 毁实例
}
const toChangeType = (type)=>{
    if(showOtherTools.value ){
        if(type == data.type){
            showOtherTools.value = false
        }else{
            data.type = type
        }
    }else{
        showOtherTools.value = true
        data.type = type    
    }
}
const emojiClick = (item)=>{
    data.inputFile = data.inputFile + item
}
</script>

<style lang="less" scoped>
.chat_tools{
    
    // border-top:2px solid #666 ;
    .top{
        box-shadow: 0px 10px 10px 0px #e4e4e4;
        min-height: 140px;
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .center_input{
            flex: 1;
            margin: 0px 10px;
            background: #fff;
            padding: 12px;
            min-height: 60px;
            border-radius: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            .input{
                width: 100%;
                height: 100%;
                border:none;
                font-size: 32px;
            }
        }
        .send{
            width: 100px;
            margin-left: 10px;
            padding: 10px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #fff;
            background: rgba(111, 198, 238, 0.7);
        }
    }
    .other_box{
        height: 450px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        flex-direction: row;
        padding: 0px 40px 20px 40px;
        overflow-y: scroll;
        .logo_box{
            width: 120px;
            height: 120px;
            border-radius: 12px;
            box-sizing: border-box;
            padding: 16px;
            background: #fff;
            margin: 20px ;
            margin-right: 0px;
        }
    }
}
</style>