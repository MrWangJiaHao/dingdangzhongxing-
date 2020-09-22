<template>
  <div class="breadcrumbCom">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item
        :to="{ path: '/index' }"
        v-for="(v,i) in this.$route.meta.Breadcrumb"
        :key="i"
      >{{v}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.breadcrumbCom {
  background: #eef1f8;
}
</style>