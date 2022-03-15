<template>
  <div class="strategy">
    <el-table
      size='mini'
      :data="strategyTableData"
      header-row-class-name="yztHeader"
      style="width: auto;border:1px solid rgba(242, 242, 242, 1);border-bottom:none; border-box;">
      <el-table-column label="" align="center" width="60" fixed="left">
        <template slot-scope="scope">
          <span class="el-icon-close" style="color: red;cursor: pointer;font-weight:800;" @click="delstrategy(scope.row)"></span>
        </template>
      </el-table-column>

      <el-table-column label="策略名称" width="210" align="center">
        <template slot-scope="scope">
            <el-select v-show="scope.row.edit" v-model="scope.row.name" placeholder="请选择">
              <el-option v-for="(namelistItem,index) in scope.row.namelist" :label="namelistItem.label" :value="namelistItem.value" ></el-option>
            </el-select>
          <span v-show="!scope.row.edit">
            {{scope.row.name}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="策略描述" width="210" align="center">
        <template slot-scope="scope">
            <el-select v-show="scope.row.edit" v-model="scope.row.desc" placeholder="请选择">
              <el-option v-for="(desclistItem,index) in scope.row.desclist" :label="desclistItem.label" :value="desclistItem.value" ></el-option>
            </el-select>
          <span v-show="!scope.row.edit">
            {{scope.row.desc}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="策略开始时间" width="210" align="center">
        <template slot-scope="scope">
            <el-date-picker
              v-show="scope.row.edit"
              v-model="scope.row.starttime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          <span v-show="!scope.row.edit">
            {{scope.row.starttime.toLocaleString()}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="策略结束时间" width="210" align="center">
        <template slot-scope="scope">
            <el-date-picker
              v-show="scope.row.edit"
              v-model="scope.row.endtime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          <span v-show="!scope.row.edit">
            {{scope.row.endtime.toLocaleString()}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="生产占用" width="210" align="center">
        <template slot-scope="scope">
            <el-input v-show="scope.row.edit" v-model="scope.row.sczy" ></el-input>
          <span v-show="!scope.row.edit">
            {{scope.row.sczy}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="策略类型" width="210" align="center">
        <template slot-scope="scope">
            <el-input v-show="scope.row.edit" v-model="scope.row.cllx" ></el-input>
          <span v-show="!scope.row.edit">
            {{scope.row.cllx}}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="策略方向" width="210" align="center">
        <template slot-scope="scope">
            <el-input v-show="scope.row.edit" v-model="scope.row.clfx" ></el-input>
          <span v-show="!scope.row.edit">
            {{scope.row.clfx}}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="clickRow(scope.row)"
            type="text"
            size="small">
            {{scope.row.edit?'完成':'编辑'}}
          </el-button>
        </template>
      </el-table-column>


      <!-- <el-table-column prop="default" align="center" label="初始值"></el-table-column> -->

    </el-table>
    <div class="strategyAdd"><span @click="addstrategy">+添加一行</span></div>
  </div>
</template>
<script>
// import { getList } from '@/api/table'//引入api接口
import {uuid} from 'vue-uuid'
export default {
  // props:['formdataCreator','imgList','fileList'],
  data() {
    return {
        // 设备读数tableData
        strategyTableData:[],
    }
  },
  created() {

  },
  methods: {
    delstrategy(row) {
      console.log(row)
      this.strategyTableData=this.strategyTableData.filter((v)=>{
        return v.id!==row.id
      })
    },
    addstrategy(){
      let obj={
        id:uuid.v1(),
        name:'',
        namelist:[{label:'策略名aa',value:'策略名aa'},{label:'策略名bb',value:'策略名bb'},],
        desc:'',
        desclist:[{label:'策略描述aa',value:'策略描述aa'},{label:'策略描述bb',value:'策略描述bb'},],
        starttime:'',
        endtime:'',
        sczy: '生产占用',
        cllx: '策略类型',
        clfx: '策略方向',
        edit:true
      }
      this.strategyTableData.push(obj)
    },
    clickRow(row) {
      console.log(row)//点击编辑切换
      this.strategyTableData.forEach((v)=>{
        if(v.id==row.id){
          v.edit=!v.edit
        }
      })

    },
  }
}
</script>

<style scoped="scoped">
.strategy{
  padding-right:80px;
}
.GeneralForm .strategy>>>.el-input__inner{
  width:auto;
  text-align: center;
}
.strategy>>>.el-table th{
  background:rgba(242, 242, 242, 1);
}
.strategyAdd{
  border: 1px solid rgba(242, 242, 242, 1);
  border-top: none;
  color:#8A898E ;
  font-size: 12px;
  width:auto;
  height:40px;
  line-height: 40px;
  padding-left:24px;
}
.strategyAdd span{
  line-height: 40px;
  cursor: pointer;
}
.strategyAdd span:hover{
  color:rgb(64, 158, 255);
}
</style>
