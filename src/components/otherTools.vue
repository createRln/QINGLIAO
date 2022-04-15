<!--
 * @Author: renlina
 * @Date: 2022-04-01 17:09:39
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-06 15:32:35
 * @Description: 
-->
<template>
    <div class="other_box" v-if="props.showOtherTools">
        <template v-if="props.type == 'add'">
            <div class="logo_box">
                <van-icon name="photo-o" color="#999" :size="40"/>  
                <input class="file" type="file" multiple @change="(e)=>{imgChange(e,1)}" accept="image/png,image/PNG,image/jpeg,image/gif">    
            </div>
            <div  class="logo_box" >
                <van-icon name="credit-pay" color="#999" :size="40"/>  
                <input class="file" type="file" multiple @change="(e)=>{imgChange(e,2)}" accept=".doc,.docx,.excel">    
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
const imgChange= async (e,type)=>{
    let files = e.target.files
    if(files.length > 0){
        for(let ele of files){
            let src = await readFile(ele,type)
            if(src){
                switch(type){
                    case 1:
                        emit('emitfile',src,type)
                        break;
                    case 2:
                        ele.src = src
                        console.log(ele)
                        emit('emitfile',ele,type)
                        break;
                }
                
            }
        }
    }
   
    
}
const readFile =  function(file,type){
    return new Promise((reslove,reject)=>{
        let reads= new FileReader()
        let f = file
        reads.readAsDataURL(f);
        let curSrc
        reads.onload = async function(e) {
            curSrc = e.target.result
            switch(type){
                case 1:
                    let fileobj = await Common.compressImg(file,curSrc,0.5) //canvasURL,blob,minifile
                    reslove(fileobj.canvasURL)
                    break;
                case 2:
                    reslove(curSrc)
                    break;

            }
            
        };
    })
}
const fileChange= async(e)=>{
    let files = e.target.files
    if(files.length > 0){
        for(let file of files){
            let res = await formDataFile(file)
        }
    }
}
const formDataFile = (file)=>{
    return new Promise((resolve,reject)=>{
        // let formData = new FormData()
        let reads= new FileReader()
        if(file.size <= 1024 * 1024 * 3){
            
        }else{
            Toast.fail('文件过大，不可超过3MB');
        }
        console.log(file,'file====')
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