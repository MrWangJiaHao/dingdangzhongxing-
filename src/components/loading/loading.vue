<template>
<div class="loading"></div>
</template>
 
<script>
export default {
  name: 'Loading' // 定义的组件名称 使用时写法：loading
}
</script>
 
<style scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  background: url('../../assets/img/loading.gif') center center no-repeat rgba(255,255,255);
  width: 100%;
  height: 100%;
  z-index: 999999;
}
</style>
