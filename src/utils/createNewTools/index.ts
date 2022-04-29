/*
 * @Author: renlina
 * @Date: 2022-04-25 11:39:37
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-29 11:04:08
 * @Description: 
 */
import { Boot } from '@wangeditor/editor'
import { IModuleConf } from '@wangeditor/core'
import {changeLinkConf, upLoadFileConf, showLibrary} from './menu/index'
import mentionModule from '@wangeditor/plugin-mention'
    // 注册插件
    // Boot.registerModule(mentionModule)
    
const module: Partial<IModuleConf> = {
    // editorPlugin: withBreak,
    // renderElems: [renderElemConf],
    // renderStyle: renderStyle,
    // elemsToHtml: [elemToHtmlConf],
    // styleToHtml: styleToHtml,
    // parseElemsHtml: [parseHtmlConf],
    // parseStyleHtml: parseStyleHtml,
    menus: [changeLinkConf, upLoadFileConf, showLibrary],
}

Boot.registerModule(module)
Boot.registerModule(mentionModule)
// Boot.registerModule(changeLinkConf)