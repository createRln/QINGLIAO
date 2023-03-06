
import { Directive } from 'vue'

export const permission: Directive = {
    mounted(el, binding) {
        let { value } = binding
        // let roles = [ 'admin' ]
        let roles = [ 'common' ]
        if(value && value instanceof Array && value.length){
            let currentRole = value
            let hasPermission = roles.some((role) => {
                return currentRole.includes(role)
            })
            if(!hasPermission) {
                el.style.display = 'none'
            }
        } else {
            throw new Error(`need roles! Like v-permission="['admin','editor']"`)
        }
    }
}