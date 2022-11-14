<!--
 * @Author: renlina
 * @Date: 2022-09-19 17:41:09
 * @LastEditors: renlina
 * @LastEditTime: 2022-09-23 19:27:09
 * @Description: 
-->
<template>
    <div>
        <Draglable :myData="Data.mydata"></Draglable>
    </div>
</template>

<script setup lang="ts">
import { Draglable }  from '@components'
import Common from '@/utils/common.js'

import { onMounted, reactive } from '@vue/runtime-core'
interface mydataList {
    imgUrl?: string,
    imgTitle?: string,
}
interface myDataType{
    type: string,
    list: Array<mydataList>
}
interface DataType{
    mydata: myDataType
}
const Data: DataType = reactive({
    mydata: {
        type: 'img',
        list: []    
    }
})
const myAction = {
    style:{
        
    }
}
onMounted(() => {
    Data.mydata.list = Array.from({ length: 9 }, (v,k) => k).map((item,index) => {
        let imgUrl = Common.getImageUrl(index + 1)
        let imgTitle = `第${index + 1}张图`
        return {
            imgUrl,imgTitle
        }
    })
})

</script>

<style>

</style>