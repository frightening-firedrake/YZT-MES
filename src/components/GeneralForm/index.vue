<template>
      <el-form class="GeneralForm" ref="form" :model="form" :label-width="labelWidth"  size="mini"  :rules="rules">
        <el-form-item v-for="(item,index) in formdataCreator" :label="item.label" :prop="item.model" :key="item.model">
          //输入框
          <template v-if="item.type=='input'">
            <el-input v-model="form[item.model]" :disabled="item.disabled"></el-input>
          </template>
          //下拉框
          <template v-if="item.type=='select'">
            <el-select v-model="form[item.model]" :placeholder="'请选择'+item.label" :disabled="item.disabled">
              <el-option v-for="(optionItem,index) in item.optionList" :label="optionItem.label" :value="optionItem.value"></el-option>
            </el-select>
          </template>
          //时间日期这个感觉不一定用得上啊
          <template v-if="item.type=='date'">
            <el-col :span="11">
              <el-form-item prop="date">
                <el-date-picker type="date" placeholder="选择日期" v-model="form[item.model[0]]" style="width: 100%;" :disabled="item.disabled"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="time">
                <el-time-picker placeholder="选择时间" v-model="form[item.model[1]]" style="width: 100%;" :disabled="item.disabled"></el-time-picker>
              </el-form-item>
            </el-col>
          </template>

          //开关按钮
          <template v-if="item.type=='switch'">
            <el-switch v-model="form[item.model]"></el-switch>
          </template>

          //多选框
          <template v-if="item.type=='checkbox'">
            <el-checkbox-group v-model="form[item.model]">
              <el-checkbox v-for="(checkboxListItem,index) in checkboxList" :label="checkboxListItem.label" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </template>

          //单选框
          <template v-if="item.type=='radio'">

          </template>

          //文本区域
          <template v-if="item.type=='textarea'">

          </template>

          //上传图片
          <template v-if="item.type=='img'">

          </template>

          //上传文件
          <template v-if="item.type=='file'">

          </template>

        </el-form-item>









        <el-form-item label="活动" prop="name">
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
        </el-form-item>



        <el-form-item>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

</template>

<script>
// import { getList } from '@/api/table'//引入api接口

export default {
  // props:[],
  data() {
    return {
      labelWidth:'140px',
        form: {
          name: '我来试一试disabled',
          region: 'shanghai',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        imgList:[],
        fileList: [
          // {
          // name: 'food.jpeg',
          // url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // }, {
          // name: 'food2.jpeg',
          // url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          // },
        ],
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
        }
    }
  },
  created() {

  },
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
.errormsg{
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
}
</style>
