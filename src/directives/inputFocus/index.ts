import { Directive } from 'vue'
export const focus: Directive = {
    mounted: function(el, binding){
        console.log(el)
        el.focus()
    }
}