<!--
 * @Author: renlina
 * @Date: 2022-03-25 15:48:45
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-01 17:42:45
 * @Description: 
-->
<template>
    <div class="emoji">
            <div class="emijo_item" v-for="(item) in emijo" :key="item" @click="emojiClick(item)">
                {{item}}
            </div>
    </div>
</template>

<script setup lang="ts">
import {provide} from 'vue'
const emit = defineEmits(['emojiclick'])
let emijo = [
    '😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😗',
    '😚','🙂','🤗','🤔','😐','😑','😶','🙄','😏','😣','😥','😮','😪','😫','😴',
    '😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','🙁','😖','😞'

]
const emojiClick = (item)=>{
    emit('emojiclick',item)
}
</script>

<style lang="less" scoped>
    .emoji{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .emijo_item{
            width: 60px;
            height: 40px;
            font-size: 60px;
            margin-right: 10px;
            margin: 15px;
        }
    }
</style>
