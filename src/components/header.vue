<template>
  <div class="tabContainer">
    <div class="header-title">
<<<<<<< HEAD
      <div class="header-title-img">
        <img src="logo.png" />
      </div>
    </div>
    <div class="el-nav">
      <el-tabs type="card" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane name="first">
          <div class="iconAndText" slot="label">
            <router-link to="/indexs">
              <div ></div>
              <div>首页</div>
            </router-link>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <router-link to="/warehouseConfig">
              <div></div>
              <div>仓库配置</div>
            </router-link>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>发货规则配置</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>发货管理</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>复核配置</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>采购管理</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>入库管理</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>出库管理</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>货品移位</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>报损管理</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>仓库作业</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>PDA操作</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>借调管理</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>库存管理</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>库存盘点</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>
              <dropdown dropdownTitle="物料中心" :dropdownArr="dropdownArr1"></dropdown>
            </div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>物料公司信息</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>客户信息</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>设备管理</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>统计</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <div class="iconAndText" slot="label">
            <!-- <router-link to=""> -->
            <div></div>
            <div>系统管理</div>
            <!-- </router-link> -->
          </div>
        </el-tab-pane>
      </el-tabs>
 <router-view></router-view>

    </div>

=======
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
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
  </div>
</template>

<script>
<<<<<<< HEAD
import dropdown from "./dropdown"; //引入下拉框组件
export default {
  components: {
    dropdown,
  },
  data() {
    return {
      activeName: "first",
      dropdownArr1: [
        { text: "供应商管理", img: "" },
        { text: "设备管理", img: "" },
        { text: "物料中心", img: "" },
        { text: "设备管理", img: "" },
      ],
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    linkTo(i) {
      // console.log(i)
      switch (i) {
        case 0:
          this.$router.push("/warehouseConfig");
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
=======
export default {};
</script>

<style scoped>
</style>

<style>
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
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
<<<<<<< HEAD
  width: 139px;
  height: 100%;
  display: flex;
  .header-title-img {
    width: 139px;
    height: 90px;
    img {
      margin:30px 10px 24px 20px;
    }
  }
}
</style>

<style lang="scss">
.tabContainer .el-dropdown {
  color: white;
}

.tabContainer .el-tabs--bottom .el-tabs__header.is-bottom {
  margin: 0;
=======
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
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
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
<<<<<<< HEAD
  margin: 0;
=======
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
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
<<<<<<< HEAD
  width: 1711px;
}
.el-lr {
  width: 70px;
  display: flex;
}
/* .tabContainer .is-disabled .el-icon-arrow-left{
  color: white;
}
.tabContainer .is-disabled .el-icon-arrow-right{
  color: white;
} */

.tabContainer .el-tabs__nav-prev {
  left: 1720px;
  top: -5px;
  font-size: 18px;
  color: white;
  position: absolute;
}
.tabContainer .el-tabs__nav-next {
  top: -5px;
  position: absolute;
  right: -50px;
  font-size: 18px;
  color: white;
}

.tabContainer .el-tabs__nav-wrap.is-scrollable {
  padding: 0;
}
.tabContainer .el-tabs__nav-wrap {
  position: static;
=======
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
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
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
<<<<<<< HEAD

//作废文件
=======
>>>>>>> 7ecb8705434d88cc2bee6bb6add68711162f6eec
</style>