<!--
 * @Author: renlina
 * @Date: 2022-03-25 13:43:33
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-13 16:46:17
 * @Description: 
-->
<template>
    <div class="chat_tools " ref="tools_modal">
        <div class="top onepxBorder" >
            <van-icon v-if="showSound" @click="showSound = !showSound" name="volume-o" :size="20"/>
            <van-icon v-else @click="showSound = !showSound" name="font-o" :size="20" />
            <div class="center_input">
                <textarea ref="sendinput" v-model="data.inputFile" @input="inputChange" v-if="showSound" class="input"></textarea>
                <div v-else @touchstart="gotouchstart"  @touchend="gotouchend">长按录音</div>
            </div>
            <van-icon name="smile-o" @click="toChangeType('emoji')" :size="25"/>
            <van-icon v-if="!data.inputFile" name="add-o" :size="25" @click="toChangeType('add')"/>
            <div class="send" @click="beforeSend(0)"  v-show="data.inputFile"> 发送</div>
        </div>
        <otherTools v-if="showOtherTools" @emitfile="emitfile" :showOtherTools="showOtherTools" :type="data.type" @emojiclick="emojiClick"></otherTools>
        <ATModal v-if="showAT" :Top="Top" :Left="Left"></ATModal>
    </div>
</template>

<script setup>
import {nextTick, reactive, ref,onMounted,onBeforeUnmount,watch,inject} from 'vue'
import Recorder from 'js-audio-recorder';
import otherTools from './otherTools.vue'
import ATModal from './ATModal.vue'
import {getPosition} from '@utils/position.js'

let showSound = ref(true)
let showOtherTools = ref(false)
let data = reactive({
    recorder:null,
    type:'',
    inputFile:''
})
let tools_modal = ref(null)
let sendinput = ref(null)

const emit = defineEmits(['tosend','toScrollBottom'])
onMounted(()=>{
    document.addEventListener('click',listenClick) //监听点击弹窗以外的地方关闭弹窗
})
onBeforeUnmount(()=>{
    document.removeEventListener('click',listenClick)  //关闭监听点击弹窗以外的地方关闭弹窗
})
const listenClick = (e)=>{
    if(sendinput.value && !sendinput.value.contains(e.target) ){
        if(showAT.value) {
            showAT.value = false //关闭艾特的弹窗
        }else{
            if(tools_modal.value && !tools_modal.value.contains(e.target) ){
                if(showOtherTools.value) showOtherTools.value = false //关闭底部聊天框
            }
        }
    }
}

const gotouchstart = (e) =>{
    e.preventDefault();
        console.log('你现在长按呢')
        data.recorder = new Recorder({
          sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
          sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
          numChannels: 1 // 声道，支持 1 或 2， 默认是1
        })
        Recorder.getPermission().then(() => {
            data.recorder.start() // 开始录音
            console.log('开始录音')
        }, (error) => {
            console.log(`${error.name} : ${error.message}`)
        })
}

const gotouchend= ()=>{
    if(!data.recorder) return
    data.recorder.stop() // 暂停录音
    let reads= new FileReader()
    let blob = data.recorder.getWAVBlob()//获取wav格式音频数据
    let newblob = new Blob([blob],{type:'audio/wav'})
    let fileOfBlob = new File([newblob],new Date().getTime() + '.wav')
    let recordUrl =  reads.readAsDataURL(fileOfBlob)
    reads.onload = (e)=>{
        recordUrl = e.target.result
        beforeSend(3,recordUrl)
    }
    data.recorder.destroy() // 毁实例
    data.recorder = null
}
const toChangeType = (type)=>{
    showSound.value = true
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
    let iputStart = sendinput.value.selectionStart
    let iputEnd = sendinput.value.selectionEnd
    let orignValue = data.inputFile
    data.inputFile = orignValue.substr(0,iputStart) + item + orignValue.substr(iputEnd)
    sendinput.value.focus()
    nextTick(()=>{
        sendinput.value.selectionStart = iputStart + item.length 
        sendinput.value.selectionEnd = iputStart + item.length 
    })    
}

let  showAT = ref(false)
let Left= ref(0)
let Top= ref(0)
let lastInputValue = ref('')
const inputChange = (e)=>{
    // if(pingYinInputEnd.value) return //表示当前中文输入法正在输入中
    let value = e.target.value
    
    let pos = value.indexOf('\n')
    if(pos !== -1 && data.inputFile.length !== 0){
        tosend(data.inputFile,0)
        data.inputFile = ''
    }

    let reg = /^@$/
    let newInput = value.replace(lastInputValue.value,'') //最新的输入的字符
    if(reg.test(newInput)) {
        let position = getPosition(sendinput.value)
        Top.value = position.top - 100 
        Left.value = position.left - 40
        showAT.value = true
    }else{
        showAT.value = false
    }
    lastInputValue.value = value

}
const beforeSend = (types,value = null)=>{
    switch(types){
        case 0:
            if(data.inputFile.length == 0) return
            tosend(data.inputFile,types)
            data.inputFile = ''
            break;
        case 1:
        case 3:
            tosend(value,types)
            break;
        case 2:
            tosend(value,types)
            break;
    }

}


const tosend= (value,types)=>{
    emit('tosend',value,types)
}
watch(()=>showOtherTools.value,()=>{
    if(showOtherTools.value == true){
        nextTick(()=>{
            emit('toScrollBottom')
        })
    }
})
const emitfile = (src,type)=>{
    beforeSend(type,src)
}



</script>

<style lang="less" scoped>
.chat_tools{
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
    
}
</style>