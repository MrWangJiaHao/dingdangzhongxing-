<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  created() {
    if (localStorage.getItem("data")) {
      //replaceState替换数据 Object.assign合并对象
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem("data"))
        )
      );
    } //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("data", JSON.stringify(this.$store.state));
    });
  },
  mounted() {
    
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/btn.scss";

.remove {
  @include BtnFunction("error");
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

.l {
  float: left;
}

.r {
  float: right;
}

.clear {
  content: "";
  display: block;
  clear: both;
}

#app {
  height: 100%;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

/*隐藏滚动条
            ::-webkit-scrollbar {
              width: 0 !important;
            }
            ::-webkit-scrollbar {
              width: 0 !important;
              height: 0;
            } */
/*改变滚动条样式*/
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: #fff;
}

::-webkit-scrollbar-thumb {
  width: 12px;
  height: 12px;
  background: #d1d6e2;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(196, 195, 195);
}

::-webkit-scrollbar-corner {
  background: #fff;
}

/*去掉数字输入框的上下箭头*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

input[type="number"] {
  -moz-appearance: textfield !important;
}

.el-input__inner {
  font-size: 14px;
}

.el-table--border,
.el-table--group {
  border: 1px solid #d2d6e2 !important;
  border-bottom: none !important;
}

.el-table th {
  height: 36px !important;
}

/*全局设置表格一行的高度*/
.el-table td,
.el-table th {
  padding: 6px 0 !important;
}

/*全局设置表格内容不换行 */
.el-table .cell {
  white-space: nowrap !important;
}

/**全局设置表头背景颜色 */
.has-gutter .el-table td,
.el-table th.is-leaf {
  background: #e1eaf5 !important;
}

.el-table td,
.el-table th.is-leaf {
  border-right: 1px solid #d2d6e2 !important;
  border-bottom: 1px solid #d2d6e2 !important;
  background-clip: padding-box !important;
}

.el-table th .is-leaf:last-child {
  border-right: none !important;
}

/**全局设置表格斑马线背景色 */
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f3f8fe !important;
  /**解决表格边框在火狐不显示的问题 */
  background-clip: padding-box !important;
}

/* 全局设置分页器样式*/
.pageComponent {
  border: 1px solid #d2d6e2 !important;
  border-top: none !important;
  padding: 2px 0 !important;
  text-align: right !important;
  height: 36px !important;
  background: #ffffff !important;
}

.el-pagination .el-pagination__jump {
  margin-left: 10px !important;
}

.el-pagination .el-pagination__jump .el-input__inner {
  border: 1px solid #d2d6e2 !important;
  width: 34px !important;
}

.el-pagination .el-pagination__editor.el-input {
  margin: 0 12px !important;
}

//全局设置返回提交按钮css样式
.footerBtn {
  height: 76px !important;
  background: white !important;
  border-top: 1px solid #d1d6e2 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  .backBtn {
    margin: 0 10px 0 0 !important;
    @include BtnFunction("") ;
    background: white !important;
    border: 1px solid #d1d6e2 !important;
  }
  .submitBtn {
    margin: 0 20px 0 0 !important;
    @include BtnFunction("success");
  }
}
/**全局设置复选框的样式 */
.el-checkbox__inner {
  width: 20px !important;
  height: 20px !important;
  border: 1px solid #d1d6e2 !important;
}

.el-checkbox__input {
  line-height: 0 !important;
}

.el-checkbox__inner::after {
  height: 10px !important;
  left: 7px !important;
  top: 2px !important;
}

.el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
  top: 8px !important;
}

.el-table-column--selection .cell {
  padding: 0 !important;
}

.is-disabled {
  background: none !important;
}

.el-pagination .el-pager,
.el-pagination .el-pager li:last-of-type {
  margin: 0 !important;
}

.el-pagination .el-pager li {
  margin-right: 6px !important;
}

.el-pager li.active + li {
  border-left: 1px solid #d1d6e2 !important;
}

.el-pagination__total {
  margin-right: 20px !important;
  line-height: 28px !important;
  color: #686868 !important;
}

.failCause {
  color: red !important;
}

//全局修改鼠标移入表格后的背景色
.el-table__body tr:hover > td,
.el-table__body tr.hover-row.el-table__row--striped > td {
  background-color: #c7e0ff !important;
}

.el-table__body tr.hover-row > td {
  background-color: #c7e0ff !important;
}

//全局修改点击表格某行后的背景色

//全局修改placeholder颜色
::-webkit-input-placeholder {
  color: #9b9b9b !important;
  line-height: 32px;
}

//解决iview placeholder在苹果浏览器上显示的问题
.ivu-input::-webkit-input-placeholder {
  line-height: 20px !important;
}

//兼容火狐浏览器
input::-moz-placeholder {
  color: #9b9b9b !important;
  opacity: 1 !important; //这里必须设置透明度为1，因为火狐默认是0.4
}

//兼容欧鹏浏览器
::-o-placeholder {
  color: #9b9b9b !important;
}

//兼容IE浏览器
::-ms-input-placeholder {
  color: #9b9b9b !important;
}

.el-table::before {
  // height: 0 !important;
  background-color: #d1d6e2 !important;
}

.el-table--border::after,
.el-table--group::after {
  width: 0 !important;
}

.el-table__fixed-right::before,
.el-table__fixed::before {
  background-color: #d2d6e2 !important;
}

.el-table__row td:last-child {
  border-right: none !important;
}

//修改下拉框鼠标滑过背景色
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background: #ecf5ff !important;
}

.addStar {
  position: relative !important;
}

.addStar::before {
  content: "*" !important;
  color: red !important;
  position: absolute !important;
  font-size: 20px !important;
  left: -8px !important;
  top: -30% !important;
}

//修改时间选择框的层级
.ivu-select-dropdown {
  z-index: 9999 !important;
}

.el-table__fixed {
  height: 100% !important;
}
</style>

