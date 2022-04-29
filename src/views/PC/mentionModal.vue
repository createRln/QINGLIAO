<!--
 * @Author: renlina
 * @Date: 2022-04-24 14:29:52
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-25 10:36:28
 * @Description: 
-->
<template>
    <div id="mention-modal" :style="{position:'absolute',backgroundColor:'#ededed', top: top, left: left }">
        <input id="mention-input" v-model="searchVal" ref="input" @keyup="inputKeyupHandler">
        <ul id="mention-list">
            <li
                v-for="item in searchedList"
                :key="item.id"
                @click="insertMentionHandler(item.id, item.name)"
            >{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MentionModal',
    data() {
        return {
            // 定位信息
            top: '',
            left: '',

            // list 信息
            searchVal: '',
            list: [
                { id: 'all', name: '所有人' },
                { id: 'a', name: 'A张三' },
                { id: 'b', name: 'B李四' },
                { id: 'c', name: 'C小明' },
                { id: 'd', name: 'D小李' },
                { id: 'e', name: 'E小红' },
            ]
        }
    },
    computed: {
        // 根据 <input> value 筛选 list
        searchedList() {
            const searchVal = this.searchVal.trim().toLowerCase()
            return this.list.filter(item => {
                const name = item.name.toLowerCase()
                if (name.indexOf(searchVal) >= 0) {
                    return true
                }
                return false
            })
        }
    },
    methods: {
        inputKeyupHandler(event) {
            // esc - 隐藏 modal
            if (event.key === 'Escape') {
                this.$emit('hideMentionModal')
            }

            // enter - 插入 mention node
            if (event.key === 'Enter') {
                // 插入第一个
                const firstOne = this.searchedList[0]
                if (firstOne) {
                    const { id, name } = firstOne
                    this.insertMentionHandler(id, name)
                }
            }
        },
        insertMentionHandler(id, name) {
            this.$emit('insertMention', id, name)
            this.$emit('hideMentionModal') // 隐藏 modal
        }
    },
    mounted() {
        // 获取光标位置
        const domSelection = document.getSelection()
        const domRange = domSelection?.getRangeAt(0)
        if (domRange == null) return
        const rect = domRange.getBoundingClientRect()

        // 定位 modal
        this.top = `${(rect.top) / 2 + 20}px`
        this.left = `${(rect.left) / 2 + 5}px`

        // focus input
        this.$refs.input.focus()
    },

}
</script>
<style lang="less" scoped>
.ention-modal{
    background: #ededed;
    position: absolute;
}
</style>