<template>
  <div class="app-container">
    <div class="panel">
      <div class="title">{{$route.meta.title}}</div>
      <GeneralForm></GeneralForm>
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
        // date于time用于日期展示具体日期与时间
        // optionList:[{label:'aa',value:'aa'},{label:'bb',value:'bb'}],仅在type为select时必传
        // checkboxList:[{label:'aa',checked},{label:'bb'}],仅在type为checkbox时必传
        // radioList:[{label:'aa'},{label:'bb'}],仅在type为radio时必传
        // imgList:[{name:'aa',url:'aa'},{name:'bb',url:'bb'}]用于展示已上传图片
        // fileList:[{name:'aa',url:'aa'},{name:'bb',url:'bb'}]用于展示已上传文件
        // rules对应的表单验证规则复杂我不写了(╯▔皿▔)╯

        formdataCreator:[
          // {type:'',model:''}
        ],
        fileList: [],
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
    }
  },
  created() {

  },
  methods: {
      submitForm() {

      },
      resetForm(formName) {

      }
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
