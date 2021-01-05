<template>
  <div id="checkPlanManagement">
    <!-- 这是盘点计划管理页面 -->
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
          <div class="el-inputBox-text">盘点周期：</div>
          <div class="el-inputBox-checkBox" style="width: 150px">
            <el-select
              v-model="checkCycle"
              placeholder="请选择盘点周期"
              @change="checkCycles"
              clearable
            >
              <el-option
                v-for="item in checkCycleData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">盘点类型：</div>
          <div class="el-inputBox-checkBox" style="width: 150px">
            <el-select
              v-model="checkType"
              placeholder="请选择盘点类型"
              @change="checkTypes"
              clearable
            >
              <el-option
                v-for="item in checkTypeData"
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
          <div class="el-inputBox-checkBox" style="width: 150px">
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
        <div class="el-inputBox">
          <div class="el-inputBox-text">计划状态：</div>
          <div class="el-inputBox-checkBox" style="width: 150px">
            <el-select
              v-model="planState"
              placeholder="请选择计划状态"
              @change="planStates"
              clearable
            >
              <el-option
                v-for="item in planStateData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="timeChoose el-inputBox">
          <div class="el-inputBox-text titleBox">创建日期：</div>
          <div class="timeBox">
            <div style="">
              <dateTime
                :dateTimeData="datetimeDate"
                @getDateTime="getStartTime"
                ref="startTime"
              />
            </div>
            <!-- 开始时间 -->
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="datetimeDate1"
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
    <div class="childWarehouseForm">
      <div class="formHeader">
        <div class="icon-title">
          <div class="icon-title-icon">
            <img src="../../assets/img/systemTitlemesa.png" />
          </div>
          <div class="icon-title-title">查询结果</div>
        </div>
        <div class="someBtn">
          <div class="successBtn" @click="create">创建</div>
          <div class="successBtn" @click="edit">编辑</div>
          <div class="errorBtn" @click="del">删除</div>
          <div class="errorBtn" @click="cancel">作废</div>
          <div class="successBtn" @click="lookPlan">查看盘点计划</div>
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
            prop="stockPlanName"
            label="盘点计划名称"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="orgNames"
            label="委托公司"
            show-overflow-tooltip
            width="250"
          >
          </el-table-column>
          <el-table-column prop="stockCycle" label="盘点周期" align="center">
          </el-table-column>
          <el-table-column prop="stockType" label="盘点类型" align="center">
          </el-table-column>
          <el-table-column prop="orderSource" label="创建类型" align="center">
          </el-table-column>
          <el-table-column prop="stockStatus" label="计划状态" align="center">
          </el-table-column>
          <el-table-column prop="createUser" label="创建人" align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建日期"
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
</template>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import {
  queryCheckPlanManage,
  delCheckPlanManage,
  cancelCheckPlanManage,
} from "../../api/api";
import { clearTimeInput } from "../../utils/validate";
import dateTime from "../../components/commin/dateTime.vue"; //时间
export default {
  components: {
    pagecomponent,
    dateTime,
  },
  data() {
    return {
      entrustCompany: "",
      checkCycle: "",
      checkType: "",
      createType: "",
      planState: "",
      tableData: [],
      checkCycleData: [
        {
          value: "0",
          label: "周盘点",
        },
        {
          value: "1",
          label: "月盘点",
        },
        {
          value: "2",
          label: "季盘点",
        },
        {
          value: "3",
          label: "半年度盘点",
        },
      ],
      entrustCompanyData: [],
      checkTypeData: [
        {
          value: "1",
          label: "按产品",
        },
        {
          value: "2",
          label: "按类型",
        },
      ],
      multipleSelection: [],
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
      planStateData: [
        {
          value: "0",
          label: "待盘点",
        },
        {
          value: "1",
          label: "盘点中",
        },
        {
          value: "2",
          label: "已作废",
        },
      ],
      datetimeDate: {
        placeholder: "请选择开始日期",
      },
      datetimeDate1: {
        placeholder: "请选择结束日期",
      },
      pageComponentsData: {
        pageNums: 0,
      },
      queryData: {
        orderBy: "createTime",
        pageNumber: "1",
        pageSize: "10",
        paras: {},
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "/inventoryCheck/createCheckPlan") {
      next((vm) => {
        vm.queryFun();
      });
    } else {
      next();
    }
  },
  mounted() {
    this.entrustCompanyData = this.$store.state.orgInfor.orgInforData;
    this.queryFun();
  },
  methods: {
    queryFun() {
      queryCheckPlanManage(this.queryData).then((ok) => {
        // console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this.tableData.forEach((v) => {
            v.stockCycle = this.stockCycleFun(v.stockCycle);
            v.stockType = this.stockTypeFun(v.stockType);
            v.orderSource = this.orderSourceFun(v.orderSource);
            v.stockStatus = this.stockStatusFun(v.stockStatus);
          });
          this.changeData(ok.data.result);
        }
      });
    },
    stockCycleFun(data) {
      let states = "";
      switch (data) {
        case 0:
          states = "周盘点";
          break;
        case 1:
          states = "月盘点";
          break;
        case 2:
          states = "季盘点";
          break;
        case 3:
          states = "半年盘点";
          break;
        default:
          break;
      }
      return states;
    },
    stockTypeFun(data) {
      let states = "";
      switch (data) {
        case 1:
          states = "按产品";
          break;
        case 2:
          states = "按库位";
          break;
        default:
          break;
      }
      return states;
    },
    orderSourceFun(data) {
      let states = "";
      switch (data) {
        case 1:
          states = "管理端";
          break;
        case 2:
          states = "仓库";
          break;
        default:
          break;
      }
      return states;
    },
    stockStatusFun(data) {
      let states = "";
      switch (data) {
        case 0:
          states = "待盘点";
          break;
        case 1:
          states = "盘点中";
          break;
        case 2:
          states = "已作废";
          break;
        default:
          break;
      }
      return states;
    },
    clickQuery() {
      //点击查询
      this.queryFun();
    },
    clearInput() {
      //点击清空
      clearTimeInput();
      Object.keys(this.queryData.paras).forEach((v) => {
        this.queryData.paras[v] = "";
      });
      this.queryFun();
    },
    create() {
      this.$router.push({
        path: "/inventoryCheck/createCheckPlan",
        query: { type: "create" },
      });
    },
    edit() {
      this.tableData.forEach((v) => {
        if (v.stockStatus !== "待盘点") {
          return this.$messageSelf.message({
            message: "只有待盘点的计划可编辑",
            type: "warning",
          });
        }
      });
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要编辑的盘点计划",
          type: "warning",
        });
      if (this.multipleSelection.length > 1)
        return this.$messageSelf.message({
          message: "只能选择一个盘点计划进行编辑",
          type: "warning",
        });
      this.$router.push({
        path: "/inventoryCheck/createCheckPlan",
        query: { type: "edit", data: this.multipleSelection[0] },
      });
    },
    del() {
      this.tableData.forEach((v) => {
        if (v.stockStatus !== "待盘点") {
          return this.$messageSelf.message({
            message: "只有待盘点的计划可删除",
            type: "warning",
          });
        }
      });
      let arr = [];
      this.multipleSelection.forEach((item) => {
        if (!arr.includes(item.id)) {
          arr.push(item.id);
        }
      });
      if (!arr.length)
        return this.$messageSelf.message({
          message: "请选择要删除的盘点计划",
          type: "warning",
        });
      this.$messageSelf
        .confirms("确定要删除该盘点计划？", "删除提示", {
          type: "info",
        })
        .then(() => {
          this.delRequest({ ids: arr });
        });
    },
    delRequest(data) {
      delCheckPlanManage(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({ message: "删除成功", type: "success" });
          this.queryFun();
        } else {
          this.$messageSelf.message({ message: "删除失败", type: "error" });
        }
      });
    },
    cancel() {
      if (!this.multipleSelection.length) {
        return this.$messageSelf.message({
          message: "请选择要作废盘点计划",
          type: "warning",
        });
      } else if (this.multipleSelection.length > 1) {
        return this.$messageSelf.message({
          message: "只能作废一条盘点计划",
          type: "warning",
        });
      } else {
        cancelCheckPlanManage({ id: this.multipleSelection[0].id }).then(
          (ok) => {
            // console.log(ok);
            if (ok.data.code === "10000") {
              this.$messageSelf.message({
                message: "作废成功",
                type: "success",
              });
              this.queryFun();
            } else {
              this.$messageSelf.message({
                message: "作废失败",
                type: "error",
              });
            }
          }
        );
      }
    },
    lookPlan() {
      this.$router.push({
        path: "/inventoryCheck/createCheckPlan",
        query: { type: "look", data: this.multipleSelection[0] },
      });
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    entrustCompanys(val) {
      this.queryData.paras.orgId = val;
    },
    checkCycles(val) {
      this.queryData.paras.stockCycle = +val;
    },
    checkTypes(val) {
      this.queryData.paras.stockType = val;
    },
    createTypes(val) {
      this.queryData.paras.orderSource = val;
    },
    planStates(val) {
      this.queryData.paras.stockStatus = val;
    },
    getPageNum(e) {
      this.queryData.pageNumber = e;
    },
    sureSuccssBtn(e) {
      this.queryData.pageNumber = e;
      this.queryFun();
    },
    changeData(data) {
      this.changePageData(data);
    },
    changePageData(data) {
      let { totalRow } = data;
      this.pageComponentsData.pageNums = totalRow;
    },
    getStartTime(e) {
      this.queryData.paras.createStartTime = e;
    },
    getEndTime(e) {
      this.queryData.paras.createEndTime = e;
    },
  },
};
</script>

<style lang="scss" scpoed>
@import "../../assets/scss/btn.scss";

#checkPlanManagement {
  background: #eef1f8;
  padding: 20px 10px;
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
      align-items: center;
      border-bottom: 1px solid #d1d6e2;
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
        .successBtn {
          @include BtnFunction("success");
          margin-left: 10px;
        }
        .errorBtn {
          @include BtnFunction("error");
          margin-left: 10px;
        }
      }
    }
    .resultForm {
      padding: 16px 20px;
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
