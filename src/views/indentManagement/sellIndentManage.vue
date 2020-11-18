<template>
  <div id="mianPage">
    <!-- 这是销售订单管理页面 -->
    <div class="roleName">
      <div class="headerHtml">
        <div class="headerInput">
          <div class="headerInput-one inputs">
            <div class="el-inputBox">
              <div class="el-inputBox-text">委托公司：</div>
              <div class="el-inputBox-checkBox">
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
              <div class="el-inputBox-checkBox">
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
              <div class="el-inputBox-checkBox">
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
            <div class="el-inputBox setMargin">
              <div class="el-inputBox-text">订单号：</div>
              <div class="el-inputBox-checkBox">
                <el-input v-model="orderNumberValue" placeholder="模糊检索">
                </el-input>
              </div>
            </div>
          </div>
          <div class="headerInput-one headerInput-two">
            <div class="el-inputBox childrenIndent">
              <div class="el-inputBox-text">子单号：</div>
              <div class="el-inputBox-checkBox">
                <el-input
                  v-model="ChildOrderNumberValue"
                  placeholder="模糊检索"
                >
                </el-input>
              </div>
            </div>
            <div class="el-inputBox childrenIndentState">
              <div class="el-inputBox-text">子单状态：</div>
              <div class="el-inputBox-checkBox">
                <el-select
                  v-model="ChildOrderState"
                  placeholder="请选择子单状态"
                  @change="ChildOrderStates"
                  clearable
                >
                  <el-option
                    v-for="item in ChildOrderStateData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="el-inputBox stateChoose">
              <div class="el-inputBox-checkBox">
                <el-select
                  v-model="stateChooseValue"
                  @change="stateChooseValues"
                >
                  <el-option
                    v-for="item in stateChooseValueData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="timeChoose">
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
            <div class="el-inputBox consignee">
              <div class="el-inputBox-text">收货人：</div>
              <div class="el-inputBox-checkBox">
                <el-input v-model="consigneeValue" placeholder="请输入收货人">
                </el-input>
              </div>
            </div>
            <div class="el-inputBox block_hidden telphone">
              <div class="el-inputBox-text">联系电话：</div>
              <div class="el-inputBox-checkBox">
                <el-input
                  v-model="telPhoneValue"
                  placeholder="请输入联系电话"
                  type="number"
                  @blur="testIsMobile"
                  @focus="focusEvent"
                >
                </el-input>
              </div>
            </div>
            <div class="el-inputBox block_hidden address">
              <div class="el-inputBox-text">收货地址：</div>
              <div class="el-inputBox-checkBox">
                <el-input v-model="addressValue" placeholder="请输入收货地址">
                </el-input>
              </div>
            </div>
            <div class="header-botton">
              <div class="showBtn" @click="clickShow">
                <span>{{ stateChoose }}</span
                ><span class="el-icon-caret-bottom caret"></span>
              </div>
              <div class="queryBtn" @click="clickQuery">查询</div>
              <div class="clearBtn" @click="clearInput">清空</div>
            </div>
          </div>
        </div>
      </div>
      <div class="childWarehouseForm">
        <div class="formHeader">
          <div class="icon-title">
            <div class="icon-title-icon">
              <img src="../../assets/img/systemTitlemesa.png" />
            </div>
            <div class="icon-title-title">销售订单信息</div>
          </div>
          <div class="someBtn">
            <a class="setUser" @click="educe" target="_blank">导出</a>
          </div>
        </div>
        <div class="resultForm">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :stripe="true"
            tooltip-effect="dark"
            @cell-click="lookDetailEvent"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="60"
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
            <el-table-column prop="orderNo" label="订单号" align="center">
              <template slot-scope="scope">
                <div class="lookDeatil">
                  {{ scope.row.orderNo }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="subOrderNo" label="子订单号" align="center">
              <template slot-scope="scope">
                <div class="lookDeatil">
                  {{ scope.row.subOrderNo }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="subOrderStatus"
              label="子订单状态"
              align="center"
            >
              <template slot-scope="scope">
                <div class="lookDeatil">
                  {{ scope.row.subOrderStatus }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="volume" label="体积(m³)" align="center">
            </el-table-column>
            <el-table-column prop="weight" label="重量(KG)" align="center">
            </el-table-column>
            <el-table-column prop="commendBox" label="推荐用箱" align="center">
            </el-table-column>
            <el-table-column prop="exprName" label="物流公司" align="center">
            </el-table-column>
            <el-table-column prop="exprNo" label="物流单号" align="center">
            </el-table-column>
            <el-table-column
              prop="wareExprFeeCode"
              label="仓库运费模板编号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="wareExprFeeName"
              label="仓库运费模板名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="orgExprFeeCode"
              label="委托公司运费模板编号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="orgExprFeeName"
              label="委托公司运费模板名称"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="exprFee"
              label="预估运费（元）"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="pushTime"
              label="下发时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="mergeStartTime"
              label="集计开始时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="mergeEndTime"
              label="集计完成时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="printTime"
              label="打印时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="printUser"
              label="打印人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="pickStartTime"
              label="拣货开始时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="pickEndTime"
              label="拣货完成时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="pickUser"
              label="拣货人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="reCheckStartTime"
              label="复核开始时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="reCheckEndTime"
              label="复核完成时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="reCheckUser"
              label="复核人"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="reCheckImageData"
              label="复核照片"
              align="center"
            >
              <template slot-scope="scope">
                <div class="lookDetail">{{ scope.row.reCheckImageData }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="reCheckResult"
              label="复核结果"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
        <div class="pageComponent">
          <pagecomponent
            :pageComponentsData="pageComponentsData"
            @getPageNum="getPageNum"
            @sureSuccssBtn="sureSuccssBtn"
          ></pagecomponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { Message } from "element-ui";
import dateTime from "../../components/commin/dateTime.vue"; //时间
import { queryOrderInfor } from "../../api/api";
import { isMobile } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      index: 0,
      lotNo: "",
      getExcelUrl:
        "http://139.196.176.227:8902/wbs-warehouse-manage/v1/pOrgSubOrder/getExcel?lotNo=",
      tableData: [],
      stateChoose: "展开",
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
      channelValueData: [],
      mateNumValueData: [],
      entrustCompanyData: [],
      indentSourceValueData: [],
      ChildOrderNumberData: [],
      ChildOrderStateData: [
        {
          value: "0",
          label: "拉取/手工",
        },
        {
          value: "1",
          label: "拆分",
        },
        {
          value: "2",
          label: "下发中",
        },
        {
          value: "3",
          label: "待审核",
        },
        {
          value: "4",
          label: "待分配",
        },
        {
          value: "5",
          label: "待合并",
        },
        {
          value: "6",
          label: "待打印",
        },
        {
          value: "7",
          label: "待拣货",
        },
        {
          value: "8",
          label: "待复核",
        },
        {
          value: "9",
          label: "重新拣货",
        },
        {
          value: "10",
          label: "已发货",
        },
        {
          value: "11",
          label: "已退单",
        },
      ],
      stateChooseValue: "下发时间",
      stateChooseValueData: [
        {
          value: "下发时间",
          label: "下发时间",
        },
        {
          value: "集计时间",
          label: "集计时间",
        },
        {
          value: "拣货时间",
          label: "拣货时间",
        },
        {
          value: "复核时间",
          label: "复核时间",
        },
        {
          value: "揽件时间",
          label: "揽件时间",
        },
      ],
      consigneeValue: "",
      telPhoneValue: "",
      addressValue: "",
      multipleSelection: [],
      queryData: {
        orderBy: "createTime",
        pageNumber: "1",
        pageSize: "10",
        paras: {
          orgId: "",
          channelId: "",
          orderSourceId: "",
          orderNo: "",
          subOrderNo: "",
          subOrderStatus: "",
          orderContact: "",
          orderContactPhone: "",
          orderAddr: "",
          offLineMark: "",
          pushStartTime: "",
          pushEndTime: "",
          megerStartTime: "",
          megerEndTime: "",
          pickStartTime: "",
          pickEndTime: "",
          checkStartTime: "",
          checkEndTime: "",
          sendStartTime: "",
          sendEndTime: "",
          hasExpr: "",
        },
      },
      pageComponentsData: {
        pageNums: 0,
      },
      testPhone: true,
    };
  },
  mounted() {
    this.pageQueryFun();
  },
  watch: {},
  methods: {
    pageQueryFun() {
      let queryData = this.queryData;
      queryOrderInfor(queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.tableData.forEach((v) => {
            v.subOrderStatus = this.subOrderStatusFun(v.subOrderStatus);
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
          Message({
            message: "未知错误",
            type: "error",
          });
        }
      });
    },
    subOrderStatusFun(state) {
      let data = state;
      switch (data) {
        case 0:
          data = "拉取/手工";
          break;
        case 1:
          data = "拆分";
          break;
        case 2:
          data = "下发中";
          break;
        case 3:
          data = "待审核";
          break;
        case 4:
          data = "待分配";
          break;
        case 5:
          data = "待合并";
          break;
        case 6:
          data = "待打印";
          break;
        case 7:
          data = "待拣货";
          break;
        case 8:
          data = "待复核";
          break;
        case 9:
          data = "重新拣货";
          break;
        case 10:
          data = "已发货";
          break;
        case 11:
          data = "已退单";
          break;
        default:
          data = "未知";
          break;
      }
      return data;
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
      this.queryData.paras.channelId = val;
    },
    entrustCompanys(val) {
      this.entrustCompany = val;
      this.queryData.paras.orgId = val;
    },
    indentSourceValues(val) {
      this.indentSourceValue = val;
      this.queryData.paras.orderSourceId = val;
    },
    ChildOrderStates(val) {
      this.ChildOrderState = val;
      this.queryData.paras.subOrderStatus = val;
    },
    stateChooseValues(val) {
      this.stateChooseValue = val;
    },
    clickQuery() {
      //点击查询
      if (this.testPhone) {
        this.queryData.paras.orderNo = this.orderNumberValue;
        this.queryData.paras.subOrderNo = this.ChildOrderNumberValue;
        this.queryData.paras.orderContact = this.consigneeValue;
        this.queryData.paras.orderContactPhone = this.telPhoneValue;
        this.queryData.paras.orderAddr = this.addressValue;
        this.tableData = [];
        // console.log(this.queryData);
        this.pageQueryFun();
      } else {
        return this.$message.error("请输入正确的手机号");
      }
    },
    clearInput() {
      //点击清空输入框
      this.clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      this.tableData = [];
      this.queryData.paras.orgId = "";
      this.queryData.paras.channelId = "";
      this.queryData.paras.orderSourceId = "";
      this.queryData.paras.orderNo = "";
      this.queryData.paras.subOrderNo = "";
      this.queryData.paras.subOrderStatus = "";
      this.queryData.paras.orderContactPhone = "";
      this.queryData.paras.orderAddr = "";
      this.queryData.paras.pushStartTime = "";
      this.queryData.paras.pushEndTime = "";
      this.queryData.paras.megerStartTime = "";
      this.queryData.paras.megerEndTime = "";
      this.queryData.paras.pickStartTime = "";
      this.queryData.paras.pickEndTime = "";
      this.queryData.paras.checkStartTime = "";
      this.queryData.paras.checkEndTime = "";
      this.queryData.paras.sendStartTime = "";
      this.queryData.paras.sendEndTime = "";
      this.stateChooseValue = "下发时间";
      this.pageQueryFun();
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
      // let data = {
      //   subOrderNo: "",
      // };
      // if (value.length > 0) {
      //   data.subOrderNo = value[0].subOrderNo;
      //   childOrderInfor(data).then((ok) => {
      //     if (ok.data.code === "10000") {
      //       this.lotNo = ok.data.result[0].lotNo;
      //     }
      //   });
      // }
    },
    educe() {
      //导出表格
      // if (!this.multipleSelection.length) return Message("请选择要导出的订单");
      // if (this.multipleSelection.length != 1)
      //   return Message("一次只能选择一个订单");
      // if (this.lotNo === "") return Message("请稍等片刻");
      let oA = document.querySelector(".setUser");
      oA.setAttribute("href", this.getExcelUrl);
    },
    clickShow() {
      this.index++;
      let showDiv = document.querySelectorAll(".block_hidden");
      let caret = document.querySelector(".caret");
      let headerBtn = document.querySelector(".header-botton");
      let headerHtml = document.querySelector(".headerHtml");
      if (this.index % 2 !== 0) {
        this.stateChoose = "收起";
        showDiv.forEach((v) => {
          setTimeout(() => {
            v.style.display = "flex";
          }, 300);
        });
        caret.style.transform = "rotateZ(180deg)";
        headerBtn.style.position = "absolute";
        headerBtn.style.top = "116px";
        headerHtml.style.height = "152px";
      } else {
        this.stateChoose = "展开";
        showDiv.forEach((v) => {
          v.style.display = "none";
        });
        caret.style.transform = "rotateZ(0)";
        headerBtn.style.position = "absolute";
        headerBtn.style.top = "60px";
        headerBtn.style.right = "0";
        headerHtml.style.height = "96px";
      }
    },
    testIsMobile() {
      let telPhoneValue = this.telPhoneValue;
      let phoneInput = document.querySelector(".telphone .el-input__inner");
      if (telPhoneValue !== "") {
        if (!isMobile(telPhoneValue)) {
          phoneInput.style.borderColor = "red";
          this.testPhone = false;
          return this.$message.error("请输入正确的手机号");
        }
      }
      phoneInput.style.borderColor = "#DCDFE6";
      this.testPhone = true;
    },
    focusEvent() {
      document.querySelector(".telphone .el-input__inner").style.borderColor =
        "#409EFF";
    },
    lookDetailEvent(row, column, cell) {
      if (column.property === "orderNo") {
        if (cell.childNodes[0].childNodes[0].innerHTML !== "") {
          this.$router.push({
            path: "/indentManagement/orderDetail",
            query: {
              orderNo: row,
              type: "orderNo",
            },
          });
        }
      }
      if (column.property === "subOrderStatus") {
        if (cell.childNodes[0].childNodes[0].innerHTML !== "") {
          this.$router.push({
            path: "/indentManagement/orderLog",
            query: {
              subOrderStatus: row,
              type: "subOrderStatus",
            },
          });
        }
      }
      if (column.property === "subOrderNo") {
        if (cell.childNodes[0].childNodes[0].innerHTML !== "") {
          this.$router.push({
            path: "/indentManagement/childOrderDetail",
            query: {
              subOrderNos: row,
              type: "subOrderNos",
            },
          });
        }
      }
    },
    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryData.pageNumber = e;
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getStartTime(e) {
      if (this.stateChooseValue === "下发时间") {
        this.queryData.paras.pushStartTime = e;
      } else if (this.stateChooseValue === "集计时间") {
        this.queryData.paras.megerStartTime = e;
      } else if (this.stateChooseValue === "拣货时间") {
        this.queryData.paras.pickStartTime = e;
      } else if (this.stateChooseValue === "复核时间") {
        this.queryData.paras.checkStartTime = e;
      } else if (this.stateChooseValue === "揽件时间") {
        this.queryData.paras.sendStartTime = e;
      }
    },
    getEndTime(e) {
      if (this.stateChooseValue === "下发时间") {
        this.queryData.paras.pushEndTime = e;
      } else if (this.stateChooseValue === "集计时间") {
        this.queryData.paras.megerEndTime = e;
      } else if (this.stateChooseValue === "拣货时间") {
        this.queryData.paras.pickEndTime = e;
      } else if (this.stateChooseValue === "复核时间") {
        this.queryData.paras.checkEndTime = e;
      } else if (this.stateChooseValue === "揽件时间") {
        this.queryData.paras.sendEndTime = e;
      }
    },
    clearTimeInput() {
      let input = document.getElementsByClassName("ivu-input");
      for (let i = 0; i < input.length; i++) {
        input[i].value = "";
      }
      let elInput = document.querySelectorAll(".el-input__inner");
      for (let i = 0; i < elInput.length; i++) {
        elInput[i].value = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";

#mianPage {
  background: #e6e7ea;
  padding: 16px;
}
.headerHtml {
  position: relative;
  height: 96px;
  transition: 0.3s;
  .headerInput {
    .headerInput-one {
      width: 100%;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      .el-inputBox {
        display: flex;
        align-items: center;
        font-size: 16px;
        margin-right: 1.05%;
        .el-inputBox-text {
          white-space: nowrap;
        }
      }
      .address {
        margin-top: 16px;
        width: 25.7%;
        transition: 0.3s;
        .el-inputBox-checkBox {
          width: 100%;
        }
      }
      .telphone {
        width: 14%;
        transition: 0.3s;
        margin-right: 0;
        .el-inputBox-checkBox {
          width: 100%;
        }
      }
      .block_hidden {
        display: none;
      }
      .childrenIndent {
        width: 21.8%;
        .el-inputBox-checkBox {
          width: 100%;
        }
      }
      .childrenIndentState {
        width: 18.2%;

        .el-inputBox-checkBox {
          width: 100%;
        }
      }
      .stateChoose {
        width: 6.5%;
        margin-right: 0.6%;
      }
      .consignee {
        width: 11.3%;
        .el-inputBox-checkBox {
          width: 100%;
        }
      }
    }
    .headerInput-two {
      flex-wrap: wrap;
    }
    .inputs {
      .el-inputBox {
        width: 25%;
      }
      .setMargin {
        margin-right: 0;
      }
      .el-inputBox-checkBox {
        width: 100%;
      }
    }
  }
  .header-botton {
    width: 15%;
    transition: 0.3s;
    position: absolute;
    right: 0;
    top: 60px;
    .caret {
      transition: 0.5s;
    }
    .showBtn {
      width: 50px;
      display: flex;
      white-space: nowrap;
      color: #888;
      position: relative;
      cursor: pointer;
      .caret {
        font-size: 16px;
        position: absolute;
        left: 50%;
      }
    }
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
    width: 23.4%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 1.05%;
    .titleBox {
      font-size: 16px;
    }
    .timeBox {
      display: flex;
      align-items: center;
      .line {
        width: 10px;
        height: 2px;
        background: #d1d6e2;
        margin: 0 2.5%;
      }
    }
  }
}
.childWarehouseForm {
  margin: 16px 0 0 0;
  background: white;
  .formHeader {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #d1d6e2;
    .icon-title {
      display: flex;
      margin: 24px 0 0 0;
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
        font-size: 16px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 20px 16px 0;
      .setUser {
        @include BtnFunction("success");
      }
    }
  }

  .resultForm {
    padding: 20px;
    .lookDeatil {
      color: #599af3;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .pageComponent {
    margin: 20px 10px 0 0;
    text-align: right;
    height: 36px;
    background: #ffffff;
  }
}
</style><style lang="scss">
.headerInput {
  .el-select {
    width: 100%;
  }

  .childrenIndent {
    .el-select {
      width: 100%;
    }
  }

  .childrenIndentState {
    .el-select {
      width: 100%;
    }
  }

  .consignee {
    .el-select {
      width: 100%;
    }
  }

  .address {
    .el-select {
      width: 100%;
    }
  }

  .telphone {
    .el-select {
      width: 100%;
    }
  }
}
</style>
