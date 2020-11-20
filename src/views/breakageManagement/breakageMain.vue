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
              <el-select
                v-model="breakageOrder"
                placeholder="请选择报损单号"
                @change="breakageOrders"
                clearable
              >
                <el-option
                  v-for="item in breakageOrderData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
          <el-table-column prop="damageOrderNo" label="报损单号" align="center">
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
  </div>
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import { Message } from "element-ui";
import dateTime from "../../components/commin/dateTime.vue"; //时间
import { queryBreakageList , delBreakageOrder} from "../../api/api";
// import { getCookie } from "../../utils/validate";
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "/breakageManagement/createBreakageOrder") {
      next((vm) => {
        if (vm.$route.query.type === "quxiao") {
          Message("已取消");
        }
      });
    } else {
      next();
    }
  },
  data() {
    return {
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
      breakageTypeData: [],
      breakageStateData: [],
      multipleSelection: [],
      queryData: {
        pageNumber: "1",
        pageSize: "10",
        paras: {
          orgId: "",
        },
      },
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
          createStartTime: "",
          createEndTime: "",
        },
        pageNumber: 1,
        pageSize: 10,
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
      // let queryData = this.queryData;
      // findDamageProductPage(queryData).then((ok) => {
      //   // console.log(ok)
      //   if (ok.data.code === "10000") {
      //     this.tableData = ok.data.result.list;
      //   }
      // });
      let queryBreakageListData = this.queryBreakageListData;
      queryBreakageList(queryBreakageListData).then((ok) => {
        if (ok.data.code === "10000") {
          this.tableData = ok.data.result.list;
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
    },
    clearInput() {
      //点击清空输入框
      this.clearTimeInput();
      this.$refs.startTime.clear();
      this.$refs.endTime.clear();
      this.tableData = [];
      this.pageQueryFun();
    },
    create() {
      //创建报损单
      this.$router.push({
        path: "/breakageManagement/createBreakageOrder",
        query: { type: "create" },
      });
    },
    edit() {},
    del() {
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length) return Message("请选择要删除的报损订单");
      this.$confirm("确定要删除该订单？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delRequest({ ids: arr });
        })
        .catch(() => {
          this.Message("已取消删除");
        });
    },
    delRequest(data) {
      delBreakageOrder(data).then((ok) => {
        if (ok.data.code === "10000") {
          Message({
            type: "success",
            message: "删除成功",
          });
          this.queryBrandFun();
        } else {
          Message({
            type: "error",
            message: "删除失败",
          });
        }
      });
    },
    submit() {},
    point() {},
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
      console.log(e);
    },
    getEndTime(e) {
      console.log(e);
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
  background: #e6e7ea;
  padding: 16px;
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
        font-size: 16px;
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
    width: 460px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 16px;
    .titleBox {
      font-size: 16px;
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
