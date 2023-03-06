/*
 * @Author: renlina
 * @Date: 2022-03-11 11:35:01
 * @LastEditors: RLN
 * @LastEditTime: 2023-03-06 11:22:58
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
        path: '/scroll',
        name: 'scroll',
        meta: {
            title: '滚动测试',
        },
        component: ()=> import('@/views/scroll/index.vue'),
    },
    {
        path: '/backtop',
        name: 'backtop',
        meta: {
            title: 'backtop',
        },
        component: ()=> import('@/views/backToTopDemo/index.vue'),
    },
    {
        path: '/driver',
        name: 'driver',
        meta: {
            title: 'driver',
        },
        component: ()=> import('@/views/driver/index.vue'),
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
        path: '/edit', //wangEditor的使用
        name: 'Edit',
        meta: {
            title: '富文本编辑器',
        },
        component: ()=> import('@/views/PC/edit.vue'),
    },
    {
        path: '/nave-ui/index', //nave-ui的使用
        name: 'nave-ui-index',
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
    },
    {
        path: '/echart', //图表绘制
        name: 'echart',
        meta: {
            title: 'echart',
        },
        component: ()=> import('@/views/PC/echart/index.vue'),
    },
    {
        path: '/fullscreen', //实现全屏展示
        name: 'fullscreen',
        meta: {
            title: 'fullscreen',
        },
        component: ()=> import('@/views/PC/fullscreen/index.vue'),
    },
    {
        path: '/bpmn', //前端绘制流程图
        name: 'bpmn',
        meta: {
            title: 'bpmn',
        },
        component: ()=> import('@/views/PC/bpmn/index.vue'),
    },
]

const componentRouted = [
    {
        path: '/example/drable',
        name: 'Drable',
        meta: {
            title: '拖拽',
        },
        component: ()=> import('@/views/example/draglable/index.vue'),
    }
]
const mainRoutes = [
    ...pcPageRouted,
    ...routes,
    ...componentRouted,
]
export default mainRoutes