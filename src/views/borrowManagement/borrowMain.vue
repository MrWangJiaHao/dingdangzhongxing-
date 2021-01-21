<template>
  <div id="borrowMain">
    <!-- 这是借调管理页面 -->
    <div class="headerHtml">
      <div class="headerInput">
        <div class="el-inputBox">
          <div class="el-inputBox-text">借调单号：</div>
          <div class="el-inputBox-checkBox" style="width: 160px">
            <el-input v-model="borrowOrder" placeholder="请输入借调单号">
            </el-input>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">借调状态：</div>
          <div class="el-inputBox-checkBox" style="width: 160px">
            <el-select
              v-model="borrowType"
              placeholder="请选择借调状态"
              @change="borrowTypes"
              clearable
            >
              <el-option
                v-for="item in borrowTypeData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">借调物料：</div>
          <div class="el-inputBox-checkBox" style="width: 160px">
            <el-select
              v-model="borrowMate"
              placeholder="请选择借调物料"
              @change="borrowMates"
              clearable
            >
              <el-option
                v-for="item in borrowMateData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">借出方：</div>
          <div class="el-inputBox-checkBox" style="width: 160px">
            <el-select
              v-model="borrowOutSide"
              placeholder="请选择借出方"
              @change="borrowOutSides"
              clearable
            >
              <el-option
                v-for="item in borrowOutSideData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="timeChoose el-inputBox">
          <div class="el-inputBox-text titleBox">创建时间：</div>
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
        <div class="timeChoose el-inputBox">
          <div class="el-inputBox-text titleBox">审核时间：</div>
          <div class="timeBox">
            <div style="">
              <dateTime
                :dateTimeData="datetimeDates"
                @getDateTime="getStartTime1"
                ref="startTime"
              />
            </div>
            <!-- 开始时间 -->
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="datetimeDate"
                @getDateTime="getEndTime1"
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
    <div class="childWarehouseForm">
      <div class="formHeader">
        <div class="icon-title">
          <div class="icon-title-icon">
            <img src="../../assets/img/systemTitlemesa.png" />
          </div>
          <div class="icon-title-title">查询结果</div>
        </div>
        <div class="someBtn">
          <div class="create" @click="create">创建</div>
          <div class="create" @click="edit">编辑</div>
          <div class="del" @click="del">删除</div>
          <div class="create" @click="submit">提交</div>
          <div class="print" @click="print">打印借调单</div>
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
        >
          <el-table-column
            type="selection"
            width="82"
            align="center"
            fixed="left"
          >
          </el-table-column>
          <el-table-column label="序号" align="center" type="index" width="71">
          </el-table-column>
          <el-table-column
            prop="loanNo"
            label="借调单号"
            width="250"
            align="center"
          >
            <template slot-scope="scope">
              <div class="lookDeatil" @click="lookDeatil(scope.row)">
                {{ scope.row.loanNo }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="outWareName" label="借出方" align="center">
          </el-table-column>
          <el-table-column prop="loanStatus" label="借调状态" align="center">
          </el-table-column>
          <el-table-column prop="createUser" label="创建人" align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="180"
            min-width="180"
          >
          </el-table-column>
          <el-table-column prop="verifyUserName" label="审核人" align="center">
          </el-table-column>
          <el-table-column
            prop="verifyTime"
            label="审核时间"
            width="180"
            min-width="180"
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
    <el-dialog
      :visible.sync="printIsShow"
      custom-class="animate__animated animate__zoomIn"
    >
      <BreakageOrder
        v-show="printIsShow"
        :tabledatasArr="tabledatasArr"
        :ReplenishmentNote="replenishmentNoteJson"
        @getiswuliudanOne="getiswuliudanOne"
      ></BreakageOrder>
    </el-dialog>

    <el-dialog
      :visible.sync="lookDetailIsShow"
      custom-class="animate__animated animate__zoomIn"
    >
      <BorrowOrderDetailPage
        v-show="lookDetailIsShow"
        :tableData="detailTableData"
        :dataJson="detailObject"
        :title="detailTitle"
        @BorrowOrderDetailIsShow="BorrowOrderDetailIsShow"
      ></BorrowOrderDetailPage>
    </el-dialog>
  </div>
</template>

<script>
/*eslint-disable*/
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import dateTime from "../../components/commin/dateTime.vue"; //时间
import {
  queryBorrowList,
  BorrowOrderDetail,
  delBorrowOrder,
  submitBorrowOrder,
  printBorrowOrder,
} from "../../api/api";
import BreakageOrder from "../../components/commin/componentList";
import BorrowOrderDetailPage from "./borrowOrderDetail";
import { clearTimeInput, getCookie } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    dateTime,
    BreakageOrder,
    BorrowOrderDetailPage,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "/breakageManagement/createBreakageOrder") {
      next((vm) => {
        if (vm.$route.query.type === "submit") {
          vm.pageQueryFun();
        }
      });
    } else {
      next();
    }
  },
  data() {
    return {
      printIsShow: false,
      lookDetailIsShow: false,
      detailTableData: [],
      detailObject: {},
      detailTitle: "借调单详情",
      tableData: [],
      tabledatasArr: [],
      replenishmentNoteJson: {
        title: "借调单",
        replenishOrderNo: "",
        queryArr: [],
        basicJson: [
          {
            titles: "基础信息",
            basicJsonArr: [
              {
                types: "materielTypeName", //materielTypeName
                centerStr: "物料类型",
              },
              {
                types: "materielCode",
                centerStr: "物料编码",
              },
              {
                types: "materielName",
                centerStr: "物料名称",
              },
              {
                types: "specName",
                centerStr: "物料规格",
              },
              { types: "materielNum", centerStr: "借调数量" },
              { types: "wareName", centerStr: "借出方" },
              { types: "", centerStr: "入库数量" },
            ],
          },
        ],
      },
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "",
        placeholder: "请选择开始时间",
      },
      borrowOrder: "",
      entrustCompany: "",
      borrowType: "",
      borrowMate: "",
      borrowOutSide: "",
      borrowOutSideData: [],
      borrowMateData: [],
      borrowTypeData: [
        {
          value: "1",
          label: "待提交",
        },
        {
          value: "2",
          label: "待审核",
        },
        {
          value: "3",
          label: "审核成功",
        },
        {
          value: "4",
          label: "拒绝",
        },
      ],
      multipleSelection: [],
      queryBorrowListData: {
        pageNumber: 1,
        pageSize: 10,
        paras: {
          loanId: "",
          loanNo: "",
          loanStatus: "",
          materielCode: "",
          materielId: "",
          materielType: "",
          wareId: "",
          wareName: "",
          verifyTime: "",
          verifyUserId: "",
        },
      },
      pageComponentsData: {
        pageNums: 0,
      },
    };
  },
  mounted() {
    this.pageQueryFun();
  },
  watch: {},
  methods: {
    pageQueryFun() {
      queryBorrowList(this.queryBorrowListData).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.tableData.forEach((v) => {
            v.loanStatus = this.loanStatus(v.loanStatus);
          });
        } else {
          this.$messageSelf.message({
            message: "查询失败",
            type: "error",
          });
        }
      });
    },
    clickQuery() {
      //点击查询
      let senddata = this.queryBorrowListData.paras;
      senddata.loanNo = this.borrowOrder;
      senddata.loanStatus = this.borrowType;
      senddata.outWareName = this.borrowOutSide;
      this.pageQueryFun();
    },
    loanStatus(num) {
      let state = num;
      switch (state) {
        case 1:
          state = "待提交";
          break;
        case 2:
          state = "待审核";
          break;
        case 3:
          state = "审核通过";
          break;
        case 4:
          state = "拒绝";
          break;
        default:
          state = "未知";
          break;
      }
      return state;
    },

    borrowTypes(val) {
      console.log(val)
      this.breakageType = val;
    },
    borrowMates(val) {
      this.borrowMate = val;
    },
    borrowOutSides(val) {
      this.borrowOutSide = val;
    },
    clearInput() {
      //点击清空输入框
      clearTimeInput()
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      Object.keys(this.queryBorrowListData.paras).forEach((v) => {
        this.queryBorrowListData.paras[v] = "";
      });
      this.pageQueryFun();
    },
    create() {
      //创建报损单
      this.$router.push({
        path: "/borrowManagement/createBorrowOrder",
        query: { type: "create" },
      });
    },
    edit() {
      if (!this.multipleSelection.length) {
        return this.$messageSelf.message({
          message: "请选择需要编辑的借调单",
          type: "warning",
        });
      } else if (this.multipleSelection.length > 1) {
        return this.$messageSelf.message({
          message: "只能选择一个借调单进行编辑",
          type: "warning",
        });
      } else {
        if (this.multipleSelection[0].loanStatus !== "待审核") {
          return this.$messageSelf.message({
            message: "只有待审核的订单可编辑",
            type: "warning",
          });
        } else {
          this.$router.push({
            path: "/borrowManagement/createBorrowOrder",
            query: { val: this.multipleSelection[0], type: "edit" },
          });
        }
      }
    },
    del() {
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length) return this.$messageSelf.message("请选择要删除的借调单");
      this.$messageSelf
        .confirms(
          `确定要删除这${this.multipleSelection.length}条借调单号？`,
          "删除确认",
          { type: "info" }
        )
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {});
    },
    delRequest(data) {
      delBorrowOrder(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "删除成功",
          });
          this.pageQueryFun();
        } else {
          this.$messageSelf.message({
            type: "error",
            message: "删除失败",
          });
        }
      });
    },
    submit() {
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
        if (item.loanStatus !== "待提交") {
          return this.$messageSelf.message({
            type: "warning",
            message: "只有待提交的单号可以提交",
          });
        }
      });
      if (!arr.length) {
        return this.$messageSelf.message({
          message: "请选择要提交的借调单",
          type: "warning",
        });
      } else {
        this.$messageSelf
          .confirms(
            `确定要提交这${this.multipleSelection.length}条借调单号？`,
            "提交确认",
            { type: "warning" }
          )
          .then(() => {
            this.submitRequest({ ids: arr });
          })
          .catch(() => {});
      }
    },
    submitRequest(data) {
      submitBorrowOrder(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({
            type: "success",
            message: "提交成功",
          });
          this.pageQueryFun();
        } else {
          this.$messageSelf.message({
            type: "error",
            message: "提交失败",
          });
        }
      });
    },
    print() {
      if (!this.multipleSelection.length) {
        return this.$messageSelf.message({
          message: "请选择需要打印的单号",
          type: "warning",
        });
      } else if (this.multipleSelection.length > 1) {
        return this.$messageSelf.message({
          message: "只能选择一个单号进行打印",
          type: "warning",
        });
      } else {
        this.tabledatasArr = [];
        this.printIsShow = true;
        printBorrowOrder({ loanId: this.multipleSelection[0].id }).then(
          (ok) => {
            // console.log(ok);
            if (ok.data.code === "10000") {
              let json = [
                {
                  queryTitle: "借调单号",
                  queryCenter: this.multipleSelection[0].loanNo,
                },
                {
                  queryTitle: "借调状态",
                  queryCenter: this.loanStatus(3),
                },
                {
                  queryTitle: "签字",
                  queryCenter: "",
                  queryLine: true,
                },
              ];
              this.replenishmentNoteJson.queryArr = json;
              this.replenishmentNoteJson.replenishOrderNo = this.multipleSelection[0].loanNo;
              this.tabledatasArr = ok.data.result;
            }
          }
        );
      }
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    lookDeatil(data) {
          console.log(data)
      // console.log(data);
      BorrowOrderDetail({ loanId: data.id }).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.lookDetailIsShow = true;
          this.detailTableData = ok.data.result;
          this.detailObject = data;
        }
      });
    },
    getiswuliudanOne(e) {
      this.printIsShow = e;
    },
    BorrowOrderDetailIsShow(e) {
      this.lookDetailIsShow = e;
    },
    getPageNum(e) {
      this.queryBorrowListData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryBorrowListData.pageNumber = e;
      this.pageQueryFun();
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getStartTime(e) {
      this.queryBorrowListData.paras.createStartTime = e;
    },
    getEndTime(e) {
      this.queryBorrowListData.paras.createEndTime = e;
    },
    getStartTime1(e) {
      console.log(e);
    },
    getEndTime1(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/btn.scss";
.printBox {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.3);
}

#borrowMain {
  background: #eef1f8;
  padding: 20px 10px;
}
.headerHtml {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  .headerInput {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    .el-inputBox {
      display: flex;
      align-items: center;
      font-size: 14px;
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
    .titleBox {
      font-size: 14px;
      white-space: nowrap;
    }
    .timeBox {
      width: 100%;
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
      }
      .icon-title-title {
        margin: 0 0 0 8px;
      }
    }
    .someBtn {
      display: flex;
      margin: 16px 20px 16px 0;
      .create {
        @include BtnFunction("success");
        margin-right: 10px;
      }
      .del {
        @include BtnFunction("error");
        margin-right: 10px;
      }
      .print {
        @include BtnFunction("success");
      }
    }
  }

  .resultForm {
    padding: 16px 20px;
    .lookDeatil {
      color: #599af3;
      text-decoration: underline;
      cursor: printer;
    }
  }
}
</style>
<style lang="scss">
#borrowMain {
  .entrustCompany {
    .el-select {
      width: 100%;
    }
  }
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>
