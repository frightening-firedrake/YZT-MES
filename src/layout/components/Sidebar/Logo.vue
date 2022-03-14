<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // title: '云至泰',
      title: '',
      // logo: 'http://www.yzt-erp.com/public/static/index/picture/logo.png',
      logo:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc5N0M1RUI2OUU3NTExRUI4QjY2OTA2MEQ3OUEyQTY3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc5N0M1RUI3OUU3NTExRUI4QjY2OTA2MEQ3OUEyQTY3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Nzk3QzVFQjQ5RTc1MTFFQjhCNjY5MDYwRDc5QTJBNjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Nzk3QzVFQjU5RTc1MTFFQjhCNjY5MDYwRDc5QTJBNjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6vc2C/AAAGgElEQVR42sSZ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',
    }
  }
}
</script>

<style lang="scss" scoped>
#app .sidebar-container a img{
  width: auto;
}
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  // background: #2b2f3a;
  background: #304156;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
