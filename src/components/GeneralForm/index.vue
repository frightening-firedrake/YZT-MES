<template>
      <el-form class="GeneralForm" ref="form" :model="form" :label-width="labelWidth"  size="mini"  :rules="rules">
        <template v-for="(item,index) in formdataCreator" >
          <div class="title" v-if="item.type=='title'">{{item.title}}</div>
          <el-form-item :label="item.label" :prop="item.model" :key="item.model" :size="item.type=='textarea'?'medium':'mini'">
            <!-- 输入框 -->
            <template v-if="item.type=='input'">
              <el-input v-model="form[item.model]" :disabled="item.disabled"></el-input>
            </template>
            <!-- 下拉框  -->
            <template v-if="item.type=='select'">
              <el-select v-model="form[item.model]" :placeholder="'请选择'+item.label" :disabled="item.disabled">
                <el-option v-for="(optionItem,index) in item.optionList" :label="optionItem.label" :value="optionItem.value"></el-option>
              </el-select>
            </template>
            <!-- 时间日期这个感觉不一定用得上啊 -->
            <template v-if="item.type=='date'">
              <el-col :span="11">
                <el-form-item prop="date">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form[item.model1]" style="width: 100%;" :disabled="item.disabled"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="time">
                  <el-time-picker placeholder="选择时间" v-model="form[item.model2]" style="width: 100%;" :disabled="item.disabled"></el-time-picker>
                </el-form-item>
              </el-col>
            </template>
            <!-- 开关按钮  -->
            <template v-if="item.type=='switch'">
              <el-switch v-model="form[item.model]" :disabled="item.disabled"></el-switch>
            </template>
            <!-- 多选框  -->
            <template v-if="item.type=='checkbox'">
              <el-checkbox-group v-model="form[item.model]" :disabled="item.disabled" >
                <el-checkbox v-for="(checkboxListItem,index2) in item.checkboxList" :label="checkboxListItem.label" :name="form[item.name]" :key="checkboxListItem.label"></el-checkbox>
              </el-checkbox-group>
            </template>
            <!-- 单选框  -->
            <template v-if="item.type=='radio'">
              <el-radio-group v-model="form[item.model]" :disabled="item.disabled">
                <el-radio v-for="(radioListItem,index) in item.radioList" :label="radioListItem.label" :key="index"></el-radio>
              </el-radio-group>
            </template>
            <!-- 文本区域  -->
            <template v-if="item.type=='textarea'">
              <el-input type="textarea" :rows="5" v-model="form[item.model]" :disabled="item.disabled"></el-input>
            </template>
            <!-- 时间输入带下拉  -->
            <template v-if="item.type=='durationtime'">
              <el-input class="durationtime" v-model="form[item.model1]" :disabled="item.disabled"></el-input>
              <el-select class="unit" v-model="form[item.model2]" placeholder='请选择' :disabled="item.disabled">
                <el-option v-for="(unitListItem,index) in item.unitList" :label="unitListItem.label" :value="unitListItem.value"></el-option>
              </el-select>
            </template>
            <!-- 上传图片  -->
            <template v-if="item.type=='img'">
              <el-upload
                :disabled="item.disabled"
                :action="action"
                list-type="picture-card"
                :limit="1"
                :file-list="imgList"
                :on-exceed="handleExceedimg"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <div class='errormsg' v-show="uploadImgError">{{uploadImgError}}</div>
            </template>
            <!-- 上传文件  -->
            <template v-if="item.type=='file'">
              <el-upload
                class="upload-demo"
                :disabled="item.disabled"
                :action="action"
                :limit="1"
                :on-exceed="handleExceedfile"
                :on-change="handleChange"
                :file-list="fileList">
                <el-button plain :disabled="item.disabled">上传附件</el-button>
                <div slot="tip" class="el-upload__tip">附件支持类型：JPG/PNG/PDF/DOC/XLSX/RAR，最大不能超过15M</div>
              </el-upload>
              <div class='errormsg' v-show="uploadFileError">{{uploadFileError}}</div>
            </template>
            
            <!-- 设备读数  -->
            <template v-if="item.type=='equipmentReading'">
                <el-table
                  size='mini'
                  :data="equipmentReadingTableData"
                  header-row-class-name="yztHeader"
                  style="width: 500px;border:1px solid rgba(242, 242, 242, 1);border-bottom:none; border-box;">
                  <el-table-column label="" align="center" width="60">
                    <template slot-scope="scope">
                      <span class="el-icon-close" style="color: red;cursor: pointer;font-weight:800;" @click="delEquipmentReading(scope.row)"></span>
                    </template>
                  </el-table-column>
                  <el-table-column label="读数名称/单位" width="320">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.select" placeholder="请选择">
                        <el-option v-for="(selectlistItem,index) in scope.row.selectlist" :label="selectlistItem.label" :value="selectlistItem.value" ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="default" align="center" label="初始值"></el-table-column>
                </el-table>
                <div class="equipmentReading"><span @click="addEquipmentReading">+添加一行</span></div>
            </template>

            <!-- 次品项列表  -->
            <template v-if="item.type=='addKind'">
                <el-table
                  size='mini'
                  :data="kindTableData"
                  header-row-class-name="yztHeader"
                  style="width: 500px;border:1px solid rgba(242, 242, 242, 1);border-bottom:none; border-box;">
                  <el-table-column label="" align="center" width="60">
                    <template slot-scope="scope">
                      <span class="el-icon-close" style="color: red;cursor: pointer;font-weight:800;" @click="delKind(scope.row)"></span>
                    </template>
                  </el-table-column>
                  <el-table-column label="读数名称/单位" width="320">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.select" placeholder="请选择">
                        <el-option v-for="(selectlistItem,index) in scope.row.selectlist" :label="selectlistItem.label" :value="selectlistItem.value" ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="default" align="center" label="初始值"></el-table-column>
                </el-table>
                <div class="equipmentReading"><span @click="addKind">+添加一行</span></div>
            </template>

            <!-- 物料列表  -->
            <template v-if="item.type=='addMaterial'">
                <el-table
                  size='mini'
                  :data="materialTableData"
                  header-row-class-name="yztHeader"
                  style="width: 500px;border:1px solid rgba(242, 242, 242, 1);border-bottom:none; border-box;">
                  <el-table-column label="" align="center" width="60">
                    <template slot-scope="scope">
                      <span class="el-icon-close" style="color: red;cursor: pointer;font-weight:800;" @click="delMaterial(scope.row)"></span>
                    </template>
                  </el-table-column>
                  <el-table-column label="读数名称/单位" width="320">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.select" placeholder="请选择">
                        <el-option v-for="(selectlistItem,index) in scope.row.selectlist" :label="selectlistItem.label" :value="selectlistItem.value" ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="default" align="center" label="初始值"></el-table-column>
                </el-table>
                <div class="equipmentReading"><span @click="addMaterial">+添加一行</span></div>
            </template>

            <!-- 标签模板  -->
            <template v-if="item.type=='addTemplate'">
                <el-table
                  size='mini'
                  :data="templateTableData"
                  header-row-class-name="yztHeader"
                  style="width: 500px;border:1px solid rgba(242, 242, 242, 1);border-bottom:none; border-box;">
                  <el-table-column label="" align="center" width="60">
                    <template slot-scope="scope">
                      <span class="el-icon-close" style="color: red;cursor: pointer;font-weight:800;" @click="delTemplate(scope.row)"></span>
                    </template>
                  </el-table-column>
                  <el-table-column label="读数名称/单位" width="320">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.select" placeholder="请选择">
                        <el-option v-for="(selectlistItem,index) in scope.row.selectlist" :label="selectlistItem.label" :value="selectlistItem.value" ></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="default" align="center" label="初始值"></el-table-column>
                </el-table>
                <div class="equipmentReading"><span @click="addTemplate">+添加一行</span></div>
            </template>

            <!-- 维护策略  -->
            <template v-if="item.type=='strategy'">
              <StrategyTable></StrategyTable>
            </template>






            <p class="tip" :style="item.norules?'display:block;':''" v-if="item.tip">{{item.tip}}</p>
          </el-form-item>
        </template>








       <!-- <el-form-item label="活动" prop="name">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质"  prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" size="medium" prop="desc">
          <el-input type="textarea" :rows="5" v-model="form.desc"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="1"
            :file-list="imgList"
            :on-exceed="handleExceedimg"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div class='errormsg' v-show="uploadImgError">{{uploadImgError}}</div>
        </el-form-item>

        <el-form-item label="附件">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            :on-exceed="handleExceedfile"
            :on-change="handleChange"
            :file-list="fileList">
            <el-button plain>上传附件</el-button>
            <div slot="tip" class="el-upload__tip">附件支持类型：JPG/PNG/PDF/DOC/XLSX/RAR，最大不能超过15M</div>
          </el-upload>
          <div class='errormsg' v-show="uploadFileError">{{uploadFileError}}</div>
        </el-form-item> -->



        <el-form-item>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

</template>

<script>
// import { getList } from '@/api/table'//引入api接口
import {uuid} from 'vue-uuid'
import StrategyTable from './StrategyTable'
export default {
  components:{StrategyTable},
  props:['formdataCreator','imgList','fileList'],
  data() {
    return {
      labelWidth:'140px',
        form: {
          // name: '我来试一试disabled',
          // region: 'shanghai',
          // date1: '',
          // date2: '',
          // delivery: false,
          // type: ['地推活动','线下主题活动'],
          // resource: '线上品牌商赞助',
          // desc: '我只是一段描述'
        },
        // imgList:[],
        // fileList: [
          // {
          // name: 'food.jpeg',
          // url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // }, {
          // name: 'food2.jpeg',
          // url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // },
        // ],
        action:"https://jsonplaceholder.typicode.com/posts/",
        dialogImageUrl: '',
        dialogVisible: false,
        uploadImgError:'',//上传图片出错时传入信息!!!
        uploadFileError:'',//上传文件出错时传入信息!!!
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
        },
        // 设备读数tableData
        equipmentReadingTableData:[],
        // 次品项列表tableData
        kindTableData:[],
        // 物料列表tableData
        materialTableData:[],
        // 标签模板tableData
        templateTableData:[],
    }
  },
  created() {
    this.formdataTransformation()
  },
  methods: {
    formdataTransformation(){
      this.formdataCreator.forEach((v,i)=>{
        switch(v.type){
          case 'title':
              break;
          case 'img':
              break;
          case 'file':
              break;
          case 'equipmentReading':
              break;
          case 'addKind':
              break;
          case 'addMaterial':
              break;
          case 'addTemplate':
              break;
          case 'strategy':
              break;
          case 'date':
              this.$set( this.form, v.model1, v.value1 )
              this.$set( this.form, v.model2, v.value2 )
              break;
          case 'durationtime':
              this.$set( this.form, v.model1, v.value1 )
              this.$set( this.form, v.model2, v.value2 )
              break;
          default:
              this.$set( this.form, v.model, v.value )
        }
        // if(v.type!=='date'&&v.type!=='title'){
        //   this.$set( this.form, v.model, v.value )
        // }else if(v.type=='date'){
        //   this.$set( this.form, v.model1, v.value1 )
        //   this.$set( this.form, v.model2, v.value2 )
        // }
      })
      // console.log(this.form)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.$emit('submitForm',this.form,'新建')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      console.log(this.form)
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceedimg(files, fileList) {
      this.$message.warning(`当前限制选择 1 张图片，本次选择了 ${files.length} 张图片，共选择了 ${files.length + fileList.length} 张图片`);
    },
    handleExceedfile(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    //设备读数
    delEquipmentReading(row) {
      console.log(row)
      this.equipmentReadingTableData=this.equipmentReadingTableData.filter((v)=>{
        return v.id!==row.id
      })
    },
    addEquipmentReading(){
      let obj={
        id:uuid.v1(),
        select:'',
        selectlist:[{label:'产出数量/个',value:'产出数量/个'},{label:'投料数量/个',value:'投料数量/个'},],
        default: '',
      }
      this.equipmentReadingTableData.push(obj)
    },
    //次品项列表
    delKind(row) {
      console.log(row)
      this.kindTableData=this.kindTableData.filter((v)=>{
        return v.id!==row.id
      })
    },
    addKind(){
      let obj={
        id:uuid.v1(),
        select:'',
        selectlist:[{label:'产出数量/个',value:'产出数量/个'},{label:'投料数量/个',value:'投料数量/个'},],
        default: '',
      }
      this.kindTableData.push(obj)
    },
    //物料列表
    delMaterial(row) {
      console.log(row)
      this.materialTableData=this.materialTableData.filter((v)=>{
        return v.id!==row.id
      })
    },
    addMaterial(){
      let obj={
        id:uuid.v1(),
        select:'',
        selectlist:[{label:'产出数量/个',value:'产出数量/个'},{label:'投料数量/个',value:'投料数量/个'},],
        default: '',
      }
      this.materialTableData.push(obj)
    },
    //标签模板
    delTemplate(row) {
      console.log(row)
      this.templateTableData=this.templateTableData.filter((v)=>{
        return v.id!==row.id
      })
    },
    addTemplate(){
      let obj={
        id:uuid.v1(),
        select:'',
        selectlist:[{label:'产出数量/个',value:'产出数量/个'},{label:'投料数量/个',value:'投料数量/个'},],
        default: '',
      }
      this.templateTableData.push(obj)
    },
  }
}
</script>

<style scoped="scoped">
.GeneralForm>>>label{
  font-weight: 400;
}
/* .el-form{
  max-width:900px;
} */
.el-form-item{
  margin-bottom:16px;
}
/* .GeneralForm>>>.el-form-item__label{
  line-height:38px;
} */
.GeneralForm>>>.el-input{
  width:auto;
}
.GeneralForm>>>.el-input__inner{
 /* box-sizing: border-box;
  height:26px;
  line-height: 40px; */
  width:300px;
  font-size:12px;
}
/* .GeneralForm>>>.el-form-item__content{
  line-height: 40px;
} */
.GeneralForm>>>.el-col-11{
  width:auto;
}
.GeneralForm>>>.line{
  width:14px;
  text-align: center;
}
.GeneralForm>>>.el-textarea{
  width:614px;
}
.GeneralForm>>>.el-upload-list{
  width: 380px;
}
.GeneralForm>>>ul.is-disabled+.el-upload{
  cursor: not-allowed;
}
.errormsg{
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
}
.title{
  padding-left: 14px;
  line-height: 50px;
  font-size: 16px;
  color: #1f2f3d;
}
.tip{
  font-size: 10px;
  color: rgba(245, 154, 35, 0.8);
  margin:0 0 0 15px;
  display: inline;
  /* line-height:30px; */
}
.durationtime{
  width: auto;
  margin-right: 12px;
}
.unit>>>input.el-input__inner{
  text-align: center;
  width: 84px;
}
.GeneralForm>>>.el-table th{
  background:rgba(242, 242, 242, 1);
}
.equipmentReading{
  border: 1px solid rgba(242, 242, 242, 1);
  border-top: none;
  color:#8A898E ;
  font-size: 12px;
  width:500px;
  height:40px;
  line-height: 40px;
  padding-left:24px;
}
.equipmentReading span{
  line-height: 40px;
  cursor: pointer;
}
.equipmentReading span:hover{
  color:rgb(64, 158, 255);
}
</style>
