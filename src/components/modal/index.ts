import { createApp } from 'vue';
import FunTipsDialog from './Modal.vue'
// 使用vue3的createApp,以及mount,unmount方法创建挂载实例

export default function TipsDialog(options) {
    // 创建一个节点，并将组件挂载上去
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    const app = createApp(FunTipsDialog, {
        ...options, visible: true, remove() {
            app.unmount(mountNode) //创建完后要进行销毁
            document.body.removeChild(mountNode)
        }
    })
    return app.mount(mountNode)
}