<template>
  <div id="checkPlanManagement">
    <!-- 这是盘点单管理页面 -->
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
          <div class="el-inputBox-checkBox" style="width: 140px">
            <el-input v-model="checkCode" placeholder="请输入盘点单号">
            </el-input>
          </div>
        </div>
        <div class="el-inputBox">
          <div class="el-inputBox-text">盘点状态：</div>
          <div class="el-inputBox-checkBox" style="width: 150px">
            <el-select
              v-model="checkState"
              placeholder="请选择盘点状态"
              @change="checkStates"
              clearable
            >
              <el-option
                v-for="item in checkStateData"
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
          <div class="el-inputBox-text">订正结果：</div>
          <div class="el-inputBox-checkBox" style="width: 150px">
            <el-select
              v-model="saveResult"
              placeholder="请选择订正结果"
              @change="saveResults"
              clearable
            >
              <el-option
                v-for="item in saveResultData"
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
                @getDateTime="getStartTime_create"
                ref="startTime"
              />
            </div>
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="datetimeDate1"
                @getDateTime="getEndTime_create"
                ref="endTime"
              />
            </div>
          </div>
        </div>
        <div class="timeChoose el-inputBox">
          <div class="el-inputBox-text titleBox">盘点日期：</div>
          <div class="timeBox">
            <div style="">
              <dateTime
                :dateTimeData="datetimeDate"
                @getDateTime="getStartTime_check"
                ref="startTime"
              />
            </div>
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="datetimeDate1"
                @getDateTime="getEndTime_check"
                ref="endTime"
              />
            </div>
          </div>
        </div>
        <div class="timeChoose el-inputBox">
          <div class="el-inputBox-text titleBox">订正日期：</div>
          <div class="timeBox">
            <div style="">
              <dateTime
                :dateTimeData="datetimeDate"
                @getDateTime="getStartTime_save"
                ref="startTime"
              />
            </div>
            <div class="line"></div>
            <div>
              <dateTime
                :dateTimeData="datetimeDate1"
                @getDateTime="getEndTime_save"
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
          <div class="successBtn" @click="printCheck">打印盘点单</div>
          <div class="successBtn" @click="checkEntering">盘点录入</div>
          <div class="successBtn" @click="lookCheck">查看盘点</div>
        </div>
      </div>
      <div class="resultForm">
        <div class="tableDiv">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :stripe="true"
            tooltip-effect="dark"
            @expand-change="expandChange"
            :row-key="getRowKeys"
            :expand-row-keys="expands"
          >
            <el-table-column
              type="expand"
              align="center"
              label="展开"
              width="82"
            >
              <template>
                <div id="unfoldTable">
                  <div class="productTable" v-show="productTableShow">
                    <el-table
                      :data="productTableData"
                      border
                      style="width: 100%"
                      :stripe="true"
                      tooltip-effect="dark"
                    >
                      <el-table-column
                        type="index"
                        label="序号"
                        width="71"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="orgName"
                        label="委托公司"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="prodCode"
                        label="产品编号"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="prodName"
                        label="产品名称"
                        width="200"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="specName"
                        label="产品规格"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="braName"
                        label="品牌"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="num"
                        label="系统库存"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="realInventory"
                        label="实际库存"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="inventoryCount"
                        label="差异"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="inventoryStatus"
                        label="盘点结果"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="reason"
                        label="原因"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="actualStockTime"
                        label="实际盘点时间"
                        show-overflow-tooltip
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="stockUser"
                        label="盘点人"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="reviseUser"
                        label="订正人"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="reviseTime"
                        label="订正时间"
                        show-overflow-tooltip
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="reviseResult"
                        label="订正结果"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="storelocaTable" v-show="storelocaTableShow">
                    <el-table
                      :data="productTableData"
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
                        prop="childWareName"
                        label="子仓名称"
                        align="center"
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="wareAreaType"
                        label="区域类型"
                        align="center"
                        wareAreaType
                      >
                      </el-table-column>
                      <el-table-column
                        prop="orderContact"
                        label="区域名称"
                        align="center"
                        wareAreaName
                        show-overflow-tooltip
                      >
                      </el-table-column>
                      <el-table-column
                        prop="wareShelfName"
                        label="货架名称"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="wareSeatCode"
                        label="库位"
                        show-overflow-tooltip
                        align="center"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="prodCode"
                        label="产品编码"
                        align="center"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="prodName"
                        label="产品名称"
                        align="center"
                        width="200"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="specName"
                        label="产品规格"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="braName"
                        label="品牌"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="num"
                        label="系统库存"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="realInventory"
                        label="实际库存"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="inventoryCount"
                        label="差异"
                        align="center"
                      >
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
                        prop="stockUser"
                        label="盘点人"
                        align="center"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="actualStockTime"
                        label="实际盘点时间"
                        width="180"
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
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column type="selection" width="82" align="center">
            </el-table-column>
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
              show-overflow-tooltip
              width="250"
            >
            </el-table-column>
            <el-table-column
              prop="stockNo"
              label="盘点单"
              align="center"
              width="260"
            >
              <template slot-scope="scope">
                <div class="lookDeatil" @click="lookCheckOrderInfor(scope.row)">
                  {{ scope.row.stockNo }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="stockType" label="盘点类型" align="center">
            </el-table-column>
            <el-table-column prop="stockStatus" label="盘点状态" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180">
            </el-table-column>
            <el-table-column prop="orderSource" label="创建类型" align="center">
            </el-table-column>
            <el-table-column prop="createUser" label="创建人"></el-table-column>
            <el-table-column prop="startTime" label="盘点开始时间" width="180">
            </el-table-column>
            <el-table-column prop="endTime" label="盘点结束时间" width="180">
            </el-table-column>
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
  </div>
</template>

<style>
.resultForm .el-table__expand-icon {
  transform: rotate(180deg);
}
.resultForm .tableDiv .el-icon.el-icon-arrow-right {
  display: none;
}
.resultForm .el-table__expand-icon {
  position: relative;
}
.resultForm .el-table__expand-icon::before {
  content: "+";
  color: #000;
  font-size: 16px;
  font-weight: bold;
}
.resultForm .el-table__expand-icon--expanded::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 2px;
  background: #000;
  line-height: 20px;
  position: absolute;
  top: 10px;
  left: 27px;
}

#unfoldTable .el-table {
  border-right: none !important;
  border-left: none !important;
}

.resultForm .el-table__expanded-cell {
  border-right: none !important;
}
</style>

<script>
import pagecomponent from "../../components/commin/pageComponent"; //分页器
import BreakageOrder from "../../components/commin/componentList";

import {
  queryCheckOrder,
  delCheckOrder,
  queryCheckOrderDetails,
} from "../../api/api";
import { clearTimeInput } from "../../utils/validate";
import dateTime from "../../components/commin/dateTime.vue"; //时间
export default {
  components: {
    pagecomponent,
    dateTime,
    BreakageOrder,
  },
  data() {
    return {
      //设置row-key只展示一行
      expands: [], //只展开一行放入当前行id
      getRowKeys: (row) => {
        //获取当前行id
        return row.id;
      },
      printIsShow: false,
      tabledatasArr: [],
      replenishmentNoteJson: {
        title: "盘点单",
        replenishOrderNo: "",
        queryArr: [],
        basicJson: [
          {
            titles: "基础信息",
            basicJsonArr: [
              //弹框表格里面的列名称
            ],
          },
        ],
      },
      productTableShow: false,
      storelocaTableShow: false,
      entrustCompany: "",
      checkCode: "",
      checkState: "",
      checkType: "",
      createType: "",
      saveResult: "",
      tableData: [],
      productTableData: [],
      storelocaTableData: [],
      checkStateData: [
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
          label: "已盘点",
        },
        {
          value: "3",
          label: "未订正",
        },
        {
          value: "4",
          label: "已订正",
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
      saveResultData: [
        {
          value: "0",
          label: "同意",
        },
        {
          value: "1",
          label: "拒绝",
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
    if (from.name === "/inventoryCheck/createCheckOrder") {
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
      queryCheckOrder(this.queryData).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.tableData = [];
          this.tableData = ok.data.result.list;
          this.changeData(ok.data.result);
          this.tableData.forEach((v) => {
            v.stockType = this.stockTypeFun(v.stockType);
            v.stockStatus = this.stockStatusFun(v.stockStatus);
            v.orderSource = this.orderSourceFun(v.orderSource);
            v.orgName = v.tails.orgName;
          });
        }
      });
    },
    expandChange(row, expandedRows) {
      // console.log(row, expandedRows);
      if (expandedRows.length) {
        // 只展开一行//说明展开了
        this.expands = [];
        if (row) {
          this.expands.push(row.id); // 只展开当前行id
        }
        if (row.stockType === "按产品") {
          queryCheckOrderDetails({ id: row.id }).then((ok) => {
            console.log(123);
            if (ok.data.code === "10000") {
              this.productTableData = [];
              this.productTableData = ok.data.result;
              if (this.productTableData.length) {
                this.productTableShow = true;
                this.storelocaTableShow = false;
              }
            }
          });
          // this.lookCheckOrderDetail({ id: row.id });
        } else if (row.stockType === "按库位") {
          queryCheckOrderDetails({ id: row.id }).then((ok) => {
            console.log(456);
            this.productTableData = [];
            if (ok.data.code === "10000") {
              this.productTableData = ok.data.result;
              if (this.productTableData.length) {
                this.productTableShow = false;
                this.storelocaTableShow = true;
              }
            }
          });

          // this.lookCheckOrderDetail({ id: row.id });
        }
      } else {
        // 说明收起了
        this.expands = [];
      }
    },
    lookCheckOrderDetail(data) {
      queryCheckOrderDetails(data).then((ok) => {
        console.log(ok);
        if (ok.data.code === "10000") {
          this.productTableData = [];
          this.productTableData = ok.data.result;
          // this.storelocaTableData = [];
          // this.storelocaTableData = ok.data.result;
        }
      });
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
    stockStatusFun(data) {
      let states = "";
      switch (data) {
        case 0:
          states = "未盘点";
          break;
        case 1:
          states = "盘点中";
          break;
        case 2:
          states = "盘点完成";
          break;
        case 3:
          states = "审核通过";
          break;
        case 4:
          states = "审核拒绝";
          break;
        case 5:
          states = "已完成";
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
        path: "/inventoryCheck/createCheckOrder",
        query: { type: "create" },
      });
    },
    edit() {
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要编辑的盘点计划",
          type: "warning",
        });
      if (this.multipleSelection.length > 1) {
        return this.$messageSelf.message({
          message: "只能选择一个盘点计划进行编辑",
          type: "warning",
        });
      }
      if (this.multipleSelection[0].stockStatus !== "未盘点") {
        return this.$messageSelf.message({
          message: "只有未盘点的计划可编辑",
          type: "warning",
        });
      }
      this.$router.push({
        path: "/inventoryCheck/createCheckOrder",
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
          message: "请选择要删除的盘点单",
          type: "warning",
        });
      this.$messageSelf
        .confirms(
          `共选择${this.multipleSelection.length}条盘点单，确定删除吗？`,
          "删除提示",
          {
            type: "info",
          }
        )
        .then(() => {
          this.delRequest({ ids: arr });
        });
    },
    delRequest(data) {
      delCheckOrder(data).then((ok) => {
        if (ok.data.code === "10000") {
          this.$messageSelf.message({ message: "删除成功", type: "success" });
          this.queryFun();
        } else {
          this.$messageSelf.message({ message: "删除失败", type: "error" });
        }
      });
    },
    printCheck() {
      //打印盘点单
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要打印的盘点单",
          type: "warning",
        });
      if (this.multipleSelection.length > 1)
        return this.$messageSelf.message({
          message: "只能选择一个盘点单进行打印",
          type: "warning",
        });
      this.replenishmentNoteJson.basicJson[0].basicJsonArr = [];
      if (this.multipleSelection[0].stockType === "按库位") {
        this.replenishmentNoteJson.basicJson[0].basicJsonArr.push(
          {
            types: "childWareName",
            centerStr: "子仓名称",
          },
          {
            types: "wareAreaType",
            centerStr: "区域类型",
          },
          {
            types: "wareAreaCode",
            centerStr: "区域编号",
          },
          {
            types: "wareSeatCode",
            centerStr: "存储区库位",
          },
          {
            types: "wareSeatCode",
            centerStr: "拣货区库位",
          },
          {
            types: "prodCode",
            centerStr: "产品编码",
          },
          {
            types: "prodName",
            centerStr: "产品名称",
          },
          {
            types: "specName",
            centerStr: "产品规格",
          },
          {
            types: "num",
            centerStr: "系统库存",
          },
          {
            types: "realInventory",
            centerStr: "实盘库存",
          },
          {
            types: "remark",
            centerStr: "备注",
          }
        );
      } else if (this.multipleSelection[0].stockType === "按产品") {
        this.replenishmentNoteJson.basicJson[0].basicJsonArr.push(
          {
            types: "prodCode",
            centerStr: "产品编码",
          },
          {
            types: "prodName",
            centerStr: "产品名称",
          },
          {
            types: "specName",
            centerStr: "产品规格",
          },
          {
            types: "num",
            centerStr: "系统库存",
          },
          {
            types: "realInventory",
            centerStr: "实盘库存",
          },
          {
            types: "remark",
            centerStr: "备注",
          }
        );
      }

      this.tabledatasArr = [];
      this.printIsShow = true;
      queryCheckOrderDetails({ id: this.multipleSelection[0].id }).then(
        (ok) => {
          console.log(ok);
          if (ok.data.code === "10000") {
            let json = [
              {
                queryTitle: "盘点单号",
                queryCenter: this.multipleSelection[0].stockNo,
              },
              {
                queryTitle: "委托公司",
                queryCenter: this.multipleSelection[0].orgName,
              },
            ];
            this.replenishmentNoteJson.queryArr = json;
            this.replenishmentNoteJson.replenishOrderNo = this.multipleSelection[0].stockNo;
            this.tabledatasArr = [];
            this.tabledatasArr = ok.data.result;
          }
        }
      );
    },
    getiswuliudanOne(e) {
      this.printIsShow = e;
    },
    checkEntering() {
      //盘点录入
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要录入的盘点单",
          type: "warning",
        });
      if (this.multipleSelection.length > 1)
        return this.$messageSelf.message({
          message: "只能选择一个盘点单进行录入",
          type: "warning",
        });
      this.$router.push({
        path: "/inventoryCheck/createCheckRecord",
        query: { type: "create", data: this.multipleSelection[0] },
      });
    },
    lookCheck() {
      //查看盘点
      if (!this.multipleSelection.length)
        return this.$messageSelf.message({
          message: "请选择要查看的盘点单",
          type: "warning",
        });
      if (this.multipleSelection.length > 1)
        return this.$messageSelf.message({
          message: "只能选择一个盘点单进行查看",
          type: "warning",
        });
      this.$router.push({
        path: "/inventoryCheck/checkOrderInfor",
        query: {
          data: this.multipleSelection[0],
          type: "lookCheckOrderDetail",
        },
      });
    },
    lookCheckOrderInfor(row) {
      this.$router.push({
        path: "/inventoryCheck/checkOrderInfor",
        query: { data: row, type: "lookdetail" },
      });
    },
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    entrustCompanys(val) {
      this.queryData.paras.orgId = val;
    },
    checkStates(val) {
      this.queryData.paras.stockCycle = +val;
    },
    checkTypes(val) {
      this.queryData.paras.stockType = val;
    },
    createTypes(val) {
      this.queryData.paras.orderSource = val;
    },
    saveResults(val) {
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

    getStartTime_create(e) {
      this.queryData.paras.createStartTime = e;
    },
    getEndTime_create(e) {
      this.queryData.paras.createEndTime = e;
    },
    getStartTime_check(e) {
      this.queryData.paras.createStartTime = e;
    },
    getEndTime_check(e) {
      this.queryData.paras.createEndTime = e;
    },
    getStartTime_save(e) {
      this.queryData.paras.createStartTime = e;
    },
    getEndTime_save(e) {
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
#checkPlanManagement {
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
