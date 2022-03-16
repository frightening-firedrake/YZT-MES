<template>
  <div class="addControlsWrap">
    <div class="header">
      <div class="addControlslabel"></div>
      <div class="addControlsContainer">
        <div @click="addControls" class="addControls">+添加控件</div>
        <div v-show="showZone" @click="addZone" class="addZone">分区</div>
      </div>
    </div>
    <div class="body" v-for="(itemw,indexw) in zones">
      <div class="addControlslabel">分区</div>
      <div class="controlsWrap">

        <el-form class="addControlsForm" ref="addControlsForm" :model="itemw.form" label-width="90px"  size="mini" >
          <el-form-item label="名称" class="name" prop="controlsName" :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]" size='mini'>
              <el-input v-model="itemw.form.controlsName"></el-input>
              <el-checkbox v-model="itemw.form.multiple">多份记录</el-checkbox>
          </el-form-item>
          <div @click="innerAddControls" class="innerAddControls">
            +添加控件
            <ul v-show="showList" class="list">
              <li @click="add(listitem,indexw)" v-for="listitem in list" >{{listitem}}</li>
            </ul>
          </div>
          <template v-for="(item,index) in itemw.addControlsCreator" >
            <div class="innerWrap">
              <p>{{item.title}}</p>
              <div>
                <template v-if="item.type=='input'">
                  <el-form-item :label="item.label" :prop="item.model" size='mini' :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]" >
                    <el-input v-model="itemw.form[item.model]"></el-input>
                    <el-checkbox v-model="itemw.form[item.checkbox]">多行文本</el-checkbox>
                  </el-form-item>
                </template>
                <template v-if="item.type=='textarea'">
                  <el-form-item :label="item.label" :prop="item.model" size='mini' :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]" >
                    <el-input v-model="itemw.form[item.model]"></el-input>
                    <el-checkbox v-model="itemw.form[item.checkbox]">多行文本</el-checkbox>
                  </el-form-item>
                </template>
                <template v-if="item.type=='time'">
                  <el-form-item :label="item.label" :prop="item.model" size='mini' :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]" >
                    <el-input v-model="itemw.form[item.model]"></el-input>
                  </el-form-item>
                  <el-form-item :label="item.label2" :prop="item.model" size='mini' :rules="[{ required: true, message: '请选择类型', trigger: 'blur' }]" >
                    <el-select v-model="itemw.form[item.select]" placeholder='请选择'>
                      <el-option label="年/月/日 时：分" value="年/月/日 时：分"></el-option>
                      <el-option label="年/月/日" value="年/月/日"></el-option>
                      <el-option label="月/日" value="月/日"></el-option>
                      <el-option label="年" value="年"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
                <template v-if="item.type=='base'">
                  <el-form-item :label="item.label" :prop="item.model" size='mini' :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]" >
                    <el-input v-model="itemw.form[item.model]"></el-input>
                  </el-form-item>
                  <el-form-item :label="item.label2" :prop="item.model" size='mini' :rules="[{ required: true, message: '请选择类型', trigger: 'blur' }]" >
                    <el-select v-model="itemw.form[item.select]" placeholder='请选择'>
                      <el-option label="供应商" value="供应商"></el-option>
                      <el-option label="物料" value="物料"></el-option>
                      <el-option label="设备" value="设备"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
                <template v-if="item.type=='business'">
                  <el-form-item :label="item.label" :prop="item.model" size='mini' :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]" >
                    <el-input v-model="itemw.form[item.model]"></el-input>
                  </el-form-item>
                  <el-form-item :label="item.label2" :prop="item.model" size='mini' :rules="[{ required: true, message: '请选择类型', trigger: 'blur' }]" >
                    <el-select v-model="itemw.form[item.select]" placeholder='请选择'>
                      <el-option label="订单" value="订单"></el-option>
                      <el-option label="计划工单" value="计划工单"></el-option>
                      <el-option label="SOP任务" value="SOP任务"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
                <template v-if="item.type=='img'">
                  <el-form-item :label="item.label" :prop="item.model" size='mini' :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]" >
                    <el-input v-model="itemw.form[item.model]"></el-input>
                    <el-checkbox v-model="itemw.form[item.checkbox]">仅支持现场拍摄</el-checkbox>
                  </el-form-item>
                </template>
                <template v-if="item.type=='check'">
                  <el-form-item :label="item.label" :prop="item.model" size='mini' :rules="[{ required: true, message: '请输入描述信息', trigger: 'blur' }]" >
                    <el-input v-model="itemw.form[item.model]"></el-input>
                    <el-checkbox v-model="itemw.form[item.checkbox]" >异常原因</el-checkbox>
                  </el-form-item>
                </template>
                <template v-if="item.type=='task'">
                  <el-form-item :label="item.label" :prop="item.model" size='mini' :rules="[{ required: true, message: '请输入描述信息', trigger: 'blur' }]" >
                    <el-input class="task" v-model="itemw.form[item.model]"></el-input>
                  </el-form-item>
                </template>
                <template v-if="item.type=='radio'">
                  <el-form-item :label="item.label" :prop="item.model" size='mini' :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]" >
                    <el-input v-model="itemw.form[item.model]"></el-input>
                  </el-form-item>
                  <el-form-item :label="item.label2" :prop="item.model" size='mini' :rules="[{ required: true, message: '请输入选项', trigger: 'blur' }]" >
                    <el-input v-model="itemw.form[item.model2]" placeholder="例如:选项1,选项2 选项之间以'逗号'隔开"></el-input>
                    <el-checkbox v-model="itemw.form[item.checkbox]" >平铺展示选项</el-checkbox>
                  </el-form-item>
                </template>
                <template v-if="item.type=='checkbox'">
                  <el-form-item :label="item.label" :prop="item.model" size='mini' :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]" >
                    <el-input v-model="itemw.form[item.model]"></el-input>
                  </el-form-item>
                </template>
              </div>
            </div>
          </template>
        </el-form>
      </div>
    </div>
    <!-- 测试用的button -->
    <button type="button" @click="testData">数据测试</button>
  </div>
</template>

<script>
import {uuid} from 'vue-uuid'
export default {
  // props:['formdataCreator','imgList','fileList'],
  data() {
    return {
      showZone:false,
      showList:false,
      zones:[],
      counter:0,//计数器防止model重名
      list:[
        '分区','文本框（单行）','文本框（多行）','时间信息','基础信息','业务信息','照片','检查项','任务项','单选框','复选框'
      ],
    }
  },
  methods: {
    addControls(){
      this.showZone=!this.showZone
    },
    addZone(){
      this.showZone=!this.showZone;
      // if(!this.zones.length){
        let obj={
          form:{
            controlsName:'',
            multiple:false,
          },
          addControlsCreator:[
          ],
        }
        this.zones.push(obj)
      // }
    },
    innerAddControls(){
      this.showList=!this.showList
    },
    add(type,index){
      // this.counter+=1;
      console.log(type,index)
      // this.showList=!this.showList
      switch(type){
        case '分区':
          let obj0={
            form:{
              controlsName:'',
              multiple:false,
            },
            addControlsCreator:[
            ],
          }
          this.zones.push(obj0)
            break;
        case '文本框（单行）':
          let obj={type:'input', model:'text'+(++this.counter),label:'名称',title:'文本框',checkbox:'text'+this.counter+'checkbox'};
          this.zones[index].addControlsCreator.push(obj);
          this.$set( this.zones[index].form, 'text'+this.counter+'checkbox', false );
            break;
        case '文本框（多行）':
          let obj2={type:'textarea',model:'textarea'+(++this.counter),label:'名称',title:'文本框',checkbox:'textarea'+this.counter+'checkbox'};
          this.zones[index].addControlsCreator.push(obj2);
          this.$set( this.zones[index].form, 'textarea'+this.counter+'checkbox', true );
            break;
        case '时间信息':
          let obj3={type:'time',model:'time'+(++this.counter),label:'名称',label2:'信息类型',title:'时间信息',select:'time'+this.counter+'select'};
          this.zones[index].addControlsCreator.push(obj3);
            break;
        case '基础信息':
          let obj4={type:'base',model:'base'+(++this.counter),label:'名称',label2:'信息类型',title:'基础信息',select:'base'+this.counter+'select'};
          this.zones[index].addControlsCreator.push(obj4);
            break;
        case '业务信息':
          let obj5={type:'business',model:'business'+(++this.counter),label:'名称',label2:'信息类型',title:'业务信息',select:'business'+this.counter+'select'};
          this.zones[index].addControlsCreator.push(obj5);
            break;
        case '照片':
          let obj6={type:'img',model:'img'+(++this.counter),label:'名称',title:'照片',checkbox:'img'+this.counter+'checkbox'};
          this.zones[index].addControlsCreator.push(obj6);
          this.$set( this.zones[index].form, 'img'+this.counter+'checkbox', true );
            break;
        case '检查项':
          let obj7={type:'check',model:'check'+(++this.counter),label:'描述',title:'检查项',checkbox:'check'+this.counter+'checkbox'};
          this.zones[index].addControlsCreator.push(obj7);
          this.$set( this.zones[index].form, 'check'+this.counter+'checkbox', true );
            break;
        case '任务项':
          let obj8={type:'task', model:'task'+(++this.counter),label:'描述',title:'任务项'};
          this.zones[index].addControlsCreator.push(obj8);
            break;
        case '单选框':
            let obj9={type:'radio', model:'radio'+(++this.counter),label:'名称',label2:'选项',model2:'radio'+this.counter+'options',title:'单选框',checkbox:'radio'+this.counter+'checkbox'};
            this.zones[index].addControlsCreator.push(obj9);
            this.$set( this.zones[index].form, 'radio'+this.counter+'checkbox', true );
            break;
        case '复选框':
          let obj10={type:'checkbox', model:'checkbox'+(++this.counter),label:'名称',title:'复选框'};
          this.zones[index].addControlsCreator.push(obj10);
            break;
        default:
            break;
      }
    },
    testData(){//这是一个检测表单项的方法
      console.log(this.zones)
      // console.log(this.$refs)
      // console.log(this.$refs['addControlsForm'])
      this.$refs['addControlsForm'].forEach((v)=>{
        v.validate((valid) => {
          if (valid) {
            alert('submit!');
            // this.$emit('submitForm',this.form,'新建')
          } else {
            console.log('error submit!!');
            this.$message.error('请完善表单信息');
            return false;
          }
        });
      })
    }
  },
}
</script>

<style scoped="scoped">
.addControlsWrap{
  margin-bottom:100px;
}
.addControlslabel{
  width: 140px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  height:40px;
}
.addControlsContainer{
  overflow-x: hidden;
  position:relative;
  height: 72px;
}
/* 添加按钮外侧的 */
.addControls{
  width:750px;
  height:40px;
  box-sizing: border-box;
  font-size: 12px;
  color:rgba(2, 174, 40, 0.5);
  border:1px dashed rgba(2, 174, 40, 0.5);
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}
/* 添加按钮内侧的 */
.innerAddControls{
  margin-left: 90px;
  margin-bottom: 16px;
  width:600px;
  height:40px;
  box-sizing: border-box;
  font-size: 12px;
  color:rgba(2, 174, 40, 0.5);
  border:1px dashed rgba(2, 174, 40, 0.5);
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  background: rgb(242,242,242);
  position: relative;
}
/* 添加分区外侧的 */
.addZone{
  position:absolute;
  top:40px;
  left:0;
  font-size: 10px;
  color: rgba(51, 51, 51, 0.9);
  width:750px;
  height:32px;
  line-height: 32px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgba(215, 215, 215, 1);
  border-top: none;
  background: #fff;
}
.controlsWrap{
  position: relative;
  overflow-x: hidden;
  width:750px;
  box-sizing: border-box;
  margin-top:12px;
  border: 1px solid rgba(215, 215, 215, 1);
  min-height: 500px;
}
/* 分区内表单第一行 */
.addControlsForm .name{
  margin-top:20px;
}
.addControlsForm .name .el-input{
  width:300px;
}
.addControlsForm .name .el-checkbox{
  margin-left: 12px;
}
/* 内侧添加按钮列表 */
.innerAddControls .list{
  position:absolute;
  top:100%;
  left:0;
  list-style-type: none;
  padding:0;
  margin:1px 0 0 -1px;
  width:600px;
  z-index: 6;
}
.innerAddControls .list li{
  font-size: 10px;
  color: rgba(51, 51, 51, 0.9);
  width:100%;
  height:32px;
  line-height: 32px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
  border: 1px solid rgba(215, 215, 215, 1);
  border-top: none;
  background: #fff;
}
.innerWrap{
  clear: both;
  margin-bottom: 16px;
}
.innerWrap>p{
  width: 90px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  /* line-height: 40px; */
  padding: 0 12px 0 0;
  height:40px;
}
.innerWrap>div{
  overflow-x: hidden;
  background:rgb(251,251,251);
  border: 1px solid rgba(215, 215, 215, 1);
  padding-top:18px;
  width: 600px;
}
.innerWrap .el-input{
  width:300px;
}
.innerWrap .el-checkbox{
  margin-left: 12px;
}
.innerWrap .el-select{
  width:300px;
}
.innerWrap .task{
  width: 450px;
}
</style>
