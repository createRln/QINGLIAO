/*
 * @Author: renlina
 * @Date: 2022-03-11 11:35:01
 * @LastEditors: renlina
 * @LastEditTime: 2022-07-20 09:58:50
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
        path: '/chat',
        name: 'Chat',
        meta: {
            title: '',
        },
        component: ()=> import('@/views/toChat/index.vue'),
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/'
    }

]
const pcPageRouted = [
    {
        path: '/edit',
        name: 'Edit',
        meta: {
            title: '富文本编辑器',
        },
        component: ()=> import('@/views/PC/edit.vue'),
    },
    {
        path: '/nave-ui/index',
        name: 'Edit',
        meta: {
            title: 'nave-ui',
        },
        component: ()=> import('@/views/PC/naveUi/nave_ui.vue'),
    },
    {
        path: '/promise',
        name: 'Promise',
        meta: {
            title: 'promise',
        },
        component: ()=> import('@/views/PC/promise/index.vue'),
    }
]
const mainRoutes = [
    ...routes,
    ...pcPageRouted,
]
export default mainRoutes