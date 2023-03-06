<!--
 * @Author: renlina
 * @Date: 2022-05-12 18:00:35
 * @LastEditors: renlina
 * @LastEditTime: 2022-05-16 16:44:51
 * @Description: 
-->
<template>
    <div>
        <video 
            class="backvideo" 
            poster="https://admin-tmpl-test.rencaiyoujia.cn/static/img/video-cover.c32e69c8.jpeg" 
            loop
            autoplay
            muted >
            <source src="https://admin-tmpl-test.rencaiyoujia.cn/static/media/night.4b0a7194.mp4" >
        </video>
        <n-button @click="ceshiClick">函数式组件按钮</n-button>
        <input
            v-model="_value"
            placeholder=""
            placeholder-class="input-placeholder"
            class="focusInput"
            v-focus
        />
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
        <p>哈哈哈哈赶快复制一下吧，啦啦啦</p>
        <n-button v-clipboard="'哈哈哈哈赶快复制一下吧，啦啦啦'" v-clipboard:success="handleCopy">点击复制上述内容</n-button>
        <div v-permission="['admin']">管理员：管理员才能看到的文案</div>
        <div v-permission="['common']">普通用户：这里是只有普通用户才能看到的文案</div>
        <div v-permission="['admin','common']">普通用户/管理员：这里是只有普通用户和管理员才能看到的文案</div>
        <n-button @click="download">点击下载图片</n-button>
        <input type="file" @change="fileChange">
    </div>
</template>

<script>
import {defineComponent,ref,reactive, toRefs, onMounted, getCurrentInstance} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { saveAs } from 'file-saver';
export default defineComponent({
    setup() {
        const Route = useRoute()
        const data = reactive({
            form:{},
            addToOptions:  [],
            _value: null
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
        const { proxy } = getCurrentInstance();
        const ceshiClick = () => {
            proxy.$TipsDialog({
                content:"在request.ts触发的函数式组件",
                handleOk: (str) => {
                    console.log("点击成功，可以在此处做回调操作。"+str);
                },
            });
        }

        const handleCopy = (e) => {
            console.log('复制成功啦哈哈哈哈',e.text)
        }

        const download = () => {
            saveAs(new Blob(["https://static.rong360.com/upload/png/be/fb/befb8983b8f0b03b0a2b88eeb8166de0.png"],{type: 'text/plain;charset=utf-8'}) , "image.png");
        }
        const downloadContentFile = (filename, text) => {
            let blob = new Blob([text], { type: "application/vnd.ms-excel" });
            
            const element = document.createElement("a");
            const href = URL.createObjectURL(blob);
            element.href = href;
            element.setAttribute("download", filename);
            element.style.display = "none";
            element.click();
            //调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
            URL.revokeObjectURL(href);

            element.remove();
            // saveAs(blob,'文件名====' )
        };
        const fileChange = (e) => {
            let file = e.target.files[0]
            let reader = new FileReader();
            //执行读文件的函数，设置编码格式
            //Excel，需要将文件转为blob或文件流
            reader.readAsArrayBuffer(file, "UTF-8");
            //读取文件中的内容
            reader.onload = function (e) {
                const content = e.target.result;
                console.log(content,'content===')

                downloadContentFile(file.name, content);
            };
        };
        


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
            selectDaily_param,
            ceshiClick,
            handleCopy,
            download,
            fileChange
        }
    }
})
</script>

<style lang="less" scoped>
.myfont_size{
    font-size: 18px;
    color: #666;
}
.focusInput{
    border: 1px solid #999;
}
.backvideo{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    z-index: -1;
}
</style>