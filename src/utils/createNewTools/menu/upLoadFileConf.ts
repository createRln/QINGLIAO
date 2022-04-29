/*
 * @Author: renlina
 * @Date: 2022-04-25 14:17:58
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-28 17:47:03
 * @Description: 
 */

 import { IButtonMenu, IDomEditor, t } from '@wangeditor/core'
 import { insertImageNode, isInsertImageMenuDisabled } from '@wangeditor/basic-modules'
 import $ from '../fun/dom'
 import { IUploadConfigForFile } from '../config/config'
 import { uploadFiles } from '../fun/common'
 
 class UploadImage implements IButtonMenu {
    readonly title = ''
    readonly iconSvg = ''
    readonly tag = 'button'
    private accept = ''
    constructor(props) {
      this.title = props.title
      this.iconSvg = props.iconSvg
      this.accept = props.accept
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
  
    private getMenuConfig(editor: IDomEditor): IUploadConfigForFile {
      // 获取配置，见 `./config.js`
      return editor.getMenuConfig('uploadImage') as IUploadConfigForFile
    }
  
    exec(editor: IDomEditor, value: string | boolean) {
      // 设置选择文件的类型
      let acceptAttr = this.accept
  
      // 添加 file input（每次重新创建 input）
      const $body = $('body')
      const $inputFile = $(`<input type="file" ${acceptAttr} multiple/>`)
      $inputFile.hide()
      $body.append($inputFile)
      $inputFile.click()
      // 选中文件
      $inputFile.on('change', () => {
        const files = ($inputFile[0] as HTMLInputElement).files
        uploadFiles(editor, files) // 上传文件
        // console.log(editor.getMenuConfig("upLoadFile"),'editor.getMenuConfig("myUploadImage")---')
      })
    }
 }
 
 export default UploadImage
 