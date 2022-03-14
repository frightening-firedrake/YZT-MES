<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <button @click="addRoutes">点我异步添加路由</button>
    <button @click="resetRoutes">点我重置路由</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { anyRoutes, resetRouter,asyncRoutes,constantRoutes} from '@/router';
import router from '@/router';
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods:{
    addRoutes(){
      // alert(11)
      // console.log(this.$router)
      // console.log(this.$route)
      // console.log(this)
      // console.log(this.$router,222)
      // console.log(asyncRoutes)
      // router.addRoutes(asyncRoutes)
      // console.log(this.$router,333)
      // this.$store.setAllroutes()
      console.log('button')
      this.$store.dispatch('user/setAllroutes')
      // this.$store.dispatch('user/login', this.loginForm).then(() => {

    },
    resetRoutes(){
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
