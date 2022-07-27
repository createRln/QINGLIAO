<!--
 * @Author: renlina
 * @Date: 2022-04-15 15:38:08
 * @LastEditors: renlina
 * @LastEditTime: 2022-05-13 10:47:58
 * @Description: 
-->
<template>
    <div class="ceshi">
        <div v-for="(item) in msgList" :key="item">
            <div v-html="item.html"></div>
        </div>
        <div class="edit">
            <EditInput @sendmsg="sendmsg"></EditInput>
        </div>
    </div>
</template>

<script>
import {defineComponent,ref,reactive, toRefs} from 'vue'
import EditInput from './edit_Input.vue'
export default defineComponent({
    components:{
        EditInput
    },
    setup(){
        const data = reactive({
            msgList:[]
        })
        const sendmsg = (msg)=>{
            data.msgList.push(msg)
        }
        return {
            ...toRefs(data),
            sendmsg
        }
    }
})
</script>

<style lang="less" scoped>
img{
    display: block !important;
}
.ceshi{
    position: relative;
    
    .edit{
        width: 600px;
        height: 370px;
        margin-top: 200px;
        margin-left: 200px;
        border: 1px solid #999;
        overflow: hidden;
        box-sizing: border-box;
        margin-top: 100px;
    }
}
</style>