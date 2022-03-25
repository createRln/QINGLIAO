/*
 * @Author: renlina
 * @Date: 2022-03-10 14:08:58
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-25 10:21:50
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import {Button,Icon,Popup,Toast, Field, CellGroup} from 'vant'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
const app = createApp(App)
app.use(router)
app.use(VueViewer)
app.use(Button).use(Icon).use(Popup).use(Toast).use(Field).use(CellGroup)

app.mount('#app')
