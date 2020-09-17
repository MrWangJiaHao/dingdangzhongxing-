<template>
  <div class="tabContainer">
    <div class="header-title">
      <div class="header-title-icon">icon</div>
      <div class="header-title-text">仓储系统</div>
    </div>
    <div class="el-nav">
      <el-tabs type="card">
        <el-tab-pane label="消息中心"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="角色管理"></el-tab-pane>
        <el-tab-pane label="定时任务补偿"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>

<style>
.tabContainer {
  width: 100%;
  height: 90px;
  background: linear-gradient(0deg, #3795eb, #4bade4);
  position: relative;
  display: flex;
  align-items: center;
}
.header-title {
  color: white;
  width: 7.2%;
  display: flex;
}
.header-title-icon {
  font-size: 20px;
  margin: 37px 6px 32px 10px;
  width: 33px;
}
.header-title-text {
  font-size: 18px;
  margin: 39px 6px 32px 0px;
  width: 72px;
}
.tabContainer .el-tabs__nav-scroll {
  margin: 25px 0 0 0;
}
.tabContainer .el-tabs__content {
  display: none;
}
.tabContainer .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
.tabContainer .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: none;
}
.tabContainer .el-tabs--card > .el-tabs__header {
  border: none;
}
.tabContainer .el-tabs__item {
  color: white;
  font-size: 16px;
  text-align: center;
  line-height: 34px;
}
.tabContainer .el-tabs__item.is-active {
  color: white;
  text-align: center;
  line-height: 34px;
  height: 34px;
  background: #60afec;
  border-radius: 17px;
  font-size: 16px;
}

.el-nav {
  width: 92.8%;
}
.tabContainer .el-tabs__nav-next,
.el-tabs__nav-prev {
  position: absolute;
  cursor: pointer;
  line-height: 44px;
  font-size: 21px;
  color: white;
}
.tabContainer .el-tabs__nav-prev {
  right: 0;
  top: 20px;
}
.tabContainer .el-tabs__nav-next {
  right: 0;
  top: 20px;
}

.tabContainer .el-tabs--border-card {
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.tabContainer > .el-tabs--border-card > .el-tabs__header {
  /**/
  background-color: #1b2945;
  border: none;
  border-top: 1px solid #1b2945;
  border-radius: 3px;
  margin: 0;
}
.tabContainer .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  color: #ffffff;
  text-align: center;
  border: none;
  min-width: 80px;
}
.tabContainer
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item.is-active {
  color: #1b2945;
  background-color: #fff;
  /*border-right-color: #DCDFE6;*/
  /*border-left-color: #DCDFE6;*/
  border: none;
  box-shadow: none;
}
.el-tabs--border-card > .el-tabs__content {
  margin: 0;
  padding: 0;
  height: 0;
}
.tabContainer
  .el-tabs--border-card
  > .el-tabs__header
  .el-tabs__item:not(.is-disabled):hover {
  color: #409eff;
  /*color: #FFFFFF;*/
}
/*input*/
.tabContainer .tabInput {
  background: none;
  width: 160px;
  height: 28px;
  position: absolute;
  right: 0;
  top: 5px;
  margin-right: 10px;
}

.tabContainer .el-input__inner {
  -webkit-appearance: none;
  background: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: 15px;
  height: 28px;
  line-height: 28px;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.tabContainer .el-input__icon {
  height: 100%;
  width: 25px;
  text-align: center;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 28px;
}
</style>