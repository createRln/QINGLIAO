/*
 * @Author: renlina
 * @Date: 2022-03-10 14:08:58
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-11 17:48:37
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import {Button,Icon,Popup,Toast, Field, CellGroup} from 'vant'
const app = createApp(App)
app.use(router)
app.use(Button).use(Icon).use(Popup).use(Toast).use(Field).use(CellGroup)

app.mount('#app')
