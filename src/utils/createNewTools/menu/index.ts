/*
 * @Author: renlina
 * @Date: 2022-04-25 11:41:54
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-29 13:32:15
 * @Description: 
 */
import changeLink from './changeLink'
import upLoadFile from './upLoadFileConf'
import Library from './Library'
import { FileIcon, LibraryIcon } from '../config/iconSvg'
export const changeLinkConf = {
    key: 'change_link', // menu key ，唯一。注册之后，可配置到工具栏
    factory() {
      return new changeLink()
    },
  }

export const upLoadFileConf = {
    key: 'upLoadFile', // menu key ，唯一。注册之后，可配置到工具栏
    factory() {
        return new upLoadFile({
          title: '文件上传',
          iconSvg: FileIcon,
          accept: ".jpg,.png,.gif,.jpeg,.txt,.docx,.pdf,.xlsx,.ppt,.mp4,.webm,.ogg",
        })
    },
    config: {
      onSuccess: (parmas: any) => {
        // console.log(parmas,'parmas====')
      }
    }
}

export const showLibrary = {
  key: 'showLibrary', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
      return new Library({
        title: '素材库',
        iconSvg: LibraryIcon,
      })
  },
  config: {
    onClick: () => {
    }
  }
}