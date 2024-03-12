<template>
  <uv-status-bar></uv-status-bar>
</template>
<script>
export default {
  onLaunch: function () {
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/uni_modules/uview-plus/index.scss";
</style>
