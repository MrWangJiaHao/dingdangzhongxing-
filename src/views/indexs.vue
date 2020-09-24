<template>
  <div id="headerMain">
    <div class="tabContainer">
      <div class="header-title">
        <div class="header-title-img">
          <img src="@/assets/img/logo.png" />
        </div>
      </div>
      <div class="el-nav">
        <el-tabs type="card" @tab-click="handleClick" v-model="activeName">
          <el-tab-pane name="first">
            <div class="iconAndText" slot="label">
              <router-link to="/index">
                <img src="@/assets/img/warehouse-index.png" />
                <div>首页</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to="/warehouseConfig">
                <img src="@/assets/img/warehouse-config.png" />
                <div>仓库配置</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to="/shipmentsRuleConfig">
                <img src="@/assets/img/warehouse-shipmentsRuleConfig.png" />
                <div>发货规则配置</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-shipments.png" />
                <div>发货管理</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-reexamineConfig.png" />
                <div>复核配置</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-procurementConfig.png" />
                <div>采购管理</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-instorage.png" />
                <div>入库管理</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-outstorage.png" />
                <div>出库管理</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-goodsGression.png" />
                <div>货品移位</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-breakageConfig.png" />
                <div>报损管理</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-warehouseWork.png" />
                <div>仓库作业</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-PDAoperation.png" />
                <div>PDA操作</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-adjustAdmin.png" />
                <div>借调管理</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-inventoryAdmin.png" />
                <div>库存管理</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-inventoryCheck.png" />
                <div>库存盘点</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-suppliesCenter.png" />
                <div>
                  <el-dropdown trigger="click" @command="clickEvent1">
                    <span class="el-dropdown-link">物料中心</span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(v, i) in dropdownArr1"
                        :key="i"
                        :command="i"
                        >{{ v.text }}</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-logisticsInfor.png" />
                <div>物流公司信息</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-clientInfor.png" />
                <div>客户信息</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-equipmentManage.png" />
                <div>设备管理</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-statistics.png" />
                <div>统计</div>
              </router-link>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <div class="iconAndText" slot="label">
              <router-link to>
                <img src="@/assets/img/warehouse-systemManage.png" />
                <div>
                  <el-dropdown trigger="click" @command="clickEvent2">
                    <span class="el-dropdown-link">系统管理</span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(v, i) in dropdownArr2"
                        :key="i"
                        :command="i"
                        >{{ v.text }}</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </router-link>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <router-view></router-view>
    <div class="footerCom">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
// import dropdown from "../components/dropdown"; //引入下拉框组件
import Footer from "../components/footer";
export default {
  components: {
    Footer,
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
      dropdownArr2: [
        { text: "用户管理", img: "" },
        { text: "角色管理", img: "" },
      ],
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    clickEvent1(command) {
      console.log(command);
    },
    clickEvent2(command) {
      switch (command) {
        case 0:
          this.$router.push("/systemSetting/userSetting");
          break;
        case 1:
          this.$router.push("/systemSetting/userControl");
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
#headerMain {
  position: relative;
}
.tabContainer {
  width: 100%;
  margin: 0 auto;
  height: 90px;
  background: linear-gradient(0deg, #3795eb, #4bade4);
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  a {
    display: flex;
    align-items: center;
    color: white;
    img {
      margin: 0 8px 0 0;
      width: 18px;
      height: 18px;
    }
  }
}

.header-title {
  width: 139px;
  height: 90px;
  .header-title-img {
    width: 139px;
    height: 22px;
    img {
      margin: 34px 10px 34px 20px;
      cursor: pointer;
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
  margin: 0;
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
  // width: 1711px;
}
.el-lr {
  // width: 70px;
  // display: flex;
}
/* .tabContainer .is-disabled .el-icon-arrow-left{
  color: white;
}
.tabContainer .is-disabled .el-icon-arrow-right{
  color: white;
} */

.tabContainer .el-tabs__nav-prev {
  left: 1720px;
  top: 0px;
  font-size: 18px;
  color: white;
  position: absolute;
}
.tabContainer .el-tabs__nav-next {
  top: 0px;
  position: absolute;
  right: -50px;
  font-size: 18px;
  color: white;
}
.tabContainer .el-tabs__nav-scroll {
  width: 1720px;
}
.tabContainer .el-tabs__nav-wrap.is-scrollable {
  padding: 0;
}
.tabContainer .el-tabs__nav-wrap {
  position: static;
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
.footerCom {
  height: 30px;
  z-index: 9999;
}
.tabContainer .el-dropdown {
  font-size: 16px;
  color: white;
}
</style>
