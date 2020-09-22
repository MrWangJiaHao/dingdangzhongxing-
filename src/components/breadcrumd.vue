<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/index' }" v-for="(v,i) in this.$route.meta.Breadcrumb" :key="i">{{v}}</el-breadcrumb-item>
    </el-breadcrumb>

    
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>