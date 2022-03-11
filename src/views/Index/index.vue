<!--
 * @Author: renlina
 * @Date: 2022-03-10 15:49:58
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-11 16:57:19
 * @Description: 
-->
<template>
  <div class="main_box">
      <Tab></Tab>
      <div v-for="(item,index) in state.dataList" :key="index" class="list_content">
        <Content :info="item"></Content>
      </div>

  </div>
</template>

<script setup>
import {ref,toRefs,reactive, onBeforeMount} from 'vue'
import Tab from './widget/Tab.vue'
import Content from './widget/Content.vue'
const state = reactive({
  dataList:[]
})
onBeforeMount(async()=>{
  initData()

})
const initData = ()=>{
  state.dataList = [
    {
      head_url:getImageUrl('9'),
      name:'太阳1',
      message:'我是大太阳！我是大太阳！我是大太阳！我是大太阳！我是大太阳！我是大太阳！我是大太阳！我是大太阳！我是大太阳！',
      time: new Date('2022/03/11/12:03:59'),
      new_msg:2,
      id:'1'
    },
    {
      head_url:getImageUrl('2'),
      name:'太阳2',
      message:'我是大太阳！',
      time: new Date('2022/03/10/9:5:59'),
      new_msg:1,
      id:'2'
    },
    {
      head_url:getImageUrl('7'),
      name:'太阳3',
      message:'我是大太阳！',
      time: new Date('2022/03/10/12:03:59'),
      new_msg:3,
      id:'3'
    },
    {
      head_url:getImageUrl('4'),
      name:'太4',
      message:'我是大太阳！',
      time:new Date('2022/3/9/12:03:59'),
      new_msg:10,
      id:'4'
    },
    {
      head_url:getImageUrl('5'),
      name:'太阳5',
      message:'我是大太阳！',
      time: new Date('2022/03/11/15:05:59'),
      new_msg:11,
      id:'5'
    },
    {
      head_url:getImageUrl('6'),
      name:'太阳6',
      message:'我是大太阳！',
      time: new Date('2022/03/11/11:10:59'),
      new_msg:12,
      id:'6'
    },
    {
      head_url:getImageUrl('5'),
      name:'太阳5',
      message:'我是大太阳！',
      time: new Date('2022/03/11/15:05:59'),
      new_msg:11,
      id:'5'
    },
    {
      head_url:getImageUrl('6'),
      name:'太阳6',
      message:'我是大太阳！',
      time: new Date('2022/03/11/11:10:59'),
      new_msg:12,
      id:'6'
    },
    {
      head_url:getImageUrl('5'),
      name:'太阳5',
      message:'我是大太阳！',
      time: new Date('2022/03/11/15:05:59'),
      new_msg:11,
      id:'5'
    },
    {
      head_url:getImageUrl('6'),
      name:'太阳6',
      message:'我是大太阳！',
      time: new Date('2022/03/11/11:10:59'),
      new_msg:12,
      id:'6'
    },
    {
      head_url:getImageUrl('5'),
      name:'太阳5',
      message:'我是大太阳！',
      time: new Date('2022/03/11/15:05:59'),
      new_msg:11,
      id:'5'
    },
    {
      head_url:getImageUrl('6'),
      name:'太阳6',
      message:'我是大太阳！',
      time: new Date('2022/03/11/11:10:59'),
      new_msg:12,
      id:'6'
    },
    {
      head_url:getImageUrl('5'),
      name:'太阳5',
      message:'我是大太阳！',
      time: new Date('2022/03/11/15:05:59'),
      new_msg:11,
      id:'5'
    },
    {
      head_url:getImageUrl('6'),
      name:'太阳6',
      message:'我是大太阳！',
      time: new Date('2022/03/11/11:10:59'),
      new_msg:12,
      id:'6'
    },

  ]
  // 前端按照时间最新进行排序
  state.dataList = state.dataList.sort((a,b)=>{
    return b.time - a.time
  })

}
const getImageUrl = (name)=>{
  return new URL(`../../assets/headImg/${name}.jpeg`,import.meta.url).href
}
</script>

<style lang="less" scoped>
.main_box{
  font-size: 40px;
  background: #efefef;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  padding-top: 130px;
  .list_content{
    background: #fff;
    padding: 20px 30px;
    &:active{
      background: #ededed;
    }
  }
}
</style>