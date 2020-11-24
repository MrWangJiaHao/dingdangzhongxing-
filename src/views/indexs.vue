<template>
  <div id="headerMain">
    <div class="tabContainer">
      <div class="header-title">
        <div class="header-title-img">
          <img src="@/assets/img/logo.png" />
        </div>
      </div>
      <div class="el-nav">
        <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for="(navIndex, idx) in dataArr" :key="idx">
            <div slot="label" v-if="navIndex.children">
              <el-dropdown
                placement="bottom"
                trigger="click"
                class="displayalign"
                v-if="navIndex.children.length != 0"
                @command="clickEventGoRouter"
              >
                <span class="el-dropdown-link">
                  <img :src="navIndex.iconCls" width="20" height="20" />
                  {{ navIndex.title }}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(itemCenter, idx) in navIndex.children"
                    :key="idx"
                    :command="idx"
                    >{{ itemCenter.title }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
              <div v-else>
                <span class="el-dropdown-link">
                  <img :src="navIndex.iconCls" width="20" height="20" />
                  {{ navIndex.title }}
                </span>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="el-lr">
        <div class="el-icon-arrow-left left" @click="leftMove"></div>
        <div class="el-icon-arrow-right right" @click="rightMove"></div>
      </div>
    </div>

    <div class="dianjiqiehuan">
      <div class="dianjiCenters">
        <el-tabs
          v-model="activeTabsName"
          type="card"
          editable
          @tab-remove="removeTab"
          @tab-click="handleTabsEdit"
        >
          <el-tab-pane
            :key="idx + 'dsadsa'"
            v-for="(item, idx) in dropdownArr"
            :label="item.title"
            :name="''+idx"
          >
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 可以删除的导航 -->
    <div class="dianjiqiehuan" v-show="mianbaoxieArr.length">
      <div class="mianbaoxie">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="(item, idx) in mianbaoxieArr"
            :key="idx + 'dsa'"
            :to="{ path: item.name }"
            >{{ item.title }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
    </div>
    <!-- 面包屑导航 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="footerCom">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
// import dropdown from "../components/dropdown"; //引入下拉框组件
let a = 0;
import Footer from "../components/footer";
import { jurisdicRequest } from "../api/api";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      tabIndex: 0,
      dataArr: [
        {
          title: "首页",
          name: "/index/indexFormJH",
          iconCls: require("@/assets/img/warehouse-index.png"),
          children: []
        },
        {
          title: "仓库配置",
          name: "/warehoseconfig/childWarehouseAdmin",
          iconCls: require("@/assets/img/warehouse-config.png"),
          children: [
            {
              title: "子仓管理",
              name: "/warehoseconfig/childWarehouseAdmin",
            },
            {
              title: "区域管理",
              name: "/warehoseconfig/regionalManagements",
            },
            {
              title: "库位管理",
              name: "/warehoseconfig/storageLocalAdmins",
            },
            {
              title: "库位映射",
              name: "/warehoseconfig/storageLocalMap",
            },
          ],
        },
        {
          title: "订单管理",
          name: "/indentManagement/sellIndentManage",
          iconCls: require("@/assets/img/warehouse-inventoryAdmin.png"),
          children: [
            {
              title: "销售订单管理",
              name: "/indentManagement/sellIndentManage",
            },
            {
              title: "自提订单管理",
              name: "/indentManagement/zitiIndentManage",
            },
            {
              title: "缺货订单管理",
              name: "/indentManagement/stockoutIndentManage",
            },
            {
              title: "无物流单号管理",
              name: "/indentManagement/notLogisticsIndentManage",
            },
            {
              title: "退货订单管理",
              name: "/indentManagement/resalesIndentManage",
            },
          ],
        },
        {
          title: "发货规则配置",
          name: "/pWarehouseRule/findRecordPage",
          iconCls: require("@/assets/img/warehouse-shipmentsRuleConfig.png"),
          children: [
            {
              title: "发货规则配置",
              name: "/pWarehouseRule/findRecordPage",
            },
          ],
        },
        {
          title: "发货管理",
          iconCls: require("@/assets/img/warehouse-shipments.png"),
          children: [
            {
              title: "正常发货",
              name: "/deliveryManagement/normalDelivery",
            },
            {
              title: "快速发货",
              name: "/deliveryManagement/quetyNormal",
            },
            {
              title: "拣货单管理",
              name: "/deliveryManagement/pickingList",
            },
            {
              title: "发货单打印",
              name: "/deliveryManagement/delivetyNotePrint",
            },
            {
              title: "发货异常管理",
              name: "/deliveryManagement/abnormalDelibery",
            },
          ],
        },
        {
          title: "复核配置",
          iconCls: require("@/assets/img/warehouse-reexamineConfig.png"),
          children: [],
        },
        {
          title: "采购管理",
          name: "/purchasingManagement/purchasingIndex",
          iconCls: require("@/assets/img/warehouse-procurementConfig.png"),
          children: [
            {
              title: "采购管理",
              name: "/purchasingManagement/purchasingIndex",
            },
          ],
        },
        {
          title: "入库管理",
          name: "/warehousingManagement/manualManagement/0",
          iconCls: require("@/assets/img/warehouse-instorage.png"),
          children: [
            {
              title: "手工创建入库",
              name: "/warehousingManagement/manualManagement/0",
            }, //0
            {
              title: "采购调拨入库",
              name: "/warehousingManagement/manualManagement/1",
            }, //1
            {
              title: "预入库",
              name: "/warehousingManagement/manualManagement/2",
            }, //2
            {
              title: "采购预入库",
              name: "/warehousingManagement/manualManagement/3",
            }, //3
            {
              title: "调拨入库",
              name: "/warehousingManagement/manualManagement/4",
            }, //4
            {
              title: "加工入库",
              name: "/warehousingManagement/manualManagement/5",
            }, //5
            {
              title: "拆解入库",
              name: "/warehousingManagement/manualManagement/6",
            }, //6
            {
              title: "退货入库",
              name: "/warehousingManagement/manualManagement/7",
            }, //7
            {
              title: "盘盈入库",
              name: "/warehousingManagement/manualManagement/8",
            }, //8
            {
              title: "其他入库",
              name: "/warehousingManagement/manualManagement/9",
            }, //9
          ],
        },
        {
          title: "出库管理",
          name: "/warehouseManagement/warehouseIndex/0",
          iconCls: require("@/assets/img/warehouse-outstorage.png"),
          children: [
            {
              title: "手工创建出库",
              name: "/warehouseManagement/warehouseIndex/0",
            },
            {
              title: "调拨出库",
              name: "/warehouseManagement/warehouseIndex/3",
            },
            {
              title: "加工出库",
              name: "/warehouseManagement/warehouseIndex/4",
            },
            {
              title: "拆解出库",
              name: "/warehouseManagement/warehouseIndex/5",
            },
            {
              title: "自提出库",
              name: "/warehouseManagement/warehouseIndex/2",
            },
            {
              title: "销售出库",
              name: "/warehouseManagement/warehouseIndex/1",
            },
            {
              title: "报损出库",
              name: "/warehouseManagement/warehouseIndex/6",
            },
            {
              title: "盘亏出库",
              name: "/warehouseManagement/warehouseIndex/7",
            },
            {
              title: "其他出库",
              name: "/warehouseManagement/warehouseIndex/8",
            },
          ],
        },
        {
          title: "货品移位",
          iconCls: require("@/assets/img/warehouse-goodsGression.png"),
          children: [
            {
              title: "补货作业",
              name: "/goodsShifting/jobTask",
            },
            {
              title: "库内移动",
              name: "/goodsShifting/moveInLibrary",
            },
          ],
        },
        {
          title: "报损管理",
          iconCls: require("@/assets/img/warehouse-breakageConfig.png"),
          children: [
            {
              title: "报损管理",
              name: "/breakageManagement/breakageMain",
            },
          ],
        },
        {
          title: "仓库作业",
          iconCls: require("@/assets/img/warehouse-warehouseWork.png"),
          children: [],
        },
        {
          title: "PDA操作",
          iconCls: require("@/assets/img/warehouse-PDAoperation.png"),
          children: [],
        },
        {
          title: "借调管理",
          iconCls: require("@/assets/img/warehouse-adjustAdmin.png"),
          children: [],
        },
        {
          title: "库存管理",
          iconCls: require("@/assets/img/warehouse-inventoryAdmin.png"),
          children: [],
        },
        {
          title: "库存盘点",
          iconCls: require("@/assets/img/warehouse-inventoryCheck.png"),
          children: [],
        },
        {
          title: "物料中心",
          name: "/suppliesCenter/supplierAdmin",
          iconCls: require("@/assets/img/warehouse-suppliesCenter.png"),
          children: [
            {
              title: "供应商管理",
              name: "/suppliesCenter/supplierAdmin",
            },
            {
              title: "品牌管理",
              name: "/suppliesCenter/brandAdmin",
            },
            {
              title: "规格管理",
              name: "/suppliesCenter/specificationAdmin",
            },
            {
              title: "物料管理",
              name: "/suppliesCenter/materialAdmin",
            },
            {
              title: "物料库存",
              name: "/suppliesCenter/suppliesInventory",
            },
            {
              title: "物料记录",
              name: "/suppliesCenter/suppliesRecord",
            },
          ],
        },
        {
          title: "物流公司信息",
          name: "/phyDisComInfor/phyDisCom",
          iconCls: require("@/assets/img/warehouse-logisticsInfor.png"),
          children: [
            { title: "物流公司", name: "/phyDisComInfor/phyDisCom" },
            {
              title: "仓库物流信息模板",
              name: "/phyDisComInfor/storePhyDisFreight",
            },
            {
              title: "委托公司运费模板",
              name: "/phyDisComInfor/entrustComFreight",
            },
          ],
        },
        {
          title: "客户信息",
          iconCls: require("@/assets/img/warehouse-clientInfor.png"),
          children: [],
        },
        {
          title: "设备管理",
          iconCls: require("@/assets/img/warehouse-equipmentManage.png"),
          children: [],
        },
        {
          title: "统计",
          iconCls: require("@/assets/img/warehouse-statistics.png"),
          children: [],
        },
        {
          title: "系统管理",
          name: "/systemSetting/userSetting",
          iconCls: require("@/assets/img/warehouse-systemManage.png"),
          children: [
            {
              title: "用户管理",
              name: "/systemSetting/userSetting",
            },
            {
              title: "角色管理",
              name: "/systemSetting/userControl",
            },
          ],
        },
      ],
      activeName: "0",
      activeTabsName: "0",
      dropdownArr: [],
      mianbaoxieArr: [],
      oldName: 0,
      firstShow: true,
      activeNames: 1,
      rightLock: true,
      leftLock: true,
    };
  },
  mounted() {
    let data = {
      appNo: "99125FCFA23B4AD09668DC8F1DC53C18",
      type: "4",
      id: "AA4EBC35E2544E7688E2F4230F3F5E30",
    };
    jurisdicRequest(data).then((ok) => {
      // console.log(ok);
    });
    this.activeName = sessionStorage.getItem("activeName");
  },
  created() {
    this.dropdownArr.unshift(this.dataArr[0]);
    this.addHenxianTables();

    this.mianbaoxieArr.unshift();
  },
  watch: {
    activeName: function (n) {
      console.log('------------activeName------------', n, this.dropdownArr)
      this.activeName = ''+parseInt(n)
    },
    // activeTabsName: function (n) {
    //   this.mianbaoxieArr = []
    //
    // },
    $route: function (n) {
      console.log(n)
      if (this.dropdownArr.length) {
        for (var i = 0; i < this.dropdownArr.length; i++) {
          if (this.dropdownArr[i].name == n.name) {
            this.activeTabsName = i + ''
            this.mianbaoxieArr = []
            this.mianbaoxieArr.push(this.dropdownArr[+this.activeTabsName]);
            this.mianbaoxieArr.push(this.dropdownArr[+this.activeTabsName].children[0]);
            break
          }
        }
      }
    }
  },
  methods: {
    leftMove() {
      a = 0;
      let oDiv = document.querySelector(".el-tabs__nav-scroll");
      oDiv.style.left = "0";
      oDiv.style.transition = "0.5s";
    },
    rightMove() {
      let oDiv = document.querySelector(".el-tabs__nav-scroll");
      // let oDiv1 = document.querySelector(".el-tabs__nav-wrap");
      oDiv.style.transition = "0.5s";
      a++;
      oDiv.style.left = `${-1140 * a}px`;
      if (oDiv.offsetLeft <= -1140) {
        a = 0;
      }
      // let time = setInterval(() => {
      //   let buchang = oDiv.offsetWidth / 50;
      //   a += buchang;
      //   oDiv.style.left = -a + "px";
      //   if (oDiv.offsetLeft < -1020) {
      //     clearInterval(time);
      //   }
      // }, 10);
      // console.log(oDiv1.scrollHeight)
    },
    clickItemIdx(e) {
      console.log(e, "点击item");
    },
    //点击子
    dianji(e) {
      console.log(e, "dianji");
    },
    //点击选中
    handleTabsEdit() {
      console.log('this.activeTabsName', this.activeTabsName)
      this.addHenxianTables();
      let router =
        this.dataArr[+this.activeName].children.length != 0
          ? this.dataArr[+this.activeName].children[0].name
          : this.dataArr[+this.activeName].name;
      if (!router)
        return this.$messageSelf.message({
          message: "该模块在开发中请耐心等候稍后",
        });
      this.$router.push(router);
      let dataArrJson =
        this.dropdownArr[+this.activeTabsName].children.length != 0
          ? this.dropdownArr[+this.activeTabsName].children[0]
          : this.dropdownArr[+this.activeTabsName];
      this.mianbaoxieArr = [];
      let mianbaoxieArrJson = this.dropdownArr[+this.activeTabsName];
      if (!this.mianbaoxieArr.includes(mianbaoxieArrJson)) {
        this.mianbaoxieArr.unshift(mianbaoxieArrJson);
      }
      this.mianbaoxieArr.splice(1, 1, dataArrJson);
    },
    addHenxianTables() {
      setTimeout(() => {
        this.$nextTick(() => {
          let tablesCenter = document.getElementsByTagName("td");
          tablesCenter = Array.from(tablesCenter);
          tablesCenter.forEach((item) => {
            if (!item.children[0].children.length) {
              item.children[0].innerHTML = item.children[0].innerHTML
                ? item.children[0].innerHTML
                : "———";
            }
          });
        });
      }, 700);
    },
    //点击删除
    removeTab(e) {
      let removeSrc = e.substring(e.length, e.length - 1);
      if (!removeSrc) return;
      this.dropdownArr.splice(removeSrc, 1);
      this.mianbaoxieArr.splice(removeSrc, 1);
      let router =
              this.dropdownArr[this.dropdownArr.length - 1].children.length != 0
                      ? this.dropdownArr[this.dropdownArr.length - 1].children[0].name
                      : this.dropdownArr[this.dropdownArr.length - 1].name;
      this.activeTabsName = this.dropdownArr.length ? ((this.dropdownArr.length - 1) + '') : '0'
      this.$router.push(router);
      console.log('--------dropdownArr--------', router)
    },

    handleClick() {
      console.log('--------dropdownArr--------', this.dropdownArr)
      this.addHenxianTables();
      console.log("this.activeName", this.activeName);
      if (
        !this.dataArr[+this.activeName].children.length &&
        this.dataArr[+this.activeName].title != "首页"
      )
        return Message({
          message: "该模块在开发中，请耐心等候",
          duration: 500,
        });
      if (this.dataArr[+this.activeName].title == "首页")
        return this.$router.push("/index/indexFormJH");
      let json = this.dataArr[+this.activeName];
      // console.log("点击了第一级的菜单栏");
      sessionStorage.setItem("activeName", this.activeName);
      let router =
        this.dataArr[+this.activeName].children.length != 0
          ? this.dataArr[+this.activeName].children[0].name
          : this.dataArr[+this.activeName].name;
      this.$router.push(router);
      //跳转路由
      if (!this.dropdownArr.includes(json)) {
        this.dropdownArr.push(this.dataArr[+this.activeName]);
        this.activeTabsName = ++this.activeTabsName + ''
      } else {
        if (this.dropdownArr.length) {
          for (var i = 0; i < this.dropdownArr.length; i++) {
            if (this.dropdownArr[i].name == this.dataArr[+this.activeName].name) {
              this.activeTabsName = i + ''
              break
            }
          }
        }
      }
      if (!this.mianbaoxieArr.includes(json)) {
        this.mianbaoxieArr.push(this.dropdownArr[+this.activeTabsName]);
        this.mianbaoxieArr.splice(this.dropdownArr[+this.activeTabsName].children[0]);
      }
      this.oldName = +this.activeName;
      this.handleTabsEdit()
      console.log('this.mianbaoxieArr', this.mianbaoxieArr)
    },
    clickEventGoRouter(e) {
      let dataArrJson = this.dropdownArr[+this.activeTabsName].children[e];
      let mianbaoxieArrJson = this.dropdownArr[+this.activeTabsName];
      if (!this.mianbaoxieArr.includes(mianbaoxieArrJson)) {
        this.mianbaoxieArr.unshift(mianbaoxieArrJson);
      }
      this.mianbaoxieArr.splice(1, 1, dataArrJson);
      let router = this.dropdownArr[+this.activeTabsName].children[e].name;
      this.$router.push(router);
      console.log('this.mianbaoxieArr', this.mianbaoxieArr)
    },
  },
};
</script>
<style lang='scss'>
.popper__arrow {
  left: 50% !important;
  transform: translate(-50%);
}

.has-gutter .el-table td,
.el-table th.is-leaf {
  background: #e1eaf5;
}

.el-table td,
.el-table th.is-leaf {
  border-right: 0.5px solid #d2d6e2;
  border-bottom: 0.5px solid #d2d6e2;
}

.cell {
  text-align: center;
}

.el-tabs__new-tab {
  display: none;
}

.el-table__body-wrapper .is-scrolling-right {
  overflow: auto;
}

.el-tabs__header {
  margin: 0 0 0;
}

.el-tabs {
  position: relative;
  top: 1px;
  left: 10px;
  z-index: 10;
}

.dianjiqiehuan .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 1px solid #ced4de;
}

.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-bottom-color: #ced4de;
}

.mianbaoxie {
  padding: 20px 10px;
}

.dianjiqiehuan .el-tabs--card > .el-tabs__header .el-tabs__item:first-child {
  border-left: 1px solid #ced4de !important;
}
.dianjiqiehuan .el-breadcrumb__inner.is-link {
  color: #606266 !important;
  font-weight: bold !important;
}
.dianjiqiehuan .el-breadcrumb__separator.el-icon-arrow-right {
  font-weight: bold !important;
  color: #606266 !important;
}
.dianjiqiehuan .el-tabs__item.is-top.is-active.is-closable {
  color: #000 !important;
  border-bottom-color: #eef1f8 !important;
}

.el-breadcrumb__item {
  display: flex;
}

.el-breadcrumb .el-breadcrumb__item:first-child::before {
  content: "";
  display: inline-block;
  width: 3px;
  height: 16px;
  background: #5a9af4;
  margin-right: 10px;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}

.el-tabs__item.is-top.is-closable {
  margin-right: 18px;
}

.el-tabs__item:hover {
  color: #000;
  cursor: pointer;
}
</style>
<style scoped lang="scss">
#headerMain {
  position: relative;

  .tabContainer {
    width: 100%;
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

  .dianjiqiehuan {
    padding: 0 20px;
    background: #e6e7ea;
    border-bottom: 1px solid #ced4de;

    .dianjiCenters {
      padding-top: 20px;
      border-bottom: 1px solid #ced4de;
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
  width: 89%;
  flex: 1;
  overflow: hidden;
}

.el-lr {
  width: 70px;
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #fff;
  justify-content: space-around;

  div {
    cursor: pointer;
  }
}

.tabContainer .el-tabs__nav-scroll {
  position: absolute;
}

.tabContainer .el-tabs__nav-wrap.is-scrollable {
  padding: 0;
}

.tabContainer .el-tabs__nav-wrap {
  position: relative;
  height: 90px;
  display: flex;
  align-items: center;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  user-select: none;
}
.tabContainer .el-tabs__nav-wrap::-webkit-scrollbar {
  display: none;
}

.tabContainer .el-dropdown {
  font-size: 16px;
  color: white;
}
.footerCom {
  height: 30px;
}
</style>
