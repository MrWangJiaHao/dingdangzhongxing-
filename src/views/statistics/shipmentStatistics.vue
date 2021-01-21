<template>
  <div id="shipmentStatPage">
    <!-- 这是发货统计页面 -->
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
              v-model="channelName"
              placeholder="请选择渠道"
              @change="channelNames"
              clearable
            >
              <el-option
                v-for="item in channelNameData"
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
              v-model="orderSourceName"
              placeholder="请选择订单来源"
              @change="orderSourceNames"
              clearable
            >
              <el-option
                v-for="item in orderSourceNameData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="prodNameBox">
          <div class="el-inputBox-text">产品名称：</div>
          <div class="el-inputBox-checkBox" style="width: 160px">
            <el-input v-model="prodName" placeholder="情书日产品名称"> </el-input>
          </div>
        </div>
        <div class="prodCodeBox">
          <div class="el-inputBox-text">产品编码：</div>
          <div class="el-inputBox-checkBox" style="width: 160px">
            <el-input v-model="prodCode" placeholder="请输入产品编码"> </el-input>
          </div>
        </div>
        <div class="timeChoose el-inputBox">
          <div class="el-inputBox-text">发货时间：</div>
          <div class="timeBox">
            <div style="">
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
          <div class="queryBtn" @click="orderClickQuery">查询</div>
          <div class="clearBtn" @click="orderClearInput">清空</div>
        </div>
    </div>
    <div class="formBox">
      <el-tabs type="card" @tab-click="tabClickFun">
        <el-tab-pane :label="labelTitle">
          <div class="formHeader">
            <div class="icon-title">
              <div class="icon-title-icon">
                <img src="../../assets/img/systemTitlemesa.png" />
              </div>
              <div class="icon-title-title">查询结果</div>
            </div>
            <div class="someBtn">
              <a class="setUser orderEduce" @click="orderEduce" target="_blank"
                >导出</a
              >
            </div>
          </div>
          <div class="formTable">
            <el-table
              :data="OrderStatData"
              border
              style="width: 100%"
              @selection-change="orderHandleSelectionChange"
              :stripe="true"
              tooltip-effect="dark"
            >
              <el-table-column type="selection" width="82" align="center" fixed="left">
              </el-table-column>
              <el-table-column
                label="序号"
                align="center"
                type="index"
                width="71"
              >
              </el-table-column>
              <el-table-column prop="orgName" label="委托公司" align="center">
              </el-table-column>
              <el-table-column prop="orgContact" label="联系人" align="center">
              </el-table-column
              ><el-table-column
                prop="orgContactPhone"
                label="联系电话"
                align="center"
              >
              </el-table-column
              ><el-table-column prop="orgAddr" label="联系地址" align="left" show-overflow-tooltip>
              </el-table-column
              ><el-table-column prop="channelName" label="渠道" align="center">
              </el-table-column
              ><el-table-column
                prop="orderSourceName"
                label="订单来源"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="sendNum" label="订单总量" align="center">
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
        <el-tab-pane :label="labelTitle1">
          <div class="formHeader">
            <div class="icon-title">
              <div class="icon-title-icon">
                <img src="../../assets/img/systemTitlemesa.png" />
              </div>
              <div class="icon-title-title">查询结果</div>
            </div>
            <div class="someBtn">
              <a class="setUser itemEduce" @click="itemEduce" target="_blank"
                >导出</a
              >
            </div>
          </div>
          <div class="formTable">
            <el-table
              :data="itemStatData"
              border
              style="width: 100%"
              @selection-change="itemHandleSelectionChange"
              :stripe="true"
              tooltip-effect="dark"
            >
              <el-table-column type="selection" width="82" align="center" fixed="left">
              </el-table-column>
              <el-table-column
                label="序号"
                align="center"
                type="index"
                width="71"
              >
              </el-table-column>
              <el-table-column prop="orgName" label="委托公司" align="center">
              </el-table-column>
              <el-table-column prop="channelName" label="渠道" align="center">
              </el-table-column>
              <el-table-column
                prop="orderSourceName"
                label="订单来源"
                align="center"
              >
              </el-table-column>

              <el-table-column prop="prodCode" label="产品编码" align="center" width="200">
              </el-table-column>
              <el-table-column
                prop="prodFullName"
                label="产品名称"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="specName" label="产品规格" align="center">
              </el-table-column
              ><el-table-column
                prop="braName"
                label="品牌"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="sendNum"
                label="发货总量"
                align="center"
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
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import dateTime from "../../components/commin/dateTime.vue"; //时间
import { findProdStatistics, findOrderStatistics } from "../../api/api";
import { clearTimeInput } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      activeLabel: false,
      labelTitle: "发货订单统计",
      labelTitle1: "发货单品统计",
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "",
        placeholder: "请选择开始时间",
      },
      pageComponentsData: {
        pageNums: 0,
      },
      pageComponentsData1: {
        pageNums: 0,
      },
      orderExcelUrl:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/sendStatistics/exportOrderStatistics",
      itemExcelUrl:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/sendStatistics/exprotProdStatistics",
      OrderStatData: [],
      itemStatData: [],
      orderHandleArr: [],
      itemHandleArr: [],
      entrustCompanyData: [],
      channelNameData: [],
      orderSourceNameData: [],
      entrustCompany: "",
      channelName: "",
      orderSourceName: "",
      prodName: "",
      prodCode: "",

      orderQuerData: {
        pageNumber: 1,
        pageSize: 10,
        paras: {
          sendEndTime: "",
          sendStartTime: "",
          orderSourceId: "",
          channelId: "",
          orgId: "",
        },
      },
      itemQuerData: {
        pageNumber: 1,
        pageSize: 10,
        paras: {
          sendEndTime: "",
          sendStartTime: "",
          orderSourceId: "",
          channelId: "",
          orgId: "",
          prodName: "",
          prodCode: "",
        },
      },
    };
  },
  mounted() {
    this.orderPageQueryFun();
    this.itemPageQueryFun();
  },
  watch: {},

  methods: {
    orderPageQueryFun() {
      findOrderStatistics(this.orderQuerData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.OrderStatData = [];
          this.OrderStatData = ok.data.result.list;
          this.changeData(ok.data.result);
        }
      });
    },
    itemPageQueryFun() {
      findProdStatistics(this.itemQuerData).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.itemStatData = [];
          this.itemStatData = ok.data.result.list;
          this.changeData1(ok.data.result);
        }
      });
    },
    orderClickQuery() {
      //点击查询
      if (this.activeLabel) {
        //发货单品查询
        // console.log("发货单品查询");
        this.itemQuerData.paras.channelId = this.channelName;
        this.itemQuerData.paras.orgId = this.entrustCompany;
        this.itemQuerData.paras.orderSourceId = this.orderSourceName;
        this.itemQuerData.paras.prodFullName = this.prodName;
        this.itemQuerData.paras.prodCode = this.prodCode;
        this.itemPageQueryFun();
      } else {
        //发货订单查询
        // console.log("发货订单查询");
        this.orderQuerData.paras.channelId = this.channelName;
        this.orderQuerData.paras.orgId = this.entrustCompany;
        this.orderQuerData.paras.orderSourceId = this.orderSourceName;
        this.orderPageQueryFun();
      }
    },
    orderClearInput() {
      //点击清空
      clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      Object.keys(this.orderQuerData.paras).forEach((v) => {
        this.orderQuerData.paras[v] = "";
      });
      Object.keys(this.itemQuerData.paras).forEach((v) => {
        this.itemQuerData.paras[v] = "";
      });
      this.itemPageQueryFun();
      this.orderPageQueryFun();
    },
    orderEduce() {
      //发货订单导出
      document
        .querySelector(".orderEduce")
        .setAttribute("href", this.orderExcelUrl);
    },
    itemEduce() {
      //发货单品导出
      document
        .querySelector(".itemEduce")
        .setAttribute("href", this.itemExcelUrl);
    },
    tabClickFun(val) {
      // console.log(val);
      if (val.label === this.labelTitle1) {
        document.querySelector(".prodNameBox").style.display = "flex";
        document.querySelector(".prodCodeBox").style.display = "flex";
        // document.querySelector(".headerHtml").style.height = "100px";
        this.activeLabel = true;
      } else {
        document.querySelector(".prodNameBox").style.display = "none";
        document.querySelector(".prodCodeBox").style.display = "none";
        // document.querySelector(".headerHtml").style.height = "50px";
        this.activeLabel = false;
      }
    },
    orderHandleSelectionChange(val) {
      this.orderHandleArr = val;
    },
    itemHandleSelectionChange(val) {
      this.itemHandleArr = val;
    },
    entrustCompanys(val) {
      this.entrustCompany = val;
    },
    channelNames(val) {
      this.channelName = val;
    },
    orderSourceNames(val) {
      this.orderSourceName = val;
    },
    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryData.pageNumber = e;
      this.orderPageQueryFun();
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getPageNum1(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn1(e) {
      this.queryData.pageNumber = e;
      this.itemPageQueryFun();
    },
    changeData1(data) {
      this.changePageData1(data);
    },
    changePageData1(data) {
      let { totalRow } = data;
      this.pageComponentsData1.pageNums = totalRow;
    },
    getStartTime(e) {
      if (this.activeLabel) {
        this.orderQuerData.paras.sendStartTime = e;
      } else {
        this.itemQuerData.paras.sendStartTime = e;
      }
    },
    getEndTime(e) {
      if (this.activeLabel) {
        this.orderQuerData.paras.sendEndTime = e;
      } else {
        this.itemQuerData.paras.sendEndTime = e;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

#shipmentStatPage {
  padding: 20px 10px;
}
.headerHtml {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  transition: 0.3s;
  position: relative;
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
  .prodNameBox {
    display: none;
    align-items: center;
    margin: 0 20px 16px 0;
    .el-inputBox-text {
      white-space: nowrap;
    }
  }
  .prodCodeBox {
    @extend .prodNameBox;
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
    justify-content: space-between;
    margin-right: 20px;
    .titleBox {
      font-size: 16px;
    }
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
        margin: -1px 0 0 8px;
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
</style>
<style lang="scss">
@import "../../assets/scss/btn.scss";

.entrustCompany {
  .el-select {
    width: 100%;
  }
}
#shipmentStatPage {
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
    left: 118px;
    top: 16px;
  }
}
</style>
