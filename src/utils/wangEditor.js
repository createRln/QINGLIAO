/*
 * @Author: renlina
 * @Date: 2022-04-25 17:47:42
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-25 18:22:04
 * @Description: 
 */
// 解析编辑器富文本 生成文本信息数组
export default{
    fetchGenerateContentsArray(data){
        // 获取编辑器的JSON对象
        // const data = this.editor.txt.getJSON()
        
        let contents = []
        // 解析html列表JSON，生成文本对象。
        const generateArray = nodeList => {
            if (Array.isArray(nodeList)) {
                nodeList.forEach(item => {
                    // 对于换行符号处理 处理<br> <p>等标签保障显示一致性
                    if (item && item.tag) {
                        // 针对富文本列表是特殊换行处理 {tag:p, children: [{tag: 'br'}]} 这件换行过滤
                        const notSpecialLabel = item.tag == 'p' && item.children[0] && item.children[0].tag == 'br'
                        if (!notSpecialLabel && ['p', 'br'].includes(item.tag) && contents.length) {
                            const index = contents.length - 1
                            // 在文本中拆入换行符号兼容android、ios的换行字符
                            contents[index].segment += '\n' 
                        }
                    }
                    
                    //  如果遍历的属性是 data-id 有ID的
                    if (item && item.attrs && item.attrs.find(e => e.name === 'data-id')) {
                        const id = item.attrs.find(e => e.name === 'data-id').value
                        const content = item.children && item.children[0] || ''
                        contents.push({ segment: content.replaceAll(/(<br>)|(<br\/>)/g, ''), userId: id })
                        return
                    }
                    
                    // 如果children 是数组则继续递归遍历下一层
                    if (Array.isArray(item.children)) {
                        generateArray(item.children)
                        return
                    }
                    if(item.text){
                        contents.push(item.text)

                    }
                    
                    // 如果没有数组了、就是文本的内容
                    // 删除文本中的 <br> 字符
                    // if (item.trim()) {
                    //     contents.push({segment: item.replaceAll(/(<br>)|(<br\/>)/g, ''), userId: ''})
                    // }
                })
            }
        }
        generateArray(data)
        return contents
    }
}
