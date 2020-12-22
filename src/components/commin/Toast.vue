<template>
  <div>
    <template>
      <el-button type="text" @click="open">点击打开 Message Box</el-button>
    </template>
  </div>
</template>

<script>
export default {
  methods: {
    open() {
      this.$messageSelf
        .confirms("此操作将永久删除该文件, 是否继续?", "删除提示", {
          type: "info",
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang='scss'>
</style>