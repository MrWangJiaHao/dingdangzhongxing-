<template>
  <div id="stockoutMianPage">
    <!-- 这是缺货订单管理页面 -->
    <div class="roleName">
      <div class="headerHtml">
        <div class="headerInput">
          <div class="el-inputBox entrustCompany">
            <div class="el-inputBox-text">委托公司：</div>
            <div class="el-inputBox-checkBox" style="width: 320px">
              <el-select
                v-model="entrustCompany"
                placeholder="请选择委托公司"
                @change="entrustCompanys"
                clearable
              >
                <el-option
                  v-for="item in entrustCompanyData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">渠道：</div>
            <div class="el-inputBox-checkBox" style="width: 120px">
              <el-select
                v-model="channelValue"
                placeholder="请选择渠道"
                @change="channelValues"
                clearable
              >
                <el-option
                  v-for="item in channelValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">订单来源：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-select
                v-model="indentSourceValue"
                placeholder="请选择订单来源"
                @change="indentSourceValues"
                clearable
              >
                <el-option
                  v-for="item in indentSourceValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">订单号：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="orderNumberValue" placeholder="模糊检索">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox setMargin">
            <div class="el-inputBox-text">子单号：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="ChildOrderNumberValue" placeholder="模糊检索">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox childrenIndent">
            <div class="el-inputBox-text">产品名称：</div>
            <div class="el-inputBox-checkBox" style="width: 400px">
              <el-input v-model="prodNameValue" placeholder="模糊检索">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox childrenIndent">
            <div class="el-inputBox-text">产品编码：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="prodCodeValue" placeholder="模糊检索">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox childrenIndent">
            <div class="el-inputBox-text">产品规格：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-select
                v-model="prodSpecValue"
                placeholder="请选择产品规格"
                @change="prodSpecValues"
                clearable
              >
                <el-option
                  v-for="item in prodSpecValueData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="timeChoose el-inputBox">
            <div class="el-inputBox-text titleBox">下发时间：</div>
            <div class="timeBox zujianBox">
              <div>
                <dateTime
                  :dateTimeData="datetimeDates"
                  @getDateTime="getStartTime"
                  ref="startTime"
                />
              </div>
              <!-- 开始时间 -->
              <div class="line"></div>
              <div>
                <dateTime
                  :dateTimeData="datetimeDate"
                  @getDateTime="getEndTime"
                  ref="endTime"
                />
              </div>
              <!-- 结束时间 -->
            </div>
          </div>
        </div>
        <div class="header-botton">
          <div class="queryBtn" @click="clickQuery">查询</div>
          <div class="clearBtn" @click="clearInput">清空</div>
        </div>
      </div>
      <div class="formBox">
        <div class="formTabs">
          <el-tabs type="card">
            <el-tab-pane label="缺货产品">
              <div class="formHeader">
                <div class="icon-title">
                  <div class="icon-title-icon">
                    <img src="../../assets/img/systemTitlemesa.png" />
                  </div>
                  <div class="icon-title-title">{{ title }}</div>
                </div>
                <div class="someBtn">
                  <div class="takeOrdersDiv" @click="prodGoPurchase">
                    转采购
                  </div>
                  <a
                    class="setUser prodEduce"
                    @click="prodEduce"
                    target="_blank"
                    >导出</a
                  >
                </div>
              </div>
              <div class="formTable">
                <el-table
                  :data="productData"
                  border
                  style="width: 100%"
                  @selection-change="prodHandleSelectionChange"
                  :stripe="true"
                  tooltip-effect="dark"
                >
                  <el-table-column type="selection" width="55" align="center">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="60"
                  >
                  </el-table-column>
                  <el-table-column prop="orgName" label="委托公司" align="left">
                  </el-table-column>
                  <el-table-column
                    prop="prodCode"
                    label="产品编码"
                    align="left"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="prodName"
                    label="产品名称"
                    align="left"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="specName"
                    label="产品规格"
                    align="left"
                  >
                  </el-table-column
                  ><el-table-column prop="braName" label="品牌" align="left">
                  </el-table-column
                  ><el-table-column
                    prop="inventoryUpper"
                    label="高库存预警值"
                    align="center"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="inventoryFloor"
                    label="低库存预警值"
                    align="center"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="prodNum"
                    label="销售仓可用库存数量"
                    align="center"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="orderProdNum"
                    label="缺货数量"
                    align="center"
                  >
                  </el-table-column
                  ><el-table-column
                    prop="orderNum"
                    label="缺货订单数"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div
                        class="lookDeatil"
                        @click="lookDeatilOrderNum(scope.row)"
                      >
                        {{ scope.row.orderNum }}
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pageComponent">
                  <pagecomponent
                    :pageComponentsData="pageComponentsData"
                    @getPageNum="getPageNum"
                    @sureSuccssBtn="sureSuccssBtn"
                  ></pagecomponent>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="缺货订单">
              <div class="formHeader">
                <div class="icon-title">
                  <div class="icon-title-icon">
                    <img src="../../assets/img/systemTitlemesa.png" />
                  </div>
                  <div class="icon-title-title">{{ title }}</div>
                </div>
                <div class="someBtn">
                  <!-- <div class="takeOrdersDiv" @click="orderGoPurchase">
                    转采购
                  </div> -->
                  <a
                    class="setUser orderEduce"
                    @click="orderEduce"
                    target="_blank"
                    >导出</a
                  >
                </div>
              </div>
              <div class="formTable">
                <el-table
                  :data="orderData"
                  border
                  style="width: 100%"
                  @selection-change="orderHandleSelectionChange"
                  :stripe="true"
                  tooltip-effect="dark"
                >
                  <el-table-column type="selection" width="55" align="center">
                  </el-table-column>
                  <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="60"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orgName"
                    label="委托公司"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="channelName"
                    label="渠道"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orderSourceName"
                    label="订单来源"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="orderNo" label="订单号" align="center">
                    <template slot-scope="scope">
                      <div
                        class="lookDeatil"
                        @click="lookDeatilOrderNo(scope.row)"
                      >
                        {{ scope.row.orderNo }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="subOrderNo"
                    label="子订单号"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div
                        class="lookDeatil"
                        @click="lookDeatilSubOrderNo(scope.row)"
                      >
                        {{ scope.row.subOrderNo }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="exprName"
                    label="物流公司"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="exprNo"
                    label="物流单号"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="reason"
                    label="失败原因"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <div class="failCause">
                        {{ scope.row.reason }}
                      </div>
                    </template> </el-table-column
                  ><el-table-column
                    prop="pullTime"
                    label="下发时间"
                    align="center"
                    width="180"
                    min-width="180"
                  ></el-table-column>
                </el-table>
                <div class="pageComponent">
                  <pagecomponent
                    :pageComponentsData="pageComponentsData1"
                    @getPageNum="getPageNum1"
                    @sureSuccssBtn="sureSuccssBtn1"
                  ></pagecomponent>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import dateTime from "../../components/commin/dateTime.vue"; //时间
import { findFailProdData, findFailOrderData } from "../../api/api";
import { getCookie } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      index: 0,
      title: "查询结果",
      getProdExcelUrl: {
        url:
          "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pOrgSubOrder/getProdExcel",
        wareId: getCookie("X-Auth-wareId"),
        orderNo: "",
        subOrderNo: "",
        channelId: "",
        orderSourceId: "",
      },
      getOrderExcelUrl: {
        url:
          "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pOrgSubOrder/getOrderExcel",
        wareId: getCookie("X-Auth-wareId"),
        orderNo: "",
        subOrderNo: "",
        orgId: "",
        channelId: "",
        orderSourceId: "",
      },
      productData: [],
      orderData: [],
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "",
        placeholder: "请选择开始时间",
      },
      ChildOrderNumberValue: "",
      channelValue: "",
      mateNumValue: "",
      entrustCompany: "",
      indentSourceValue: "",
      orderNumberValue: "",
      ChildOrderState: "",
      prodNameValue: "",
      prodCodeValue: "",
      prodSpecValue: "",
      channelValueData: [],
      mateNumValueData: [],
      entrustCompanyData: [],
      indentSourceValueData: [],
      ChildOrderNumberData: [],
      prodSpecValueData: [],
      consigneeValue: "",
      telPhoneValue: "",
      addressValue: "",
      prodMultipleSelection: [],
      orderMultipleSelection: [],
      ProdQueryData: {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          wareId: getCookie("X-Auth-wareId"),
          prodName: "",
          orgId: "",
          channelId: "",
          orderSourceId: "", //订单来源id
          orderNo: "", //订单号
          subOrderNo: "",
          pushStartTime: "",
          pushEndTime: "",
          prodCode: "",
          specName: "",
        },
      },
      orderQueryData: {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {
          wareId: getCookie("X-Auth-wareId"),
          prodName: "",
          orgId: "",
          channelId: "",
          orderSourceId: "", //订单来源id
          orderNo: "", //订单号
          subOrderNo: "",
          pushTime: "",
          prodCode: "",
          specName: "",
        },
      },

      pageComponentsData: {
        pageNums: 0, //一共多少条 //默认一页10条
      },
      pageComponentsData1: {
        pageNums: 0, //一共多少条 //默认一页10条
      },
    };
  },
  mounted() {
    this.pageQueryProdFun();
    this.pageQueryOrderFun();
  },
  watch: {},
  beforeRouteEnter(to, from, next) {
    if (from.name === "/purchasingManagement/purchasingIndex") {
      next((vm) => {
        if (vm.$route.query.cancel === "cancel") {
          this.$messageSelf.message("已取消");
        }
      });
    } else {
      next();
    }
  },
  methods: {
    pageQueryProdFun() {
      //缺货产品查询
      let ProdQueryData = this.ProdQueryData;
      findFailProdData(ProdQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.productData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.productData.forEach((v) => {
            v.specName = v.specName + "ml";
            this.prodSpecValueData.push({
              value: v.specName,
              label: v.specName,
            });
            this.prodSpecValueData = this.reduceFun(this.prodSpecValueData);
          });
        } else {
          this.$messageSelf.message({
            message: "未知错误",
            type: "error",
          });
        }
      });
    },
    pageQueryOrderFun() {
      //缺货订单查询
      let orderQueryData = this.orderQueryData;
      findFailOrderData(orderQueryData).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.orderData = ok.data.result.list;
          this.changeData1(ok.data.result);
          this.orderData.forEach((v) => {
            this.entrustCompanyData.push({
              value: v.orgId,
              label: v.orgName,
            });
            this.entrustCompanyData = this.reduceFun(this.entrustCompanyData);
            this.channelValueData.push({
              value: v.channelId,
              label: v.channelName,
            });
            this.channelValueData = this.reduceFun(this.channelValueData);
            this.indentSourceValueData.push({
              value: v.orderSourceName,
              label: v.orderSourceName,
            });
            this.indentSourceValueData = this.reduceFun(
              this.indentSourceValueData
            );
          });
        } else {
          this.$messageSelf.message({
            message: "未知错误",
            type: "error",
          });
        }
      });
    },
    reduceFun(arr) {
      let testObj = {};
      let res = arr.reduce((item, next) => {
        testObj[next.value]
          ? ""
          : (testObj[next.value] = true && item.push(next));
        return item;
      }, []);
      return res;
    },
    channelValues(val) {
      this.channelValue = val;
      this.ProdQueryData.paras.channelId = val;
      this.orderQueryData.paras.channelId = val;
    },
    entrustCompanys(val) {
      this.entrustCompany = val;
      this.ProdQueryData.paras.orgId = val;
      this.orderQueryData.paras.orgId = val;
    },
    indentSourceValues(val) {
      this.indentSourceValue = val;
      this.ProdQueryData.paras.orderSourceId = val;
      this.orderQueryData.paras.orderSourceId = val;
    },
    prodSpecValues(val) {
      this.prodSpecValue = val;
      this.ProdQueryData.paras.specName = val.slice(0, val.length - 2);
      this.orderQueryData.paras.specName = val.slice(0, val.length - 2);
    },
    clickQuery() {
      //点击查询
      this.ProdQueryData.paras.orderNo = this.orderNumberValue;
      this.ProdQueryData.paras.subOrderNo = this.ChildOrderNumberValue;
      this.ProdQueryData.paras.prodName = this.prodNameValue;
      this.ProdQueryData.paras.prodCode = this.prodCodeValue;

      this.orderQueryData.paras.orderNo = this.orderNumberValue;
      this.orderQueryData.paras.subOrderNo = this.ChildOrderNumberValue;
      this.orderQueryData.paras.prodName = this.prodNameValue;
      this.orderQueryData.paras.prodCode = this.prodCodeValue;

      this.productData = [];
      this.orderData = [];
      this.pageQueryProdFun();
      this.pageQueryOrderFun();
    },
    clearInput() {
      //点击清空输入框
      this.clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      this.productData = [];
      this.orderData = [];
      let ProdQueryData = this.ProdQueryData.paras;
      Object.keys(ProdQueryData).forEach((v) => {
        ProdQueryData[v] = "";
      });
      ProdQueryData.wareId = getCookie("X-Auth-wareId");
      let orderQueryData = this.orderQueryData.paras;
      Object.keys(orderQueryData).forEach((v) => {
        orderQueryData[v] = "";
      });
      orderQueryData.wareId = getCookie("X-Auth-wareId");
      this.pageQueryProdFun();
      this.pageQueryOrderFun();
    },
    prodHandleSelectionChange(value) {
      this.prodMultipleSelection = value;
      this.getProdExcelUrl.orderNo = value[0].orderNo;
      this.getProdExcelUrl.subOrderNo = value[0].subOrderNo;
      this.getProdExcelUrl.channelId = value[0].channelId;
      this.getProdExcelUrl.orderSourceId = value[0].orderSourceId;
    },
    orderHandleSelectionChange(value) {
      this.orderMultipleSelection = value;
      // this.getOrderExcelUrl.orderNo = value[0].orderNo;
      // this.getOrderExcelUrl.subOrderNo = value[0].subOrderNo;
      // this.getOrderExcelUrl.orgId = value[0].orgId;
      // this.getOrderExcelUrl.channelId = value[0].channelId;
      // this.getOrderExcelUrl.orderSourceId = value[0].orderSourceId;
    },
    prodEduce() {
      //缺货产品导出表格
      // if (!this.prodMultipleSelection.length)
      //   return this.$messageSelf.message("请选择要导出的订单");
      // if (this.prodMultipleSelection.length != 1)
      //   return this.$messageSelf.message("一次只能选择一个订单");
      let oA = document.querySelector(".prodEduce");
      oA.setAttribute(
        "href",
        `${this.getProdExcelUrl.url}?wareId=${this.getProdExcelUrl.wareId}&orderNo=${this.getProdExcelUrl.orderNo}&subOrderNo=${this.getProdExcelUrl.subOrderNo}&channelId=${this.getProdExcelUrl.channelId}&orderSourceId=${this.getProdExcelUrl.channelId}`
      );
    },
    orderEduce() {
      //缺货订单导出表格
      // if (!this.orderMultipleSelection.length)
      //   return this.$messageSelf.message("请选择要导出的订单");
      // if (this.orderMultipleSelection.length != 1)
      //   return this.$messageSelf.message("一次只能选择一个订单");
      let oA = document.querySelector(".orderEduce");
      oA.setAttribute(
        "href",
        `${this.getOrderExcelUrl.url}?wareId=${this.getOrderExcelUrl.wareId}&orderNo=${this.getOrderExcelUrl.orderNo}&subOrderNo=${this.getOrderExcelUrl.subOrderNo}&channelId=${this.getOrderExcelUrl.channelId}&orderSourceId=${this.getOrderExcelUrl.channelId}&orgId=${this.getOrderExcelUrl.orgId}`
      );
    },
    prodGoPurchase() {
      //缺货产品转采购
      if (!this.prodMultipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择需采购的产品",
          type: "warning",
        });
      this.$router.push({
        path: "/purchasingManagement/purchasingIndex",
        query: {
          product: this.prodMultipleSelection,
          fromPage: "stockoutIndentManage",
        },
      });
    },
    orderGoPurchase() {
      //缺货订单转采购
    },
    lookDeatilOrderNum(data) {
      this.$router.push({
        path: "/indentManagement/stockoutOrderInfor",
        query: {
          orderNum: data,
          type: "orderNum",
        },
      });
    },
    lookDeatilOrderNo(data) {
      this.$router.push({
        path: "/indentManagement/orderDetail",
        query: {
          orderNo: data,
          type: "orderNo",
        },
      });
    },
    lookDeatilSubOrderNo(data) {
      this.$router.push({
        path: "/indentManagement/childOrderDetail",
        query: {
          subOrderNos: data,
          type: "subOrderNos",
        },
      });
    },
    getPageNum(e) {
      this.ProdQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.productData = [];
      this.pageQueryProdFun();
      this.ProdQueryData.pageNumber = e;
    },
    getPageNum1(e) {
      this.orderQueryData.pageNumber = e;
    },
    sureSuccssBtn1(e) {
      this.orderData = [];
      this.pageQueryOrderFun();
      this.orderQueryData.pageNumber = e;
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    changeData1(data) {
      this.changePageData1(data);
    },
    changePageData1(data) {
      let { totalRow } = data;
      this.pageComponentsData1.pageNums = totalRow;
    },
    getStartTime(e) {
      this.ProdQueryData.paras.pushStartTime = e;
    },
    getEndTime(e) {
      this.ProdQueryData.paras.pushEndTime = e;
    },
    clearTimeInput() {
      let input = document.getElementsByClassName("ivu-input");
      for (let i = 0; i < input.length; i++) {
        input[i].value = "";
      }
      let elInput = document.querySelectorAll(
        ".el-input--suffix .el-input__inner"
      );
      for (let i = 0; i < elInput.length; i++) {
        elInput[i].value = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

#stockoutMianPage {
  background: #eef1f8;
  padding: 20px 10px;
}
.headerHtml {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 20px;
  .headerInput {
    display: flex;
    flex-wrap: wrap;
    .el-inputBox {
      display: flex;
      align-items: center;
      margin: 0 20px 16px 0;
      .el-inputBox-text {
        white-space: nowrap;
      }
    }
  }
  .header-botton {
    margin-bottom: 16px;
    display: flex;
    align-items: flex-end;
    .queryBtn {
      @include BtnFunction("success");
    }
    .clearBtn {
      @include BtnFunction();
      background: #fff;
      margin: 0 0 0 10px;
    }
  }
  .timeChoose {
    display: flex;
    height: 34px;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
    .timeBox {
      height: 34px;
      display: flex;
      align-items: center;
      .line {
        width: 10px;
        height: 2px;
        background: #d1d6e2;
        margin: 0 10px;
      }
    }
  }
}
.formBox {
  position: relative;
  margin: 4px 0;
  .formHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d2d6e2;
    background: white;
    .icon-title {
      display: flex;
      .icon-title-icon {
        width: 14px;
        height: 14px;
        margin: 0 0 0 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .icon-title-title {
        margin: 0 0 0 8px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 20px 16px 0;
      .setUser {
        @include BtnFunction("success");
      }
      .takeOrdersDiv {
        margin-right: 10px;
        @include BtnFunction("success");
      }
    }
  }
  .formTable {
    background: white;
    padding: 16px 20px;
  }
}
.pageComponent {
  text-align: right;
  height: 36px;
  background: #ffffff;
}
</style>
<style lang="scss">
@import "../../assets/scss/btn.scss";

.entrustCompany {
  .el-select {
    width: 100%;
  }
}
#stockoutMianPage {
  .el-tabs__item.is-active {
    @include BtnFunction("success");
    border: 1px solid transparent;
  }
  .el-tabs__item {
    @include BtnFunction("");
    background: white;
    margin-right: 10px;
    border: 1px solid #d1d6e2;
  }
  .el-tabs--card > .el-tabs__header {
    border: none;
    position: absolute;
    left: 116px;
    top: 16px;
  }
}
</style>
