<!--
 * @Author: renlina
 * @Date: 2022-04-15 11:19:45
 * @LastEditors: renlina
 * @LastEditTime: 2022-11-14 14:28:50
 * @Description: 
-->
<template>
    <div class="edit_box">
        <div class="icon"></div>
        <div @click="insertNOde">插入节点</div>

        <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        ></Toolbar>
        <Editor
        :style="editorStyle"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
        ></Editor>
        <!-- <div class="btn" @click="toSend">发送</div> -->
        <!-- <mention-modal
            v-if="isShowModal"
            @hideMentionModal="hideMentionModal"
            @insertMention="insertMention"
        ></mention-modal> -->
    </div>
</template>

<script>
    import '@wangeditor/editor/dist/css/style.css' // 引入 css
    import { onBeforeUnmount, ref, shallowRef, onMounted, defineComponent,reactive,onBeforeMount ,watch, toRefs} from 'vue'
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import { DomEditor,Boot, SlateTransforms } from '@wangeditor/editor'
    import MentionModal from './mentionModal.vue'


    import axios from "axios";
    import '@utils/createNewTools/index'
    import myEditor from '@utils/wangEditor.js'
    
    export default defineComponent({
        components:{
            Editor,Toolbar,MentionModal
        },
        emits:['sendmsg'],
        setup(props,{emit}){
            // 编辑器实例，必须用 shallowRef
            const editorRef = shallowRef()
            // const editorId = 'editor'
            const mode = "default"
            // 内容 HTML
            const valueHtml = ref('')
            const data = reactive({
                position:null,
                isShowModal: false,
                file:null
                // content:''
            })
            // 模拟 ajax 异步获取内容
            onMounted(() => {
                setTimeout(() => {
                    // valueHtml.value = "<p>模拟 Ajax 异步设置内容<span style='display: none;'>111</span><span style='color: blue; display: block'>2222</span></p>"
                    
                }, 1500)
                // changeToolConfig()

            })


            const toolbarConfig = {
                toolbarKeys: [
                        "emotion","uploadImage","uploadVideo", "change_link","upLoadFile","showLibrary"
                        // {
                        //     key:'uploadImage',
                        //     iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M828.708571 585.045333a48.761905 48.761905 0 0 0-48.737523 48.761905v18.529524l-72.143238-72.167619a135.972571 135.972571 0 0 0-191.585524 0l-34.133334 34.133333-120.880762-120.953905a138.898286 138.898286 0 0 0-191.585523 0l-72.167619 72.167619V292.400762a48.786286 48.786286 0 0 1 48.761904-48.761905h341.23581a48.737524 48.737524 0 0 0 34.474667-83.285333 48.737524 48.737524 0 0 0-34.474667-14.287238H146.236952A146.212571 146.212571 0 0 0 0 292.400762v585.289143A146.358857 146.358857 0 0 0 146.236952 1024h584.996572a146.212571 146.212571 0 0 0 146.236952-146.310095V633.807238a48.786286 48.786286 0 0 0-48.761905-48.761905zM146.261333 926.45181a48.737524 48.737524 0 0 1-48.761904-48.761905v-174.128762l141.409523-141.458286a38.497524 38.497524 0 0 1 53.126096 0l154.526476 154.624 209.627428 209.724953H146.236952z m633.734096-48.761905c-0.073143 9.337905-3.145143 18.383238-8.777143 25.843809l-219.843048-220.94019 34.133333-34.133334a37.546667 37.546667 0 0 1 53.613715 0l140.873143 141.897143V877.714286zM1009.615238 160.231619L863.329524 13.897143a48.737524 48.737524 0 0 0-16.091429-10.24c-11.849143-4.87619-25.161143-4.87619-37.059047 0a48.761905 48.761905 0 0 0-16.067048 10.24l-146.236952 146.334476a49.005714 49.005714 0 0 0 69.217523 69.241905l62.902858-63.390476v272.627809a48.761905 48.761905 0 1 0 97.475047 0V166.083048l62.902857 63.390476a48.737524 48.737524 0 0 0 69.217524 0 48.761905 48.761905 0 0 0 0-69.241905z"></path></svg>', // 可选
                        //     menuKeys: ["insertImage", "uploadImage"] // 下级菜单 key ，必填
                        // },
                        // {
                        //     key:'uploadVideo',
                        //     iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z"></path></svg>', // 可选
                        //     menuKeys: ["insertVideo","uploadVideo"] // 下级菜单 key ，必填
                        // },
                        // "undo","redo",
                        // "blockquote"
                        // "menu1"//自定义测试用的
                ],
            }

            const insertNOde = () => {
                // state.lastAtIndex = ''
                let item = {
                    name: '我是阿啊阿啊',
                    wx_user_id: '11111'
                    }
                const mentionNode = {
                    type: 'mention', 
                    value: '我是插入的内容', // 文本
                    info: { wx_user_id: 'jkjk' }, // 其他信息，自定义
                    children: [{ text: '' }], // 必须有一个空 text 作为 children
                }

                editorRef.value.restoreSelection() // 恢复选区
                let { selection, children } = editorRef.value
                if (!selection) return

                let { path, offset } = selection.anchor
                let text = children[path[0]].children[path[1]].text
                // let textForUse = text;
                // if (/@([^@]+)?$/g.test(textForUse)) {
                //     textForUse = textForUse.replace(/@([^@]+)?$/, '')
                // }

                // 删除@xxx部分字符
                SlateTransforms.delete(editorRef.value, {at: path})
                SlateTransforms.insertText(editorRef.value, text, {at: path})
                editorRef.value.move(text.length)
                console.log(mentionNode,'mentionNode====')
                // 插入 mention 节点
                editorRef.value.insertNode(mentionNode)
                editorRef.value.move(1)
            }
            
            
            const showMentionModal = ()=> {
                data.isShowModal = true
            }
            const hideMentionModal = ()=> {
                data.isShowModal = false
            }
            // const  insertMention = (id, name)=> {
            //     const mentionNode = {
            //         type: 'mention', // 必须是 'mention'
            //         value: name,
            //         info: { id },
            //         children: [{ text: '' }], // 必须有一个空 text 作为 children
            //     }
            //     const editor = editorRef.value
            //     if (editor) {
            //         editor.restoreSelection() // 恢复选区
            //         editor.deleteBackward('character') // 删除 '@'
            //         editor.insertNode(mentionNode) // 插入 mention
            //         editor.move(1) // 移动光标
            //     }
            // }
            const editorConfig = {
                MENU_CONF: {} ,
                EXTEND_CONF: {
                    mentionConfig: {
                        showModal: showMentionModal,
                        hideModal: hideMentionModal,
                    },
                },
                MENU_CONF: {

                    "upLoadFile": {
                        onSuccess: (parmas) => {
                            console.log(parmas,'回调回调----')
                            let msg = {
                                text:'',
                                type:'text',
                                html:`<img src='${parmas.koala_url}'/>`
                            }
                            emit('sendmsg',msg)
                        }
                    },
                    "showLibrary": {
                        onClick: () => {
                            console.log('展示素材库了---')
                        }
                    }
                },
            }




            // 自定义校验链接
            const customCheckLinkFn = (text, url)=>{
                if (!url) {
                    return
                }
                if (url.indexOf('http') !== 0) {
                    alert('链接必须以 http/https 开头')
                    return
                }
                return true

                // 返回值有三种选择：
                // 1. 返回 true ，说明检查通过，编辑器将正常插入链接
                // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
                // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
            }

            // 自定义转换链接 url
            const customParseLinkUrl = (url)=> {
                if (url.indexOf('http') !== 0) {
                    return `http://${url}`
                }
                return url
            }
            // 更新链接
            editorConfig.MENU_CONF.insertLink = {
                checkLink: customCheckLinkFn, // 也支持 async 函数
                parseLinkUrl: customParseLinkUrl, // 也支持 async 函数
            }
            editorConfig.MENU_CONF["uploadImage"] = {
                server:'aaa',
                maxFileSize: 20 * 1024 * 1024, // 2M
                 // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
                allowedFileTypes: [],
                // 单个文件上传失败
                onFailed(file, res) {
                    console.log(`${file.name} 上传失败`, res)
                },
                // 上传之前触发
                onBeforeUpload(file) {
                    // file 选中的文件，格式如 { key: file }
                    data.file = file
                    return file
                    // 可以 return
                    // 1. return file 或者 new 一个 file ，接下来将上传
                    // 2. return false ，不上传这个 file
                },
                // 自定义插入图片
                customInsert(res, insertFn) {
                    // res 即服务端的返回结果
                    console.log(res,'res=====')
                    if(res.code == 0){
                        // 从 res 中找到 url alt href ，然后插图图片
                            // koala_url: res.data.koala_url,
                            // file_name: name,
                            // file_size: size,
                            // content: name + ',' + size
                        // console.log(data.file,res.data,'res.data====')
                        Object.keys(data.file).forEach((item)=>{
                            let parmas = {
                                koala_url:res.data.koala_url,
                                file_name:data.file[item].name,
                                file_size:data.file[item].size,
                                content:data.file[item].name + data.file[item].size,
                            }
                            alert('发送文件了发送文件了===')
                            
                            console.log(parmas,'=====')
                            

                        })
                        // insertFn(url,'',path)
                    }
                    
                },
            }
            const handleCreated = (editor) => {
                editorRef.value = editor // 记录 editor 实例，重要！
            }
            const selfAxios = axios.create({
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const editorStyle = {
                width: '100%',
                height: '300px',
                overflow:'scroll',
            }

             // 组件销毁时，也及时销毁编辑器
            onBeforeUnmount(() => {
                const editor = editorRef.value
                if (editor == null) return
                editor.destroy()
            })
            const handleChange = (editor)=>{
                // data.content = editor.getText()
                // data.isShowModal = true
            }
            const toSend = ()=>{
                const editor = editorRef.value
                const content = editor.getText()
                const html = valueHtml.value
                // fetchGenerateContentsArray
                // editor.txt.getJSON()
                let tetx =  myEditor.fetchGenerateContentsArray(editor.children)
                console.log(editor.children,tetx)
                let msg = {
                    text:content,
                    type:'text',
                    html:html
                }
                if(!content)return
                emit('sendmsg',msg)
                valueHtml.value = ''

            }
            return {
                editorRef,
                mode,
                valueHtml,
                toolbarConfig,
                editorConfig,
                handleCreated,
                editorStyle,
                handleChange,
                toSend,
                insertNOde,
                hideMentionModal,
                // insertMention,
                showMentionModal,
                ...toRefs(data)
                // editorId
            }

        }
    })
    
    
    
    
</script>

<style lang="less" scoped>
.edit_box{
    position: relative;
    .btn{
        position: absolute;
        bottom: -10px;
        right: 20px;
        padding: 0px 20px;
        box-sizing: border-box;
        border-radius: 6px;
        background: rgb(21, 142, 223);
        color: #fff;
        font-size: 18px;
        line-height: 40px;
    }
}
</style>
