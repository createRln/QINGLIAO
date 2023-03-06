
import Clipboard from 'clipboard' 
import { Directive } from 'vue'
let SuccessCallback: Function | null
let ErrorCallback: Function | null
let clipboardInstance: Clipboard | null

function commonAction(el, binging) {
    if(binging.arg == 'success') {
        SuccessCallback = binging.value
    } else if(binging.arg == 'error') {
        ErrorCallback = binging.value
    } else {
        clipboardInstance = new Clipboard(el, {
            text: function(trigger) {
                if(!binging.value){
                    console.log('暂无复制内容')
                }
                return binging.value
            },
            action: function(trigger) {
                return binging.arg == 'cut' ? 'cut' : 'copy'
            }
        })
        clipboardInstance.on('success', function(e) {
            const callback = SuccessCallback
            callback && callback(e)
        })
        clipboardInstance.on('error', function(e){
            const callback = ErrorCallback
            callback && callback(e)
        } )
    }
}
export const clipboard: Directive = {
    beforeMount(el, binging){
        commonAction(el, binging)
    },
    beforeUpdate(el, binging) {
        commonAction(el, binging)
    },
    beforeUnmount(el,binging) {
        if(binging.arg == 'success'){
            SuccessCallback = null
        } else if(binging.arg == 'error'){
            ErrorCallback = null
        } else {
            if(clipboardInstance) {
                clipboardInstance.destroy()
            }
            clipboardInstance = null
        }
    }
}