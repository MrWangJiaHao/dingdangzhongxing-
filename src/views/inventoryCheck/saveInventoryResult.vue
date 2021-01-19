<template>
  <div id="saveInventoryResult">
    <!-- 这是库存订正结果页面 -->
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
            <div class="el-inputBox-text">盘点单号：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="stockNo" placeholder="请输入盘点单号">
              </el-input>
            </div>
          </div>

          <div class="el-inputBox">
            <div class="el-inputBox-text">盘点结果：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-select
                v-model="checkResult"
                placeholder="请选择盘点结果"
                @change="checkResults"
                clearable
              >
                <el-option
                  v-for="item in checkResultData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">创建类型：</div>
            <div class="el-inputBox-checkBox" style="width: 120px">
              <el-select
                v-model="createType"
                placeholder="请选择创建类型"
                @change="createTypes"
                clearable
              >
                <el-option
                  v-for="item in createTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="timeChoose el-inputBox">
            <div class="el-inputBox-text titleBox">订正时间：</div>
            <div class="timeBox zujianBox">
              <div>
                <dateTime
                  :dateTimeData="datetimeDates"
                  @getDateTime="getStartTime"
                  ref="startTime"
                />
              </div>
              <div class="line"></div>
              <div>
                <dateTime
                  :dateTimeData="datetimeDate"
                  @getDateTime="getEndTime"
                  ref="endTime"
                />
              </div>
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
            <el-tab-pane label="按产品">
              <div class="formHeader">
                <div class="icon-title">
                  <div class="icon-title-icon">
                    <img src="../../assets/img/systemTitlemesa.png" />
                  </div>
                  <div class="icon-title-title">{{ title }}</div>
                </div>
                <div class="someBtn"></div>
              </div>
              <div class="formTable">
                <el-table
                  :data="productData"
                  border
                  style="width: 100%"
                  :stripe="true"
                  tooltip-effect="dark"
                >
                  <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="71"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orgName"
                    label="委托公司"
                    width="200"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orderSource"
                    label="创建类型"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="stockNo"
                    label="盘点单"
                    align="center"
                    width="200"
                  >
                    <template slot-scope="scope">
                      <div class="lookDeatil" @click="lookDeatil(scope.row)">
                        {{ scope.row.stockNo }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="prodCode" label="产品编码" width="150">
                  </el-table-column>
                  <el-table-column prop="braName" label="产品名称" align="left">
                  </el-table-column>
                  <el-table-column
                    prop="specName"
                    label="产品规格"
                    min-width="120"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="prodNum"
                    label="系统库存"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="prodNum"
                    label="销售仓可用库存数量"
                    align="center"
                    min-width="160"
                  >
                  </el-table-column>
                  <el-table-column prop="" label="缺货数量" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="realInventory"
                    label="实盘库存"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="diff" label="差异值" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="inventoryStatus"
                    label="盘点结果"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="reason"
                    label="原因"
                    align="center"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="createUser"
                    label="创建人"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="reviseUser"
                    label="订正人"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="reviseTime"
                    label="订正时间"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="reviseResult"
                    label="订正结果"
                    align="center"
                  >
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
            <el-tab-pane label="按库位" width="200">
              <div class="formHeader">
                <div class="icon-title">
                  <div class="icon-title-icon">
                    <img src="../../assets/img/systemTitlemesa.png" />
                  </div>
                  <div class="icon-title-title">{{ title }}</div>
                </div>
                <div class="someBtn"></div>
              </div>
              <div class="formTable">
                <el-table
                  :data="storeLocalData"
                  border
                  style="width: 100%"
                  :stripe="true"
                  tooltip-effect="dark"
                >
                  <el-table-column
                    label="序号"
                    align="center"
                    type="index"
                    width="71"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orgName"
                    label="委托公司"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="orderSource"
                    label="创建类型"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="stockNo"
                    label="盘点单"
                    align="center"
                    width="180"
                  >
                    <template slot-scope="scope">
                      <div class="lookDeatil" @click="lookDeatil(scope.row)">
                        {{ scope.row.stockNo }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="childWareName"
                    label="子仓名称"
                    align="left"
                    width="180"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="wareAreaName"
                    label="区域名称"
                    align="left"
                    width="180"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="wareShelfName"
                    label="货架名称"
                    align="center"
                    width="100"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="wareSeatCode"
                    label="库位"
                    align="center"
                    width="140"
                  >
                  </el-table-column>
                  <el-table-column prop="prodCode" label="产品编码" width="140">
                  </el-table-column>
                  <el-table-column
                    prop="prodName"
                    label="产品名称"
                    width="200"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column prop="specName" label="产品规格" width="140">
                  </el-table-column>
                  <el-table-column prop="num" label="系统库存" align="center">
                  </el-table-column>
                  <el-table-column
                    prop="realInventory"
                    label="实盘库存"
                    align="center"
                  >
                  </el-table-column>
                  <el-table-column prop="diff" label="差异值">
                  </el-table-column>
                  <el-table-column prop="realInventory" label="盘点结果">
                  </el-table-column>
                  <el-table-column
                    prop="reason"
                    label="原因"
                    min-width="160"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width="180"
                  ></el-table-column>
                  <el-table-column prop="createUser" label="创建人">
                  </el-table-column>
                  <el-table-column prop="reviseUser" label="订正人">
                  </el-table-column>
                  <el-table-column
                    prop="reviseTime"
                    label="订正时间"
                    width="180"
                  ></el-table-column>
                  <el-table-column prop="reviseResult" label="订正结果">
                  </el-table-column>
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
    <el-dialog
      :visible.sync="printIsShow"
      custom-class="animate__animated animate__zoomIn"
      :title="dialogtitle"
    >
      <div class="dialogMain">
        <div class="boxTitle"><span>基础信息</span></div>
        <div class="titleInfo">
          <div>
            <span>盘点单号：</span>
            <span>{{ dialogData.stockNo }}</span>
          </div>
          <div>
            <span>委托公司：</span>
            <span>{{ dialogData.orgName }}</span>
          </div>
          <div>
            <span>盘点类型：</span>
            <span>{{ dialogData.orderSource }}</span>
          </div>
        </div>
        <div class="tableBox">
          <div class="boxTitle"><span>盘点产品明细</span></div>
          <div>
            <el-table
              :data="dialogTableData"
              border
              style="width: 100%"
              :stripe="true"
              tooltip-effect="dark"
            >
              <el-table-column prop="prodCode" label="产品编码" width="150">
              </el-table-column>
              <el-table-column prop="braName" label="产品名称" align="left">
              </el-table-column>
              <el-table-column
                prop="specName"
                label="产品规格"
                min-width="120"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="prodNum"
                label="系统库存"
                min-width="120"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="prodNum"
                label="销售仓可用库存数量"
                align="center"
                min-width="160"
              >
              </el-table-column>
              <el-table-column prop="" label="缺货数量" align="center">
              </el-table-column>
              <el-table-column
                prop="realInventory"
                min-width="120"
                label="实盘库存"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="diff" label="差异值" align="center">
              </el-table-column>
              <el-table-column
                prop="inventoryStatus"
                label="盘点结果"
                align="center"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div @click="printIsShow = false" class="quxiaoBox">关闭</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import dateTime from "../../components/commin/dateTime.vue"; //时间
import { querySaveResProd, querySaveResSeat } from "../../api/api";
import { clearTimeInput } from "../../utils/validate";

export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      printIsShow: false,
      title: "查询结果",
      dialogtitle: "盘点明细",
      dialogData: {},
      dialogTableData: [],
      productData: [],
      storeLocalData: [],
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "",
        placeholder: "请选择开始时间",
      },
      createType: "",
      mateNumValue: "",
      entrustCompany: "",
      checkResult: "",
      stockNo: "",
      entrustCompanyData: [],
      checkResultData: [
        {
          value: "1",
          label: "盘盈",
        },
        {
          value: "2",
          label: "盘亏",
        },
      ],
      createTypeData: [
        {
          value: "1",
          label: "管理端",
        },
        {
          value: "2",
          label: "仓库",
        },
      ],
      pageComponentsData: {
        pageNums: 0,
      },
      pageComponentsData1: {
        pageNums: 0,
      },
      ProdQueryData: {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {},
      },
      SeatQueryData: {
        orderBy: "createTime",
        pageNumber: 1,
        pageSize: 10,
        paras: {},
      },
    };
  },
  mounted() {
    this.ProdQueryFun();
    this.seatQueryFun();
  },
  watch: {},
  methods: {
    ProdQueryFun() {
      querySaveResProd(this.ProdQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.productData = [];
          this.productData = ok.data.result.list;
          this.changeData(ok.data.result);
        }
      });
    },
    seatQueryFun() {
      querySaveResSeat(this.SeatQueryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.storeLocalData = [];
          this.storeLocalData = ok.data.result.list;
          this.changeData1(ok.data.result);
        }
      });
    },
    clickQuery() {
      //点击查询
    },
    clearInput() {
      //点击清空输入框
      clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      Object.keys(this.ProdQueryData).forEach((v) => {
        this.ProdQueryData[v] = "";
      });
      Object.keys(this.SeatQueryData).forEach((v) => {
        this.SeatQueryData[v] = "";
      });
    },
    lookDeatil(data) {
      this.printIsShow = true;
      this.dialogData = {};
      this.dialogData = data;
    },

    entrustCompanys(val) {
      this.ProdQueryData.paras.orgId = val;
      this.SeatQueryData.paras.orgId = val;
    },
    checkResults(val) {
      this.ProdQueryData.paras.inventoryStatus = val;
      this.SeatQueryData.paras.inventoryStatus = val;
    },
    createTypes(val) {
      this.ProdQueryData.paras.orderSource = val;
      this.SeatQueryData.paras.orderSource = val;
    },
    getPageNum(e) {
      this.ProdQueryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.ProdQueryData.pageNumber = e;
      this.ProdQueryFun();
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },

    getPageNum1(e) {
      this.SeatQueryData.pageNumber = e;
    },
    sureSuccssBtn1(e) {
      this.SeatQueryData.pageNumber = e;
      this.seatQueryFun();
    },
    changeData1(data) {
      this.changePageData1(data);
    },
    changePageData1(data) {
      let { totalRow } = data;
      this.pageComponentsData1.pageNums = totalRow;
    },

    getStartTime(e) {
      this.queryData.paras.pushStartTime = e;
    },
    getEndTime(e) {
      this.queryData.paras.pushEndTime = e;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
#saveInventoryResult {
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
    height: 67px;
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
#saveInventoryResult {
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
  .el-dialog {
    width: 900px;
    height: 466px;
    // box-shadow: 0 0 5px 3px #e1e2e5;
    border-radius: 4px;
    .el-dialog__header {
      padding: 0 20px;
      font-weight: 600;
      height: 50px;
      width: 100%;
      line-height: 50px;
      background: #ecf1f7;
      .el-dialog__headerbtn {
        top: 0;
      }
    }
  }
  .el-dialog__body {
    width: 100%;
    height: 336px;
    border-top: 1px solid #d1d6e2;
    border-bottom: 1px solid #d1d6e2;
    padding: 0 20px;
    overflow: scroll;
    .dialogMain {
      .boxTitle span {
        line-height: 56px;
        font-size: 16px;
        color: #5bb2fe;
        font-weight: 600;
        margin-left: 10px;
        position: relative;
      }
      .boxTitle span::before {
        content: "";
        width: 3px;
        height: 100%;
        background: #5bb2fe;
        position: absolute;
        left: -10px;
        top: 0px;
      }
      .titleInfo {
        display: flex;
        align-items: center;
        div {
          margin: 0 20px 0 20px;
        }
      }
    }
  }
  .el-dialog__footer {
    width: 100%;
    height: 76px;
    padding: 0 20px;
    .dialog-footer {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .quxiaoBox {
        @include BtnFunction();
      }
    }
  }
}
</style>
