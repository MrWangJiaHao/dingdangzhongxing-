<template>
  <div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      @size-change="handleSizeChange"
      :layout="layout"
      :total="pageComponentsData.pageNums"
    >
      <span class="successBtn" @click="sureBtnSuccess">确定</span>
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      currentPage: 1,
    };
  },
  props: {
    pageComponentsData: Object,
  },
  computed: {
    layout() {
      return `prev, pager, next, jumper,slot,${
        this.pageComponentsData.sizes ? "sizes," : ""
      }  total`;
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.value = val;
      this.$emit("getPageNum", val);
    },
    sureBtnSuccess() {
      this.$emit("sureSuccssBtn", this.value);
    },
    handleSizeChange(e) {
      this.$emit("handleSizeChange", e);
    },
  },
};
</script>
<style lang="scss">
.el-pagination .el-pager,
.el-pagination .el-pager li {
  padding: 0 0px;
  height: 28px;
  line-height: 28px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 4px;
  background: rgba(89, 154, 243, 0);
  font-size: 14px;
  color: #454545;
  margin-left: 6px;
}
.el-pagination .el-pagination__jump {
  margin-left: 13px;
}
.el-pager li {
  border: 1px solid #d1d6e2;
}
.el-pagination .el-pagination__editor.el-input {
  width: 36px;
}
.el-pagination .el-pager li.active {
  color: #fff;
  cursor: default;
  background: #599af3;
}
</style>
<style lang='scss' scoped>
.successBtn {
  margin-left: 12px;
  margin-right: 10px;
  background: rgba(89, 154, 243, 0);
  border: 1px solid #d1d6e2;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  cursor: pointer;
  color: #454545;
  text-align: center;
}
</style>