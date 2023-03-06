<template>
    <div class="container" style="position:relative;height:550px;">
        <!-- //此处必须ref绑定，这样才能获取到dom元素，才能后面的操作 -->
        <div class="canvas" ref="canvas"></div>
        <!-- //此处简单使用scrollbar，此处为右侧属性栏的html代码 -->
        <el-scrollbar height="93%" style="width:300px; position:absolute;top:0px;right:0px;">
            <div id="js-properties-panel" class="panel"></div>
        </el-scrollbar>
        <!-- //此处我放置了几个按钮，导出和部署，导出的ref绑定也是必要的 -->
        <ul class="buttons">
            <li class="item download">
                <a class="btn" @click="exportBPMN" ref="exportbtn">导出</a>
            </li>
            <li class="item submit" v-if="props.isAdd">
                <a class="btn" @click="deploy">
                    部署
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, onUpdated } from 'vue'
// 绘制流程图
import BpmnModeler from 'bpmn-js/lib/Modeler'
//此处是个后端书写的接口作用是：（将我这边将bpmn保存为xml的文件存入到数据库中）
// import { addDeploymentByString } from "@/api/activiti/definition";
// 预览流程图
import BpmnViewer from "bpmn-js/lib/Viewer"
//右侧属性栏
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
// 汉化组件
// import customTranslate from './customTranslate/customTranslate';
//汉化组件的引入使用
// var customTranslateModule = {
//     translate: ['value', customTranslate]
// };
const props = defineProps({
    //xml字符串用于后面创建转化显示
    xmlStr: {
        type: String,
        default: ""
    },
    //是否为查看
    isPreview: {
        type: Boolean,
        default: false
    },
    //是否为新增
    isAdd: {
        type: Boolean,
        default: true
    },
    //高亮节点数组
    highPoint: {
        type: Array,
        default: []
    },
    //当前用户所处理节点数组
    iDo: {
        type: Array,
        default: []
    },
    //等待处理节点数组
    waitingToDo: {
        type: Array,
        default: []
    },
    //高亮线数组
    highLine: {
        type: Array,
        default: []
    },
});
let exportbtn = ref(null)
let bpmnModeler = ref(null);
let container = ref(null);
let canvas = ref(null);
//此处定义了子组件向父组件传递事件作用是（将dialog框不显示，然后刷新列表）此处事件应写在父组件
const emits = defineEmits(["handleExportSuccess"]);
//挂载时初始化
onMounted(() => {   
    init()
})
//更新时初始化
onUpdated(() => {
    //更新时先销毁原实例
    bpmnModeler.destroy()
    init()
})
function init() {
    if (props.isPreview) {
        //预览时候创建实例为BpmnViewer
        bpmnModeler = new BpmnViewer({ // 仅预览
            container: canvas.value
        })
    } else {
        //可操作时候创建实例为BpmnModeler
        bpmnModeler = new BpmnModeler({
            container: canvas.value,
            propertiesPanel: {
                parent: '#js-properties-panel'
            },
            additionalModules: [
                //右侧工具栏以及节点
                propertiesProviderModule,
                propertiesPanelModule,
                //汉化
                // customTranslateModule
            ],
            moddleExtensions: {
                camunda: camundaModdleDescriptor
            }
 
        })
    }
    createNewDiagram()
}
// 将字符串转换成图显示出来
function createNewDiagram() {
    let xmlStrChange = '`' + props.xmlStr + '`'
    //此处判断是否是新增，若是新增固定一个xml的字符串，若字符串为空，那么久无法在画布上编辑，所以我下面就赋值了一个只存在一个节点的xml字符串
    if (props.isAdd) {
        //bpmn2:process属性修改为isExecutable="true就可以默认勾选可执行文件
        xmlStrChange = `
<?xml version="1.0" encoding="UTF-8"?>
  <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
        xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
        xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
        id="sample-diagram"
        targetNamespace="http://bpmn.io/schema/bpmn"
        xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" isExecutable="true">
    <bpmn2:startEvent id="StartEvent_1" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="192" y="82" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`
    }
    //importXML()方法后的第一个参数是一个xml字符串，第二个参数为回调err为失败时候的信息
    bpmnModeler.importXML(xmlStrChange, (err) => {
        if (err) {
            console.error(err)
        } else {
            //通常这里会写个成功时候的回调，但是我的组件分为预览与新增，所以我这边判断是否为预览，预览的话进行节点颜色改变等
            if (props.isPreview) {
                //此处获取画布对象，用于后面的节点颜色改变
                const bpmnCanvas = bpmnModeler.get('canvas')
                //获取需要高亮显示的节点
                let highPointNode = props.highPoint;
                let highLineNode = props.highLine;
                let iDoNode = props.iDo
                let waitingToDoNode = props.waitingToDo
                //画布居中显示
                bpmnCanvas.zoom('fit-viewport', 'auto')
                //设置节点颜色，setNodeColor具体查看下面的函数
                setNodeColor(highPointNode, "highlightPoint", bpmnCanvas);
                setNodeColor(highLineNode, "highlightLine", bpmnCanvas);
                setNodeColor(iDoNode, "highlightiDo", bpmnCanvas);
                setNodeColor(waitingToDoNode, "highlightiwaiting", bpmnCanvas);
            }
            // 这里是成功之后的回调, 可以在这里做一系列事情
            success()
        }
    })
}
function success() {
    // console.log('创建成功!')
}
//部署按钮事件
function deploy() {
    //获取bpmn产生的xml文件
    bpmnModeler.saveXML().then(res => {
        //此处为存入数据库的接口，此处需要你们后端根据自己项目去提供接口，有关activity流
        // addDeploymentByString({
        //     stringBPMN: res.xml
        // }).then(res => {
        //     console.log("产生成功");
        // })
    })
    //向父组件传方法，用于后面的dialog消失以及列表更新
    emits("handleExportSuccess")
}
//导出按钮事件
function exportBPMN() {
    //saveXML为bpmn提供的api，用于保存为xml,并导出，第一个参数格式保存，正常一样，第二个参数的err为错误值，xml为导出的xml字符串
    bpmnModeler.saveXML({ format: true }, function (err, xml) {
        //此函数转码xml并下载，详情请看以下setEncoded定义
        setEncoded(
            exportbtn.value,
            "diagram.bpmn",
            //判断是否报错，报错则为null三元表达式
            err ? null : xml
        );
    });
    //向父组件传方法，用于后面的dialog消失以及列表更新
    emits("handleExportSuccess")
}
// 设置高亮颜色的class（nodeCodes为需要设置高亮的节点ID数组，colorClass为设置的类名，canvas为画布对象）类名详情请看style样式
function setNodeColor(nodeCodes, colorClass, canvas) {
    for (let i = 0; i < nodeCodes.length; i++) {
        if (nodeCodes[i] == null) {
            continue
        } else {
            canvas.addMarker(nodeCodes[i], colorClass);
        }
    }
}
// 转码xml并下载
// @param {object} link 按钮（需要是dom对象）
// @param {string} name 下载名称 （文件名）任取
// @param {string} data base64XML
function setEncoded(link, name, data) {
    var encodedData = encodeURIComponent(data);
    if (data) {
        link.href="data:application/bpmn20-xml;charset=UTF-8," + encodedData
        link.download=name
    }
};
</script>
<style scoped lang="less">
.containers{
	position: absolute;
	background-color: #ffffff;
	width: 100%;
	height: 100%;
}
.canvas{
	width: 100%;
	height: 100%;
}
.panel{
	position: absolute;
	right: 0;
	top: 0;
	width: 300px;
}
</style>