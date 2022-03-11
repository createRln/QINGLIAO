<!--
 * @Author: renlina
 * @Date: 2022-03-11 17:05:04
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-11 18:52:28
 * @Description: 
-->
<template>
    <div class="login_box">
        <Tab :type="'register'"></Tab>
        <div class="content">
            <!-- <p class="login_title">轻聊</p> -->
            <div class="login_title">
                <img src="../../assets/headImg/logo.png" alt="">
            </div>
            <p class="login_tip">注册</p>
            <p class="login_welcome">您好，欢迎来到轻聊！</p>
            <div class="basefont">
                <van-cell-group inset>
                    <van-field size="large" v-model="user.name" label="用户名" placeholder="请输入用户名" />
                    <van-field size="large" v-model="user.pass" label="密码" placeholder="请输入密码" />
                </van-cell-group>

            </div>
            <van-button round color="linear-gradient(to right, #6fc6ee, #a388b3)" type="primary">提交</van-button>
            
            <!-- <input type="text" v-model="user.name" > -->
        </div>
    </div>
</template>

<script setup>
import Tab from './widget/Tab.vue'
import { reactive } from 'vue'
const user = reactive({
    name:'',
    pass:''
})
</script>

<style lang="less" scoped>
// color: linear-gradient(0%, 100%, #6fc6ee, #a388b3);
.login_box{
    padding-top: 140px;
    .content{
        padding: 180px 80px 0px 80px;
        .login_title{
            margin: 60px auto;
            display: flex;
            justify-content: center;
            img{
                width: 200px;
            }
        }
        .login_tip{
            font-size: 70px;
            margin-bottom: 30px;
        }
        .login_welcome{
            font-size: 36px;
            margin-bottom: 60px;
            color: #666;
        }
        .basefont{
            margin-bottom: 80px;
            :deep(.van-cell-group){
                margin: 0px;
                
                .van-cell {
                    padding-left: 0px;
                    font-size: 36px;
                    .van-cell__title{
                        font-size: 40px;
                    }
                }
            }
        }
        :deep(.van-button){
            width: 100%;
            font-size: 44px;
        }
    }
}
</style>