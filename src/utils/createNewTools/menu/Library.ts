


/*
 * @Author: renlina
 * @Date: 2022-04-25 14:17:58
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-29 11:01:56
 * @Description: 
 */

import { IButtonMenu, IDomEditor, t } from '@wangeditor/core'
import { insertImageNode, isInsertImageMenuDisabled } from '@wangeditor/basic-modules'
import $ from '../fun/dom'
import { IUploadConfigForFile } from '../config/config'
import { uploadFiles } from '../fun/common'

class Library implements IButtonMenu {
    readonly title = ''
    readonly iconSvg = ''
    readonly tag = 'button'
    constructor(props) {
        this.title = props.title
        this.iconSvg = props.iconSvg
    }
    getValue(editor: IDomEditor): string | boolean {
        // 插入菜单，不需要 value
        return ''
    }
    
    isActive(editor: IDomEditor): boolean {
        // 任何时候，都不用激活 menu
        return false
    }
    
    isDisabled(editor: IDomEditor): boolean {
        return isInsertImageMenuDisabled(editor)
    }

    exec(editor: IDomEditor, value: string | boolean) {
        // 设置选择文件的类型
        const { onSuccess } = editor.getMenuConfig("showLibrary")
        onSuccess()
        
    }
}

export default Library
