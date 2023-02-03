<template>
    <div class="main">
        <div class="fullscreen" ref="fullback"> 
            <p class="tip" @click="() => { changeFull(); ifFull = ! ifFull}">{{ ifFull ? '退出全屏' : '全屏'}}</p>
            我是用来测试全屏幕的
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
let ifFull = ref(false)
const fullback = ref(null)
document.addEventListener('fullscreenchange', () => {
    // todo something
})
const changeFull = () => {
    if(!ifFull.value) {
        const ele = fullback.value
        if (ele.requestFullscreen) {
            ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
            ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullscreen) {
            ele.webkitRequestFullscreen();
        } else if (ele.msRequestFullscreen) {
            ele.msRequestFullscreen();
        }
        return 
    }
    if(document.exitFullScreen) {
        document.exitFullScreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if(element.msExitFullscreen) {
        element.msExitFullscreen();
    }


}

</script>
<style lang="less" scoped>
.main{
    width: 100%;
    height: 100vh;
    .fullscreen{
        width: 50%;
        height: 50%;
        margin: 100px auto;
        background: #999;
        text-align: center;
        .tip{
            text-align: right;
            cursor: pointer;
        }
    }
}
</style>