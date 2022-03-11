/*
 * @Author: renlina
 * @Date: 2022-03-11 11:35:01
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-11 17:11:23
 * @Description: 
 */
const routes = [
    {
        path: '/',
        name: '/',
        meta: {
            title: '轻聊',
        },
        component: ()=> import('@/views/Index/index.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: ()=> import('@/views/account/login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            title: '注册',
        },
        component: ()=> import('@/views/account/register.vue'),
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/'
    }

]
const mainRoutes = [
    ...routes,
]
export default mainRoutes