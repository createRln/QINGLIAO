/*
 * @Author: renlina
 * @Date: 2022-04-18 15:25:17
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-26 17:23:31
 * @Description: 
 */
import {IButtonMenu ,IDomEditor,DomEditor, t} from '@wangeditor/core'
import { Boot } from '@wangeditor/editor'
import { children } from 'dom7'
import { Editor, Transforms } from 'slate'

// 定义菜单 class
class changeLink implements IButtonMenu {
    // 菜单配置，参考“引用”菜单源码
    readonly title = '转链'
    readonly iconSvg = '<svg t="1650963305518" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3328" width="200" height="200"><path d="M374.857143 311.661714a54.857143 54.857143 0 1 0-54.857143 0v62.171429a192 192 0 1 0 384 0v-62.171429a54.857143 54.857143 0 1 0-54.857143 0v62.171429a137.142857 137.142857 0 1 1-274.285714 0v-62.171429zM253.805714 24.393143h516.388572a146.285714 146.285714 0 0 1 145.737143 133.705143l58.88 682.678857a146.285714 146.285714 0 0 1-145.773715 158.829714H194.925714A146.285714 146.285714 0 0 1 49.188571 840.777143l58.88-682.678857A146.285714 146.285714 0 0 1 253.805714 24.393143z" p-id="3329" fill="#8a8a8a"></path></svg>'
    readonly tag = 'button'
    getValue(editor: IDomEditor): string | boolean {
      // 用不到 getValue
      return ''
    }
    isActive(editor: IDomEditor): boolean  {
      return false
    }
    isDisabled(editor: IDomEditor): boolean {
      // 未匹配到，则禁用
      return false
    }
    exec(editor: IDomEditor, value: string | boolean) {
      let { selection } = editor
        if(!selection) return
        let anchoStart = selection.anchor.offset //当前光标开始
        let focusStart =  selection.focus.offset //当前光标结束
        let anchoPath = selection.anchor.path //当前选中开始光标所在content组的坐标
        let focusPath =  selection.focus.path //当前选中结束光标所在content组的坐标
        if(focusStart < anchoStart){ //避免从右到左选择的情况。
            let base = focusStart
            focusStart = anchoStart 
            anchoStart = base
        }
        let selecttext 
        if(anchoStart == focusStart){
            selecttext = '?'
        }else{
            selecttext = editor.getSelectionText()
        }
        // 执行命令
        editor.insertText('【<' + selecttext + '>】')
        const newSelection = {
            anchor: { path: anchoPath, offset:anchoStart + 2 },
            focus: { path: focusPath, offset:anchoStart + selecttext.length + 2}
        }
        editor.select(newSelection)
        editor.focus()
    }
  
}

export default changeLink

