/*
 * @Author: renlina
 * @Date: 2022-03-10 15:42:06
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-11 11:46:15
 * @Description: 
 */
import {createRouter,createWebHashHistory} from 'vue-router'
import mainRoutes  from './routes'
const routes = [
    ...mainRoutes,
]
const router = createRouter({
    history:createWebHashHistory(),
    routes,
})

router.beforeEach(async(to,from,next)=>{
        document.title = to.meta.title 
    
    next()
})
export default router

