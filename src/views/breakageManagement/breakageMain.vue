<template>
  <div id="mianPage">
    <!-- 这是报损管理页面 -->
    <div class="headerHtml">
      <div class="headerInput">
        <div class="headerInput-one">
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
            <div class="el-inputBox-text">报损单号：</div>
            <div class="el-inputBox-checkBox">
              <el-input v-model="breakageOrder" placeholder="模糊检索">
              </el-input>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">报损类型：</div>
            <div class="el-inputBox-checkBox">
              <el-select
                v-model="breakageType"
                placeholder="请选择报损类型"
                @change="breakageTypes"
                clearable
              >
                <el-option
                  v-for="item in breakageTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="el-inputBox">
            <div class="el-inputBox-text">报损状态：</div>
            <div class="el-inputBox-checkBox">
              <el-select
                v-model="breakageState"
                placeholder="请选择报损状态"
                @change="breakageStates"
                clearable
              >
                <el-option
                  v-for="item in breakageStateData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="headerInput-one">
          <div class="timeChoose">
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
          <div class="timeChoose">
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
          <div class="header-botton">
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
          <div class="icon-title-title">报损信息</div>
        </div>
        <div class="someBtn">
          <div class="create" @click="create">创建</div>
          <div class="create" @click="edit">编辑</div>
          <div class="del" @click="del">删除</div>
          <div class="create" @click="submit">提交</div>
          <div class="point" @click="point">打印报损单</div>
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
          <el-table-column label="序号" align="center" type="index" width="60">
          </el-table-column>
          <el-table-column prop="orgName" label="委托公司" align="center">
          </el-table-column>
          <el-table-column
            prop="damageOrderNo"
            label="报损单号"
            min-width="100"
            align="center"
          >
            <template slot-scope="scope">
              <div class="lookDeatil">
                {{ scope.row.damageOrderNo }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="disposeStatus" label="报损状态" align="center">
          </el-table-column>
          <el-table-column prop="damageType" label="报损类型" align="center">
          </el-table-column>
          <el-table-column prop="createUser" label="创建人" align="center">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center">
          </el-table-column>
          <el-table-column prop="verifyUserName" label="审核人" align="center">
          </el-table-column>
          <el-table-column
            prop="verifyTime"
            label="审核时间"
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
    <div v-show="popupBoxIsShow" class="popupBox">
      <transition
        enter-active-class="animate__animated animate__zoomIn"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div style="width: 300px; height: 300px; background: red"></div>
      </transition>
    </div>
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import dateTime from "../../components/commin/dateTime.vue"; //时间
import {
  queryBreakageList,
  delBreakageOrder,
  pointBreakageOrder,
} from "../../api/api";
// import { _getExportExcels } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "/breakageManagement/createBreakageOrder") {
      next((vm) => {
        vm.pageQueryFun();
        if (vm.$route.query.type === "quxiao") {
          vm.$messageSelf.message("已取消");
        }
      });
    } else {
      next();
    }
  },
  data() {
    return {
      popupBoxIsShow: false,
      tableData: [],
      datetimeDate: {
        placeholder: "请选择结束时间",
      },
      datetimeDates: {
        title: "",
        placeholder: "请选择开始时间",
      },
      breakageOrder: "",
      entrustCompany: "",
      breakageType: "",
      breakageState: "",
      breakageOrderData: [],
      entrustCompanyData: [],
      breakageTypeData: [
        {
          value: "1",
          label: "损坏",
        },
        {
          value: "2",
          label: "入库",
        },
        {
          value: "3",
          label: "丢失",
        },
        {
          value: "4",
          label: "其他",
        },
      ],
      breakageStateData: [
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
      queryBreakageListData: {
        paras: {
          damageOrderNo: "",
          orgId: "",
          orgName: "",
          wareId: "",
          wareName: "",
          childWareId: "",
          childWareName: "",
          damageType: "",
          disposeStatus: "",
          createStartTime: "",
          createEndTime: "",
        },
        pageNumber: 1,
        pageSize: 10,
        orderBy: "damageOrderNo",
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
      this.tableData = [];
      let queryBreakageListData = this.queryBreakageListData;
      queryBreakageList(queryBreakageListData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.tableData.forEach((v) => {
            v.disposeStatus =
              v.disposeStatus === 1
                ? "待提交"
                : v.disposeStatus === 2
                ? "待审核"
                : v.disposeStatus === 3
                ? "审核通过"
                : v.disposeStatus === 4
                ? "拒绝"
                : "——";
            v.damageType =
              v.damageType === 1
                ? "损坏"
                : v.damageType === 2
                ? "入库"
                : v.damageType === 3
                ? "丢失"
                : v.damageType === 4
                ? "其他"
                : "——";
          });
        } else {
          this.$messageSelf.message({
            message: "查询失败",
            type: "error",
          });
        }
      });
    },
    breakageOrders(val) {
      this.breakageOrder = val;
    },
    entrustCompanys(val) {
      this.entrustCompany = val;
    },
    breakageTypes(val) {
      this.breakageType = val;
    },
    breakageStates(val) {
      this.breakageState = val;
    },
    clickQuery() {
      //点击查询
      // let data = { ...this.queryBreakageListData.paras };
      this.queryBreakageListData.paras.damageOrderNo = this.breakageOrder;
      this.queryBreakageListData.paras.damageType = this.breakageType;
      this.queryBreakageListData.paras.disposeStatus = this.breakageState;
      this.pageQueryFun();
    },
    clearInput() {
      //点击清空输入框
      this.clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      this.pageQueryFun();
    },
    create() {
      //创建报损单
      this.$router.push({
        path: "/breakageManagement/createBreakageOrder",
        query: { type: "create" },
      });
    },
    edit() {
      if (!this.multipleSelection.length) {
        return this.$messageSelf.message({
          message: "请选择需要编辑的报损订单",
          type: "warning",
        });
      } else if (this.multipleSelection.length > 1) {
        return this.$messageSelf.message({
          message: "只能选择一个报损订单进行编辑",
          type: "warning",
        });
      } else {
        // this.$router.push({
        //   path: "/breakageManagement/createBreakageOrder",
        //   query: { val: this.multipleSelection[0], type: "edit" },
        // });
        if (this.multipleSelection[0].disposeStatus !== "待审核") {
          return this.$messageSelf.message({
            message: "只有待审核的订单可编辑",
            type: "warning",
          });
        } else {
          this.$router.push({
            path: "/breakageManagement/createBreakageOrder",
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
      if (!arr.length)
        return this.$messageSelf.message("请选择要删除的报损订单");
      this.$messageSelf
        .confirms(
          `确定要删除这${this.multipleSelection.length}条报损单号？`,
          "删除确认",
          {
            type: "warning",
          }
        )
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {
          this.$messageSelf.message("取消删除");
        });
    },
    delRequest(data) {
      delBreakageOrder(data).then((ok) => {
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
      this.popupBoxIsShow = true;
    },
    point() {
      if (!this.multipleSelection.length) {
        return this.$messageSelf.message({
          message: "请选择需要打印的单号",
          type: "warning",
        });
      } else if (this.multipleSelection.length > 1) {
        return this.$messageSelf.message({
          message: "只能选择一个产品进行打印",
          type: "warning",
        });
      } else {
        pointBreakageOrder({ id: this.multipleSelection[0].id }).then((ok) => {
          console.log(ok);
        });
      }
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    lookDetailEvent(row, column, cell) {
      if (column.property === "damageOrderNo") {
        if (cell.childNodes[0].childNodes[0].innerHTML !== "") {
          this.$router.push({
            path: "/breakageManagement/breakageOrderDetail",
            query: {
              damageOrderNo: row,
              type: "damageOrderNo",
            },
          });
        }
      }
    },
    getPageNum(e) {
      this.queryBreakageListData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryBreakageListData.pageNumber = e;
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
      this.queryBreakageListData.paras.createStartTime = e;
    },
    getEndTime(e) {
      this.queryBreakageListData.paras.createEndTime = e;
    },
    getStartTime1(e) {
      console.log(e);
    },
    getEndTime1(e) {
      console.log(e);
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
  background: #eef1f8;
  padding: 20px 10px;
}
.headerHtml {
  .headerInput {
    .headerInput-one {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      .el-inputBox {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-right: 16px;
        .el-inputBox-text {
          white-space: nowrap;
        }
      }
    }
  }
  .header-botton {
    width: 154px;
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
    width: 524px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 16px;
    .titleBox {
      font-size: 14px;
      white-space: nowrap;
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
      }
      .icon-title-title {
        margin: 0 0 0 8px;
        font-size: 16px;
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
      .point {
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
    margin: 10px 10px 0 0;
    text-align: right;
    height: 36px;
    background: #ffffff;
  }
}
</style>
