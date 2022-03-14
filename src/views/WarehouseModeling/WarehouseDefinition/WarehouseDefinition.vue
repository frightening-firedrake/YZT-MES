<template>
  <div class="app-container">
    <div class="panel">
      <div class="title">{{$route.meta.title}}</div>

    </div>
  </div>
</template>

<script>
// import { getList } from '@/api/table'//引入api接口

export default {
  data() {
    return {

    }
  },
  created() {

  },
  methods: {

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
  padding-left:12px;
  line-height: 30px;
  height:30px;
  font-size:14px;
  color:#333;
}
</style>
