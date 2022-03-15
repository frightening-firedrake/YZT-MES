<template>
  <div class="app-container">
    <div class="panel">
      <div class="title">{{$route.meta.title}}</div>
      <GeneralForm :formdataCreator="formdataCreator" :imgList="imgList" :fileList="fileList" :btnText="btnText" @submitForm="submitForm"></GeneralForm>
    </div>
  </div>
</template>

<script>
// import { getList } from '@/api/table'//引入api接口
// import GeneralForm from '@/src/components/GeneralForm/index'
import GeneralForm from '../../../components/GeneralForm/index'
export default {
  components:{GeneralForm},
  data() {
    return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        // 表单建造机器
        // type表单类型input,select,date,switch,checkbox,radio,textarea,img,file暂定9种
        // label表单文字描述
        // model表单绑定字段名例如:name但日期时目前需要[date,time]
        // value表单项的初始值string或array
        // disabled表单禁用（可选）
        // dateStart与dateEnd这个我没想好以后再说－_－b
        // date与time用于日期展示具体日期与时间
        // optionList:[{label:'aa',value:'aa'},{label:'bb',value:'bb'}],仅在type为select时必传
        // checkboxList:[{label:'aa'},{label:'bb'}],仅在type为checkbox时必传
        // radioList:[{label:'aa'},{label:'bb'}],仅在type为radio时必传
        // imgList:[{name:'aa',url:'aa'},{name:'bb',url:'bb'}]用于展示已上传图片
        // fileList:[{name:'aa',url:'aa'},{name:'bb',url:'bb'}]用于展示已上传文件
        // rules对应的表单验证规则复杂我不写了(╯▔皿▔)╯
        // {type:'title',title:'我是一个标题踢踢踢'},//可利用这种方式插入一个标题
        // 时长durationtime
        // 设备读数equipmentReading
        // 添加分类addKind
        // 添加物料列表addMaterial
        // 添加标签模板addTemplate


        formdataCreator:[
          {type:'input',model:'name',value:'测试输入',label:'请输入文字',tip:'为啥这行文字会掉下来'},
          {type:'input',model:'name4',value:'测试输入32323',label:'hljksdf',tip:'为啥这行文字会dasdsad掉下来'},
          {type:'input',model:'name2',value:'测试输入2',label:'请输入文字',disabled:true},
          {type:'title',title:'我是一个标题踢踢踢'},
          {type:'select',model:'region',optionList:[{label:'上海',value:'shanghai'},{label:'北京',value:'beijng'}],value:'shanghai',label:'请选择地区'},
          {type:'select',model:'region2',optionList:[{label:'上海',value:'shanghai'},{label:'北京',value:'beijng'}],value:'',label:'请选择地区',disabled:true},
          {type:'title',title:'我是另一个标题踢踢踢'},
          {type:'date',model1:'date',model2:'time',value1:'',value2:'',label:'请选择日期与时间'},
          {type:'date',model1:'date2',model2:'time2',value1:'2021-12-3',value2:'12-12-12',label:'请选择日期与时间',disabled:true},
          {type:'switch',model:'delivery',value:false,label:'我是个开关',tip:'开启后，系统会对该设备类型设备的清洁操作进行记录、管理和控制'},
          {type:'switch',model:'delivery2',value:true,label:'我是开关2',disabled:true},
          {type:'checkbox',model:'type',checkboxList:[{label:'餐厅线上活动'},{label:'线下主题活动'},{label:'地推活动'},{label:'单纯品牌曝光'}],value:['地推活动','线下主题活动'],label:'活动性质',name:'checkbox'},
          {type:'checkbox',model:'type2',checkboxList:[{label:'餐厅线上活动2'},{label:'线下主题活动2'},{label:'地推活动2'}],value:['地推活动2'],label:'活动性质2',name:'checkbox1',disabled:true},
          {type:'radio',model:'resource',radioList:[{label:'线上品牌商赞助'},{label:'线下场地免费'},{label:'地推活动'},{label:'单纯品牌曝光'}],value:'地推活动',label:'特殊资源'},
          {type:'radio',model:'resource2',radioList:[{label:'线上品牌商赞助'},{label:'线下场地免费'},{label:'地推活动'},{label:'单纯品牌曝光'}],value:'单纯品牌曝光',label:'特殊资源',disabled:true},
          {type:'textarea',model:'desc',value:'测试输入',label:'请输入多行文字'},
          {type:'textarea',model:'desc2',value:'测试输入',label:'请输入多行文字',disabled:true},

          {type:'equipmentReading',label:'设备读数'},
          {type:'addKind',label:'次品项列表'},
          {type:'addMaterial',label:'物料列表'},
          {type:'addTemplate',label:'标签模板'},
          {type:'strategy',label:'策略配置'},
          {type:'img',label:'图片'},
          {type:'img',label:'图片',disabled:true},
          {type:'file',label:'附件'},
          {type:'file',label:'附件',disabled:true},
          {type:'durationtime',model1:'durationtime',model2:'unit',unitList:[{label:'天',value:'day'},{label:'小时',value:'hour'},{label:'分钟',value:'minute'}],value1:0,value2:'minute',label:'清洁管理',tip:'如果该清洁无需进行效期控制，则填写0',norules:true},
        ],
        imgList:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        fileList:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        btnText:'创建',
    }
  },
  created() {

  },
  methods: {
      submitForm(formdata,type) {
        console.log(formdata,type)
      },
      // resetForm(formName) {

      // }
  }
}
</script>

<style scoped="scoped">
.app-container{
  padding:20px 20px 0 20px;
  background-color: #f0f2f5;
}
.panel{
  background:#fff;
  border-radius: 4px;
  min-height: calc(100vh - 70px);
}
.title{
  padding-left:14px;
  line-height: 40px;
  font-size:16px;
  color:#1f2f3d;
}
.panel>>>label{
  font-weight: 400;
}
</style>
