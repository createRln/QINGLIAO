<!--
 * @Author: renlina
 * @Date: 2022-05-12 18:00:35
 * @LastEditors: renlina
 * @LastEditTime: 2022-05-16 16:44:51
 * @Description: 
-->
<template>
    <div>
        <div class="flex justify-around myfont_size p-4">
            <div>原始参数表</div>
            <div>脱敏表参数</div>
            <div>类型</div>
            <div>订单匹配表示</div>
        </div>
        <n-form :model="refdata" label-placement="left">
            <n-dynamic-input
                v-model:value="refdata.dataArr"
                item-style="margin-bottom: 0;"
                :on-create="onCreate"
                :min="5"
                #="{ index, value }"
            >
            <div style="display: flex">
                <n-form-item
                    ignore-path-change
                    :label="`参数${index + 1}`"
                    :path="`dataArr[${index}].origin_param`"
                >
                    <n-input
                        v-model:value="refdata.dataArr[index].origin_param"
                        placeholder="请输入参数"
                        @keydown.enter.prevent
                    />
                <!--
                    由于在 input 元素里按回车会导致 form 里面的 button 被点击，所以阻止了默认行为
                -->
                </n-form-item>
                <div class="w-9"></div>
                <n-form-item
                    ignore-path-change
                    :label="`映射到`"
                    :path="`dataArr[${index}].daily_param`"
                >
                    <n-select 
                        placeholder="请选择映射内容" 
                        v-model:value="refdata.dataArr[index].daily_param" 
                        :options="addToOptions" 
                        class="w-60"
                        :on-update:value="selectDaily_param"
                    />
                </n-form-item>
                <div class="w-9"></div>
                <n-form-item
                    ignore-path-change
                    :path="`dataArr[${index}].match_mark`"
                >
                    <n-checkbox
                        v-model:checked="refdata.dataArr[index].match_mark"
                        style="margin-right: 12px"
                    />
                </n-form-item>
            </div>
            </n-dynamic-input>
        </n-form>
    </div>
</template>

<script>
import {defineComponent,ref,reactive, toRefs, onMounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
export default defineComponent({
    setup() {
        const Route = useRoute()
        const data = reactive({
            form:{},
            addToOptions:  []
        })
        const refdata = ref({
            dataArr: []
        })
        const type = Route.query.page_type || 'add'
        const dynamicInputRule = {
            trigger: 'input',
            validator (rule, value) {
                if (value.length >= 5) return new Error('最多输入四个字符')
                    return true
                }
            }
        onMounted(() => {
            if(type == 'add') {
                // 是新增的话初始化选项卡数据
                for(let i = 0; i < 5; i++ ) {
                    refdata.value.dataArr.push({"origin_param": "", "daily_param": "", "match_mark":false})
                }

            } else {
                // 是编辑的话就去请求数据
            }

            // 初始化下拉选数据
            let resSelect = ["姓名", "身份证号", "手机号", "节点状态", "是否新户", "订单标识", "卡种", "拓展字段1", "拓展字段2", "拓展字段3", "拓展字段4", "拓展字段5", "拓展字段6", "拓展字段7", "拓展字段8", "拓展字段9", "拓展字段10"]
            data.addToOptions =  resSelect.map((item,index)=>{
                return {
                    label: item,
                    value: item
                }
            })
            console.log(data.addToOptions,'resSelect---')
        })
        const onCreate = () => {
            return {
                origin_param: '',
                daily_param: '',
                match_mark: false
            }
        }
        const selectDaily_param = () => {
            
        }
        return {
            ...toRefs(data),
            refdata,
            dynamicInputRule,
            onCreate,
            selectDaily_param
        }
    }
})
</script>

<style lang="less" scoped>
.myfont_size{
    font-size: 18px;
    color: #666;
}
</style>