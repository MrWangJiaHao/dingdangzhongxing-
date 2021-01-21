<template>
  <div id="headerMain">
    <div class="navMain">
      <div class="tabContainer">
        <a class="imgbox ellipsis displayalign" @click="goToIndex">
          <img src="@/assets/img/logo.png" class="navMainImgBoxImg" />
          <span class="xitonwenzi">仓储系统</span>
        </a>
        <div class="el-nav displayalign">
          <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(navIndex, idxs) in dataArr" :key="idxs" :name="''+idxs">
              <div slot="label" v-if="navIndex.children">
                <el-dropdown
                  placement="bottom"
                  trigger="click"
                  class="displayalign"
                  v-if="navIndex.children.length > 1"
                  @command="clickEventGoRouter"
                  ref="mouseoutHidden"
                >
				
                  <span class="el-dropdown-link">
                    <img
                      class="navMainDropdownImgBox"
                      :src="navIndex.iconCls"
                      width="16"
                      height="16"
                    />
                    <span class="lineHeight34">{{ navIndex.title }}</span>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(itemCenter, idx) in navIndex.children"
                      :key="idx"
                      :command="idx"
                      >{{ itemCenter.title }}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <div v-else>
                  <span class="el-dropdown-link">
                    <img
                      :src="navIndex.iconCls"
                      class="navMainDropdownImgBox"
                      width="16"
                      height="16"
                    />
                    <span class="lineHeight34">
                      {{ navIndex.title }}
                    </span>
                  </span>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      <div class="el-lr">
          <div
            class="el-icon-arrow-left left"
            @click="leftMove"
            :style="{
              opacity:
                leftMoveClick && this.steep == this.navWidth - this.innersWidth
                  ? 0.46
                  : 1,
            }"
          ></div>
          <div
            class="el-icon-arrow-right right"
            @click="rightMove"
            :style="{
              opacity:
                rightMoveClick && this.steep == this.navWidth - this.innersWidth
                  ? 0.46
                  : 1,
            }"
          ></div>
        </div> 
      </div>
    </div>

    <div class="dianjiqiehuan" v-show="dropdownArr.length" id="clickBox">
      <div class="dianjiCenters">
        <el-tabs
          v-model="activeTabsName"
          type="card"
          @tab-remove="removeTab"
          @tab-click="handleTabsEdit"
        >
          <el-tab-pane
            :key="idx + 'dsadsa'"
            v-for="(item, idx) in dropdownArr"
            :closable="item.title != '首页'"
            :label="item.title"
            :name="'' + idx"
          >
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 可以删除的导航 -->
    <div
      class="dianjiqiehuan"
      v-show="
        mianbaoxieArr.length >= 2 &&
        mianbaoxieArr[0].title !== mianbaoxieArr[1].title
      "
    >
      <div class="mianbaoxie" v-show="!isZhanneixiaoxi">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="(item, idx) in mianbaoxieArr"
            :key="idx + 'dsa'"
            :to="{ path: item.name }"
            >{{ item.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- 面包屑导航 -->
    <keep-alive>
      <!-- 需要缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div class="footerCom">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
let a = 0;
import Footer from "../components/footer";
import { jurisdicRequest } from "../api/api";
import { _typesStr } from "../utils/validate";

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
          iconCls: require("@/assets/svg/index.svg"),
          children: [],
        },
        {
          title: "仓库配置",
          name: "/warehoseconfig/childWarehouseAdmin",
          iconCls: require("@/assets/svg/cankupeizhi.svg"),
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
          iconCls: require("@/assets/svg/dindanguanli.svg"),
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
          iconCls: require("@/assets/svg/faguoguizhe.svg"),
          children: [
            {
              title: "发货规则配置",
              name: "/pWarehouseRule/findRecordPage",
            },
          ],
        },
        {
          title: "发货管理",
          name: "/deliveryManagement/normalDelivery",
          iconCls: require("@/assets/svg/fahuoguanli.svg"),
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
          name: "/reviewConfig/ReviewDelivery",
          iconCls: require("@/assets/svg/fuhepeizhi.svg"),
          children: [
            {
              title: "复核发货",
              name: "/reviewConfig/ReviewDelivery",
            },
            {
              title: "复核管理",
              name: "/reviewConfig/reviewManagement",
            },
          ],
        },
        {
          title: "采购管理",
          name: "/purchasingManagement/purchasingIndex",
          iconCls: require("@/assets/svg/caigouguanli.svg"),
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
          iconCls: require("@/assets/svg/rukuguanli.svg"),
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
          iconCls: require("@/assets/svg/chukuguanli.svg"),
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
          name: "/goodsShifting/jobTask",
          iconCls: require("@/assets/svg/moveSelf.svg"),
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
          name: "/breakageManagement/breakageMain",
          iconCls: require("@/assets/svg/baoshunguanli.svg"),
          children: [
            {
              title: "报损管理",
              name: "/breakageManagement/breakageMain",
            },
          ],
        },
        {
          title: "仓库作业",
          name: "/productOffice/processingOffice",
          iconCls: require("@/assets/svg/cankuBookie.svg"),
          children: [
            {
              title: "加工作业",
              name: "/productOffice/processingOffice",
            },
            {
              title: "拆解作业",
              name: "/productOffice/dismantlingOffice",
            },
          ],
        },
        {
          title: "PDA操作",
          name: "",
          iconCls: require("@/assets/svg/PDA.svg"),
          children: [],
        },
        {
          title: "借调管理",
          name: "/borrowManagement/borrowMain",
          iconCls: require("@/assets/svg/jiediaoguanli.svg"),
          children: [
            {
              title: "借调管理",
              name: "/borrowManagement/borrowMain",
            },
          ],
        },
        {
          title: "库存管理",
          name: "/inventoryMangement/productInventory",
          iconCls: require("@/assets/svg/kuchunguanli.svg"),
          children: [
            {
              title: "产品库存",
              name: "/inventoryMangement/productInventory",
            },
            {
              title: "有效期管理",
              name: "/inventoryMangement/indateMangement",
            },
          ],
        },
        {
          title: "库存盘点",
          name: "/inventoryCheck/checkPlanManagement",
          iconCls: require("@/assets/svg/kuchunpandian.svg"),
          children: [
            {
              title: "盘点计划管理",
              name: "/inventoryCheck/checkPlanManagement",
            },
            {
              title: "盘点单管理",
              name: "/inventoryCheck/checkOrderManagement",
            },
            {
              title: "库存订正结果",
              name: "/inventoryCheck/saveInventoryResult",
            },
          ],
        },
        {
          title: "物料中心",
          name: "/suppliesCenter/supplierAdmin",
          iconCls: require("@/assets/svg/wuliaozhonxin.svg"),
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
          iconCls: require("@/assets/svg/wuliugonsi.svg"),
          children: [
            {
              title: "物流公司",
              name: "/phyDisComInfor/phyDisCom",
            },
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
          name: "/customerInformation/delegationInformation",
          iconCls: require("@/assets/svg/kehuxinxi.svg"),
          children: [
            {
              title: "委托公司信息",
              name: "/customerInformation/delegationInformation",
            },
            {
              title: "产品信息",
              name: "/customerInformation/productInformation",
            },
          ],
        },
        {
          title: "设备管理",
          name: "/facilityManagement/PDAmanagement",
          iconCls: require("@/assets/svg/shebeoguanli.svg"),
          children: [
            {
              title: "PDA管理",
              name: "/facilityManagement/PDAmanagement",
            },
            {
              title: "监控设备管理",
              name: "/facilityManagement/monitoringAidsManagement",
            },
            {
              title: "监控数据管理",
              name: "/facilityManagement/monitoringDataManagement",
            },
            {
              title: "拣货车管理",
              name: "/facilityManagement/pickCarManagement",
            },
            {
              title: "货架管理",
              name: "/facilityManagement/shelfManagement",
            },
          ],
        },
        {
          title: "统计",
          name: "/statistics/shipmentStatistics",
          iconCls: require("@/assets/svg/tonjiwenming.svg"),
          children: [
            {
              title: "发货统计",
              name: "/statistics/shipmentStatistics",
            },
            {
              title: "补货统计",
              name: "/statistics/replenishSatistics",
            },
            {
              title: "人工统计",
              name: "/statistics/labourStatistics",
            },
            {
              title: "拣货错误统计",
              name: "/statistics/pickErrorStatistics",
            },
            {
              title: "快递揽货量统计",
              name: "/statistics/expressPickStatistics",
            },
            {
              title: "物流费用明细",
              name: "/statistics/logisticsFreesDetail",
            },
            {
              title: "物流费用统计",
              name: "/statistics/logisticsFreesStatistics",
            },
          ],
        },
        {
          title: "站内消息",
          name: "/inStationNews/newIndex",
          iconCls: require("@/assets/svg/stationToast.svg"),
          children: [
            {
              title: "站内消息",
              name: "/inStationNews/newIndex",
            },
          ],
        },
        {
          title: "系统管理",
          name: "/systemSetting/userSetting",
          iconCls: require("@/assets/svg/systemis.svg"),
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
      navWidth: null,
      innersWidth: null,
      Nums: null,
      steep: null,
      leftMoveClick: null,
      rightMoveClick: null,
      tableIdx: 0,
      isZhanneixiaoxi: false,
    };
  },
  mounted() {
    let self = this;
    window.addEventListener("resize", () => {
      self._getMesAge();
    });
    let data = {
      appNo: "99125FCFA23B4AD09668DC8F1DC53C18",
      type: "4",
      id: "AA4EBC35E2544E7688E2F4230F3F5E30",
    };
    jurisdicRequest(data).then((ok) => {});
    this._getMesAge();
  },
  created() {
    let mianbaoxieArr, isZhanneixiaoxi;
    mianbaoxieArr = sessionStorage.getItem("mianbaoxieArr")
      ? JSON.parse(sessionStorage.getItem("mianbaoxieArr"))
      : [];
    isZhanneixiaoxi = sessionStorage.getItem("isZhanneixiaoxi")
      ? JSON.parse(sessionStorage.getItem("isZhanneixiaoxi"))
      : false;
    this.dropdownArr.unshift(this.dataArr[0]);
    this.mianbaoxieArr = mianbaoxieArr;
    this.isZhanneixiaoxi = isZhanneixiaoxi;
    this.getStorage();
    this.addHenxianTables();
  },
  watch: {
    // activeName: function (n) {
    //   this.activeName = "" + parseInt(n);
    // },
    $route: function (n) {
      if (this.dropdownArr.length) {
        for (var i = 0; i < this.dropdownArr.length; i++) {
          if (this.dropdownArr[i].name.indexOf(n.path) >= 0) {
            this.activeTabsName = i + "";
            this.mianbaoxieArr = [];
            this.mianbaoxieArr.push(this.dropdownArr[+this.activeTabsName]);
            if (this.dropdownArr[+this.activeTabsName].children[0]) {
              this.mianbaoxieArr.push(
                this.dropdownArr[+this.activeTabsName].children[0]
              );
            } else {
              this.mianbaoxieArr.push(this.dropdownArr[+this.activeTabsName]);
            }
            this.setStorage();
            break;
          }
        }
      }
    },
  },
  computed: {
    _getNavDataArr() {
      let activeMes = document.querySelectorAll(
          "#headerMain .el-nav .el-tabs__item"
        ),
        resultrArr = [],
        sultNums;
      activeMes = Array.from(activeMes);
      activeMes.forEach((item) => {
        resultrArr.push(item.getBoundingClientRect().width);
      });
      sultNums = Math.ceil(activeMes.length / this.Nums);
      let idx = 0;

      for (let i = 0; i < sultNums; i++) {
        let datames = [];
      }

      return resultrArr;
    },
  },
  methods: {
    goToIndex() {
      this.$router.push("/index/indexFormJH");
    },
    _getMesAge() {
      this.$nextTick(() => {
        let TabNavs = document.querySelector(".el-tabs__nav-scroll"); //子层
        this.navWidth = TabNavs.offsetWidth;
        let inners = document.querySelector(".el-tabs__nav-wrap.is-top"); //父层
        this.innersWidth = inners.offsetWidth;
        this.Nums = Math.ceil(this.navWidth / this.innersWidth); //(倍数)
      });
    },
    leftMove() {
      this.leftMoveClick = true;
      this.rightMoveClick = false;
      let oDiv = document.querySelector(".el-tabs__nav-scroll");
      oDiv.style.transition = "0.5s";
      oDiv.style.left = `${this._returnLeft()}px`;
    },
    _returnLeft: function () {
      let steep;
      let ispandaun =
        Math.abs(this.navWidth - this.innersWidth) > this.innersWidth;
      let ress = this.navWidth - this.innersWidth * (a - 1);
      if (this.Nums <= 2) {
        steep = 0;
      } else {
        if (a == 0) return
        a--;
        if (ispandaun && !a) {
          steep = 0;
        } else if (ispandaun && a) {
          steep = this.innersWidth * a;
        }
      }
      return -steep;
    },
    rightMove() {
      this.leftMoveClick = false;
      this.rightMoveClick = true;
      let oDiv = document.querySelector(".el-tabs__nav-scroll");
      oDiv.style.left = `${this._rightMoveSteep()}px`;
      oDiv.style.transition = "0.5s";
    },
    _rightMoveSteep: function () {
      let steep;
      let ispandaun =
        Math.abs(this.navWidth - this.innersWidth) > this.innersWidth;
      if (this.Nums <= 2) {
        steep = this.navWidth - this.innersWidth;
      } else {
        if (a == this.Nums - 1) return;
        a++;
        let ress = this.navWidth - this.innersWidth * (a - 1);
        if (ispandaun && a == this.Nums) {
          steep = this.navWidth - this.innersWidth;
        } else if (ispandaun && a == this.Nums - 1) {
          steep = ress;
        } else {
          steep = this.innersWidth * a;
        }
      }
      return -steep;
    },
    //点击选中
    handleTabsEdit() {
      this.addHenxianTables();
      let router =
        this.dropdownArr[+this.activeTabsName].children.length != 0
          ? this.dropdownArr[+this.activeTabsName].children[0].name
          : this.dropdownArr[+this.activeTabsName].name;
      if (!router) {
        this.$messageSelf.message({
          message: "该模块在开发中请耐心等候稍后",
        });
      }
      this.$router.push(router);
      let dataArrJson =
        this.dropdownArr[+this.activeTabsName].children.length != 0
          ? this.dropdownArr[+this.activeTabsName].children[0]
          : this.dropdownArr[+this.activeTabsName];
      this.mianbaoxieArr = [];
      let mianbaoxieArrJson = this.dropdownArr[+this.activeTabsName];
      if (
        !this.Heavy({
          list: this.mianbaoxieArr,
          data: mianbaoxieArrJson,
        })
      ) {
      }
      this.mianbaoxieArr.splice(1, 1, dataArrJson);
      this._isZhanNewStation(this.dropdownArr[+this.activeTabsName]);
      this.setStorage();
    },
    _isZhanNewStation(data) {
      let typesStr = _typesStr(data);
      if (typesStr == "Object") {
        if (data.name.includes("/newIndex")) {
          sessionStorage.setItem("isZhanneixiaoxi", true);
          return (this.isZhanneixiaoxi = true);
        } else {
          sessionStorage.setItem("isZhanneixiaoxi", false);
          return (this.isZhanneixiaoxi = false);
        }
      }
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
                : "——";
            }
          });
        });
      }, 700);
    },
    //点击删除
    removeTab(e) {
      let removeSrc = e;
      if (!removeSrc) return;
      this.dropdownArr.splice(removeSrc, 1);
      this.mianbaoxieArr.splice(removeSrc, 1);
      let router =
        this.dropdownArr[this.dropdownArr.length - 1].children.length != 0
          ? this.dropdownArr[this.dropdownArr.length - 1].children[0].name
          : this.dropdownArr[this.dropdownArr.length - 1].name;
      if (this.activeTabsName == e) {
        this.activeTabsName = this.dropdownArr.length
          ? this.dropdownArr.length - 1 + ""
          : "0";
        this.$router.push(router);
      } else {
        if (this.activeTabsName > this.dropdownArr.length - 1) {
          this.activeTabsName = this.dropdownArr.length - 1 + "";
        }
      }
      this.setStorage();
    },
    handleClick() {
      if (this.dataArr[+this.activeName].name == "") {
        return this.$messageSelf.message({
          message: "该模块在开发中，请耐心等候",
          duration: 500,
        });
      }
      let json = this.dataArr[+this.activeName];
      let router = this.dataArr[+this.activeName].name;
      this.$router.push(router);
      //跳转路由
      if (
        !this.Heavy({
          list: this.dropdownArr,
          data: json,
        })
      ) {
        this.dropdownArr.push(this.dataArr[+this.activeName]);
        this.activeTabsName = this.dropdownArr.length - 1 + "";
      } else {
        if (this.dropdownArr.length) {
          for (var i = 0; i < this.dropdownArr.length; i++) {
            if (
              this.dropdownArr[i].name == this.dataArr[+this.activeName].name
            ) {
              this.activeTabsName = i + "";
              break;
            }
          }
        }
      }
      if (
        !this.Heavy({
          list: this.mianbaoxieArr,
          data: json,
        })
      ) {
        this.mianbaoxieArr.push(this.dropdownArr[+this.activeTabsName]);
        this.mianbaoxieArr.splice(
          this.dropdownArr[+this.activeTabsName].children[0]
        );
      }
      this.oldName = +this.activeName;
      this.handleTabsEdit();
      this.setStorage();
    },
    clickEventGoRouter(e) {
      let dataArrJson = this.dropdownArr[+this.activeTabsName].children[e];
      let mianbaoxieArrJson = this.dropdownArr[+this.activeTabsName];
      if (
        !this.Heavy({
          list: this.mianbaoxieArr,
          data: mianbaoxieArrJson,
        })
      ) {
        this.mianbaoxieArr.unshift(mianbaoxieArrJson);
      }
      this.mianbaoxieArr.splice(1, 1, dataArrJson);
      let router = this.dropdownArr[+this.activeTabsName].children[e].name;
      this.$router.push(router);
      this.setStorage();
    },
    // 本地存储
    setStorage: function () {
      sessionStorage.setItem("activeName", this.activeName);
      sessionStorage.setItem("activeTabsName", this.activeTabsName);
      this.dropdownArr.length
        ? sessionStorage.setItem(
            "dropdownArr",
            JSON.stringify(this.dropdownArr)
          )
        : "";
      this.mianbaoxieArr.length
        ? sessionStorage.setItem(
            "mianbaoxieArr",
            JSON.stringify(this.mianbaoxieArr)
          )
        : "";
    },
    // 获取本地缓存
    getStorage: function () {
      if (sessionStorage.getItem("activeName"))
        this.activeName = sessionStorage.getItem("activeName");
      if (sessionStorage.getItem("activeTabsName"))
        this.activeTabsName = sessionStorage.getItem("activeTabsName");
      if (sessionStorage.getItem("dropdownArr"))
        this.dropdownArr = JSON.parse(sessionStorage.getItem("dropdownArr"));
      if (sessionStorage.getItem("mianbaoxieArr"))
        this.mianbaoxieArr = JSON.parse(
          sessionStorage.getItem("mianbaoxieArr")
        );
    },
    // 数组json去重
    Heavy: function (data) {
      var list = data.list;
      var index = null;
      for (var i = 0; i < list.length; i++) {
        if (list[i]) {
          if (list[i].name == data.data.name) {
            return true;
          } else {
            index = i;
          }
        } else {
          return false;
        }
      }
      if (index == list.length - 1) {
        return false;
      }
    },
  },
};
</script>
<style lang='scss'>
.xitonwenzi {
  color: #fff;
  font-size: 18px;
  line-height: 90px;
  user-select: none;
}

.popper__arrow {
  left: 50% !important;
  transform: translate(-50%);
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

.dianjiqiehuan .el-tabs {
  position: relative;
  left: 10px;
  z-index: 10;
}

.dianjiqiehuan .el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 1px solid #ced4de;
  border-right: none;
}

.dianjiqiehuan .el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
  border-right: 1px solid #ced4de;
}

#clickBox .el-tabs__header .el-tabs__item.is-active {
  background: #eef1f8;
  border-bottom: #000;
  color: #599af4;
}

.mianbaoxie {
  padding: 15px 10px;
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
  color: #599af4 !important;
  border-bottom-color: #eef1f8 !important;
}

.el-breadcrumb__item {
  display: flex;
}

.el-breadcrumb .el-breadcrumb__item:first-child {
  border-bottom: none;
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

.el-tabs--card > .el-tabs__header {
  border: none;
}

// .el-tabs__item.is-top.is-closable {
//   // margin-right: 18px;
// }

.el-tabs__item:hover {
  color: #000;
  cursor: pointer;
}
</style>
<style scoped lang="scss">
.imgbox {
  margin-left: 20px;
}

#headerMain {
  background: #eef1f8;
  position: relative;

  .navMain {
    height: 90px;

    .tabContainer {
      display: flex;
      align-items: center;
	  justify-content: space-between;
      height: 90px;
      background: linear-gradient(0deg, #3795eb, #4bade4);
      width: 100%;
      position: fixed;
      z-index: 20;
    }
  }

  .dianjiqiehuan {
    padding: 0 20px;
    background: #eef1f8;
    border-bottom: 1px solid #ced4de;

    .dianjiCenters {
      padding-top: 13px;
    }
  }

  .header-title {
    height: 90px;
  }
}
</style>
<style lang="scss">
.tabContainer .el-dropdown {
  color: white;
}

.el-tabs__nav-next,
.el-tabs__nav-prev {
  line-height: 34px;
}

.dianjiCenters .el-tabs__item {
  line-height: 34px;
  height: 34px;
  color: #333333;
  padding: 0 15px;
}

.tabContainer .el-tabs--bottom .el-tabs__header.is-bottom {
  margin: 0;
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
  background: #68bdff;
  border-radius: 17px;
  font-size: 16px;
}

.el-nav {
  margin-left: 38px;
  margin-right: 10px;
  width: 88%;
  line-height: 90px;
  width: 87%;
  display: inline-block;
}

.el-lr {
  width: 44px;
  font-size: 22px;
  color: #fff;
  display: flex;
  justify-content: space-around;

  div {
    cursor: pointer;
  }
}

.tabContainer .el-tabs__nav-scroll {
  position: absolute;
  display: flex;
  align-items: center;
}

.tabContainer .el-tabs__nav-wrap.is-scrollable {
  padding: 0;
}

.tabContainer .el-tabs__nav-wrap {
  position: relative;
  height: 90px;
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
