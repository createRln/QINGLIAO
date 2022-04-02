<!--
 * @Author: renlina
 * @Date: 2022-04-01 17:09:39
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-02 13:34:36
 * @Description: 
-->
<template>
    <div class="other_box" v-if="props.showOtherTools">
        <template v-if="props.type == 'add'">
            <div class="logo_box">
                <van-icon name="phone-o" color="#999" :size="40"/>  
                <input class="file" type="file" multiple @change="fileChange" accept="image/png,image/PNG,image/jpeg,image/gif">    
            </div>
            <div  class="logo_box" >
                <van-icon name="location-o" color="#999" :size="40"/>  
            </div>
            <div  class="logo_box">
                <van-icon name="setting-o" color="#999" :size="40" />
            </div>
        </template>
        <template v-if="props.type == 'emoji'">
            <Emoji v-bind="$attrs"></Emoji>
        </template>
        
    </div>
</template>

<script setup>
import Emoji from './emoji.vue'
import Common from '@/utils/common.js'

const emit = defineEmits(['emitfile'])
let props = defineProps({
    showOtherTools:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        default:''
    }

})
const fileChange= async (e)=>{
    let files = e.target.files
    if(files.length > 0){
        for(let ele of files){
            let src = await readFile(ele)
            if(src){
                emit('emitfile',src)
            }
        }
    }
   
    
}
const readFile =  function(file){
    return new Promise((reslove,reject)=>{
        let reads= new FileReader()
        let f = file
        reads.readAsDataURL(f);
        let curSrc
        reads.onload = async function(e) {
            curSrc = e.target.result
            let fileobj = await Common.compressImg(file,curSrc,0.5) //canvasURL,blob,minifile
            console.log(fileobj,'fileobj---')
            reslove(fileobj.canvasURL)
        };
    })
}

</script>

<style lang="less" scoped>
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
            position: relative;
            .file{
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100px;
                overflow: hidden;
                opacity: 0;
            }
        }
    }
</style>