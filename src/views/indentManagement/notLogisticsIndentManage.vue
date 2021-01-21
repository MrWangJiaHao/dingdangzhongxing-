<template>
  <div id="notLogisticsIndentManage">
    <!-- 这是自提订单管理页面 -->
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
          <div class="el-inputBox setMargin">
            <div class="el-inputBox-text">订单号：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="orderNumberValue" placeholder="请输入订单号">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox childrenIndent">
            <div class="el-inputBox-text">子单号：</div>
            <div class="el-inputBox-checkBox" style="width: 160px">
              <el-input v-model="ChildOrderNumberValue" placeholder="请输入子单号">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox childrenIndentState">
            <div class="el-inputBox-text">子单状态：</div>
            <div class="el-inputBox-checkBox" style="width: 150px">
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

          <div class="el-inputBox consignee">
            <div class="el-inputBox-text">收货人：</div>
            <div class="el-inputBox-checkBox" style="width: 120px">
              <el-input v-model="consigneeValue" placeholder="请输入收货人">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox block_hidden telphone">
            <div class="el-inputBox-text">联系电话：</div>
            <div class="el-inputBox-checkBox" style="width: 140px">
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
            <div class="el-inputBox-checkBox" style="width: 320px">
              <el-input v-model="addressValue" placeholder="请输入收货地址">
              </el-input>
            </div>
          </div>
          <div class="timeChoose el-inputBox">
            <div class="el-inputBox-text titleBox">下发时间：</div>
            <div class="timeBox">
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
          <!-- <div class="showBtn" @click="clickShow">
                            <span>{{ stateChoose }}</span
                            ><span class="el-icon-caret-bottom caret"></span>
                          </div> -->
          <div class="queryBtn" @click="clickQuery">查询</div>
          <div class="clearBtn" @click="clearInput">清空</div>
        </div>
      </div>
      <div class="childWarehouseForm">
        <div class="formHeader">
          <div class="icon-title">
            <div class="icon-title-icon">
              <img src="../../assets/img/systemTitlemesa.png" />
            </div>
            <div class="icon-title-title">查询结果</div>
          </div>
          <div class="someBtn">
            <div class="takeOrdersDiv" @click="takeOrders">获取物流单号</div>
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
            <el-table-column type="selection" width="82" align="center" fixed="left">
            </el-table-column>
            <el-table-column
              label="序号"
              align="center"
              type="index"
              width="71"
            >
            </el-table-column>
            <el-table-column prop="orgName" label="委托公司" align="left">
            </el-table-column>
            <el-table-column prop="channelName" label="渠道" align="left">
            </el-table-column>
            <el-table-column
              prop="orderSourceName"
              label="订单来源"
              align="left"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="orderNo" label="订单号" align="left" width="180">
              <template slot-scope="scope">
                <div class="lookDeatil">
                  {{ scope.row.orderNo }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="subOrderNo" label="子订单号" align="left" width="180">
              <template slot-scope="scope">
                <div class="lookDeatil">
                  {{ scope.row.subOrderNo }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="volume" label="体积(m³)" align="center">
            </el-table-column>
            <el-table-column prop="weight" label="重量(KG)" align="center">
            </el-table-column>
            <el-table-column prop="commendBox" label="推荐用箱" align="center">
            </el-table-column>

            <el-table-column
              prop="pushTime"
              label="下发时间"
              align="left"
              width="180"
            ></el-table-column>
          </el-table>
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
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import dateTime from "../../components/commin/dateTime.vue"; //时间
import { queryOrderInfor, getExprNo } from "../../api/api";
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
        pageNumber: 1,
        pageSize: 10,
        paras: {
          orgId: "",
          channelId: "",
          orderSourceId: "", //订单来源id
          orderNo: "", //订单号
          subOrderNo: "",
          subOrderStatus: "",
          orderContact: "",
          orderContactPhone: "",
          orderAddr: "",
          offLineMark: "", //发货方式 (0-物流发货 1-自提)
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
          hasExpr: "1",
        },
      },
      pageComponentsData: {
        pageNums: 0,
      },
      // 导出文件名称
      filename: "无物流订单信息",
      // 导出表格宽度是否auto
      autoWidth: true,
      // 导出文件格式
      bookType: "xlsx",
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
            v.subOrderStatus =
              v.subOrderStatus === 0
                ? "拉取/手工"
                : v.subOrderStatus === 1
                ? "拆分"
                : v.subOrderStatus === 2
                ? "下发中"
                : v.subOrderStatus === 3
                ? "待审核"
                : v.subOrderStatus === 5
                ? "待合并"
                : v.subOrderStatus === 6
                ? "待打印"
                : v.subOrderStatus === 7
                ? "待拣货"
                : v.subOrderStatus === 8
                ? "待复核"
                : v.subOrderStatus === 9
                ? "重新拣货"
                : v.subOrderStatus === 10
                ? "已发货"
                : v.subOrderStatus === 11
                ? "已退单"
                : "";
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
      this.queryData.paras.orderNo = this.orderNumberValue;
      this.queryData.paras.subOrderNo = this.ChildOrderNumberValue;
      this.queryData.paras.orderContact = this.consigneeValue;
      this.queryData.paras.orderContactPhone = this.telPhoneValue;
      this.queryData.paras.orderAddr = this.addressValue;
      this.tableData = [];
      // console.log(this.queryData);
      this.pageQueryFun();
    },
    clearInput() {
      //点击清空输入框
      this.clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      this.tableData = [];
      Object.keys(this.queryData.paras).forEach((v) => {
        this.queryData.paras[v] = "";
      });
      this.pageQueryFun();
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
      // let data = {
      //   subOrderNo: "",
      // };
      // if (this.multipleSelection.length > 0) {
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
      // if (!this.multipleSelection.length) return this.$messageSelf.message("请选择要导出的订单");
      // if (this.multipleSelection.length != 1)
      //   return this.$messageSelf.message("一次只能选择一个订单");
      // if (this.lotNo === "") return this.$messageSelf.message("请稍等片刻");
      // let oA = document.querySelector(".setUser");
      // oA.setAttribute("href", this.getExcelUrl + this.lotNo);
      if (this.tableData.length === 0) {
        return this.$messageSelf.message({
          message: "表格为空不能导出",
          type: "error",
        });
      }
      import("../../js-xlsx/Export2Excel").then((excel) => {
        // 设置导出表格的头部
        const tHeader = [
          "委托公司",
          "渠道",
          "订单来源",
          "订单号",
          "子订单号",
          "体积(m³)",
          "重量(KG)",
          "推荐用箱",
          "下发时间",
        ];
        // 设置要导出的属性
        const filterVal = [
          "orgName",
          "channelName",
          "orderSourceName",
          "orderNo",
          "subOrderNo",
          "volume",
          "weight",
          "commendBox",
          "pushTime",
        ];
        // 获取当前展示的表格数据
        const list = this.tableData;
        // 将要导出的数据进行一个过滤
        const data = this.formatJson(filterVal, list);
        // 调用我们封装好的方法进行导出Excel
        excel.export_json_to_excel({
          // 导出的头部
          header: tHeader,
          // 导出的内容
          data,
          // 导出的文件名称
          filename: this.filename,
          // 导出的表格宽度是否自动
          autoWidth: this.autoWidth,
          // 导出文件的后缀类型
          bookType: this.bookType,
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
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
          return this.$message.error("请输入正确的手机号");
        }
      }
      phoneInput.style.borderColor = "#DCDFE6";
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
    takeOrders() {
      //获取物流单号
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要分配物流的单号",
          type: "warning",
        });
      this.$messageSelf
        .confirms(
          `共选择${this.multipleSelection.length}个订单，确认获取物流单号吗？`,
          "获取物流单号",
          {
            type: "info",
          }
        )
        .then(() => {
          this.getExpressNo({ ids: arr });
        })
        .catch(() => {
          this.$messageSelf.message("已取消");
        });
    },
    getExpressNo(data) {
      getExprNo(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "分配成功",
          });
          this.pageQueryFun();
        } else {
          this.$messageSelf.message({
            type: "error",
            message: "分配失败",
          });
        }
      });
    },
    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.tableData = [];
      this.pageQueryFun();
      this.queryData.pageNumber = e;
    },
    changeData(data) {
      this.changePageData(data); //用来改变分页器的条数
    },
    //用来改变分页器的条数
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getStartTime(e) {
      this.queryData.paras.pushStartTime = e;
    },
    getEndTime(e) {
      this.queryData.paras.pushEndTime = e;
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

#notLogisticsIndentManage {
  background: #eef1f8;
  padding: 20px 10px;
}

.headerHtml {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 20px;
  transition: 0.3s;
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
    justify-content: space-between;
    margin-right: 20px;

    .titleBox {
      font-size: 14px;
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

.childWarehouseForm {
  margin: 4px 0 0 0;
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

  .resultForm {
    padding: 16px 20px;

    .lookDeatil {
      color: #599af3;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.entrustCompany {
  .el-select {
    width: 100%;
  }
}
</style>
